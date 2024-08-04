import { ItemDomainEntity } from "./item-domain-entity";
import { InvalidItemPropertyDomainException } from "@/domain/domain-exceptions/invalid-item-property-domain-exception";
import { CreateItemInput, RestoreItemInput } from "./types/item-entity-inputs";
import { OrganizationEntity } from "../../organization/types/organization-entity";

describe("(UnityTest) - ItemDomainEntity", () => {
    const validOrganization: Pick<OrganizationEntity, "id" | "name" | "photo" | "area"> = {
        id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
        name: "Valid Organization",
        photo: "https://example.com/photo.jpg",
        area: "Community Support",
    };

    const validCreateInput: CreateItemInput = {
        type: "need",
        title: "Valid Title",
        photo: "https://example.com/photo.jpg",
        description: "This is a valid description for the item.",
        donationValue: 100,
        priority: "high",
        category: "food",
        amount: 10,
        organization: validOrganization,
    };

    const validRestoreInput: RestoreItemInput = {
        id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
        type: "provide",
        title: "Valid Title",
        photo: "https://example.com/photo.jpg",
        description: "This is a valid description for the item.",
        donationValue: 50,
        priority: "moderate",
        category: "clothes",
        amount: 5,
        organization: validOrganization,
        isDone: false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    it("(create) - Deve ser possível criar um item se todos os dados forem válidos", () => {
        const item = ItemDomainEntity.create(validCreateInput);

        expect(item).toBeTruthy();
        expect(item).toBeInstanceOf(ItemDomainEntity);
        expect(item.getType()).toEqual(validCreateInput.type);
        expect(item.getTitle()).toEqual(validCreateInput.title);
        expect(item.getPhoto()).toEqual(validCreateInput.photo);
     
        expect(item.getDonationValue()).toEqual(validCreateInput.donationValue);
        expect(item.getPriority()).toEqual(validCreateInput.priority);
        expect(item.getCategory()).toEqual(validCreateInput.category);
        expect(item.getAmount()).toEqual(validCreateInput.amount);
        expect(item.getOrganization()).toEqual(validCreateInput.organization);
        expect(item.getIsDone()).toBe(false);
        expect(item.getIsDeleted()).toBe(false);
        expect(item.getCreatedAt()).toBeInstanceOf(Date);
        expect(item.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it("(restore) - Deve ser possível restaurar um item se todos os dados forem válidos", () => {
        const item = ItemDomainEntity.restore(validRestoreInput);

        expect(item).toBeTruthy();
        expect(item).toBeInstanceOf(ItemDomainEntity);
        expect(item.getId()).toEqual(validRestoreInput.id);
        expect(item.getType()).toEqual(validRestoreInput.type);
        expect(item.getTitle()).toEqual(validRestoreInput.title);
        expect(item.getPhoto()).toEqual(validRestoreInput.photo);
 
        expect(item.getDonationValue()).toEqual(validRestoreInput.donationValue);
        expect(item.getPriority()).toEqual(validRestoreInput.priority);
        expect(item.getCategory()).toEqual(validRestoreInput.category);
        expect(item.getAmount()).toEqual(validRestoreInput.amount);
        expect(item.getOrganization()).toEqual(validRestoreInput.organization);
        expect(item.getIsDone()).toBe(validRestoreInput.isDone);
        expect(item.getIsDeleted()).toBe(validRestoreInput.isDeleted);
        expect(item.getCreatedAt()).toEqual(validRestoreInput.createdAt);
        expect(item.getUpdatedAt()).toEqual(validRestoreInput.updatedAt);
    });

    it("(restore [id]) - Não deve ser possível restaurar um item com id inválido", () => {
        const invalidRestoreInput = { ...validRestoreInput, id: "invalid-id" };

        expect(() => ItemDomainEntity.restore(invalidRestoreInput)).toThrow(
            new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                25,
                'id',
                'O id do item não é válido.'
            )
        );
    });

    it("(setTitle) - Deve alterar o título caso seja válido", () => {
        const item = ItemDomainEntity.create(validCreateInput);
        item.setTitle("New Valid Title");

        expect(item.getTitle()).toEqual("New Valid Title");
    });

    it("(setTitle) - Não deve alterar o título caso não seja válido", () => {
        const item = ItemDomainEntity.create(validCreateInput);

        expect(() => item.setTitle("")).toThrow(
            new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                35,
                'title',
                'O título deve ter entre 3 e 100 caracteres.'
            )
        );
    });

    it("(setPhoto) - Deve alterar a URL da foto caso seja válida", () => {
        const item = ItemDomainEntity.create(validCreateInput);
        item.setPhoto("https://example.com/newphoto.jpg");

        expect(item.getPhoto()).toEqual("https://example.com/newphoto.jpg");
    });

    it("(setPhoto) - Não deve alterar a URL da foto caso não seja válida", () => {
        const item = ItemDomainEntity.create(validCreateInput);

        expect(() => item.setPhoto("invalid-url")).toThrow(
            new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                45,
                'photo',
                'A URL da foto fornecida não é válida.'
            )
        );
    });

    it("(setCreatedAt) - Deve alterar a data de criação caso seja válida", () => {
        const item = ItemDomainEntity.create(validCreateInput);
        const newDate = new Date();
        item.setCreatedAt(newDate);

        expect(item.getCreatedAt()).toEqual(newDate);
    });

    it("(setCreatedAt) - Não deve alterar a data de criação caso não seja válida", () => {
        const item = ItemDomainEntity.create(validCreateInput);

        expect(() => item.setCreatedAt(new Date("invalid-date"))).toThrow(
            new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                115,
                'createdAt',
                'A data de criação fornecida não é válida.'
            )
        );
    });

    it("(setUpdatedAt) - Deve alterar a data de atualização caso seja válida", () => {
        const item = ItemDomainEntity.create(validCreateInput);
        const newDate = new Date();
        item.setUpdatedAt(newDate);

        expect(item.getUpdatedAt()).toEqual(newDate);
    });

    it("(setUpdatedAt) - Não deve alterar a data de atualização caso não seja válida", () => {
        const item = ItemDomainEntity.create(validCreateInput);

        expect(() => item.setUpdatedAt(new Date("invalid-date"))).toThrow(
            new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                125,
                'updatedAt',
                'A data de atualização fornecida não é válida.'
            )
        );
    });
});
