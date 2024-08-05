
export class AddressValueObject {
    street: string;
    number: string;
    city: string;
    state: string;
    cep: string;
    lat: number;
    lng: number;

    constructor(street: string, number: string, city: string, state: string, cep: string, lat: number, lng: number) {
        this.street = street;
        this.number = number;
        this.city = city;
        this.state = state;
        this.cep = cep;
        this.lat = lat;
        this.lng = lng;
    }
}