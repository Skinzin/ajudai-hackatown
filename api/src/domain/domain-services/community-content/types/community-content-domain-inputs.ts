import { UpdateOrganizationInput } from './../../organization/types/organization-domain-service-inputs';
import { OrganizationDomainEntity } from "@/domain/entities/organization/organization-domain-entity"
 

export interface CreatePublicationDomainServiceInput {
    organization: OrganizationDomainEntity

    content: {
        subject: string
        text: string
    }
}

 