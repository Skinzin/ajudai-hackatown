import { CommentEntity } from "../../community-content/comments/types/comment-entity";
import { PublishEntity } from "../../community-content/publishes/types/publish-entity";
import { ReplyEntity } from "../../community-content/replies/types/reply-entity";
import { ItemEntity } from "../../contributions/item/item-entity";
import { AdressValueObject } from "../../value-objects/adress-value-object";
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
    photo: string
    adress: AdressValueObject
    phone: PhoneValueObject
    
    interations: {
        publishes: PublishEntity[]
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