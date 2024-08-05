import { OrganizationNotFoundApplicationException } from "@/application/application-exceptions/organization-not-found-application-exception";
import { PublicationNotFoundApplicationException } from "@/application/application-exceptions/publication-not-found-application-exception";
import { CommunityContentDomainService } from "@/domain/domain-services/community-content/community-content-domain-service";
import { CreateCommentDomainServiceInput } from "@/domain/domain-services/community-content/types/community-content-domain-inputs";
import { OrganizationDomainService } from "@/domain/domain-services/organization/organization-domain-service";
import { CommentDomainEntity } from "@/domain/entities/community-content/comments/comment-domain-entity";
import { CommunityContentRepository } from "@/domain/repositories/community-content-repository";
import { OrganizationsRepository } from "@/domain/repositories/organizations-repository";
import { CreateCommentUseCaseOutputDTO } from "./DTOs/create-comment-use-case-output-DTO";
import { CreateCommentUseCaseInputDTO } from "./DTOs/create-comment-use-case-input-DTO";


export class CreateCommentUseCase {
    constructor(
        private readonly communityContentRepository: CommunityContentRepository,
        private readonly organizationRepository: OrganizationsRepository
    ) { }

    async execute(input: CreateCommentUseCaseInputDTO): Promise<CreateCommentUseCaseOutputDTO> {

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

        const createCommentDomainServiceInput: CreateCommentDomainServiceInput = {
            organization: {
                id: organization.getId()!,
                name: organization.getName()!,
                area: organization.getArea()!,
                photo: organization.getPhoto()!
            },
            publication,
            content: input.content
        }

        const createdComment: CommentDomainEntity = new CommunityContentDomainService().createComment(
            createCommentDomainServiceInput
        );

        this.communityContentRepository.save(createdComment);

        const output: CreateCommentUseCaseOutputDTO = {
            comment: createdComment
        }

        return output;
    }
}