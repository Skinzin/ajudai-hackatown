import { ItemDomainEntity } from "@/domain/entities/contributions/item/item-domain-entity";
import { CreateNeededItemDomainServiceInput, UpdateItemDomainServiceInput, setItemContributionDoneDomainServiceInput, DeleteItemDomainServiceInput, RestoreItemDomainServiceInput, CreateProvidedItemDomainServiceInput } from "./types/contributions-domain-service-inputs";
import { InvalidDomainServiceInputException } from "@/domain/domain-exceptions/invalid-domain-service-input-exception";

export class ContributionsDomainService {
    constructor() { }

    createNeededItem(input: CreateNeededItemDomainServiceInput) {
        const typeItem = input.type;
        if (typeItem !== "need") {
            throw new InvalidDomainServiceInputException(
                "contributions-domain-service.ts",
                "createNeededItem",
                12,
                "type",
                "O tipo do item deve ser 'need' para criar um item de necessidade."
            );
        }

        return ItemDomainEntity.create(input);
    }

    createProvidedItem(input: CreateProvidedItemDomainServiceInput) {
        const typeItem = input.type;
        if (typeItem !== "provide") {
            throw new InvalidDomainServiceInputException(
                "contributions-domain-service.ts",
                "createProvidedItem",
                12,
                "type",
                "O tipo do item deve ser 'provide' para criar um item de doação."
            );
        }

        return ItemDomainEntity.create(input);
    }

    restoreItem(input: RestoreItemDomainServiceInput) {
        return ItemDomainEntity.restore(input);
    }


    updateItem(input: UpdateItemDomainServiceInput) {
        const { item, newItemData } = input;

        const itemContributionIsDone = item.getIsDone();
        if (itemContributionIsDone) {
            throw new InvalidDomainServiceInputException(
                "contributions-domain-service.ts",
                "updateNeededItem",
                47,
                "type",
                "Não é possível atualizar um item que já foi contribuído."
            );
        }

        if (item.getType() !== newItemData.type) {
            item.setType(newItemData.type);
        }

        if (item.getTitle() !== newItemData.title) {
            item.setTitle(newItemData.title);
        }

        if (item.getPhoto() !== newItemData.photo) {
            item.setPhoto(newItemData.photo);
        }

        if (item.getDonationValue() !== newItemData.donationValue) {
            item.setDonationValue(newItemData.donationValue);
        }

        if (item.getPriority() !== newItemData.priority) {
            item.setPriority(newItemData.priority);
        }

        if (item.getCategory() !== newItemData.category) {
            item.setCategory(newItemData.category);
        }

        if (item.getAmount() !== newItemData.amount) {
            item.setAmount(newItemData.amount);
        }

        item.setUpdatedAt(new Date());

        return item;
    }

    setItemContributionDone(input: setItemContributionDoneDomainServiceInput) {
        const { item } = input;

        item.setIsDone(true);
        item.setUpdatedAt(new Date());

        return item;
    }

    deleteNeededItem(input: DeleteItemDomainServiceInput) {
        const { item } = input;

        item.setIsDeleted(true);
        item.setUpdatedAt(new Date());

        return item;
    }

}