import { OrganizationEntity } from "@/domain/entities/organization/types/organization-entity"

export interface CreateItemInput {
    type: "need" | "provide";
    title: string;
    photo: string;
    description: string;
    donationValue: number;
    priority: "emergency" | "high" | "moderate" | "normal";
    category: string;
    amount: number;
    organization: Pick<OrganizationEntity, "id" | "name" | "photo" | "area">;
}

export interface RestoreItemInput {
    id: string;
    type: "need" | "provide";
    title: string;
    photo: string;
    description: string;
    donationValue: number;
    priority: "emergency" | "high" | "moderate" | "normal";
    category: string;
    amount: number;
    organization: Pick<OrganizationEntity, "id" | "name" | "photo" | "area">;
    isDone: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
