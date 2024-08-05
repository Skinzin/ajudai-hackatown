import { ContributionsRepository } from "@/domain/repositories/contributions-repository";
import { ItemDomainEntity } from "@/domain/entities/contributions/item/item-domain-entity";
import { InvalidItemPropertyDomainException } from "@/domain/domain-exceptions/invalid-item-property-domain-exception";

export class InMemoryContributionsDatabase implements ContributionsRepository {
    private items: ItemDomainEntity[] = [];

    async findById(itemId: string): Promise<ItemDomainEntity | null> {
        const item = this.items.find(item => item.getId() === itemId);
        return item ? this.mapToDomainItem(item) : null;
    }

    async save(item: ItemDomainEntity): Promise<void> {
        const index = this.items.findIndex(i => i.getId() === item.getId());
        if (index === -1) {
            this.items.push(item);
        } else {
            this.items[index] = item;
        }
    }

    async delete(itemId: string): Promise<void> {
        this.items = this.items.filter(item => item.getId() !== itemId);
    }

    private mapToDomainItem(entity: ItemDomainEntity): ItemDomainEntity {
        return ItemDomainEntity.restore({
            id: entity.getId()!,
            type: entity.getType()!,
      
            title: entity.getTitle()!,
            photo: entity.getPhoto()!,
            donationValue: entity.getDonationValue()!,
            priority: entity.getPriority()!,
            category: entity.getCategory()!,
            amount: entity.getAmount()!,
            organization: entity.getOrganization()!,
            isDone: entity.getIsDone()!,
            isDeleted: entity.getIsDeleted()!,
            createdAt: entity.getCreatedAt()!,
            updatedAt: entity.getUpdatedAt()!
        });
    }
}
