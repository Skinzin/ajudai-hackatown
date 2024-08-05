
import { UpdatePublicationDomainServiceInput } from "@/domain/domain-services/community-content/types/community-content-domain-inputs";
import { PublicationDomainEntity } from "@/domain/entities/community-content/publications/publication-domain-entity";

export interface UpdatePublicationUseCaseOutputDTO  {
    updatedPublication: PublicationDomainEntity;
}