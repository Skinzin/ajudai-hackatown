import { OrganizationNotFoundApplicationException } from "@/application/application-exceptions/organization-not-found-application-exception";
import { CommunityContentDomainService } from "@/domain/domain-services/community-content/community-content-domain-service";
import { CreateReplyDomainServiceInput } from "@/domain/domain-services/community-content/types/community-content-domain-inputs";
import { OrganizationDomainService } from "@/domain/domain-services/organization/organization-domain-service";
import { ReplyDomainEntity } from "@/domain/entities/community-content/replies/reply-domain-entity";
import { CommunityContentRepository } from "@/domain/repositories/community-content-repository";
import { OrganizationsRepository } from "@/domain/repositories/organizations-repository";
import { CreateReplyUseCaseInputDTO } from "./DTOs/create-reply-use-case-input-DTO";
import { CreateReplyUseCaseOutputDTO } from "./DTOs/create-reply-use-case-output-DTO";
import { CommentNotFoundApplicationException } from "@/application/application-exceptions/comment-not-found-application-exception";


export class CreateReplyUseCase {
    constructor(
        private readonly communityContentRepository: CommunityContentRepository,
        private readonly organizationRepository: OrganizationsRepository
    ) { }

    async execute(input: CreateReplyUseCaseInputDTO): Promise<CreateReplyUseCaseOutputDTO> {

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

        const createReplyDomainServiceInput: CreateReplyDomainServiceInput = {
            organization: {
                id: organization.getId()!,
                name: organization.getName()!,
                photo: organization.getPhoto()!,
                area: organization.getArea()!
            },
            comment: {
                id: input.idComment,
                subject: comment.getpublication()!.content!.subject!,
            },

            content: input.content
        }

        const createdReply: ReplyDomainEntity = new CommunityContentDomainService().createReply(
            createReplyDomainServiceInput
        );

        await this.communityContentRepository.save(createdReply);

        const output: CreateReplyUseCaseOutputDTO = {
            reply: createdReply
        }

        return output;
    }
}   