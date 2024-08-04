import { AddressValueObject } from "../../value-objects/address-value-object";
import { EmptySocialNetworkValueObject } from "../../value-objects/empty-social-network-value-object";
import { InstagramSocialNetworkValueObject } from "../../value-objects/instragram-social-network-value-object";
import { LinkedinSocialNetworkValueObject } from "../../value-objects/linkedin-social-network-value-object";
import { PhoneValueObject } from "../../value-objects/phone-value-object";
import { SocialNetworkValueObject } from "../../value-objects/social-networking-value-object";
import { OrganizationEntity } from "./organization-entity";

export interface CreateOrganizationInput {
    name: string;
    area: string;
    about: string;
    email: string;
    password: string;
    photo: string;

    Address: AddressValueObject;
    phone: PhoneValueObject;
    social: {
        linkedin: SocialNetworkValueObject<LinkedinSocialNetworkValueObject | EmptySocialNetworkValueObject>;
        instagram: SocialNetworkValueObject<InstagramSocialNetworkValueObject | EmptySocialNetworkValueObject>;
    };
}


export interface RestoreOrganizationInput extends OrganizationEntity { }   