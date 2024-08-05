import { InvalidOrganizationPropetyDomainException } from "../../domain-exceptions/invalid-organization-propety-domain-exception";

export class PhoneValueObject {
    number: string;
    isCelular: boolean;
    isWhatsApp: boolean;
    isTelegram: boolean;

    constructor(number: string, isCelular: boolean, isWhatsApp: boolean, isTelegram: boolean) {
        const phonePattern = /^\+?[1-9]\d{1,14}$/;

        if (!phonePattern.test(number)) {
            throw new InvalidOrganizationPropetyDomainException(
                "phone-value-object.ts",
                11,
                "number",
                "O número de telefone fornecido não é válido."
            );
        }

        this.number = number;
        this.isCelular = isCelular;
        this.isWhatsApp = isWhatsApp;
        this.isTelegram = isTelegram;
    }
}
