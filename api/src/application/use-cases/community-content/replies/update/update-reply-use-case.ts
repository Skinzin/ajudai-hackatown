import { OrganizationNotFoundApplicationException } from "@/application/application-exceptions/organization-not-found-application-exception";
import { ReplyNotFoundApplicationException } from "@/application/application-exceptions/reply-not-found-application-exception";
import { CommunityContentDomainService } from "@/domain/domain-services/community-content/community-content-domain-service";
import { UpdateReplyDomainServiceInput } from "@/domain/domain-services/community-content/types/community-content-domain-inputs";
import { OrganizationDomainService } from "@/domain/domain-services/organization/organization-domain-service";
import { ReplyDomainEntity } from "@/domain/entities/community-content/replies/reply-domain-entity";
import { CommunityContentRepository } from "@/domain/repositories/community-content-repository";
import { OrganizationsRepository } from "@/domain/repositories/organizations-repository";
import { UpdateReplyUseCaseInputDTO } from "./DTOs/update-reply-use-case-input-DTO";
import { UpdateReplyUseCaseOutputDTO } from "./DTOs/update-reply-use-case-output-DTO";


export class UpdateReplyUseCase {
    constructor(
        private readonly communityContentRepository: CommunityContentRepository,
        private readonly organizationRepository: OrganizationsRepository
    ) { }

    async execute(input: UpdateReplyUseCaseInputDTO): Promise<UpdateReplyUseCaseOutputDTO> {
        const organization = await this.organizationRepository.findById(input.idOrganization);
        if (!organization) {
            throw new OrganizationNotFoundApplicationException(
                "read-organization-use-case.ts",
                23,
                "O organização com o id informado não foi encontrada."
            )
        }

        const reply = new OrganizationDomainService().getReplyInteraction({
            organization,
            interactionId: input.idReply
        });

        if (!reply) {
            throw new ReplyNotFoundApplicationException(
                "read-reply-use-case.ts",
                23,
                "A publicação com o id informado não foi encontrada."
            )
        }

        const updateReplyDomainServiceInput: UpdateReplyDomainServiceInput = {
            actualData: reply,
            newContent: input.content
        }

        const updatedReply: ReplyDomainEntity = new CommunityContentDomainService().updateReply(
            updateReplyDomainServiceInput
        );

        this.communityContentRepository.save(updatedReply);

        const output: UpdateReplyUseCaseOutputDTO = {
            updatedReply
        }

        return output;
    }
}