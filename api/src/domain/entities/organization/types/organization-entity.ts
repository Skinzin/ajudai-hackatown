import { CommentDomainEntity } from "../../community-content/comments/comment-domain-entity";
import { PublicationDomainEntity } from "../../community-content/publications/publication-domain-entity";
import { ReplyDomainEntity } from "../../community-content/replies/reply-domain-entity";
import { ItemEntity } from "../../contributions/item/types/item-entity";
import { AddressValueObject } from "../../value-objects/address-value-object";
import { EmptySocialNetworkValueObject } from "../../value-objects/empty-social-network-value-object";
import { FacebookSocialNetworkValueObject } from "../../value-objects/facebook-value-object";
import { InstagramSocialNetworkValueObject } from "../../value-objects/instragram-social-network-value-object";
import { LinkedinSocialNetworkValueObject } from "../../value-objects/linkedin-social-network-value-object";
import { PhoneValueObject } from "../../value-objects/phone-value-object";
import { SocialNetworkValueObject } from "../../value-objects/social-networking-value-object";
import { TwitterSocialNetworkValueObject } from "../../value-objects/twitter-value-network-value-object";


export interface OrganizationEntity {
    id: string
    name: string
    area: string
    about: string
    email: string
    password: string;
    photo: string
    address: AddressValueObject
    phone: PhoneValueObject

    interations: {
        publications: PublicationDomainEntity[]
        comments: CommentDomainEntity[]
        replies: ReplyDomainEntity[]

    }

    items: {
        needs: ItemEntity[]
        provide: ItemEntity[]
    }

    social: {
        linkedin: SocialNetworkValueObject<LinkedinSocialNetworkValueObject> | EmptySocialNetworkValueObject,
        instagram: SocialNetworkValueObject<InstagramSocialNetworkValueObject> | EmptySocialNetworkValueObject,
        twitter: SocialNetworkValueObject<TwitterSocialNetworkValueObject> | EmptySocialNetworkValueObject,
        facebook: SocialNetworkValueObject<FacebookSocialNetworkValueObject> | EmptySocialNetworkValueObject,
    }

    isNeedSomeItems: boolean
    isProvideSomeItems: boolean
    isNeedVoluntarys: boolean

    isActive: boolean

    createdAt: Date
    updatedAt: Date
}