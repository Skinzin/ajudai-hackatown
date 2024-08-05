import { OrganizationDomainEntity } from "@/domain/entities/organization/organization-domain-entity";


export interface DeleteOrganizationUseCaseOutputDTO {
    organizationDeleted: OrganizationDomainEntity
}