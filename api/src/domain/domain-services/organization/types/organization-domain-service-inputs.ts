import { CreateOrganizationInput } from "@/domain/entities/organization/types/organization-domain-entity-inputs"
import { OrganizationDomainEntity } from "@/domain/entities/organization/organization-domain-entity"
import { EmptySocialNetworkValueObject } from "@/domain/entities/value-objects/empty-social-network-value-object"
import { FacebookSocialNetworkValueObject } from "@/domain/entities/value-objects/facebook-value-object"
import { InstagramSocialNetworkValueObject } from "@/domain/entities/value-objects/instragram-social-network-value-object"
import { LinkedinSocialNetworkValueObject } from "@/domain/entities/value-objects/linkedin-social-network-value-object"
import { PhoneValueObject } from "@/domain/entities/value-objects/phone-value-object"
import { SocialNetworkValueObject } from "@/domain/entities/value-objects/social-networking-value-object"
import { TwitterSocialNetworkValueObject } from "@/domain/entities/value-objects/twitter-value-network-value-object"


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

interface ReadInteraction {
    organization: OrganizationDomainEntity
}

export interface ReadCommentsInteractionsDomainServiceInput extends ReadInteraction {}
export interface ReadRepliesInteractionsDomainServiceInput extends ReadInteraction {}
export interface ReadPublicationsInteractionsDomainServiceInput extends ReadInteraction {}