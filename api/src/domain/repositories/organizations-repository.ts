import { OrganizationDomainEntity } from "../entities/organization/organization-domain-entity";

export interface OrganizationsRepository {
    findById(id: string): Promise<OrganizationDomainEntity | null>;
    findByEmail(email: string): Promise<OrganizationDomainEntity | null>;
    save(organization: OrganizationDomainEntity): Promise<void>;
    delete(id: string): Promise<void>;
}