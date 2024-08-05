import { C } from "vitest/dist/reporters-yx5ZTtEV";
import { PublicationDomainEntity } from "../entities/community-content/publications/publication-domain-entity";
import { CommentDomainEntity } from "../entities/community-content/comments/comment-domain-entity";
import { ReplyDomainEntity } from "../entities/community-content/replies/reply-domain-entity";

export interface CommunityContentRepository {

    findPublicationById(publicationId: string): Promise<PublicationDomainEntity | null>;

    listPublicationsByOrganizationId(organizationId: string): Promise<PublicationDomainEntity[]>;
    listCommentsByPublicationId(publicationId: string): Promise<CommentDomainEntity[]>;
    listRepliesByCommentId(commentId: string): Promise<ReplyDomainEntity[]>;

    save(publication: PublicationDomainEntity | CommentDomainEntity | ReplyDomainEntity): Promise<void>;
    delete(publicationId: string): Promise<void>;

}   