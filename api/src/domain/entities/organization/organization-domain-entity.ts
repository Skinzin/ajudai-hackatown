import { InvalidOrganizationPropetyDomainException } from "../../domain-exceptions/invalid-organization-propety-domain-exception";
import { CommentDomainEntity } from "../community-content/comments/comment-domain-entity";
import { PublicationDomainEntity } from "../community-content/publications/publication-domain-entity";
import { ReplyDomainEntity } from "../community-content/replies/reply-domain-entity";
import { ItemDomainEntity } from "../contributions/item/item-domain-entity";
import { AddressValueObject } from "../value-objects/address-value-object";
import { EmptySocialNetworkValueObject } from "../value-objects/empty-social-network-value-object";
import { FacebookSocialNetworkValueObject } from "../value-objects/facebook-value-object";
import { InstagramSocialNetworkValueObject } from "../value-objects/instragram-social-network-value-object";
import { LinkedinSocialNetworkValueObject } from "../value-objects/linkedin-social-network-value-object";
import { PhoneValueObject } from "../value-objects/phone-value-object";
import { SocialNetworkValueObject } from "../value-objects/social-networking-value-object";
import { TwitterSocialNetworkValueObject } from "../value-objects/twitter-value-network-value-object";
import { CreateOrganizationInput, RestoreOrganizationInput } from "./types/organization-domain-entity-inputs";


export class OrganizationDomainEntity {

    private id?: string;
    private name?: string;
    private about?: string;
    private description?: string;
    private Address?: AddressValueObject;

    private area?: string;
    private email?: string;
    private password?: string;

    private phone?: PhoneValueObject;
    private photo?: string;

    private interations?: {
        publications: PublicationDomainEntity[];
        comments: CommentDomainEntity[];
        replies: ReplyDomainEntity[];
    };

    private items?: {
        needs: ItemDomainEntity[];
        provide: ItemDomainEntity[];
    };

    private social?: {
        linkedin: SocialNetworkValueObject<LinkedinSocialNetworkValueObject> | EmptySocialNetworkValueObject,
        instagram: SocialNetworkValueObject<InstagramSocialNetworkValueObject> | EmptySocialNetworkValueObject,
        twitter: SocialNetworkValueObject<TwitterSocialNetworkValueObject> | EmptySocialNetworkValueObject,
        facebook: SocialNetworkValueObject<FacebookSocialNetworkValueObject> | EmptySocialNetworkValueObject,
    }

    private isNeedSomeItems?: boolean;
    private isNeedVoluntarys?: boolean;
    private isProvideSomeItems?: boolean;
    private isActive?: boolean;

    private createdAt?: Date;
    private updatedAt?: Date;

    private constructor() { }

    public addInteraction(interaction: PublicationDomainEntity | CommentDomainEntity | ReplyDomainEntity) {

        if (interaction instanceof PublicationDomainEntity) {
            this.addPublicationInteraction(interaction);
        }

        if (interaction instanceof CommentDomainEntity) {
            this.addCommentInteraction(interaction);
        }

        if (interaction instanceof ReplyDomainEntity) {
            this.addReplyInteraction(interaction);
        }
    }

