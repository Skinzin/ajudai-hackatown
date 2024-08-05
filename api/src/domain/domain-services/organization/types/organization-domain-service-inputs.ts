import { CreateOrganizationInput, RestoreOrganizationInput } from "@/domain/entities/organization/types/organization-domain-entity-inputs"
import { OrganizationDomainEntity } from "@/domain/entities/organization/organization-domain-entity"
import { CommentDomainEntity } from "@/domain/entities/community-content/comments/comment-domain-entity"
import { PublicationDomainEntity } from "@/domain/entities/community-content/publications/publication-domain-entity"
import { ReplyDomainEntity } from "@/domain/entities/community-content/replies/reply-domain-entity"


export interface CreateOrganizationDomainServiceInput extends Omit<CreateOrganizationInput, 'address' | 'phone' | 'social'> {
    address: {
        street: string,
        number: string,
        city: string,
        state: string,
        cep: string,
        lat: number,
        lng: number,
    }

    social: {
        linkedin: string
        instagram: string
        twitter: string
        facebook: string
    },


    phone: {
        number: string,
        isCelular: boolean,
        isWhatsApp: boolean,
        isTelegram: boolean,
    }
}

export interface RestoreOrganizationDomainServiceInput extends Omit<RestoreOrganizationInput, 'address' | 'phone' | 'social'> {
    address: {
        street: string,
        number: string,
        city: string,
        state: string,
        cep: string,
        lat: number,
        lng: number,
    }

    social: {
        linkedin: string
        instagram: string
        twitter: string
        facebook: string
    },

    phone: {
        number: string,
        isCelular: boolean,
        isWhatsApp: boolean,
        isTelegram: boolean,
    }
}

export interface UpdateOrganizationDomainServiceInput {
    actualData: OrganizationDomainEntity

    newData: {
        name: string,
        area: string,
        about: string,
        email: string,

        phone: {
            number: string,
            isCelular: boolean,
            isWhatsApp: boolean,
            isTelegram: boolean,
        },

        address: {
            street: string,
            number: string,
            city: string,
            state: string,
            cep: string,
            lat: number,
            lng: number,
        }

        photo: string,

        social: {
            linkedin: string
            instagram: string
            twitter: string
            facebook: string
        },

        isNeedSomeItems: boolean,
        isNeedVoluntarys: boolean,
        isProvideSomeItems: boolean,

    }
}

export interface DeleteOrganizationDomainServiceInput {
    organization: OrganizationDomainEntity
}

export interface SaveInteractionDomainServiceInput {
    organization: OrganizationDomainEntity
    interaction: CommentDomainEntity | PublicationDomainEntity | ReplyDomainEntity
}

interface ReadInteraction {
    organization: OrganizationDomainEntity
}

interface GetInteractionById extends ReadInteraction {
    organization: OrganizationDomainEntity
    interactionId: string
}

export interface ReadCommentsInteractionsDomainServiceInput extends ReadInteraction { }
export interface ReadRepliesInteractionsDomainServiceInput extends ReadInteraction { }
export interface ReadPublicationsInteractionsDomainServiceInput extends ReadInteraction { }

export interface GetCommentInteractionDomainServiceInput extends GetInteractionById { }
export interface GetReplyInteractionDomainServiceInput extends GetInteractionById { }
export interface GetPublicationInteractionDomainServiceInput extends GetInteractionById { }

interface ReadItems {
    organization: OrganizationDomainEntity
}

export interface ReadNeededItemsDomainServiceInput extends ReadItems { }
export interface ReadProvidedItemsDomainServiceInput extends ReadItems { }

interface GetItemById {
    organization: OrganizationDomainEntity
    itemId: string
}

export interface GetNeededItemDomainServiceInput extends GetItemById { }
export interface GetProvidedItemDomainServiceInput extends GetItemById { }