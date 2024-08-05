import { OrganizationNotFoundApplicationException } from "@/application/application-exceptions/organization-not-found-application-exception";
import { OrganizationsRepository } from "@/domain/repositories/organizations-repository";
import { ReadOrganizationUseCaseInputDTO } from "./DTOs/read-organization-use-case-input-DTO";
import { ReadOrganizationUseCaseOutputDTO } from "./DTOs/read-organization-use-case-output-DTO";


export class ReadOrganizationUseCase {
    constructor(
        private readonly organizationsRepository: OrganizationsRepository
    ) { }

    async execute(input: ReadOrganizationUseCaseInputDTO): Promise<ReadOrganizationUseCaseOutputDTO> {
        const organization = await this.organizationsRepository.findById(input.idOrganization);

        if (!organization) {
            throw new OrganizationNotFoundApplicationException(
                "read-organization-use-case.ts",
                19,
                "O organização com o id informado não foi encontrada."
            )
        }

        const output: ReadOrganizationUseCaseOutputDTO = {
            organization
        }

        return output;
    }
}       