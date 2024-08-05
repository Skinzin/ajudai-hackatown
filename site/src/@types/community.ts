import { OrganizationProps } from "./organization";


export interface CommentaryProps {
    id          : string;
    content     : string;
    createdAt   : Date;
    updatedAt   : Date;
    organization: OrganizationProps;
    post        : PostCommunityProps;
}

export interface PostCommunityProps {
    id          : string;
    title       : string;
    description : string;
    subject     : string;
    createdAt   : Date;
    updatedAt   : Date;
    comments    : string[];
    organization: OrganizationProps;
}