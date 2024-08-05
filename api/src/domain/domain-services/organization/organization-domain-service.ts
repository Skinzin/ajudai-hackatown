import { RestoreOrganizationInput } from '@/domain/entities/organization/types/organization-domain-entity-inputs';
import { CreateOrganizationDomainServiceInput, RestoreOrganizationDomainServiceInput } from '@/domain/domain-services/organization/types/organization-domain-service-inputs';
import { OrganizationDomainEntity } from "@/domain/entities/organization/organization-domain-entity";
import { DeleteOrganizationDomainServiceInput, GetCommentInteractionDomainServiceInput, GetNeededItemDomainServiceInput, GetProvidedItemDomainServiceInput, GetPublicationInteractionDomainServiceInput, GetReplyInteractionDomainServiceInput, ReadCommentsInteractionsDomainServiceInput, ReadNeededItemsDomainServiceInput, ReadProvidedItemsDomainServiceInput, ReadPublicationsInteractionsDomainServiceInput, ReadRepliesInteractionsDomainServiceInput, SaveInteractionDomainServiceInput, UpdateOrganizationDomainServiceInput } from "./types/organization-domain-service-inputs";
import { CommentDomainEntity } from "@/domain/entities/community-content/comments/comment-domain-entity";
import { ReplyDomainEntity } from "@/domain/entities/community-content/replies/reply-domain-entity";
import { PublicationDomainEntity } from "@/domain/entities/community-content/publications/publication-domain-entity";
import { EmptySocialNetworkValueObject } from "@/domain/entities/value-objects/empty-social-network-value-object";
import { FacebookSocialNetworkValueObject } from "@/domain/entities/value-objects/facebook-value-object";
import { InstagramSocialNetworkValueObject } from "@/domain/entities/value-objects/instragram-social-network-value-object";
import { LinkedinSocialNetworkValueObject } from "@/domain/entities/value-objects/linkedin-social-network-value-object";
import { SocialNetworkValueObject } from "@/domain/entities/value-objects/social-networking-value-object";
import { TwitterSocialNetworkValueObject } from "@/domain/entities/value-objects/twitter-value-network-value-object";
import { CreateOrganizationInput } from '@/domain/entities/organization/types/organization-domain-entity-inputs';
import { PhoneValueObject } from '@/domain/entities/value-objects/phone-value-object';
import { AddressValueObject } from '@/domain/entities/value-objects/address-value-object';


export class OrganizationDomainService {
    constructor() { }

    createOrganization(input: CreateOrganizationDomainServiceInput) {

        const social = {
            linkedin: input.social.linkedin ? new SocialNetworkValueObject<LinkedinSocialNetworkValueObject>(input.social.linkedin) : new EmptySocialNetworkValueObject(),
            instagram: input.social.instagram ? new SocialNetworkValueObject<InstagramSocialNetworkValueObject>(input.social.instagram) : new EmptySocialNetworkValueObject(),
            twitter: input.social.twitter ? new SocialNetworkValueObject<TwitterSocialNetworkValueObject>(input.social.twitter) : new EmptySocialNetworkValueObject(),
            facebook: input.social.facebook ? new SocialNetworkValueObject<FacebookSocialNetworkValueObject>(input.social.facebook) : new EmptySocialNetworkValueObject(),
        }

        const phone: PhoneValueObject = new PhoneValueObject(
            input.phone.number,
            input.phone.isCelular,
            input.phone.isWhatsApp,
            input.phone.isTelegram
        );

        const address: AddressValueObject = new AddressValueObject(
            input.address.street,
            input.address.number,
            input.address.city,
            input.address.state,
            input.address.cep,
            input.address.lat,
            input.address.lng
        );

        const CreateOrganizationInput: CreateOrganizationInput = {
            ...input,
            social,
            phone,
            address
        }


        return OrganizationDomainEntity.create(CreateOrganizationInput);
    }

    restoreOrganization(input: RestoreOrganizationDomainServiceInput) {

        const social = {
            linkedin: input.social.linkedin ? new SocialNetworkValueObject<LinkedinSocialNetworkValueObject>(input.social.linkedin) : new EmptySocialNetworkValueObject(),
            instagram: input.social.instagram ? new SocialNetworkValueObject<InstagramSocialNetworkValueObject>(input.social.instagram) : new EmptySocialNetworkValueObject(),
            twitter: input.social.twitter ? new SocialNetworkValueObject<TwitterSocialNetworkValueObject>(input.social.twitter) : new EmptySocialNetworkValueObject(),
            facebook: input.social.facebook ? new SocialNetworkValueObject<FacebookSocialNetworkValueObject>(input.social.facebook) : new EmptySocialNetworkValueObject(),
        }

        const phone: PhoneValueObject = new PhoneValueObject(
            input.phone.number,
            input.phone.isCelular,
            input.phone.isWhatsApp,
            input.phone.isTelegram
        );

        const address: AddressValueObject = new AddressValueObject(
            input.address.street,
            input.address.number,
            input.address.city,
            input.address.state,
            input.address.cep,
            input.address.lat,
            input.address.lng
        );


        const RestoreOrganizationInput: RestoreOrganizationInput = {
            ...input,
            social,
            phone,
            address
        }

        return OrganizationDomainEntity.restore(RestoreOrganizationInput);
    }

