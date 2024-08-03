import { EmptySocialNetworkValueObject } from "./empty-social-network-value-object";
import { LinkedinSocialNetworkValueObject } from "./linkedin-social-network-value-object";


export class SocialNetworkValueObject<SocialNetWokingType> {
    public url: string
    public nameInSocialNetwork: string

    constructor(url: string, nameInSocialNetwork: string) {
        this.url = url;
        this.nameInSocialNetwork = nameInSocialNetwork;
    }
}