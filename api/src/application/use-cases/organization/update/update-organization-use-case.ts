import { OrganizationDomainService } from "@/domain/domain-services/organization/organization-domain-service";
import { UpdateOrganizationDomainServiceInput } from "@/domain/domain-services/organization/types/organization-domain-service-inputs";
import { UpdateOrganizationUseCaseOutputDTO } from "./DTOs/update-organization-use-case-output-DTO";
import { OrganizationsRepository } from "@/domain/repositories/organizations-repository";
import { UpdateOrganizationUseCaseInputDTO } from "./DTOs/update-organization-use-case-input-DTO";
import { SocialNetworkValueObject } from "@/domain/entities/value-objects/social-networking-value-object";
import { TwitterSocialNetworkValueObject } from "@/domain/entities/value-objects/twitter-value-network-value-object";
import { EmptySocialNetworkValueObject } from "@/domain/entities/value-objects/empty-social-network-value-object";
import { FacebookSocialNetworkValueObject } from "@/domain/entities/value-objects/facebook-value-object";
import { InstagramSocialNetworkValueObject } from "@/domain/entities/value-objects/instragram-social-network-value-object";
import { LinkedinSocialNetworkValueObject } from "@/domain/entities/value-objects/linkedin-social-network-value-object";
import { PhoneValueObject } from "@/domain/entities/value-objects/phone-value-object";
import { OrganizationNotFoundApplicationException } from "@/application/application-exceptions/organization-not-found-application-exception";


export class UpdateOrganizationUseCase {
    constructor(
        private readonly organizationsRepository: OrganizationsRepository
    ) { }

    async execute(input: UpdateOrganizationUseCaseInputDTO): Promise<UpdateOrganizationUseCaseOutputDTO> {

        const organization = await this.organizationsRepository.findById(input.idOrganization);
        if (!organization) {
            throw new OrganizationNotFoundApplicationException(
                "update-organization-use-case.ts",
                19,
                "O organização com o id informado não foi encontrada."
            )
        }

        const updateOrganizationDomainServiceInput: UpdateOrganizationDomainServiceInput = {
            actualData: organization,
            ...input
        }

        const organizationUpdated = new OrganizationDomainService().updateOrganization(updateOrganizationDomainServiceInput);

        await this.organizationsRepository.save(organizationUpdated);

        const output: UpdateOrganizationUseCaseOutputDTO = {
            organization: organizationUpdated
        }

        return output;
    }
}   