    updateOrganization(input: UpdateOrganizationDomainServiceInput) {
        const { actualData, newData } = input;

        if (actualData.getName() !== newData.name) {
            actualData.setName(newData.name);
        }

        if (actualData.getArea() !== newData.area) {
            actualData.setArea(newData.area);
        }

        if (actualData.getAbout() !== newData.about) {
            actualData.setAbout(newData.about);
        }

        if (actualData.getEmail() !== newData.email) {
            actualData.setEmail(newData.email);
        }

        if (actualData.getPhone() !== newData.phone) {
            actualData.setPhone(newData.phone);
        }

        if (actualData.getPhoto() !== newData.photo) {
            actualData.setPhoto(newData.photo);
        }

        if (actualData.getSocial() !== newData.social) {
            actualData.setSocial(newData.social);
        }

        if (actualData.getIsNeedSomeItems() !== newData.isNeedSomeItems) {
            actualData.setIsNeedSomeItems(newData.isNeedSomeItems);
        }

        if (actualData.getIsNeedVoluntarys() !== newData.isNeedVoluntarys) {
            actualData.setIsNeedVoluntarys(newData.isNeedVoluntarys);
        }

        if (actualData.getIsProvideSomeItems() !== newData.isProvideSomeItems) {
            actualData.setIsProvideSomeItems(newData.isProvideSomeItems);
        }

        actualData.setUpdatedAt(new Date());

        return actualData;
    }

    deleteOrganization(input: DeleteOrganizationDomainServiceInput) {
        const { organization } = input;

        const interactions = organization.getInterations();

        const publications = interactions!.publications;
        for (const publication of publications) {
            publication.setIsDeleted(true);
        }


        const comments = interactions!.comments;
        for (const comment of comments) {
            comment.setIsDeleted(true);
        }

        const replies = interactions!.replies;
        for (const reply of replies) {
            reply.setIsDeleted(true);
        }

        organization.setIsActive(false);

        return organization
    }

    getCommentInteraction(input: GetCommentInteractionDomainServiceInput) {
        const { organization, interactionId } = input;

        const comments: CommentDomainEntity[] = this.readCommentsInteractions({ organization });

        return comments.find(comment => comment.getId() === interactionId);
    }

    getReplyInteraction(input: GetReplyInteractionDomainServiceInput) {
        const { organization, interactionId } = input;

        const replies: ReplyDomainEntity[] = this.readRepliesInteractions({ organization });

        return replies.find(reply => reply.getId() === interactionId);
    }

    getPublicationInteraction(input: GetPublicationInteractionDomainServiceInput) {
        const { organization, interactionId } = input;

        const publications: PublicationDomainEntity[] = this.readPublicationsInteractions({ organization });

        return publications.find(publication => publication.getId() === interactionId);
    }

    readCommentsInteractions(input: ReadCommentsInteractionsDomainServiceInput) {
        const { organization } = input;

        const interactions = organization.getInterations();
        const comments = interactions!.comments;
        return comments;
    }

    readRepliesInteractions(input: ReadRepliesInteractionsDomainServiceInput) {
        const { organization } = input;

        const interactions = organization.getInterations();
        const replies = interactions!.replies;
        return replies;
    }

    readPublicationsInteractions(input: ReadPublicationsInteractionsDomainServiceInput) {
        const { organization } = input;

        const interactions = organization.getInterations();
        const publications = interactions!.publications;
        return publications;
    }

    getNeededItem(input: GetNeededItemDomainServiceInput) {
        const { organization, itemId } = input;
        const items = this.readNeededItems({ organization });

        return items.find(item => item.getId() === itemId);
    }

    getProvidedItem(input: GetProvidedItemDomainServiceInput) {
        const { organization, itemId } = input;
        const items = this.readNeededItems({ organization });

        return items.find(item => item.getId() === itemId);
    }

    readNeededItems(input: ReadNeededItemsDomainServiceInput) {
        const { organization } = input;

        const items = organization.getItems()!;
        const neededItems = items.needs;

        return neededItems;
    }

    readProvidedItems(input: ReadProvidedItemsDomainServiceInput) {
        const { organization } = input;
        const items = organization.getItems()!;

        const providedItems = items.provide;

        return providedItems;
    }


}