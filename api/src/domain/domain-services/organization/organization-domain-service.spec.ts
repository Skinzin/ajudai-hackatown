import { OrganizationDomainService } from './organization-domain-service';
import { OrganizationDomainEntity } from '@/domain/entities/organization/organization-domain-entity';
import { CreateOrganizationDomainServiceInput, DeleteOrganizationDomainServiceInput, ReadCommentsInteractionsDomainServiceInput, ReadPublicationsInteractionsDomainServiceInput, ReadRepliesInteractionsDomainServiceInput, UpdateOrganizationDomainServiceInput } from './types/organization-domain-service-inputs';
import { PhoneValueObject } from '@/domain/entities/value-objects/phone-value-object';
import { AddressValueObject } from '@/domain/entities/value-objects/address-value-object';
import { SocialNetworkValueObject } from '@/domain/entities/value-objects/social-networking-value-object';
import { LinkedinSocialNetworkValueObject } from '@/domain/entities/value-objects/linkedin-social-network-value-object';
import { InstagramSocialNetworkValueObject } from '@/domain/entities/value-objects/instragram-social-network-value-object';
import { FacebookSocialNetworkValueObject } from '@/domain/entities/value-objects/facebook-value-object';
import { TwitterSocialNetworkValueObject } from '@/domain/entities/value-objects/twitter-value-network-value-object';
import { CommentDomainEntity } from '@/domain/entities/community-content/comments/comment-domain-entity';
import { PublicationDomainEntity } from '@/domain/entities/community-content/publications/publication-domain-entity';
import { ReplyDomainEntity } from '@/domain/entities/community-content/replies/reply-domain-entity';


