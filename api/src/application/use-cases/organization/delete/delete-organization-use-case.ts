import { DeleteOrganizationDomainServiceInput } from './../../../../domain/domain-services/organization/types/organization-domain-service-inputs';
import { OrganizationNotFoundApplicationException } from "@/application/application-exceptions/organization-not-found-application-exception";
import { OrganizationDomainService } from '@/domain/domain-services/organization/organization-domain-service';
import { OrganizationDomainEntity } from '@/domain/entities/organization/organization-domain-entity';
import { OrganizationsRepository } from "@/domain/repositories/organizations-repository";
import { DeleteOrganizationUseCaseInputDTO } from './DTOs/delete-organization-use-case-input-DTO';
import { DeleteOrganizationUseCaseOutputDTO } from './DTOs/delete-organization-use-case-output-DTO';


export class DeleteOrganizationUseCase {
    constructor(
        private readonly organizationsRepository: OrganizationsRepository
    ) { }

    async execute(input: DeleteOrganizationUseCaseInputDTO): Promise<DeleteOrganizationUseCaseOutputDTO> {
        const organization = await this.organizationsRepository.findById(input.idOrganization);

        if (!organization) {
            throw new OrganizationNotFoundApplicationException(
                "delete-organization-use-case.ts",
                19,
                "O organização com o id informado não foi encontrada."
            )
        }

        const DeleteOrganizationDomainServiceInput: DeleteOrganizationDomainServiceInput = {
            organization
        }

        const organizationDeleted: OrganizationDomainEntity = new OrganizationDomainService().deleteOrganization(DeleteOrganizationDomainServiceInput);

        await this.organizationsRepository.save(organizationDeleted)

        const output: DeleteOrganizationUseCaseOutputDTO = {
            organizationDeleted
        }

        return output;
    }
}   