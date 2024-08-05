import { ItemDomainEntity } from "../entities/contributions/item/item-domain-entity";


export interface ContributionsRepository {
    findById(itemId: string): Promise<ItemDomainEntity | null>;
    save(item: ItemDomainEntity): Promise<void>;
    delete(itemId: string): Promise<void>;
}