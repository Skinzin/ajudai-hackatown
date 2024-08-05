import { UpdateOrganizationDomainServiceInput } from "@/domain/domain-services/organization/types/organization-domain-service-inputs";



export interface UpdateOrganizationUseCaseInputDTO {
    idOrganization: string
    newData: UpdateOrganizationDomainServiceInput['newData']
}