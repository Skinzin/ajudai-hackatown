import { OrganizationEntity } from "../../../organization/types/organization-entity"
import { PublishEntity } from "../../publishes/types/publish-entity"
import { ReplyEntity } from "../../replies/types/reply-entity"


export interface CommentEntity { 
    id: string
    isEdited: boolean
    isDeleted: boolean
    publish: Pick<PublishEntity, "content">
    organization: Pick<OrganizationEntity, "id" |"name" | "photo" | "area"> 
    content: string
    replies: ReplyEntity[]
    createdAt: Date
    updatedAt: Date
}