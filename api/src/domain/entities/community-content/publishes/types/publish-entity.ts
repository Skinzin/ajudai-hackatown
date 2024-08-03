import { PublishDomainEntity } from "../publish-domain-entity"
import { OrganizationEntity } from "../../../organization/types/organization-entity"
import { CommentEntity } from "../../comments/types/comment-entity"


export interface PublishEntity {
    id: string

    isEdited: boolean
    isDeleted: boolean

    organization: Pick<OrganizationEntity, "id" |"name" | "photo" | "area"> 
      
    content: {
        subject: string
        text: string
    }
    
    coments: CommentEntity[]
    createdAt: Date
    updatedAt: Date 
}
 
 