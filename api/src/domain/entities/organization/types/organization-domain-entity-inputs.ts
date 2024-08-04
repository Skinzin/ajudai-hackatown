import { AddressValueObject } from "../../value-objects/address-value-object";
import { EmptySocialNetworkValueObject } from "../../value-objects/empty-social-network-value-object";
import { FacebookSocialNetworkValueObject } from "../../value-objects/facebook-value-object";
import { InstagramSocialNetworkValueObject } from "../../value-objects/instragram-social-network-value-object";
import { LinkedinSocialNetworkValueObject } from "../../value-objects/linkedin-social-network-value-object";
import { PhoneValueObject } from "../../value-objects/phone-value-object";
import { SocialNetworkValueObject } from "../../value-objects/social-networking-value-object";
import { TwitterSocialNetworkValueObject } from "../../value-objects/twitter-value-network-value-object";
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
        linkedin: SocialNetworkValueObject<LinkedinSocialNetworkValueObject> | EmptySocialNetworkValueObject,
        instagram: SocialNetworkValueObject<InstagramSocialNetworkValueObject> | EmptySocialNetworkValueObject,
        twitter: SocialNetworkValueObject<TwitterSocialNetworkValueObject> | EmptySocialNetworkValueObject,
        facebook: SocialNetworkValueObject<FacebookSocialNetworkValueObject> | EmptySocialNetworkValueObject,
    }
}


export interface RestoreOrganizationInput extends OrganizationEntity { }   