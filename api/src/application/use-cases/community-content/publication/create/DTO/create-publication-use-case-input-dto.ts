import { CreatePublicationDomainServiceInput } from "@/domain/domain-services/community-content/types/create-publication-domain-service-input"


export interface CreatePublicationUseCaseInputDTO  {
    idOrganization: string;
    content: CreatePublicationDomainServiceInput['content'];

}