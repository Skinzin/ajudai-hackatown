import { CommunityContentRepository } from './../../../../../domain/repositories/community-content-repository';
import { CreatePublicationUseCaseOutputDTO } from './DTO/create-publication-use-case-output-dto';
import { CreatePublicationUseCaseInputDTO } from './DTO/create-publication-use-case-input-dto';
import { CommunityContentDomainService } from '@/domain/domain-services/community-content/community-content-domain-service';
import { PublicationDomainEntity } from '@/domain/entities/community-content/publications/publication-domain-entity';
import { OrganizationsRepository } from '@/domain/repositories/organizations-repository';
import { CreatePublicationDomainServiceInput } from '@/domain/domain-services/community-content/types/community-content-domain-inputs';
import { OrganizationNotFoundApplicationException } from '@/application/application-exceptions/organization-not-found-application-exception';


export class CreatePublicationUseCase {
    constructor(
        private readonly communityContentRepository: CommunityContentRepository,
        private readonly organizationRepository: OrganizationsRepository
    ) { }

    async execute(input: CreatePublicationUseCaseInputDTO): Promise<CreatePublicationUseCaseOutputDTO> {

        const organization = await this.organizationRepository.findById(input.idOrganization);
        if (!organization) {
            throw new OrganizationNotFoundApplicationException(
                "read-organization-use-case.ts",
                23,
                "O organização com o id informado não foi encontrada."
            )
        }

        const createPublicationDomainServiceInput: CreatePublicationDomainServiceInput = {
            organization: {
                id: organization.getId()!,
                name: organization.getName()!,
                area: organization.getArea()!,
                photo: organization.getPhoto()!
            },

            content: input.content
        }

        const createdPublication: PublicationDomainEntity = new CommunityContentDomainService().createPublication(
            createPublicationDomainServiceInput
        );

        this.communityContentRepository.save(createdPublication);

        const output: CreatePublicationUseCaseOutputDTO = {
            publication: createdPublication
        }

        return output;
    }
}