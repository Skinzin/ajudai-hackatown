import { ContributionsDomainService } from './contributions-domain-service';
import { ItemDomainEntity } from '@/domain/entities/contributions/item/item-domain-entity';
import { InvalidDomainServiceInputException } from '@/domain/domain-exceptions/invalid-domain-service-input-exception';
import { 
    CreateNeededItemDomainServiceInput, 
    CreateProvidedItemDomainServiceInput, 
    RestoreItemDomainServiceInput, 
    UpdateItemDomainServiceInput, 
    setItemContributionDoneDomainServiceInput, 
    DeleteItemDomainServiceInput 
} from './types/contributions-domain-service-inputs';

describe('(Unit Test) ContributionsDomainService', () => {
    const contributionsDomainService = new ContributionsDomainService();

    const validNeededItemInput: CreateNeededItemDomainServiceInput = {
        type: "need",
        title: "Food Donation",
        photo: "https://example.com/photo.jpg",
        description: "Need food donations for the community",
        donationValue: 100,
        priority: "high",
        category: "Food",
        amount: 50,
        organization: {
            id: "organization-id",
            name: "Organization Name",
            photo: "https://example.com/photo.jpg",
            area: "Community Support"
        }
    };

    const validProvidedItemInput: CreateProvidedItemDomainServiceInput = {
        type: "provide",
        title: "Clothing Donation",
        photo: "https://example.com/photo.jpg",
        description: "Provide clothing donations for the community",
        donationValue: 200,
        priority: "moderate",
        category: "Clothing",
        amount: 100,
        organization: {
            id: "organization-id",
            name: "Organization Name",
            photo: "https://example.com/photo.jpg",
            area: "Community Support"
        }
    };

    const validRestoreItemInput: RestoreItemDomainServiceInput = {
        id: "85c5d1e0-d8d5-4f5c-b7a8-c6a1f7f2b3f3",
        type: "need",
        title: "Restored Item",
        photo: "https://example.com/photo.jpg",
        description: "Restored item description",
        donationValue: 150,
        priority: "normal",
        category: "Restored Category",
        amount: 75,
        organization: {
            id: "organization-id",
            name: "Organization Name",
            photo: "https://example.com/photo.jpg",
            area: "Community Support"
        },
        isDone: false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const validItemEntity = ItemDomainEntity.create(validNeededItemInput);

    it('(createNeededItem) - Deve ser possível criar um item de necessidade se todos os dados forem válidos', () => {
        const item = contributionsDomainService.createNeededItem(validNeededItemInput);
        expect(item).toBeInstanceOf(ItemDomainEntity);
    });

    it('(createNeededItem) - Não deve ser possível criar um item de necessidade com tipo inválido', () => {
        const invalidInput = { ...validNeededItemInput };
        invalidInput.type = "provide";

        expect(() => contributionsDomainService.createNeededItem(invalidInput)).toThrow(
            new InvalidDomainServiceInputException(
                "contributions-domain-service.ts",
                "createNeededItem",
                12,
                "type",
                "O tipo do item deve ser 'need' para criar um item de necessidade."
            )
        );
    });

    it('(createProvidedItem) - Deve ser possível criar um item de doação se todos os dados forem válidos', () => {
        const item = contributionsDomainService.createProvidedItem(validProvidedItemInput);
        expect(item).toBeInstanceOf(ItemDomainEntity);
    });

    it('(createProvidedItem) - Não deve ser possível criar um item de doação com tipo inválido', () => {
        const invalidInput = { ...validProvidedItemInput};
        invalidInput.type = "need";

        expect(() => contributionsDomainService.createProvidedItem(invalidInput)).toThrow(
            new InvalidDomainServiceInputException(
                "contributions-domain-service.ts",
                "createProvidedItem",
                12,
                "type",
                "O tipo do item deve ser 'provide' para criar um item de doação."
            )
        );
    });

    it('(restoreItem) - Deve ser possível restaurar um item se todos os dados forem válidos', () => {
        const item = contributionsDomainService.restoreItem(validRestoreItemInput);
        expect(item).toBeInstanceOf(ItemDomainEntity);
    });

    it('(updateItem) - Deve ser possível atualizar um item se todos os dados forem válidos', () => {
        const newItemData: UpdateItemDomainServiceInput["newItemData"] = {
            type: "need",
            title: "Updated Item",
            photo: "https://example.com/newphoto.jpg",
            donationValue: 200,
            priority: "emergency",
            category: "Updated Category",
            amount: 100
        };

        const input: UpdateItemDomainServiceInput = {
            item: validItemEntity,
            newItemData
        };

        const updatedItem = contributionsDomainService.updateItem(input);
        expect(updatedItem.getTitle()).toBe("Updated Item");
        expect(updatedItem.getPhoto()).toBe("https://example.com/newphoto.jpg");
    });

    it('(updateItem) - Não deve ser possível atualizar um item que já foi contribuído', () => {
        validItemEntity.setIsDone(true);

        // melhorar isso dps.
        const newItemData: UpdateItemDomainServiceInput["newItemData"] = {
            type: "need",
            title: "Updated Item",
            photo: "https://example.com/newphoto.jpg",
            donationValue: 200,
            priority: "emergency",
            category: "Updated Category",
            amount: 100

        };

        const input: UpdateItemDomainServiceInput = {
            item: validItemEntity,
            newItemData
        };

        expect(() => contributionsDomainService.updateItem(input)).toThrow(
            new InvalidDomainServiceInputException(
                "contributions-domain-service.ts",
                "updateNeededItem",
                47,
                "type",
                "Não é possível atualizar um item que já foi contribuído."
            )
        );
    });

    it('(setItemContributionDone) - Deve ser possível marcar um item como contribuído', () => {
        const input: setItemContributionDoneDomainServiceInput = {
            item: validItemEntity
        };

        const doneItem = contributionsDomainService.setItemContributionDone(input);
        expect(doneItem.getIsDone()).toBe(true);
    });

    it('(deleteNeededItem) - Deve ser possível marcar um item de necessidade como deletado', () => {
        const input: DeleteItemDomainServiceInput = {
            item: validItemEntity
        };

        const deletedItem = contributionsDomainService.deleteNeededItem(input);
        expect(deletedItem.getIsDeleted()).toBe(true);
    });
});
