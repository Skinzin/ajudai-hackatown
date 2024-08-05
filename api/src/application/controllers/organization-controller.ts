import { ContributionsRepository } from '@/domain/repositories/contributions-repository';
import { CommunityContentRepository } from './../../domain/repositories/community-content-repository';

import { GenericController } from "./generic-controller";

import { OrganizationsRepository } from "@/domain/repositories/organizations-repository";
import { CreateOrganizationUseCaseInputDTO } from '../use-cases/organization/create/DTOs/create-organization-use-case.input-DTO';
import { CreateOrganizationUseCaseOutputDTO } from '../use-cases/organization/create/DTOs/create-organization-use-case.output-DTO';
import { IHttpContext } from '@/infra/ports/IHttp-context';
import { IHttpResponse } from '@/infra/ports/IHttp-response';
import { CreateOrganizationUseCase } from '../use-cases/organization/create/create-organization-use-case';

export class OrganizationController extends GenericController {
    constructor(
        private readonly organizationsRepository: OrganizationsRepository,
        private readonly communityContentRepository: CommunityContentRepository,
        private readonly contributionsRepository: ContributionsRepository
    ) {
        super();
    }

    async createOrganization(ctx: IHttpContext): Promise<IHttpResponse<CreateOrganizationUseCaseOutputDTO>> {
        try {
            const input: CreateOrganizationUseCaseInputDTO = {
                name: ctx.getRequest().body.name,
                area: ctx.getRequest().body.area,
                about: ctx.getRequest().body.about,
                email: ctx.getRequest().body.email,
                password: ctx.getRequest().body.password,
                address: ctx.getRequest().body.address,
                phone: ctx.getRequest().body.phone,
                photo: ctx.getRequest().body.photo,
                social: ctx.getRequest().body.social,
            }

            const output: CreateOrganizationUseCaseOutputDTO = await new CreateOrganizationUseCase(this.organizationsRepository).execute(input);
            return this.createSuccessResponse(output);
        } catch (error) {
            return this.createErrorResponse(error);
        }
    }


}