    private addPublicationInteraction(publication: PublicationDomainEntity): void {
        if (!publication.organization) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                255,
                "interations.publications",
                "A publicação não pode ser vazia."
            );
        }

        if (!publication.organization.id || publication.organization.id !== this.id) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                245,
                "interations.publications",
                "O id presente na publicação não corresponde ao id da organização."
            );
        }

        this.interations!.publications.push(publication);
    }

    private addCommentInteraction(comment: CommentDomainEntity): void {
        if (!comment.organization) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                255,
                "interations.comments",
                "O comentário não pode ser vazio."
            );
        }

        if (!comment.organization.id || comment.organization.id !== this.id) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                255,
                "interations.comments",
                "O id presente no comentário não corresponde ao id da organização."
            );
        }

        this.interations!.comments.push(comment);
    }

    private addReplyInteraction(reply: ReplyDomainEntity): void {
        if (!reply.organization) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                265,
                "interations.replies",
                "A resposta não pode ser vazia."
            );
        }

        if (!reply.organization.id || reply.organization.id !== this.id) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                265,
                "interations.replies",
                "O id presente na resposta não corresponde ao id da organização."
            );
        }

        this.interations!.replies.push(reply);
    }


    static create(input: CreateOrganizationInput): OrganizationDomainEntity {

        const organization = new OrganizationDomainEntity();

        organization.setId(crypto.randomUUID())

        organization.setName(input.name);
        organization.setArea(input.area);
        organization.setAbout(input.about);
        organization.setEmail(input.email);
        organization.setPassword(input.password);
        organization.setAddress(input.address);
        organization.setPhone(input.phone);
        organization.setPhoto(input.photo);
        organization.setSocial(input.social);

        organization.setIsNeedSomeItems(false);
        organization.setIsNeedVoluntarys(false);
        organization.setIsProvideSomeItems(false);
        organization.setIsActive(true);

        organization.setInterations({
            publications: [],
            comments: [],
            replies: [],
        });

        organization.setItems({
            needs: [],
            provide: [],
        });

        organization.setCreatedAt(new Date());
        organization.setUpdatedAt(new Date());


        return organization
    }

    static restore(input: RestoreOrganizationInput): OrganizationDomainEntity {
        const organization = new OrganizationDomainEntity();

        organization.setId(input.id);
        organization.setName(input.name);
        organization.setArea(input.area);
        organization.setAbout(input.about);
        organization.setEmail(input.email);
        organization.setPassword(input.password);
        organization.setAddress(input.address);

        organization.setPhoto(input.photo);
        organization.setPhone(input.phone);
        organization.setSocial(input.social);

        organization.setIsNeedSomeItems(input.isNeedSomeItems);
        organization.setIsNeedVoluntarys(input.isNeedVoluntarys);
        organization.setIsProvideSomeItems(input.isProvideSomeItems);
        organization.setIsActive(input.isActive);

        organization.setInterations(input.interations);

        organization.setItems({
            needs: input.items.needs,
            provide: input.items.provide,
        });

        organization.setCreatedAt(input.createdAt);
        organization.setUpdatedAt(input.updatedAt);

        return organization
    }



    public getId(): string | undefined {
        return this.id;
    }

    public setId(id: string): void {
        const validIdCharacters = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!validIdCharacters.test(id)) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                131,
                "id",
                "O id da organização não é válido."
            )
        }

        if (id.length < 36) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                140,
                "id",
                "O id da organização não é válido."
            )
        }

        this.id = id
    }

    public getPassword(): string | undefined {
        return this.password;
    }

    public setPassword(password: string): void {
        if (!password) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                196,
                "password",
                "A senha não pode ser vazia!"
            )
        }

        if (password.length < 3 || password.length > 50) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                205,
                "password",
                "A senha deve ter entre 3 e 50 caracteres."
            )
        }

        this.password = password;
    }

    public getName(): string | undefined {
        return this.name;
    }

    public setName(name: string): void {
        console.log(name);

        if (!name) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                196,
                "name",
                "O nome não pode ser vazio!"
            );
        }

        if (name.length < 3 || name.length > 50) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                205,
                "name",
                "O nome deve ter entre 3 e 50 caracteres."
            );
        }

        const invalidCharacters = /[^a-zA-Z\u00C0-\u00FF0-9\s]/;
        if (invalidCharacters.test(name)) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                215,
                "name",
                "O nome contém caracteres inválidos."
            );
        }

        if (this.verifyIfContainsSwearsWords(name.toLowerCase())) {
            throw new InvalidOrganizationPropetyDomainException(
                "trail-base-entity.ts",
                224,
                "name",
                `O nome da organização contém palavras de baixo calão.`
            )
        }


        this.name = name;
    }
    public getAbout(): string | undefined {
        return this.about;
    }

    public setAbout(about: string): void {
        if (!about) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                205,
                "about",
                `O subtítulo não pode ser vazio!`
            )
        }

        if (about.length < 5 || about.length > 70) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                214,
                "about",
                `O subtítulo deve ter entre 5 e 70 caracteres.`
            )
        }

        const invalidCharacters = /[^a-zA-Z\u00C0-\u00FF0-9\s ?!.,"'-]/;
        const hasInvalidCharacters = about.match(invalidCharacters);

        if (hasInvalidCharacters) {

            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                227,
                "about",
                `O resumo contém caracteres inválidos. \n Caracteres inválidos encontrados: ${hasInvalidCharacters}`
            )
        }

        if (/(\d{2,})/.test(about)) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                236,
                "about",
                `O resumo não pode conter sequências numéricas.`
            )
        }

        if (this.verifyIfContainsSwearsWords(about.toLowerCase())) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                245,
                "about",
                `O resumo contém palavras de baixo calão.`
            )
        }

        this.about = about;
    }

    public getDescription(): string | undefined {
        return this.description;
    }

    public setDescription(description: string): void {
        if (!description) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                158,
                "description",
                `A descrição não pode ser vazia!`
            )
        }

        const invalidCharacters = /[^a-zA-Z\u00C0-\u00FF0-9\s ?!.,"'-]/;
        const hasInvalidCharacters = description.match(invalidCharacters);

        if (hasInvalidCharacters) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                177,
                "description",
                `A descrição contém caracteres inválidos. \n Caracteres inválidos encontrados: ${hasInvalidCharacters}`
            )
        }

        if (/(\d{10,})/.test(description)) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                180,
                "description",
                `a descrição não pode conter sequências numéricas muito longas.`
            )
        }

        if (this.verifyIfContainsSwearsWords(description)) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                189,
                "description",
                `a descrição contém palavras de baixo calão.`
            )
        }

        this.description = description;
    }

    public getAddress(): AddressValueObject | undefined {
        return this.Address;
    }

    public setAddress(Address: AddressValueObject): void {
        this.Address = Address;
    }

    public getArea(): string | undefined {
        return this.area;
    }

    public setArea(area: string): void {
        this.area = area;
    }

    public getEmail(): string | undefined {
        return this.email;
    }

    public setEmail(email: string): void {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const bannedDomains = ["test.com", "fake.com"];

        if (!emailPattern.test(email)) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                325,
                "email",
                "O e-mail fornecido não é válido."
            );
        }

        const emailDomain = email.split("@")[1];
        if (bannedDomains.includes(emailDomain)) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                332,
                "email",
                "O domínio do e-mail fornecido está banido."
            );
        }

        if (email.length > 320) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                338,
                "email",
                "O e-mail fornecido é muito longo."
            );
        }

        this.email = email;
    }


    public getInterations() {
        return this.interations;
    }

    public setInterations(
        interations: {
            publications: PublicationDomainEntity[],
            comments: CommentDomainEntity[],
            replies: ReplyDomainEntity[]
        }
    ): void {

        const publications = interations.publications
        for (const publication of publications) {
            if (!publication.organization) {
                throw new InvalidOrganizationPropetyDomainException(
                    "organization-domain-entity.ts",
                    255,
                    "interations.publications",
                    "A publicação não pode ser vazia."
                );
            }

            if (!publication.organization.id || publication.organization.id !== this.id) {
                throw new InvalidOrganizationPropetyDomainException(
                    "organization-domain-entity.ts",
                    245,
                    "interations.publications",
                    "O id presente na publicação não corresponde ao id da organização."
                );
            }
        }

        const comments = interations.comments;
        for (const comment of comments) {
            if (!comment.organization) {
                throw new InvalidOrganizationPropetyDomainException(
                    "organization-domain-entity.ts",
                    255,
                    "interations.comments",
                    "O comentário não pode ser vazio."
                );
            }

            if (!comment.organization.id || comment.organization.id !== this.id) {
                throw new InvalidOrganizationPropetyDomainException(
                    "organization-domain-entity.ts",
                    255,
                    "interations.comments",
                    "O id presente no comentário não corresponde ao id da organização."
                );
            }
        }

        const replies = interations.replies;
        for (const reply of replies) {
            if (!reply.organization) {
                throw new InvalidOrganizationPropetyDomainException(
                    "organization-domain-entity.ts",
                    265,
                    "interations.replies",
                    "A resposta não pode ser vazia."
                );
            }

            if (!reply.organization.id || reply.organization.id !== this.id) {
                throw new InvalidOrganizationPropetyDomainException(
                    "organization-domain-entity.ts",
                    265,
                    "interations.replies",
                    "O id presente na resposta não corresponde ao id da organização."
                );
            }
        }

        this.interations = interations;
    }

    public getIsActive(): boolean | undefined {
        return this.isActive;
    }

    public setIsActive(isActive: boolean): void {
        this.isActive = isActive;
    }

    public getIsNeedSomeItems(): boolean | undefined {
        return this.isNeedSomeItems;
    }

    public setIsNeedSomeItems(isNeedSomeItems: boolean): void {
        this.isNeedSomeItems = isNeedSomeItems;
    }

    public getIsNeedVoluntarys(): boolean | undefined {
        return this.isNeedVoluntarys;
    }

    public setIsNeedVoluntarys(isNeedVoluntarys: boolean): void {
        this.isNeedVoluntarys = isNeedVoluntarys;
    }

    public getIsProvideSomeItems(): boolean | undefined {
        return this.isProvideSomeItems;
    }

    public setIsProvideSomeItems(isProvideSomeItems: boolean): void {
        this.isProvideSomeItems = isProvideSomeItems;
    }

    public getItems() {
        return this.items;
    }

    public setItems(items: {
        needs: ItemDomainEntity[],
        provide: ItemDomainEntity[]
    }): void {

        const needs = items.needs;
        for (const neededItems of needs) {
            if (!neededItems.organization) {
                throw new InvalidOrganizationPropetyDomainException(
                    "organization-domain-entity.ts",
                    431,
                    "items.provide",
                    "O item de necessidade não pode ser vazio."
                );
            }

            if (!neededItems.organization.id || neededItems.organization.id !== this.id) {
                throw new InvalidOrganizationPropetyDomainException(
                    "organization-domain-entity.ts",
                    431,
                    "items.provide",
                    "O id presente no item de necessidade não corresponde ao id da organização."
                );
            }

            if (neededItems.type !== "need") {
                throw new InvalidOrganizationPropetyDomainException(
                    "organization-domain-entity.ts",
                    431,
                    "items.provide",
                    "O item de necessidade não é do tipo necessidade."
                );
            }
        }

        const providedItems = items.provide;
        for (const item of providedItems) {
            if (!item.organization) {
                throw new InvalidOrganizationPropetyDomainException(
                    "organization-domain-entity.ts",
                    431,
                    "items.provide",
                    "O item de doação não pode ser vazio."
                );
            }

            if (!item.organization.id || item.organization.id !== this.id) {
                throw new InvalidOrganizationPropetyDomainException(
                    "organization-domain-entity.ts",
                    443, // vida rasa
                    "items.provide",
                    "O id presente na doação não corresponde ao id da organização."
                );
            }

            if (item.type !== "provide") {
                throw new InvalidOrganizationPropetyDomainException(
                    "organization-domain-entity.ts",
                    431,
                    "items.provide",
                    "O item de doação não é do tipo doação."
                );
            }
        }

        this.items = items;
    }


    public getPhone(): PhoneValueObject | undefined {
        return this.phone;
    }

    public setPhone(phone: PhoneValueObject): void {
        this.phone = phone;
    }

    public getPhoto(): string | undefined {
        return this.photo;
    }

    public setPhoto(photo: string): void {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

        if (!urlPattern.test(photo)) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                457,
                "photo",
                "A URL da foto fornecida não é válida."
            );
        }

        this.photo = photo;
    }

    
    public getSocial() {
        return this.social;
    }

    public setSocial(
        social: {
            linkedin: SocialNetworkValueObject<LinkedinSocialNetworkValueObject> | EmptySocialNetworkValueObject,
            instagram: SocialNetworkValueObject<InstagramSocialNetworkValueObject> | EmptySocialNetworkValueObject,
            twitter: SocialNetworkValueObject<TwitterSocialNetworkValueObject> | EmptySocialNetworkValueObject,
            facebook: SocialNetworkValueObject<FacebookSocialNetworkValueObject> | EmptySocialNetworkValueObject,
        }
    ): void {

        this.social = social;
    }

    public getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: Date): void {
        if (!(createdAt instanceof Date) || isNaN(createdAt.getTime())) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                551,
                "createdAt",
                "A data de criação fornecida não é válida."
            );
        }

        this.createdAt = createdAt;
    }


    public getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
        if (!(updatedAt instanceof Date) || isNaN(updatedAt.getTime())) {
            throw new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                569,
                "updatedAt",
                "A data de atualização fornecida não é válida."
            );
        }

        this.updatedAt = updatedAt;
    }

    private verifyIfContainsSwearsWords(str: string): boolean {

        const swearWords = ["caralho", "porra", "sexo", "piroca", "puta", "pinto", "buceta", "pênis", "cu"];

        const containsSwearWords: boolean = swearWords.some(swear => str.toLowerCase().split(' ').includes(swear));
        if (containsSwearWords) {
            return true
        }

        return false
    }
}
