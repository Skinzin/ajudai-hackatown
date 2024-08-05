import { OrganizationNotFoundApplicationException } from "@/application/application-exceptions/organization-not-found-application-exception";
import { PublicationNotFoundApplicationException } from "@/application/application-exceptions/publication-not-found-application-exception";
import { CommunityContentDomainService } from "@/domain/domain-services/community-content/community-content-domain-service";
import { UpdatePublicationDomainServiceInput } from "@/domain/domain-services/community-content/types/community-content-domain-inputs";
import { OrganizationDomainService } from "@/domain/domain-services/organization/organization-domain-service";
import { PublicationDomainEntity } from "@/domain/entities/community-content/publications/publication-domain-entity";
import { CommunityContentRepository } from "@/domain/repositories/community-content-repository";
import { OrganizationsRepository } from "@/domain/repositories/organizations-repository";
import { UpdatePublicationUseCaseInputDTO } from "./DTOs/update-publication-use-case-input-DTO";
import { UpdatePublicationUseCaseOutputDTO } from "./DTOs/update-publication-use-case-output-DTO";


export class UpdatePublicationUseCase {
    constructor(
        private readonly communityContentRepository: CommunityContentRepository,
        private readonly organizationRepository: OrganizationsRepository
    ) { }

    async execute(input: UpdatePublicationUseCaseInputDTO): Promise<UpdatePublicationUseCaseOutputDTO> {

        const organization = await this.organizationRepository.findById(input.idOrganization);
        if (!organization) {
            throw new OrganizationNotFoundApplicationException(
                "read-organization-use-case.ts",
                23,
                "O organização com o id informado não foi encontrada."
            )
        }

        const publication = new OrganizationDomainService().getPublicationInteraction({
            organization,
            interactionId: input.idPublication
        });

        if (!publication) {
            throw new PublicationNotFoundApplicationException(
                "read-publication-use-case.ts",
                23,
                "A publicação com o id informado não foi encontrada."
            )
        }

        const updatePublicationDomainServiceInput: UpdatePublicationDomainServiceInput = {
            actualData: publication,
            newData: input.content,
        }

        const updatedPublication: PublicationDomainEntity = new CommunityContentDomainService().updatePublication(
            updatePublicationDomainServiceInput
        );

        this.communityContentRepository.save(updatedPublication);

        const output: UpdatePublicationUseCaseOutputDTO = {
            updatedPublication
        }

        return output;
    }
}       