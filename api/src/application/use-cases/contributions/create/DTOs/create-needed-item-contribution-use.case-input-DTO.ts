import { CreateNeededItemDomainServiceInput } from "@/domain/domain-services/contributions/types/contributions-domain-service-inputs";

export interface CreateNeededItemContributionUseCaseInputDTO extends Omit<CreateNeededItemDomainServiceInput, 'organization'> {
    idOrganization: string;
}