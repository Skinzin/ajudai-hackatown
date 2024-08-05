import { OrganizationEntity } from "@/domain/entities/organization/types/organization-entity";
import { CommentEntity } from "../../comments/types/comment-entity";

export interface CreatePublicationEntityInput {
    organization: Pick<OrganizationEntity, 'id' | 'name' | 'photo' | 'area'>;
    content: {
        subject: string;
        text: string;
    };
}

export interface RestorePublicationEntityInput {
    id: string;
    organization: Pick<OrganizationEntity, 'id' | 'name' | 'photo' | 'area'>;
    content: {
        subject: string;
        text: string;
    };
    comments: CommentEntity[];
    isEdited: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}