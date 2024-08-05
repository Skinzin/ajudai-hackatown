import { UpdateOrganizationDomainServiceInput } from "@/domain/domain-services/organization/types/organization-domain-service-inputs";



export interface UpdateOrganizationUseCaseInputDTO {
    idOrganization: string

    newData: Omit<UpdateOrganizationDomainServiceInput['newData'], 'phone' | 'social'> & {
        phone: {
            number: string
            isCelular: boolean
            isWhatsApp: boolean
            isTelegram: boolean
        }

        social: {
            linkedin?: string
            instagram?: string
            twitter?: string
            facebook?: string
        }
    }
}