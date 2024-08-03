import { OrganizationEntity } from "../../organization/types/organization-entity"

export interface ItemEntity {
    type: "need" | "provide"
    title: string
    photo: string
    description: string
    donationValue: number
    priority: "emergency" | "high" | "moderate" | "normal"
    category: string
    amount: number
    organization: Pick<OrganizationEntity, "id" |"name" | "photo" | "area"> 
    isDone: boolean
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date

}