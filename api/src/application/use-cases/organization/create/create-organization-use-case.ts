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

        const createOrganizationDomainServiceInput: CreateOrganizationDomainServiceInput = {
            ...input,
            social: {
                linkedin: input.social.linkedin ? new SocialNetworkValueObject<LinkedinSocialNetworkValueObject>(input.social.linkedin) : new EmptySocialNetworkValueObject(),
                instagram: input.social.instagram ? new SocialNetworkValueObject<InstagramSocialNetworkValueObject>(input.social.instagram) : new EmptySocialNetworkValueObject(),
                twitter: input.social.twitter ? new SocialNetworkValueObject<TwitterSocialNetworkValueObject>(input.social.twitter) : new EmptySocialNetworkValueObject(),
                facebook: input.social.facebook ? new SocialNetworkValueObject<FacebookSocialNetworkValueObject>(input.social.facebook) : new EmptySocialNetworkValueObject(),
            }
        }

        const organization: OrganizationDomainEntity = new OrganizationDomainService().createOrganization(createOrganizationDomainServiceInput);

        await this.organizationRepository.save(organization);

        const output: CreateOrganizationUseCaseOutputDTO = {
            organization
        }

        return output;
    }
}    