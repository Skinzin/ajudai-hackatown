import { OrganizationDomainEntity } from "@/domain/entities/organization/organization-domain-entity";
import { OrganizationsRepository } from "@/domain/repositories/organizations-repository";
import { OrganizationNotFoundApplicationException } from "@/application/application-exceptions/organization-not-found-application-exception";
import { OrganizationEntity } from "@/domain/entities/organization/types/organization-entity";

export class InMemoryOrganizationDatabase implements OrganizationsRepository {
    private organizations: OrganizationEntity[] = [];

    async findById(id: string): Promise<OrganizationDomainEntity | null> {
        const organization = this.organizations.find(org => org.id === id);
        if (!organization) return null;

        return this.mapToDomainEntity(organization);
    }

    async findByEmail(email: string): Promise<OrganizationDomainEntity | null> {
        const organization = this.organizations.find(org => org.email === email);
        if (!organization) return null;

        return this.mapToDomainEntity(organization);
    }

    async save(organizationDomain: OrganizationDomainEntity): Promise<void> {
        const organization = this.mapToEntity(organizationDomain);
        const index = this.organizations.findIndex(org => org.id === organization.id);

        if (index === -1) {
            this.organizations.push(organization);
        } else {
            this.organizations[index] = organization;
        }
    }

    async delete(id: string): Promise<void> {
        const organization = this.organizations.find(org => org.id === id);
        if (!organization) {
            throw new OrganizationNotFoundApplicationException(
                "in-memory-organization-database.ts",
                23,
                "A organização com o id informado não foi encontrada."
            );
        }
        this.organizations = this.organizations.filter(org => org.id !== id);
    }

    private mapToDomainEntity(entity: OrganizationEntity): OrganizationDomainEntity {
        return OrganizationDomainEntity.restore({
            id: entity.id,
            name: entity.name,
            area: entity.area,
            about: entity.about,
            email: entity.email,
            password: entity.password,
            address: entity.address,
            phone: entity.phone,
            photo: entity.photo,
            social: entity.social,
            isNeedSomeItems: entity.isNeedSomeItems,
            isNeedVoluntarys: entity.isNeedVoluntarys,
            isProvideSomeItems: entity.isProvideSomeItems,
            isActive: entity.isActive,
            interations: entity.interations,
            items: entity.items,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }

    private mapToEntity(domain: OrganizationDomainEntity): OrganizationEntity {
        return {
            id: domain.getId()!,
            name: domain.getName()!,
            area: domain.getArea()!,
            about: domain.getAbout()!,
            email: domain.getEmail()!,
            password: domain.getPassword()!,
            address: domain.getAddress()!,
            phone: domain.getPhone()!,
            photo: domain.getPhoto()!,
            social: domain.getSocial()!,
            isNeedSomeItems: domain.getIsNeedSomeItems()!,
            isNeedVoluntarys: domain.getIsNeedVoluntarys()!,
            isProvideSomeItems: domain.getIsProvideSomeItems()!,
            isActive: domain.getIsActive()!,
            interations: domain.getInterations()!,
            items: domain.getItems()!,
            createdAt: domain.getCreatedAt()!,
            updatedAt: domain.getUpdatedAt()!,
        };
    }
}
