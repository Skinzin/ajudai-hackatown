import { InvalidCommentPropertyDomainException } from "@/domain/domain-exceptions/invalid-comment-property-domain-exception";
import { OrganizationEntity } from "../../organization/types/organization-entity";
import { PublicationDomainEntity } from "../publications/publication-domain-entity";
import { ReplyEntity } from "../replies/types/reply-entity";
import { CommentEntity } from "./types/comment-entity";
import { CreateCommentEntityInput, RestoreCommentEntityInput } from './types/comment-entity-inputs';


export class CommentDomainEntity implements CommentEntity {
    id?: string;
    organization?: Pick<OrganizationEntity, "id" | "name" | "photo" | "area">;
    publish?: Pick<PublicationDomainEntity, "content">;
    content?: string;
    replies?: ReplyEntity[];
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
    isEdited?: boolean;

    private constructor() {}

    static create(input: CreateCommentEntityInput): CommentDomainEntity {
        const comment = new CommentDomainEntity();

        comment.setId(crypto.randomUUID());
        comment.setOrganization(input.organization);
        comment.setPublish(input.publish);
        comment.setContent(input.content);
        comment.setReplies([]);
        comment.setIsDeleted(false);
        comment.setIsEdited(false);
        comment.setCreatedAt(new Date());
        comment.setUpdatedAt(new Date());
        return comment;
    }

    static restore(input: RestoreCommentEntityInput): CommentDomainEntity {
        const comment = new CommentDomainEntity();

        comment.setId(input.id);
        comment.setOrganization(input.organization);
        comment.setPublish(input.publish);
        comment.setContent(input.content);
        comment.setReplies(input.replies);
        comment.setIsDeleted(input.isDeleted);
        comment.setIsEdited(input.isEdited);
        comment.setCreatedAt(input.createdAt);
        comment.setUpdatedAt(input.updatedAt);
        return comment;
    }

    public getId(): string | undefined {
        return this.id;
    }

    public setId(id: string): void {
        const validIdCharacters = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!validIdCharacters.test(id)) {
            throw new InvalidCommentPropertyDomainException(
                'comment-domain-entity.ts',
                25,
                'id',
                'O id do comentário não é válido.'
            );
        }
        this.id = id;
    }

    public getOrganization(): Pick<OrganizationEntity, "id" | "name" | "photo" | "area"> | undefined {
        return this.organization;
    }

    public setOrganization(organization: Pick<OrganizationEntity, "id" | "name" | "photo" | "area">): void {
        if (!organization.id) {
            throw new InvalidCommentPropertyDomainException(
                'comment-domain-entity.ts',
                35,
                'organization.id',
                'O id da organização não pode ser vazio.'
            );
        }
        this.organization = organization;
    }

    public getPublish(): Pick<PublicationDomainEntity, "content"> | undefined {
        return this.publish;
    }

    public setPublish(publish: Pick<PublicationDomainEntity, "content">): void {
        if (!publish) {
            throw new InvalidCommentPropertyDomainException(
                'comment-domain-entity.ts',
                45,
                'publish.content',
                'O conteúdo da publicação não pode ser vazio.'
            );
        }
        this.publish = publish;
    }

    public getContent(): string | undefined {
        return this.content;
    }

    public setContent(content: string): void {
        if (!content || content.length < 1 || content.length > 500) {
            throw new InvalidCommentPropertyDomainException(
                'comment-domain-entity.ts',
                55,
                'content',
                'O conteúdo do comentário deve ter entre 1 e 500 caracteres.'
            );
        }
        this.content = content;
    }

    public getReplies(): ReplyEntity[] | undefined {
        return this.replies;
    }

    public setReplies(replies: ReplyEntity[]): void {
        this.replies = replies;
    }

    public getIsDeleted(): boolean | undefined {
        return this.isDeleted;
    }

    public setIsDeleted(isDeleted: boolean): void {
        this.isDeleted = isDeleted;
    }

    public getIsEdited(): boolean | undefined {
        return this.isEdited;
    }

    public setIsEdited(isEdited: boolean): void {
        this.isEdited = isEdited;
    }

    public getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: Date): void {
        if (!(createdAt instanceof Date) || isNaN(createdAt.getTime())) {
            throw new InvalidCommentPropertyDomainException(
                'comment-domain-entity.ts',
                60,
                'createdAt',
                'A data de criação fornecida não é válida.'
            );
        }
        this.createdAt = createdAt;
    }

    public getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
        if (!(updatedAt instanceof Date) || isNaN(updatedAt.getTime())) {
            throw new InvalidCommentPropertyDomainException(
                'comment-domain-entity.ts',
                70,
                'updatedAt',
                'A data de atualização fornecida não é válida.'
            );
        }
        this.updatedAt = updatedAt;
    }

    public addReply(reply: ReplyEntity): void {
        if (!this.replies) {
            this.replies = [];
        }
        this.replies.push(reply);
    }
}
