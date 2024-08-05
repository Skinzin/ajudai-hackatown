import { OrganizationNotFoundApplicationException } from "@/application/application-exceptions/organization-not-found-application-exception";
import { ContributionsDomainService } from "@/domain/domain-services/contributions/contributions-domain-service";
import { UpdateItemDomainServiceInput } from "@/domain/domain-services/contributions/types/contributions-domain-service-inputs";
import { ItemDomainEntity } from "@/domain/entities/contributions/item/item-domain-entity";
import { ContributionsRepository } from "@/domain/repositories/contributions-repository";
import { OrganizationsRepository } from "@/domain/repositories/organizations-repository";
import { UpdateItemContributionUseCaseInputDTO } from "./DTOs/update-item-contribution-use-case-input-DTO";
import { UpdateItemContributionUseCaseOutputDTO } from "./DTOs/update-item-contribution-use-case-output-DTO";
import { ItemNotFoundApplicationException } from "@/application/application-exceptions/item-not-found-application-exception";

export class UpdateItemContributionUseCase {
    constructor(
        private readonly contributionsRepository: ContributionsRepository,
        private readonly organizationRepository: OrganizationsRepository
    ) { }

    async execute(input: UpdateItemContributionUseCaseInputDTO): Promise<UpdateItemContributionUseCaseOutputDTO> {
        const organization = await this.organizationRepository.findById(input.idOrganization);
        if (!organization) {
            throw new OrganizationNotFoundApplicationException(
                "read-organization-use-case.ts",
                23,
                "O organização com o id informado não foi encontrada."
            )
        }

        const item = await this.contributionsRepository.findById(input.idItem);

        if (!item) {
            throw new ItemNotFoundApplicationException(
                "read-item-use-case.ts",
                23,
                "O item com o id informado não foi encontrada."
            )
        }

        const updateItemDomainServiceInput: UpdateItemDomainServiceInput = {
            item,
            newItemData: {
                type: input.newItemData.type,
                title: input.newItemData.title,
                photo: input.newItemData.photo,
                donationValue: input.newItemData.donationValue,
                priority: input.newItemData.priority,
                category: input.newItemData.category,
                amount: input.newItemData.amount
            }
        }

        const updatedItem: ItemDomainEntity = new ContributionsDomainService().updateItem(
            updateItemDomainServiceInput
        );

        await this.contributionsRepository.save(updatedItem);

        const output: UpdateItemContributionUseCaseOutputDTO = {
            updatedItem
        }

        return output;
    }
}   