import { ItemDomainEntity } from "@/domain/entities/contributions/item/item-domain-entity";
import { CreateItemInput, RestoreItemInput } from "@/domain/entities/contributions/item/types/item-entity-inputs";

export interface CreateNeededItemDomainServiceInput extends CreateItemInput { }
export interface CreateProvidedItemDomainServiceInput extends CreateItemInput { }

export interface RestoreItemDomainServiceInput extends RestoreItemInput { }

export interface UpdateItemDomainServiceInput {
    item: ItemDomainEntity;
    newItemData: {
        type: "need" | "provide";
        title: string;
        photo: string;
        donationValue: number;
        priority: "emergency" | "high" | "moderate" | "normal";
        category: string;
        amount: number;
    };
}

export interface setItemContributionDoneDomainServiceInput {
    item: ItemDomainEntity;
}

export interface DeleteItemDomainServiceInput {
    item: ItemDomainEntity;
}

 
 
 
