import { CommunityContentRepository } from "@/domain/repositories/community-content-repository";
import { PublicationDomainEntity } from "@/domain/entities/community-content/publications/publication-domain-entity";
import { CommentDomainEntity } from "@/domain/entities/community-content/comments/comment-domain-entity";
import { ReplyDomainEntity } from "@/domain/entities/community-content/replies/reply-domain-entity";



export class InMemoryCommunityInteractionsDatabase implements CommunityContentRepository {
    private publications: PublicationDomainEntity[] = [];
    private comments: CommentDomainEntity[] = [];
    private replies: ReplyDomainEntity[] = [];

    async findPublicationById(publicationId: string): Promise<PublicationDomainEntity | null> {
        const publication = this.publications.find(pub => pub.getId() === publicationId);
        return publication ? this.mapToDomainPublication(publication) : null;
    }

    async listPublicationsByOrganizationId(organizationId: string): Promise<PublicationDomainEntity[]> {
        return this.publications
            .filter(pub => pub.getOrganization()?.id === organizationId)
            .map(pub => this.mapToDomainPublication(pub));
    }

    async listCommentsByPublicationId(publicationId: string): Promise<CommentDomainEntity[]> {
        return this.comments
            .filter(comment => comment.getpublication()?.id === publicationId)
            .map(comment => this.mapToDomainComment(comment));
    }

    async listRepliesByCommentId(commentId: string): Promise<ReplyDomainEntity[]> {
        return this.replies
            .filter(reply => reply.getComment()?.id === commentId)
            .map(reply => this.mapToDomainReply(reply));
    }

    async save(entity: PublicationDomainEntity | CommentDomainEntity | ReplyDomainEntity): Promise<void> {
        if (entity instanceof PublicationDomainEntity) {
            this.savePublication(entity);
        } else if (entity instanceof CommentDomainEntity) {
            this.saveComment(entity);
        } else if (entity instanceof ReplyDomainEntity) {
            this.saveReply(entity);
        }
    }

    async delete(publicationId: string): Promise<void> {
      
    }

    private savePublication(publication: PublicationDomainEntity): void {
        const index = this.publications.findIndex(pub => pub.getId() === publication.getId());
        if (index === -1) {
            this.publications.push(publication);
        } else {
            this.publications[index] = publication;
        }
    }

    private saveComment(comment: CommentDomainEntity): void {
        const index = this.comments.findIndex(c => c.getId() === comment.getId());
        if (index === -1) {
            this.comments.push(comment);
        } else {
            this.comments[index] = comment;
        }
    }

    private saveReply(reply: ReplyDomainEntity): void {
        const index = this.replies.findIndex(r => r.getId() === reply.getId());
        if (index === -1) {
            this.replies.push(reply);
        } else {
            this.replies[index] = reply;
        }
    }

    private mapToDomainPublication(entity: PublicationDomainEntity): PublicationDomainEntity {
        return PublicationDomainEntity.restore({
            id: entity.getId()!,
            organization: entity.getOrganization()!,
            content: entity.getContent()!,
            comments: entity.getComments()!,
            isEdited: entity.getIsEdited()!,
            isDeleted: entity.getIsDeleted()!,
            createdAt: entity.getCreatedAt()!,
            updatedAt: entity.getUpdatedAt()!
        });
    }

    private mapToDomainComment(entity: CommentDomainEntity): CommentDomainEntity {
        return CommentDomainEntity.restore({
            id: entity.getId()!,
            organization: entity.getOrganization()!,
            publication: entity.getpublication()!,
            content: entity.getContent()!,
            replies: entity.getReplies()!,
            isDeleted: entity.getIsDeleted()!,
            isEdited: entity.getIsEdited()!,
            createdAt: entity.getCreatedAt()!,
            updatedAt: entity.getUpdatedAt()!
        });
    }

    private mapToDomainReply(entity: ReplyDomainEntity): ReplyDomainEntity {
        return ReplyDomainEntity.restore({
            id: entity.getId()!,
            comment: entity.getComment()!,
            organization: entity.getOrganization()!,
            content: entity.getContent()!,
            isDeleted: entity.getIsDeleted()!,
            isEdited: entity.getIsEdited()!,
            createdAt: entity.getCreatedAt()!,
            updatedAt: entity.getUpdatedAt()!
        });
    }
}
