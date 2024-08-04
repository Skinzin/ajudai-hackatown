import { PublicationDomainEntity } from "@/domain/entities/community-content/publications/publication-domain-entity";
import { CreatePublicationDomainServiceInput } from "./types/community-content-domain-inputs";


export class CommunityContentDomainService {
    constructor() {}

    createPublication(input: CreatePublicationDomainServiceInput): PublicationDomainEntity {
        const publication = PublicationDomainEntity.create(input);

        return publication;
    }

    updatePublication() {
        
    }


}