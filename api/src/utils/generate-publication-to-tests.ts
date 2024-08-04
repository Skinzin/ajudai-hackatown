import { PublicationDomainEntity } from "@/domain/entities/community-content/publications/publication-domain-entity";
import { CreatePublicationEntityInput } from "@/domain/entities/community-content/publications/types/publish-entity-inputs";
import { OrganizationEntity } from "@/domain/entities/organization/types/organization-entity";


export function generatePublicationToTests() {

    const validOrganization: Pick<OrganizationEntity, 'id' | 'name' | 'photo' | 'area'> = {
        id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
        name: "Valid Organization",
        photo: "https://example.com/photo.jpg",
        area: "Community Support",
    };

    const validContent = {
        subject: "Valid Subject",
        text: "This is a valid text for the publication."
    };

    const validCreateInput: CreatePublicationEntityInput = {
        organization: validOrganization,
        content: validContent
    };

    return  PublicationDomainEntity.create(validCreateInput);
}