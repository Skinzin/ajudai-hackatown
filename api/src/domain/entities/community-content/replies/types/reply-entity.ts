import { OrganizationEntity } from "../../../organization/types/organization-entity"

export interface ReplyEntity {
    id: string
    isEdited: boolean
    isDeleted: boolean
    content: string
    comment: {
        id: string
        subject: string
    }
    organization: Pick<OrganizationEntity, "id" |"name" | "photo" | "area"> 
    
    createdAt: string
    updatedAt: string
}