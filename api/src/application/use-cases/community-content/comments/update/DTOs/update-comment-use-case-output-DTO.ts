import { CommentDomainEntity } from "@/domain/entities/community-content/comments/comment-domain-entity";

export interface UpdateCommentUseCaseOutputDTO {
    updatedComment: CommentDomainEntity;
}