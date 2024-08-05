import { InvalidPublicationPropertyDomainException } from '@/domain/domain-exceptions/invalid-publication-property-domain-exception';
import { PublicationEntity } from '@/domain/entities/community-content/publications/types/publish-entity';
import { CommentEntity } from '../comments/types/comment-entity';
import { OrganizationEntity } from '../../organization/types/organization-entity';
import { CreatePublicationEntityInput, RestorePublicationEntityInput } from './types/publish-entity-inputs';


export class PublicationDomainEntity implements PublicationEntity {
    public id?: string;
    public organization?: Pick<OrganizationEntity, 'id' | 'name' | 'photo' | 'area'>;
    public content?: {
        subject: string;
        text: string;
    };
    public comments?: CommentEntity[];
    public isEdited?: boolean;
    public isDeleted?: boolean;
    public createdAt?: Date;
    public updatedAt?: Date;

    private constructor() { }

    static create(input: CreatePublicationEntityInput): PublicationDomainEntity {
        
        const publication = new PublicationDomainEntity();

        publication.setId(crypto.randomUUID());
        publication.setOrganization(input.organization);
        publication.setContent(input.content);
        publication.setComments([]);
        publication.setIsEdited(false);
        publication.setIsDeleted(false);
        publication.setCreatedAt(new Date());
        publication.setUpdatedAt(new Date());
        return publication;
    }

    static restore(input: RestorePublicationEntityInput): PublicationDomainEntity {

        const publication = new PublicationDomainEntity();

        publication.setId(input.id);
        publication.setOrganization(input.organization);
        publication.setContent(input.content);
        publication.setComments(input.comments);
        publication.setIsEdited(input.isEdited);
        publication.setIsDeleted(input.isDeleted);
        publication.setCreatedAt(input.createdAt);
        publication.setUpdatedAt(input.updatedAt);
        return publication;
    }

    public getId(): string | undefined {
        return this.id;
    }

    public setId(id: string): void {
        const validIdCharacters = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!validIdCharacters.test(id)) {
            throw new InvalidPublicationPropertyDomainException(
                'publication-domain-entity.ts',
                25,
                'id',
                'O id da publicação não é válido.'
            );
        }
        this.id = id;
    }

    public getOrganization(): Pick<OrganizationEntity, 'id' | 'name' | 'photo' | 'area'> | undefined {
        return this.organization;
    }

    public setOrganization(organization: Pick<OrganizationEntity, 'id' | 'name' | 'photo' | 'area'>): void {
        if (!organization.id) {
            throw new InvalidPublicationPropertyDomainException(
                'publication-domain-entity.ts',
                35,
                'organization.id',
                'O id da organização não pode ser vazio.'
            );
        }
        this.organization = organization;
    }

    public getContent(): { subject: string; text: string } | undefined {
        return this.content;
    }

    public setContent(content: { subject: string; text: string }): void {
        if (!content.subject || content.subject.length < 5 || content.subject.length > 100) {
            throw new InvalidPublicationPropertyDomainException(
                'publication-domain-entity.ts',
                45,
                'content.subject',
                'O assunto deve ter entre 5 e 100 caracteres.'
            );
        }

        if (!content.text || content.text.length < 10 || content.text.length > 1000) {
            throw new InvalidPublicationPropertyDomainException(
                'publication-domain-entity.ts',
                116,
                'content.text',
                'O texto deve ter entre 10 e 1000 caracteres.'
            );
        }


        if (this.verifyIfContainsSwearsWords(content.text.toLowerCase())) {
            throw new InvalidPublicationPropertyDomainException(
                "trail-base-entity.ts",
                126,
                "text",
                `O texto da publicação contém palavras de baixo calão.`
            )
        }


        this.content = content;
    }

    public getComments(): CommentEntity[] | undefined {
        return this.comments;
    }

    public setComments(comments: CommentEntity[]): void {
        this.comments = comments;
    }

    public getIsEdited(): boolean | undefined {
        return this.isEdited;
    }

    public setIsEdited(isEdited: boolean): void {
        this.isEdited = isEdited;
    }

    public getIsDeleted(): boolean | undefined {
        return this.isDeleted;
    }

    public setIsDeleted(isDeleted: boolean): void {
        this.isDeleted = isDeleted;
    }

    public getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: Date): void {
        if (!(createdAt instanceof Date) || isNaN(createdAt.getTime())) {
            throw new InvalidPublicationPropertyDomainException(
                'publication-domain-entity.ts',
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
            throw new InvalidPublicationPropertyDomainException(
                'publication-domain-entity.ts',
                184,
                'updatedAt',
                'A data de atualização fornecida não é válida.'
            );
        }
        this.updatedAt = updatedAt;
    }

    public addComment(comment: CommentEntity): void {
        if (!this.comments) {
            this.comments = [];
        }
        this.comments.push(comment);
    }

    private verifyIfContainsSwearsWords(str: string): boolean {
        const swearWords = ['caralho', 'porra', 'sexo', 'piroca', 'puta', 'pinto', 'buceta', 'pênis', 'cu'];
        return swearWords.some((swear) => str.toLowerCase().includes(swear));
    }
}
