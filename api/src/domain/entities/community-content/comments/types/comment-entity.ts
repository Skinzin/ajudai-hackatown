import { OrganizationEntity } from "../../../organization/types/organization-entity"
import { PublicationDomainEntity } from "../../publications/publication-domain-entity"
import { ReplyEntity } from "../../replies/types/reply-entity"


export interface CommentEntity { 
    id?: string
    isEdited?: boolean
    isDeleted?: boolean
    publish?: Pick<PublicationDomainEntity, "content">
    organization?: Pick<OrganizationEntity, "id" |"name" | "photo" | "area"> 
    content?: string
    replies?: ReplyEntity[]
    createdAt?: Date
    updatedAt?: Date
}