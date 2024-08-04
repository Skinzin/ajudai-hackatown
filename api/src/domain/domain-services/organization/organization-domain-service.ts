import { OrganizationDomainEntity } from "@/domain/entities/organization/organization-domain-entity";
import { CreateOrganizationDomainServiceInput, DeleteOrganizationDomainServiceInput, GetCommentInteractionDomainServiceInput, GetPublicationInteractionDomainServiceInput, GetReplyInteractionDomainServiceInput, ReadCommentsInteractionsDomainServiceInput, ReadPublicationsInteractionsDomainServiceInput, ReadRepliesInteractionsDomainServiceInput, SaveInteractionDomainServiceInput, UpdateOrganizationDomainServiceInput } from "./types/organization-domain-service-inputs";
import { CommentDomainEntity } from "@/domain/entities/community-content/comments/comment-domain-entity";
import { ReplyDomainEntity } from "@/domain/entities/community-content/replies/reply-domain-entity";
import { PublicationDomainEntity } from "@/domain/entities/community-content/publications/publication-domain-entity";


export class OrganizationDomainService {
    constructor() { }

    createOrganization(input: CreateOrganizationDomainServiceInput) {
        const organization = OrganizationDomainEntity.create(input);
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

        const items = organization.getItems()!;
        const neededItems = items.needs;

        return neededItems.find(item => item.getId() === itemId);
    }

    getProvidedItem(input: GetProvidedItemDomainServiceInput) {
        const { organization, itemId } = input;

        const items = organization.getItems()!;
        const providedItems = items.provide;

        return providedItems.find(item => item.getId() === itemId);
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