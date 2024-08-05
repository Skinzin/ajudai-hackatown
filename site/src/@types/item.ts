import { PostCommunityProps } from "./community";
import { OrganizationProps } from "./organization";


export interface Item {
    id           : string;
    type         : "need" | "provide";
    title        : string;
    photo        : string;
    donationValue: number;
    priority     : "emergency" | "high" | "moderate" | "normal";
    category     : string;
    amount       : number;
    isDone       : boolean;
    createdAt    : Date;
    updatedAt    : Date;
    organization : PostCommunityProps;
}