import { CommentDomainEntity } from '@/domain/entities/community-content/comments/comment-domain-entity';
import { CreateCommentEntityInput } from '@/domain/entities/community-content/comments/types/comment-entity-inputs';
import { PublicationDomainEntity } from '@/domain/entities/community-content/publications/publication-domain-entity';
import { CreatePublicationEntityInput } from '@/domain/entities/community-content/publications/types/publish-entity-inputs';
import { ReplyDomainEntity } from '@/domain/entities/community-content/replies/reply-domain-entity';
import { CreateReplyInput } from '@/domain/entities/community-content/replies/types/reply-entity-inputs';
import { OrganizationDomainEntity } from "@/domain/entities/organization/organization-domain-entity"


export interface CreatePublicationDomainServiceInput extends CreatePublicationEntityInput { }


export interface UpdatePublicationDomainServiceInput {
    actualData: PublicationDomainEntity;
    newData: {
        subject: string;
        text: string;
    };
}

export interface DeletePublicationDomainServiceInput {
    publication: PublicationDomainEntity;
}

export interface CreateCommentDomainServiceInput extends CreateCommentEntityInput { }

export interface UpdateCommentDomainServiceInput {
    actualData: CommentDomainEntity;
    newContent: string;
}

export interface DeleteCommentDomainServiceInput {
    comment: CommentDomainEntity;
}

export interface CreateReplyDomainServiceInput extends CreateReplyInput { }

export interface UpdateReplyDomainServiceInput {
    actualData: ReplyDomainEntity;
    newContent: string;
}

export interface DeleteReplyDomainServiceInput {
    reply: ReplyDomainEntity;
}


