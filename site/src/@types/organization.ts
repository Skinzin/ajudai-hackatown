

export interface SocialProps {
    facebook ?: string;
    instagram?: string;
    linkedin ?: string;
    twitter  ?: string;
}

export interface AddressProps {
    street  : string;
    number  : string;
    city    : string;
    state   : string;
    cep     : string;
    lat     : number;
    lng     : number;
}

export interface OrganizationProps {
    id                : string;
    name              : string;
    area              : string;
    about             : string;
    address           : AddressProps;
    photo            ?: File;
    email             : string;
    password          : string;
    phone             : string;
    social           ?: SocialProps;
    isNeedVoluntarys  : boolean;
    isNeedSomeItems   : boolean;
    isProvideSomeItems: boolean;
    createdAt         : Date;
    updatedAt         : Date;
}