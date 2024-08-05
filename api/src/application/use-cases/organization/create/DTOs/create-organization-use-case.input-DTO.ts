import { CreateOrganizationDomainServiceInput } from "@/domain/domain-services/organization/types/organization-domain-service-inputs";


export interface CreateOrganizationUseCaseInputDTO extends Omit<CreateOrganizationDomainServiceInput, 'social' | 'phone'> {

    phone: {
        number: string,
        isCelular: boolean,
        isWhatsApp: boolean,
        isTelegram: boolean,
    }
    
    social: {
        linkedin?: string,
        instagram?: string,
        twitter: string,
        facebook: string,
    }
}