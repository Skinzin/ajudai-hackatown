import { CommunityContentRepository } from './../../../../../domain/repositories/community-content-repository';
import { CreatePublicationUseCaseOutputDTO } from './DTO/create-publication-use-case-output-dto';
import { CreatePublicationUseCaseInputDTO } from './DTO/create-publication-use-case-input-dto';
import { CommunityContentDomainService } from '@/domain/domain-services/community-content/community-content-domain-service';
import { PublicationDomainEntity } from '@/domain/entities/community-content/publications/publication-domain-entity';
import { OrganizationsRepository } from '@/domain/repositories/organizations-repository';
import { CreatePublicationDomainServiceInput } from '@/domain/domain-services/community-content/types/community-content-domain-inputs';


export class CreatePublicationUseCase {
    constructor(
        private readonly communityContentRepository: CommunityContentRepository,
        private readonly organizationRepository: OrganizationsRepository
    ) { }

    async execute(input: CreatePublicationUseCaseInputDTO): Promise<CreatePublicationUseCaseOutputDTO> {

        const organization = await this.organizationRepository.findById(input.idOrganization);
        if (!organization) {
            throw new Error("Organization not found, criar exception personalizada dps.");
        }

        const createPublicationDomainServiceInput: CreatePublicationDomainServiceInput = {
            organization: organization,
            content: input.content
        }

        const createdPublication: PublicationDomainEntity = new CommunityContentDomainService().createPublication(
            createPublicationDomainServiceInput
        );

        const updatedOrganizationInteractions = organization.addInteraction(createdPublication);

        this.organizationRepository.save(updatedOrganizationInteractions);
        this.communityContentRepository.save(createdPublication);

        const output: CreatePublicationUseCaseOutputDTO = {
            publication: createdPublication
        }


    }
}