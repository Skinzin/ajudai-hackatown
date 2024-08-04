import { PublicationDomainEntity } from "../entities/community-content/publications/publication-domain-entity";
 
export interface CommunityContentRepository {

    findById(publicationId: string): Promise<PublicationDomainEntity>;
    save(publication: PublicationDomainEntity): Promise<void>;
    delete(publicationId: string): Promise<void>;

}   