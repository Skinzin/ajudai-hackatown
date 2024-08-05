import { EmptySocialNetworkValueObject } from "./empty-social-network-value-object";
import { LinkedinSocialNetworkValueObject } from "./linkedin-social-network-value-object";


export class SocialNetworkValueObject<SocialNetWokingType> {
    public url: string

    constructor(url: string) {
        this.url = url;
    }
}