import { InvalidPublicationPropertyDomainException } from '@/domain/domain-exceptions/invalid-publication-property-domain-exception';
import { PublicationDomainEntity } from './publication-domain-entity';
import { CreatePublicationEntityInput, RestorePublicationEntityInput } from './types/publish-entity-inputs';
import { CommentEntity } from '../comments/types/comment-entity';
import { OrganizationEntity } from '../../organization/types/organization-entity';

describe("(UnityTest) - PublicationDomainEntity", () => {
    const validOrganization: Pick<OrganizationEntity, 'id' | 'name' | 'photo' | 'area'> = {
        id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
        name: "Valid Organization",
        photo: "https://example.com/photo.jpg",
        area: "Community Support",
    };

    const validContent = {
        subject: "Valid Subject",
        text: "This is a valid text for the publication."
    };

    const validCreateInput: CreatePublicationEntityInput = {
        organization: validOrganization,
        content: validContent
    };

    const validComment: CommentEntity = {
        id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
        organization: validOrganization,
        content: "Valid comment content",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        isEdited: false,
        replies: [],
        publish: {
            content: validContent
        }
    };

    const validRestoreInput: RestorePublicationEntityInput = {
        id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
        organization: validOrganization,
        content: validContent,
        comments: [validComment],
        isEdited: false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    it("(create) - Deve ser possível criar uma publicação se todos os dados forem válidos", () => {
        const publication = PublicationDomainEntity.create(validCreateInput);

        expect(publication).toBeTruthy();
        expect(publication).toBeInstanceOf(PublicationDomainEntity);
        expect(publication.getOrganization()).toEqual(validOrganization);
        expect(publication.getContent()).toEqual(validContent);
        expect(publication.getComments()).toEqual([]);
        expect(publication.getIsEdited()).toBe(false);
        expect(publication.getIsDeleted()).toBe(false);
    });

    it("(create [subject]) - Não deve ser possível criar uma publicação com assunto inválido", () => {
        const invalidInput = {
            ...validCreateInput,
            content: {
                ...validCreateInput.content,
                subject: ""
            }
        };

        expect(() => PublicationDomainEntity.create(invalidInput)).toThrow(
            new InvalidPublicationPropertyDomainException(
                'publication-domain-entity.ts',
                45,
                'content.subject',
                'O assunto deve ter entre 5 e 100 caracteres.'
            )
        );
    });

    it("(create [text]) - Não deve ser possível criar uma publicação com texto inválido", () => {
        const invalidInput = {
            ...validCreateInput,
            content: {
                ...validCreateInput.content,
                text: "short"
            }
        };

        expect(() => PublicationDomainEntity.create(invalidInput)).toThrow(
            new InvalidPublicationPropertyDomainException(
                'publication-domain-entity.ts',
                116,
                'content.text',
                'O texto deve ter entre 10 e 1000 caracteres.'
            )
        );
    });

    it("(restore) - Deve ser possível restaurar uma publicação se todos os dados forem válidos", () => {
        const publication = PublicationDomainEntity.restore(validRestoreInput);

        expect(publication).toBeTruthy();
        expect(publication).toBeInstanceOf(PublicationDomainEntity);
        expect(publication.getId()).toEqual(validRestoreInput.id);
        expect(publication.getOrganization()).toEqual(validRestoreInput.organization);
        expect(publication.getContent()).toEqual(validRestoreInput.content);
        expect(publication.getComments()).toEqual(validRestoreInput.comments);
        expect(publication.getIsEdited()).toBe(validRestoreInput.isEdited);
        expect(publication.getIsDeleted()).toBe(validRestoreInput.isDeleted);
        expect(publication.getCreatedAt()).toEqual(validRestoreInput.createdAt);
        expect(publication.getUpdatedAt()).toEqual(validRestoreInput.updatedAt);
    });

    it("(restore [id]) - Não deve ser possível restaurar uma publicação com id inválido", () => {
        const invalidRestoreInput = { ...validRestoreInput, id: "invalid-id" };

        expect(() => PublicationDomainEntity.restore(invalidRestoreInput)).toThrow(
            new InvalidPublicationPropertyDomainException(
                'publication-domain-entity.ts',
                25,
                'id',
                'O id da publicação não é válido.'
            )
        );
    });

    it("(restore [text]) - Não deve ser possível restaurar uma publicação com texto inválido", () => {
        const invalidRestoreInput = {
            ...validRestoreInput,
            content: {
                ...validRestoreInput.content,
                text: "short"
            }
        };

        expect(() => PublicationDomainEntity.restore(invalidRestoreInput)).toThrow(
            new InvalidPublicationPropertyDomainException(
                'publication-domain-entity.ts',
                116,
                'content.text',
                'O texto deve ter entre 10 e 1000 caracteres.'
            )
        );
    });

    it("(addComment) - Deve adicionar um comentário válido à publicação", () => {
        const publication = PublicationDomainEntity.create(validCreateInput);
        publication.addComment(validComment);

        expect(publication.getComments()).toEqual([validComment]);
    });

    it("(setIsEdited) - Deve alterar o estado de edição da publicação", () => {
        const publication = PublicationDomainEntity.create(validCreateInput);
        publication.setIsEdited(true);

        expect(publication.getIsEdited()).toBe(true);
    });

    it("(setIsDeleted) - Deve alterar o estado de exclusão da publicação", () => {
        const publication = PublicationDomainEntity.create(validCreateInput);
        publication.setIsDeleted(true);

        expect(publication.getIsDeleted()).toBe(true);
    });

    it("(setCreatedAt) - Deve alterar a data de criação caso seja válida", () => {
        const publication = PublicationDomainEntity.create(validCreateInput);
        const newDate = new Date();
        publication.setCreatedAt(newDate);

        expect(publication.getCreatedAt()).toEqual(newDate);
    });

    it("(setCreatedAt) - Não deve alterar a data de criação caso não seja válida", () => {
        const publication = PublicationDomainEntity.create(validCreateInput);

        expect(() => publication.setCreatedAt(new Date("invalid-date"))).toThrow(
            new InvalidPublicationPropertyDomainException(
                'publication-domain-entity.ts',
                60,
                'createdAt',
                'A data de criação fornecida não é válida.'
            )
        );
    });

    it("(setUpdatedAt) - Deve alterar a data de atualização caso seja válida", () => {
        const publication = PublicationDomainEntity.create(validCreateInput);
        const newDate = new Date();
        publication.setUpdatedAt(newDate);

        expect(publication.getUpdatedAt()).toEqual(newDate);
    });

    it("(setUpdatedAt) - Não deve alterar a data de atualização caso não seja válida", () => {
        const publication = PublicationDomainEntity.create(validCreateInput);

        expect(() => publication.setUpdatedAt(new Date("invalid-date"))).toThrow(
            new InvalidPublicationPropertyDomainException(
                'publication-domain-entity.ts',
                184,
                'updatedAt',
                'A data de atualização fornecida não é válida.'
            )
        );
    });
});
