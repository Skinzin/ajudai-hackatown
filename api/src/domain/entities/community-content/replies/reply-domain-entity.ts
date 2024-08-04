import { OrganizationEntity } from "../../organization/types/organization-entity";
import { ReplyEntity } from "./types/reply-entity";
import { InvalidReplyPropertyDomainException } from "@/domain/domain-exceptions/invalid-reply-property-domain-exception";
import { CreateReplyInput, RestoreReplyInput } from "./types/reply-entity-inputs";

export class ReplyDomainEntity implements ReplyEntity {
    id?: string;
    comment?: {
        id: string;
        subject: string;
    };
    organization?: Pick<OrganizationEntity, "id" | "name" | "photo" | "area">;
    isDeleted?: boolean;
    isEdited?: boolean;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;

    private constructor() { }

    static create(input: CreateReplyInput): ReplyDomainEntity {
        const reply = new ReplyDomainEntity();

        reply.setId(crypto.randomUUID());
        reply.setComment(input.comment);
        reply.setOrganization(input.organization);
        reply.setContent(input.content);
        reply.setIsDeleted(false);
        reply.setIsEdited(false);
        reply.setCreatedAt(new Date());
        reply.setUpdatedAt(new Date());

        return reply;
    }

    static restore(input: RestoreReplyInput): ReplyDomainEntity {
        const reply = new ReplyDomainEntity();

        reply.setId(input.id);
        reply.setComment(input.comment);
        reply.setOrganization(input.organization);
        reply.setContent(input.content);
        reply.setIsDeleted(input.isDeleted);
        reply.setIsEdited(input.isEdited);
        reply.setCreatedAt(input.createdAt);
        reply.setUpdatedAt(input.updatedAt);

        return reply;
    }

    public getId(): string | undefined {
        return this.id;
    }

    public setId(id: string): void {
        const validIdCharacters = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!validIdCharacters.test(id)) {
            throw new InvalidReplyPropertyDomainException(
                'reply-domain-entity.ts',
                60,
                'id',
                'O id da resposta não é válido.'
            );
        }
        this.id = id;
    }

    public getComment(): { id: string; subject: string } | undefined {
        return this.comment;
    }

    public setComment(
        comment: {
            id: string;
            subject: string
        }
    ): void {

        if (!comment.id || !comment.subject) {
            throw new InvalidReplyPropertyDomainException(
                'reply-domain-entity.ts',
                35,
                'comment',
                'O comentário deve ter um id e um assunto.'
            );
        }
        this.comment = comment;
    }

    public getOrganization(): Pick<OrganizationEntity, "id" | "name" | "photo" | "area"> | undefined {
        return this.organization;
    }

    public setOrganization(organization: Pick<OrganizationEntity, "id" | "name" | "photo" | "area">): void {
        if (!organization.id) {
            throw new InvalidReplyPropertyDomainException(
                'reply-domain-entity.ts',
                45,
                'organization.id',
                'O id da organização não pode ser vazio.'
            );
        }
        this.organization = organization;
    }

    public getContent(): string | undefined {
        return this.content;
    }

    public setContent(content: string): void {
        if (!content) {
            throw new InvalidReplyPropertyDomainException(
                "reply-domain-entity.ts",
                114,
                "content",
                `O conteúdo não pode ser vazia!`
            )
        }

        const invalidCharacters = /[^a-zA-Z\u00C0-\u00FF0-9\s ?!.,"'-]/;
        const hasInvalidCharacters = content.match(invalidCharacters);

        if (hasInvalidCharacters) {
            throw new InvalidReplyPropertyDomainException(
                "reply-domain-entity.ts",
                126,
                "content",
                `O conteúdo contém caracteres inválidos. \n Caracteres inválidos encontrados: ${hasInvalidCharacters}`
            )
        }

        if (/(\d{10,})/.test(content)) {
            throw new InvalidReplyPropertyDomainException(
                "reply-domain-entity.ts",
                135,
                "content",
                `O conteúdo não pode conter sequências numéricas muito longas.`
            )
        }

        if (this.verifyIfContainsSwearsWords(content)) {
            throw new InvalidReplyPropertyDomainException(
                "reply-domain-entity.ts",
                144,
                "content",
                `O conteúdo contém palavras de baixo calão.`
            )
        }

        this.content = content;
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
            throw new InvalidReplyPropertyDomainException(
                'reply-domain-entity.ts',
                65,
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
            throw new InvalidReplyPropertyDomainException(
                'reply-domain-entity.ts',
                184,
                'updatedAt',
                'A data de atualização fornecida não é válida.'
            );
        }
        this.updatedAt = updatedAt;
    }

    private verifyIfContainsSwearsWords(str: string): boolean {

        const swearWords = ["caralho", "porra", "sexo", "piroca", "puta", "pinto", "buceta", "pênis", "cu"];

        const containsSwearWords: boolean = swearWords.some(swear => str.toLowerCase().split(' ').includes(swear));
        if (containsSwearWords) {
            return true
        }

        return false
    }
}
