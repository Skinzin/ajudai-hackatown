import { CommentEntity } from "../../community-content/comments/types/comment-entity";
import { PublicationDomainEntity } from "../../community-content/publications/publication-domain-entity";
import { ReplyEntity } from "../../community-content/replies/types/reply-entity";
import { ItemEntity } from "../../contributions/item/item-entity";
import { AddressValueObject } from "../../value-objects/address-value-object";
import { EmptySocialNetworkValueObject } from "../../value-objects/empty-social-network-value-object";
import { InstagramSocialNetworkValueObject } from "../../value-objects/instragram-social-network-value-object";
import { LinkedinSocialNetworkValueObject } from "../../value-objects/linkedin-social-network-value-object";
import { PhoneValueObject } from "../../value-objects/phone-value-object";
import { SocialNetworkValueObject } from "../../value-objects/social-networking-value-object";


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
        comments: CommentEntity[]
        replies: ReplyEntity[]
    }

    items: {
        needs: ItemEntity[]
        provide: ItemEntity[]
    }

    social: {
        linkedin: SocialNetworkValueObject<LinkedinSocialNetworkValueObject | EmptySocialNetworkValueObject>
        instagram: SocialNetworkValueObject<InstagramSocialNetworkValueObject | EmptySocialNetworkValueObject>
    }

    isNeedSomeItems: boolean
    isProvideSomeItems: boolean
    isNeedVoluntarys: boolean
    
    isActive: boolean

    createdAt: Date
    updatedAt: Date
}