import { OrganizationEntity } from "../../organization/types/organization-entity";
import { ReplyDomainEntity } from "./reply-domain-entity";
import { InvalidReplyPropertyDomainException } from "@/domain/domain-exceptions/invalid-reply-property-domain-exception";
import { CreateReplyInput, RestoreReplyInput } from "./types/reply-entity-inputs";

describe("(UnityTest) - ReplyDomainEntity", () => {
    const validOrganization: Pick<OrganizationEntity, "id" | "name" | "photo" | "area"> = {
        id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
        name: "Valid Organization",
        photo: "https://example.com/photo.jpg",
        area: "Community Support",
    };

    const validComment = {
        id: "valid-comment-id",
        subject: "Valid Comment Subject"
    };

    const validContent = "This is a valid content for a reply.";

    const validCreateInput: CreateReplyInput = {
        comment: validComment,
        organization: validOrganization,
        content: validContent
    };

    const validRestoreInput: RestoreReplyInput = {
        id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
        comment: validComment,
        organization: validOrganization,
        content: validContent,
        isDeleted: false,
        isEdited: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    it("(create) - Deve ser possível criar uma resposta se todos os dados forem válidos", () => {
        const reply = ReplyDomainEntity.create(validCreateInput);

        expect(reply).toBeTruthy();
        expect(reply).toBeInstanceOf(ReplyDomainEntity);
        expect(reply.getComment()).toEqual(validCreateInput.comment);
        expect(reply.getOrganization()).toEqual(validCreateInput.organization);
        expect(reply.getContent()).toEqual(validCreateInput.content);
        expect(reply.getIsDeleted()).toBe(false);
        expect(reply.getIsEdited()).toBe(false);
        expect(reply.getCreatedAt()).toBeInstanceOf(Date);
        expect(reply.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it("(create [content]) - Não deve ser possível criar uma resposta com conteúdo inválido", () => {
        const invalidInput: RestoreReplyInput = {
            ...validCreateInput,

            id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
            createdAt: new Date(),
            isDeleted: false,
            isEdited: false,
            updatedAt: new Date(),
            comment: {
                id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
                subject: "subject",

            },
            content: ""
        };

        expect(() => ReplyDomainEntity.create(invalidInput)).toThrow(
            new InvalidReplyPropertyDomainException(
                'reply-domain-entity.ts',
                114,
                'content',
                'O conteúdo não pode ser vazia!'
            )
        );
    });

    it("(restore) - Deve ser possível restaurar uma resposta se todos os dados forem válidos", () => {
        const reply = ReplyDomainEntity.restore(validRestoreInput);

        expect(reply).toBeTruthy();
        expect(reply).toBeInstanceOf(ReplyDomainEntity);
        expect(reply.getId()).toEqual(validRestoreInput.id);
        expect(reply.getComment()).toEqual(validRestoreInput.comment);
        expect(reply.getOrganization()).toEqual(validRestoreInput.organization);
        expect(reply.getContent()).toEqual(validRestoreInput.content);
        expect(reply.getIsDeleted()).toEqual(validRestoreInput.isDeleted);
        expect(reply.getIsEdited()).toEqual(validRestoreInput.isEdited);
        expect(reply.getCreatedAt()).toEqual(validRestoreInput.createdAt);
        expect(reply.getUpdatedAt()).toEqual(validRestoreInput.updatedAt);
    });

    it("(restore [id]) - Não deve ser possível restaurar uma resposta com id inválido", () => {
        const invalidRestoreInput = { ...validRestoreInput, id: "invalid-id" };

        expect(() => ReplyDomainEntity.restore(invalidRestoreInput)).toThrow(
            new InvalidReplyPropertyDomainException(
                'reply-domain-entity.ts',
                60,
                'id',
                'O id da resposta não é válido.'
            )
        );
    });

    it("(setContent) - Deve alterar o conteúdo caso seja válido", () => {
        const reply = ReplyDomainEntity.create(validCreateInput);
        const newContent = "This is a new valid content for the reply.";
        reply.setContent(newContent);

        expect(reply.getContent()).toEqual(newContent);
    });

    it("(setContent) - Não deve alterar o conteúdo caso não seja válido", () => {
        const reply = ReplyDomainEntity.create(validCreateInput);

        expect(() => reply.setContent("")).toThrow(
            new InvalidReplyPropertyDomainException(
                'reply-domain-entity.ts',
                114,
                'content',
                'O conteúdo não pode ser vazia!'
            )
        );
    });

    it("(setCreatedAt) - Deve alterar a data de criação caso seja válida", () => {
        const reply = ReplyDomainEntity.create(validCreateInput);
        const newDate = new Date();
        reply.setCreatedAt(newDate);

        expect(reply.getCreatedAt()).toEqual(newDate);
    });

    it("(setCreatedAt) - Não deve alterar a data de criação caso não seja válida", () => {
        const reply = ReplyDomainEntity.create(validCreateInput);

        expect(() => reply.setCreatedAt(new Date("invalid-date"))).toThrow(
            new InvalidReplyPropertyDomainException(
                'reply-domain-entity.ts',
                65,
                'createdAt',
                'A data de criação fornecida não é válida.'
            )
        );
    });

    it("(setUpdatedAt) - Deve alterar a data de atualização caso seja válida", () => {
        const reply = ReplyDomainEntity.create(validCreateInput);
        const newDate = new Date();
        reply.setUpdatedAt(newDate);

        expect(reply.getUpdatedAt()).toEqual(newDate);
    });

    it("(setUpdatedAt) - Não deve alterar a data de atualização caso não seja válida", () => {
        const reply = ReplyDomainEntity.create(validCreateInput);

        expect(() => reply.setUpdatedAt(new Date("invalid-date"))).toThrow(
            new InvalidReplyPropertyDomainException(
                'reply-domain-entity.ts',
                184,
                'updatedAt',
                'A data de atualização fornecida não é válida.'
            )
        );
    });

    it("(setIsEdited) - Deve alterar o estado de edição da resposta", () => {
        const reply = ReplyDomainEntity.create(validCreateInput);
        reply.setIsEdited(true);

        expect(reply.getIsEdited()).toBe(true);
    });

    it("(setIsDeleted) - Deve alterar o estado de exclusão da resposta", () => {
        const reply = ReplyDomainEntity.create(validCreateInput);
        reply.setIsDeleted(true);

        expect(reply.getIsDeleted()).toBe(true);
    });
});
