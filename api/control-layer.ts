import { InMemoryOrganizationDatabase } from './src/infra/database/memory/in-memory-organization-database';
import { InMemoryCommunityInteractionsDatabase } from './src/infra/database/memory/in-memory-community-interactions-database';
import { InMemoryContributionsDatabase } from './src/infra/database/memory/in-memory-contributions-database';
import { FastifyInstance } from 'fastify';
import { OrganizationController } from './src/application/controllers/organization-controller';
import { OrganizationRoutes } from './src/application/routes/organization/organization-routes';

export const ControlLayer = (server: FastifyInstance) => {

    // bancos de dados, trocar por um real dps.
    const organizationsRepository = new InMemoryOrganizationDatabase();
    const communityContentRepository = new InMemoryCommunityInteractionsDatabase();
    const contributionsRepository = new InMemoryContributionsDatabase();

    // controllerrs aaaaaaaaaaaa
    const organizationController = new OrganizationController(
        organizationsRepository,
        communityContentRepository,
        contributionsRepository
    );

    OrganizationRoutes(server, organizationController);
}