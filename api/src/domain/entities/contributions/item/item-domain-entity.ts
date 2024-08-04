import { OrganizationEntity } from "../../organization/types/organization-entity";
import { ItemEntity } from "./types/item-entity";
import { InvalidItemPropertyDomainException } from "@/domain/domain-exceptions/invalid-item-property-domain-exception";
import { CreateItemInput, RestoreItemInput } from "./types/item-entity-inputs";


export class ItemDomainEntity implements ItemEntity {
    public id?: string;
    public type?: "need" | "provide";
    public title?: string;
    public photo?: string;
    public description?: string;
    public donationValue?: number;
    public priority?: "emergency" | "high" | "moderate" | "normal";
    public category?: string;
    public amount?: number;
    public organization?: Pick<OrganizationEntity, "id" | "name" | "photo" | "area">;
    public isDone?: boolean;
    public isDeleted?: boolean;
    public createdAt?: Date;
    public updatedAt?: Date;

    private constructor() { }

    static create(input: CreateItemInput): ItemDomainEntity {
        const item = new ItemDomainEntity();

        item.setId(crypto.randomUUID());
        item.setType(input.type);
        item.setTitle(input.title);
        item.setPhoto(input.photo);
        item.setDescription(input.description);
        item.setDonationValue(input.donationValue);
        item.setPriority(input.priority);
        item.setCategory(input.category);
        item.setAmount(input.amount);
        item.setOrganization(input.organization);
        item.setIsDone(false);
        item.setIsDeleted(false);
        item.setCreatedAt(new Date());
        item.setUpdatedAt(new Date());

        return item;
    }

    static restore(input: RestoreItemInput): ItemDomainEntity {
        const item = new ItemDomainEntity();

        item.setId(input.id);
        item.setType(input.type);
        item.setTitle(input.title);
        item.setPhoto(input.photo);
        item.setDescription(input.description);
        item.setDonationValue(input.donationValue);
        item.setPriority(input.priority);
        item.setCategory(input.category);
        item.setAmount(input.amount);
        item.setOrganization(input.organization);
        item.setIsDone(input.isDone);
        item.setIsDeleted(input.isDeleted);
        item.setCreatedAt(input.createdAt);
        item.setUpdatedAt(input.updatedAt);

        return item;
    }


    public getId(): string | undefined {
        return this.id;
    }

    public setId(id: string): void {
        const validIdCharacters = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!validIdCharacters.test(id)) {
            throw new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                25,
                'id',
                'O id do item não é válido.'
            );
        }
        this.id = id;
    }

    public getType(): "need" | "provide" | undefined {
        return this.type;
    }

    public setType(type: "need" | "provide"): void {
        if (!type || (type !== "need" && type !== "provide")) {
            throw new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                25,
                'type',
                'O tipo do item deve ser "need" ou "provide".'
            );
        }
        this.type = type;
    }

    public getTitle(): string | undefined {
        return this.title;
    }

    public setTitle(title: string): void {
        if (!title || title.length < 3 || title.length > 100) {
            throw new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                35,
                'title',
                'O título deve ter entre 3 e 100 caracteres.'
            );
        }
        this.title = title;
    }

    public getPhoto(): string | undefined {
        return this.photo;
    }

    public setPhoto(photo: string): void {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
        if (photo && !urlPattern.test(photo)) {
            throw new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                45,
                'photo',
                'A URL da foto fornecida não é válida.'
            );
        }
        this.photo = photo;
    }

    public getDescription(): string | undefined {
        return this.description;
    }

    public setDescription(description: string): void {
        if (description && (description.length < 10 || description.length > 1000)) {
            throw new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                55,
                'description',
                'A descrição deve ter entre 10 e 1000 caracteres.'
            );
        }
        this.description = description;
    }

    public getDonationValue(): number | undefined {
        return this.donationValue;
    }

    public setDonationValue(donationValue: number): void {
        if (donationValue && donationValue < 0) {
            throw new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                65,
                'donationValue',
                'O valor da doação deve ser um número positivo.'
            );
        }
        this.donationValue = donationValue;
    }

    public getPriority(): "emergency" | "high" | "moderate" | "normal" | undefined {
        return this.priority;
    }

    public setPriority(priority: "emergency" | "high" | "moderate" | "normal"): void {
        if (!priority || !["emergency", "high", "moderate", "normal"].includes(priority)) {
            throw new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                75,
                'priority',
                'A prioridade deve ser "emergency", "high", "moderate" ou "normal".'
            );
        }
        this.priority = priority;
    }

    public getCategory(): string | undefined {
        return this.category;
    }

    public setCategory(category: string): void {
        if (category && (category.length < 3 || category.length > 100)) {
            throw new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                85,
                'category',
                'A categoria deve ter entre 3 e 100 caracteres.'
            );
        }
        this.category = category;
    }

    public getAmount(): number | undefined {
        return this.amount;
    }

    public setAmount(amount: number): void {
        if (amount && amount < 0) {
            throw new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                95,
                'amount',
                'A quantidade deve ser um número positivo.'
            );
        }
        this.amount = amount;
    }

    public getOrganization(): Pick<OrganizationEntity, "id" | "name" | "photo" | "area"> | undefined {
        return this.organization;
    }

    public setOrganization(organization: Pick<OrganizationEntity, "id" | "name" | "photo" | "area">): void {
        if (!organization.id) {
            throw new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                105,
                'organization.id',
                'O id da organização não pode ser vazio.'
            );
        }
        this.organization = organization;
    }

    public getIsDone(): boolean | undefined {
        return this.isDone;
    }

    public setIsDone(isDone: boolean): void {
        this.isDone = isDone;
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
            throw new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                115,
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
            throw new InvalidItemPropertyDomainException(
                'item-domain-entity.ts',
                125,
                'updatedAt',
                'A data de atualização fornecida não é válida.'
            );
        }
        this.updatedAt = updatedAt;
    }
}
