import { CommentNotFoundApplicationException } from "@/application/application-exceptions/comment-not-found-application-exception";
import { OrganizationNotFoundApplicationException } from "@/application/application-exceptions/organization-not-found-application-exception";
import { CommunityContentDomainService } from "@/domain/domain-services/community-content/community-content-domain-service";
import { UpdateCommentDomainServiceInput } from "@/domain/domain-services/community-content/types/community-content-domain-inputs";
import { OrganizationDomainService } from "@/domain/domain-services/organization/organization-domain-service";
import { CommentDomainEntity } from "@/domain/entities/community-content/comments/comment-domain-entity";
import { CommunityContentRepository } from "@/domain/repositories/community-content-repository";
import { OrganizationsRepository } from "@/domain/repositories/organizations-repository";
import { UpdateCommentUseCaseInputDTO } from "./DTOs/update-comment-use-case-input-DTO";
import { UpdateCommentUseCaseOutputDTO } from "./DTOs/update-comment-use-case-output-DTO";


export class UpdateCommentUseCase {
    constructor(
        private readonly communityContentRepository: CommunityContentRepository,
        private readonly organizationRepository: OrganizationsRepository
    ) { }

    async execute(input: UpdateCommentUseCaseInputDTO): Promise<UpdateCommentUseCaseOutputDTO> {

        const organization = await this.organizationRepository.findById(input.idOrganization);
        if (!organization) {
            throw new OrganizationNotFoundApplicationException(
                "read-organization-use-case.ts",
                23,
                "O organização com o id informado não foi encontrada."
            )
        }

        const comment = new OrganizationDomainService().getCommentInteraction({
            organization,
            interactionId: input.idComment
        });

        if (!comment) {
            throw new CommentNotFoundApplicationException(
                "read-comment-use-case.ts",
                23,
                "A publicação com o id informado não foi encontrada."
            )
        }

        const updateCommentDomainServiceInput: UpdateCommentDomainServiceInput = {            
            actualData: comment,
            newContent: input.content
        }

        const updatedComment: CommentDomainEntity = new CommunityContentDomainService().updateComment(
            updateCommentDomainServiceInput
        );

        this.communityContentRepository.save(updatedComment);

        const output: UpdateCommentUseCaseOutputDTO = {
            updatedComment
        }

        return output;
    }
}   