import { CreatePublicationDomainServiceInput } from "@/domain/domain-services/community-content/types/community-content-domain-inputs"


export interface CreatePublicationUseCaseInputDTO  {
    idOrganization: string;
    content: CreatePublicationDomainServiceInput['content'];
}