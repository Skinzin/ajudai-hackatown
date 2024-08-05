import { CreateOrganizationUseCaseOutputDTO } from './../../use-cases/organization/create/DTOs/create-organization-use-case.output-DTO';
import { OrganizationController } from "@/application/controllers/organization-controller";
import { CreateOrganizationInput } from "@/domain/entities/organization/types/organization-domain-entity-inputs";
import { FastifyAdapter } from '@/infra/adapters/fastity-adapter';
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";


export const OrganizationRoutes = (server: FastifyInstance, organizationController: OrganizationController) => {
    /**   
        * * CRIAR UMA ORGANIZAÇÃO (não vai dar tempo de documentar tudo, mas o padrão seria assim...)

        * @description Cria uma org  
        * @endpoint organization/create
        * @method POST
        * @param {CreateOrganizationInput} 
        * @returns {Promise<CreateOrganizationUseCaseOutputDTO>}  
    */

    server.post("/create-trail-class/:idTrail", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply);

        return await organizationController.createOrganization(fastifyAdapter);
    });

}