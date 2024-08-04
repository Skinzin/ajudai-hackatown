import { OrganizationEntity } from "@/domain/entities/organization/types/organization-entity";
import { PublicationDomainEntity } from "../../publications/publication-domain-entity";
import { ReplyEntity } from "../../replies/types/reply-entity";

export interface CreateCommentEntityInput {
    organization: Pick<OrganizationEntity, "id" | "name" | "photo" | "area">;
    publication: Pick<PublicationDomainEntity, "content">;
    content: string;
}

export interface RestoreCommentEntityInput {
    id: string;
    organization: Pick<OrganizationEntity, "id" | "name" | "photo" | "area">;
    publication: Pick<PublicationDomainEntity, "content">;
    content: string;
    replies: ReplyEntity[];
    isDeleted: boolean;
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;
}