describe('(Unit Test) OrganizationDomainService', () => {
    const organizationDomainService = new OrganizationDomainService();

    const validCreateInput: CreateOrganizationDomainServiceInput = {
        name: "Pulse Mais",
        area: "Animais de Rua",
        about: "About the organization",
        email: "test@organization.com",
        password: "123456",
        Address: new AddressValueObject(),
        phone: new PhoneValueObject("+1234567890", true, true, false),
        photo: "https://example.com/photo.jpg",
        social: {
            linkedin: new SocialNetworkValueObject<LinkedinSocialNetworkValueObject>(
                "https://www.linkedin.com/company/pulse-mais/",
               
            ),
            instagram: new SocialNetworkValueObject<InstagramSocialNetworkValueObject>(
                "https://www.instagram.com/PulseMais/",
               
            ),
            twitter: new SocialNetworkValueObject<TwitterSocialNetworkValueObject>(
                "https://twitter.com/PulseMais/",
                
            ),
            facebook: new SocialNetworkValueObject<FacebookSocialNetworkValueObject>(
                "https://www.facebook.com/PulseMais/",
                
            )
        }
    };

    it('(createOrganization) - Deve ser possível criar uma organização se todos os dados forem válidos', () => {
        const organization = OrganizationDomainEntity.create(validCreateInput);
        expect(organization).toBeInstanceOf(OrganizationDomainEntity);
    });

    it('(updateOrganization) - Deve ser possível atualizar uma organização se todos os dados forem válidos', () => {
        const actualData = OrganizationDomainEntity.create(validCreateInput);
        const newData = {
            ...validCreateInput,
            name: 'Pedro pedro Pedro',

            isNeedSomeItems: true,
            isNeedVoluntarys: true,
            isProvideSomeItems: true,

        };

        const input: UpdateOrganizationDomainServiceInput = {
            actualData,
            newData
        };

        organizationDomainService.updateOrganization(input);
        expect(actualData.getName()).toBe('Pedro pedro Pedro');
    });

    it('(deleteOrganization) - Deve ser possível deletar uma organização e marcar suas interações como deletadas', () => {
        const organization = OrganizationDomainEntity.create(validCreateInput);
        const comment = CommentDomainEntity.create({
            organization: {
                id: organization.getId()!,
                name: organization.getName()!,
                photo: organization.getPhoto()!,
                area: organization.getArea()!
            },
            publish: {
                content: {
                    subject: 'subject',
                    text: 'text'
                }
            },
            content: 'valid comment'
        });
        const publication = PublicationDomainEntity.create({
            organization: {
                id: organization.getId()!,
                name: organization.getName()!,
                photo: organization.getPhoto()!,
                area: organization.getArea()!
            },
            content: {
                subject: 'subject',
                text: 'texto com 10 palavras, teste, to cansado, e amanhã tem o churras aaaaaaaa.'
            }
        });
        const reply = ReplyDomainEntity.create({
            organization: {
                id: organization.getId()!,
                name: organization.getName()!,
                photo: organization.getPhoto()!,
                area: organization.getArea()!
            },
            comment: {
                id: 'comment-id',
                subject: 'subject'
            },
            content: 'valid reply'
        });

        organization.setInterations({
            publications: [publication],
            comments: [comment],
            replies: [reply]
        });

        const input: DeleteOrganizationDomainServiceInput = { organization };

        organizationDomainService.deleteOrganization(input);

        expect(organization.getIsActive()).toBe(false);
        expect(publication.getIsDeleted()).toBe(true);
        expect(comment.getIsDeleted()).toBe(true);
        expect(reply.getIsDeleted()).toBe(true);
    });

    it('(readCommentsInteractions) - Deve ser possível ler as interações de comentários de uma organização', () => {
        const organization = OrganizationDomainEntity.create(validCreateInput);
        const comment = CommentDomainEntity.create({
            organization: {
                id: organization.getId()!,
                name: organization.getName()!,
                photo: organization.getPhoto()!,
                area: organization.getArea()!
            },
            publish: {
                content: {
                    subject: 'subject',
                    text: 'text'
                }
            },
            content: 'valid comment'
        });

        organization.setInterations({
            publications: [],
            comments: [comment],
            replies: []
        });

        const input: ReadCommentsInteractionsDomainServiceInput = { organization };
        const comments = organizationDomainService.readCommentsInteractions(input);

        expect(comments).toEqual([comment]);
    });

    it('(readRepliesInteractions) - Deve ser possível ler as interações de respostas de uma organização', () => {
        const organization = OrganizationDomainEntity.create(validCreateInput);
        const reply = ReplyDomainEntity.create({
            organization: {
                id: organization.getId()!,
                name: organization.getName()!,
                photo: organization.getPhoto()!,
                area: organization.getArea()!
            },
            comment: {
                id: 'comment-id',
                subject: 'subject'
            },
            content: 'valid reply'
        });

        organization.setInterations({
            publications: [],
            comments: [],
            replies: [reply]
        });

        const input: ReadRepliesInteractionsDomainServiceInput = { organization };
        const replies = organizationDomainService.readRepliesInteractions(input);

        expect(replies).toEqual([reply]);
    });

    it('(readPublicationsInteractions) - Deve ser possível ler as interações de publicações de uma organização', () => {
        const organization = OrganizationDomainEntity.create(validCreateInput);
        const publication = PublicationDomainEntity.create({
            organization: {
                id: organization.getId()!,
                name: organization.getName()!,
                photo: organization.getPhoto()!,
                area: organization.getArea()!
            },
            content: {
                subject: 'subject',
                text: 'Eu lembro bem, quem tava do ladoooo lá no passado, quem acreditou, quem deu risada, quem me gastava! Agora é fácil, vários querendo pousar do lado, mas só toca no tesouro quem tava naquele barco!'
            }
        });

        organization.setInterations({
            publications: [publication],
            comments: [],
            replies: []
        });

        const input: ReadPublicationsInteractionsDomainServiceInput = { organization };
        const publications = organizationDomainService.readPublicationsInteractions(input);

        expect(publications).toEqual([publication]);
    });
});
