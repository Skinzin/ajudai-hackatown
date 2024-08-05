import { OrganizationEntity } from "@/domain/entities/organization/types/organization-entity";

export interface CreateReplyInput {
    comment: {
        id: string;
        subject: string;
    };
    organization: Pick<OrganizationEntity, 'id' | 'name' | 'photo' | 'area'>;
    content: string;
}

export interface RestoreReplyInput {
    id: string;
    comment: {
        id: string;
        subject: string;
    };
    organization: Pick<OrganizationEntity, 'id' | 'name' | 'photo' | 'area'>;
    isDeleted: boolean;
    isEdited: boolean;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
