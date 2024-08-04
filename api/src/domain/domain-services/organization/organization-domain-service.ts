import { OrganizationDomainEntity } from "@/domain/entities/organization/organization-domain-entity";
import { CreateOrganizationDomainServiceInput, DeleteOrganizationDomainServiceInput, ReadCommentsInteractionsDomainServiceInput, ReadPublicationsInteractionsDomainServiceInput, ReadRepliesInteractionsDomainServiceInput, UpdateOrganizationDomainServiceInput } from "./types/organization-domain-service-inputs";


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


}