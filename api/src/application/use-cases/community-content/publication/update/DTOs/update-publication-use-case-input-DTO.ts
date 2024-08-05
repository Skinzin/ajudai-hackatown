import { UpdatePublicationDomainServiceInput } from "@/domain/domain-services/community-content/types/community-content-domain-inputs";


export interface UpdatePublicationUseCaseInputDTO {
    idOrganization: string;
    idPublication: string;
    content: UpdatePublicationDomainServiceInput['newData'];
}