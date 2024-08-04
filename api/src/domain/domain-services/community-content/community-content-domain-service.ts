import { CommentDomainEntity } from "@/domain/entities/community-content/comments/comment-domain-entity";
import { PublicationDomainEntity } from "@/domain/entities/community-content/publications/publication-domain-entity";
import { ReplyDomainEntity } from "@/domain/entities/community-content/replies/reply-domain-entity";
import { CreateCommentDomainServiceInput, CreatePublicationDomainServiceInput, CreateReplyDomainServiceInput, DeleteCommentDomainServiceInput, DeletePublicationDomainServiceInput, DeleteReplyDomainServiceInput, UpdateCommentDomainServiceInput, UpdatePublicationDomainServiceInput, UpdateReplyDomainServiceInput } from "./types/community-content-domain-inputs";
import { InvalidPublicationPropertyDomainException } from "@/domain/domain-exceptions/invalid-publication-property-domain-exception";
import { InvalidCommentPropertyDomainException } from "@/domain/domain-exceptions/invalid-comment-property-domain-exception";
import { InvalidReplyPropertyDomainException } from "@/domain/domain-exceptions/invalid-reply-property-domain-exception";

export class CommunityContentDomainService {
    constructor() { }

    createPublication(input: CreatePublicationDomainServiceInput) {
        return PublicationDomainEntity.create(input);
    }

    updatePublication(input: UpdatePublicationDomainServiceInput) {
        const { actualData, newData } = input;

        const publicationContent = actualData.getContent();
        if (!publicationContent) {
            throw new InvalidPublicationPropertyDomainException(
                'publication-domain-entity.ts',
                45,
                'contet',
                'O conteúdo da publicação não pode ser vazio.'
            )
        }

        if (publicationContent.text !== newData.text) {
            publicationContent.text = newData.text;
        }

        if (publicationContent.subject !== newData.subject) {
            publicationContent.subject = newData.subject;
        }

        actualData.setContent(publicationContent);
        actualData.setUpdatedAt(new Date());

        return actualData;
    }

    deletePublication(input: DeletePublicationDomainServiceInput) {
        const { publication } = input;

        publication.setIsDeleted(true);
        publication.setUpdatedAt(new Date());

        return publication;
    }

    createComment(input: CreateCommentDomainServiceInput) {
        return CommentDomainEntity.create(input);
    }

    updateComment(input: UpdateCommentDomainServiceInput) {
        const { actualData, newContent } = input;

        const commentContent = actualData.getContent();
        if (!commentContent) {
            throw new InvalidCommentPropertyDomainException(
                'publication-domain-entity.ts',
                45,
                'contet',
                'O conteúdo do comentário não pode ser vazio.'
            )
        }

        if (commentContent !== newContent) {
            actualData.setContent(newContent);
        }

        actualData.setUpdatedAt(new Date());

        return actualData;
    }

    deleteComment(input: DeleteCommentDomainServiceInput) {
        const { comment } = input;

        comment.setIsDeleted(true);
        comment.setUpdatedAt(new Date());

        return comment;
    }

    createReply(input: CreateReplyDomainServiceInput) {
        return ReplyDomainEntity.create(input);
    }

    updateReply(input: UpdateReplyDomainServiceInput) {
        const { actualData, newContent } = input;

        const replyContent = actualData.getContent();
        if (!replyContent) {
            throw new InvalidReplyPropertyDomainException(
                'reply-domain-entity.ts',
                45,
                'contet',
                'O conteúdo da resposta não pode ser vazio.'
            )
        }

        if (replyContent !== newContent) {
            actualData.setContent(newContent);
        }

        actualData.setUpdatedAt(new Date());

        return actualData;
    }

    deleteReply(input: DeleteReplyDomainServiceInput) {
        const { reply } = input;

        reply.setIsDeleted(true);
        reply.setUpdatedAt(new Date());

        return reply;
    }
}