import { CommunityContentRepository } from './../../../../../domain/repositories/community-content-repository';
import { CreatePublicationUseCaseOutputDTO } from './DTO/create-publication-use-case-output-dto';
import { CreatePublicationUseCaseInputDTO } from './DTO/create-publication-use-case-input-dto';
import { CommunityContentDomainService } from '@/domain/domain-services/community-content/community-content-domain-service';
import { PublicationDomainEntity } from '@/domain/entities/community-content/publications/publication-domain-entity';


export class CreatePublicationUseCase {
    constructor(
        private readonly communityContentRepository: CommunityContentRepository

    ) {}

    async execute(input: CreatePublicationUseCaseInputDTO): Promise<CreatePublicationUseCaseOutputDTO> {

        const organization = await this.organizationRepository.findById(input.organization.id);
        if (!organization) {
            throw new Error("Organization not found, criar exception personalizada dps.");
        }



        const createdPublication: PublicationDomainEntity = new CommunityContentDomainService().createPublication(input);




        const output: CreatePublicationUseCaseOutputDTO = {
            publication: savedPublication
        }


    }
}