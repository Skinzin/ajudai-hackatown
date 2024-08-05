import { OrganizationDomainEntity } from '@/domain/entities/organization/organization-domain-entity';
import { OrganizationsRepository } from "@/domain/repositories/organizations-repository";
import { CreateOrganizationUseCaseInputDTO } from "./DTOs/create-organization-use-case.input-DTO";
import { CreateOrganizationUseCaseOutputDTO } from "./DTOs/create-organization-use-case.output-DTO";
import { SocialNetworkValueObject } from "@/domain/entities/value-objects/social-networking-value-object";
import { LinkedinSocialNetworkValueObject } from "@/domain/entities/value-objects/linkedin-social-network-value-object";
import { InstagramSocialNetworkValueObject } from "@/domain/entities/value-objects/instragram-social-network-value-object";
import { FacebookSocialNetworkValueObject } from "@/domain/entities/value-objects/facebook-value-object";
import { TwitterSocialNetworkValueObject } from "@/domain/entities/value-objects/twitter-value-network-value-object";
import { OrganizationDomainService } from "@/domain/domain-services/organization/organization-domain-service";
import { CreateOrganizationDomainServiceInput } from "@/domain/domain-services/organization/types/organization-domain-service-inputs";
import { EmptySocialNetworkValueObject } from "@/domain/entities/value-objects/empty-social-network-value-object";


export class CreateOrganizationUseCase {
    constructor(
        private readonly organizationRepository: OrganizationsRepository,
    ) { }

    async execute(input: CreateOrganizationUseCaseInputDTO): Promise<CreateOrganizationUseCaseOutputDTO> {
        const organization: OrganizationDomainEntity = new OrganizationDomainService().createOrganization(input);

        await this.organizationRepository.save(organization);

        const output: CreateOrganizationUseCaseOutputDTO = {
            organization
        }

        return output;
    }
}    