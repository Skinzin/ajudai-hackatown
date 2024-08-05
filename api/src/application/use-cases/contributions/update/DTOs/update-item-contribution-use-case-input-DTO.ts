import { UpdateItemDomainServiceInput } from "@/domain/domain-services/contributions/types/contributions-domain-service-inputs";

export interface UpdateItemContributionUseCaseInputDTO extends Omit<UpdateItemDomainServiceInput, 'organization'> {
    idOrganization: string;
    idItem: string;
}   