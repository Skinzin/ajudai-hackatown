import { CreateOrganizationInput } from "@/domain/entities/organization/types/organization-domain-entity-inputs"
import { OrganizationDomainEntity } from "@/domain/entities/organization/organization-domain-entity"
import { EmptySocialNetworkValueObject } from "@/domain/entities/value-objects/empty-social-network-value-object"
import { FacebookSocialNetworkValueObject } from "@/domain/entities/value-objects/facebook-value-object"
import { InstagramSocialNetworkValueObject } from "@/domain/entities/value-objects/instragram-social-network-value-object"
import { LinkedinSocialNetworkValueObject } from "@/domain/entities/value-objects/linkedin-social-network-value-object"
import { PhoneValueObject } from "@/domain/entities/value-objects/phone-value-object"
import { SocialNetworkValueObject } from "@/domain/entities/value-objects/social-networking-value-object"
import { TwitterSocialNetworkValueObject } from "@/domain/entities/value-objects/twitter-value-network-value-object"
import { CommentDomainEntity } from "@/domain/entities/community-content/comments/comment-domain-entity"
import { PublicationDomainEntity } from "@/domain/entities/community-content/publications/publication-domain-entity"
import { ReplyDomainEntity } from "@/domain/entities/community-content/replies/reply-domain-entity"


export interface CreateOrganizationDomainServiceInput extends CreateOrganizationInput { }

export interface UpdateOrganizationDomainServiceInput {
    actualData: OrganizationDomainEntity
    newData: {
        name: string,
        area: string,
        about: string,
        email: string,
        phone: PhoneValueObject,
        photo: string,
        social: {
            linkedin: SocialNetworkValueObject<LinkedinSocialNetworkValueObject> | EmptySocialNetworkValueObject
            instagram: SocialNetworkValueObject<InstagramSocialNetworkValueObject> | EmptySocialNetworkValueObject
            twitter: SocialNetworkValueObject<TwitterSocialNetworkValueObject> | EmptySocialNetworkValueObject
            facebook: SocialNetworkValueObject<FacebookSocialNetworkValueObject> | EmptySocialNetworkValueObject
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
    interactionId: string
}

export interface ReadCommentsInteractionsDomainServiceInput extends ReadInteraction { }
export interface ReadRepliesInteractionsDomainServiceInput extends ReadInteraction { }
export interface ReadPublicationsInteractionsDomainServiceInput extends ReadInteraction { }

export interface GetCommentInteractionDomainServiceInput extends GetInteractionById {}
export interface GetReplyInteractionDomainServiceInput extends GetInteractionById {}
export interface GetPublicationInteractionDomainServiceInput extends GetInteractionById {}

interface ReadItems {
    organization: OrganizationDomainEntity
}

export interface ReadNeededItemsDomainServiceInput extends ReadItems {}
export interface ReadProvidedItemsDomainServiceInput extends ReadItems {}

interface GetItemById {
    organization: OrganizationDomainEntity
    itemId: string
}

export interface GetNeededItemDomainServiceInput extends GetItemById {}
export interface GetProvidedItemDomainServiceInput extends GetItemById {}