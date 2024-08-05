import { OrganizationNotFoundApplicationException } from "@/application/application-exceptions/organization-not-found-application-exception";
import { ContributionsDomainService } from "@/domain/domain-services/contributions/contributions-domain-service";
import { CreateNeededItemDomainServiceInput } from "@/domain/domain-services/contributions/types/contributions-domain-service-inputs";
import { ItemDomainEntity } from "@/domain/entities/contributions/item/item-domain-entity";
import { ContributionsRepository } from "@/domain/repositories/contributions-repository";
import { OrganizationsRepository } from "@/domain/repositories/organizations-repository";
import { CreateNeededItemContributionUseCaseInputDTO } from "./DTOs/create-needed-item-contribution-use.case-input-DTO";
import { CreateNeededItemContributionUseCaseOutputDTO } from "./DTOs/create-needed-item-contribution-use.case-output-DTO";


export class CreateNeededItemContributionUseCase {
    constructor(
        private readonly contributionsRepository: ContributionsRepository,
        private readonly organizationRepository: OrganizationsRepository
    ) { }

    async execute(input: CreateNeededItemContributionUseCaseInputDTO): Promise<CreateNeededItemContributionUseCaseOutputDTO> {
        const organization = await this.organizationRepository.findById(input.idOrganization);
        if (!organization) {
            throw new OrganizationNotFoundApplicationException(
                "read-organization-use-case.ts",
                23,
                "O organização com o id informado não foi encontrada."
            )
        }

        const createNeededItemDomainServiceInput: CreateNeededItemDomainServiceInput = {
            type: "need",
            title: input.title,
            photo: input.photo,
             
            donationValue: input.donationValue,
            priority: input.priority,
            category: input.category,
            amount: input.amount,
            organization: {
                id: organization.getId()!,
                name: organization.getName()!,
                photo: organization.getPhoto()!,
                area: organization.getArea()!
            }
        }

        const createdItem: ItemDomainEntity = new ContributionsDomainService().createNeededItem(
            createNeededItemDomainServiceInput
        );

        await this.contributionsRepository.save(createdItem);

        const output: CreateNeededItemContributionUseCaseOutputDTO = {
            item: createdItem
        }

        return output;
    }
}