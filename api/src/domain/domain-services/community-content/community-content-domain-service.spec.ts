import { CreatePublicationDomainServiceInput, UpdatePublicationDomainServiceInput, DeletePublicationDomainServiceInput, CreateCommentDomainServiceInput, UpdateCommentDomainServiceInput, DeleteCommentDomainServiceInput, CreateReplyDomainServiceInput, UpdateReplyDomainServiceInput, DeleteReplyDomainServiceInput } from './types/community-content-domain-inputs';
import { CommunityContentDomainService } from './community-content-domain-service';
import { OrganizationDomainEntity } from '@/domain/entities/organization/organization-domain-entity';
import { PublicationDomainEntity } from '@/domain/entities/community-content/publications/publication-domain-entity';
import { CommentDomainEntity } from '@/domain/entities/community-content/comments/comment-domain-entity';
import { ReplyDomainEntity } from '@/domain/entities/community-content/replies/reply-domain-entity';

import { AddressValueObject } from '@/domain/entities/value-objects/address-value-object';
import { PhoneValueObject } from '@/domain/entities/value-objects/phone-value-object';
import { FacebookSocialNetworkValueObject } from '@/domain/entities/value-objects/facebook-value-object';
import { InstagramSocialNetworkValueObject } from '@/domain/entities/value-objects/instragram-social-network-value-object';
import { LinkedinSocialNetworkValueObject } from '@/domain/entities/value-objects/linkedin-social-network-value-object';
import { SocialNetworkValueObject } from '@/domain/entities/value-objects/social-networking-value-object';
import { TwitterSocialNetworkValueObject } from '@/domain/entities/value-objects/twitter-value-network-value-object';


describe('(Unit Test) CommunityContentDomainService', () => {
    const communityContentDomainService = new CommunityContentDomainService();

    const organization = OrganizationDomainEntity.create({
        name: "Pulse Mais",
        area: "Animais de Rua",
        about: "About the organization",
        email: "test@organization.com",
        password: "123456",
        address: new AddressValueObject("Rua Exemplo", "123", "São Paulo", "SP", "12345678", 7777, -47.916667),
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
    });

    const validCreatePublicationInput: CreatePublicationDomainServiceInput = {
        organization: {
            id: organization.getId()!,
            name: organization.getName()!,
            photo: organization.getPhoto()!,
            area: organization.getArea()!
        },
        content: {
            subject: 'Valid Subject',
            text: 'This is a valid text for the publication.'
        }
    };

    const validCreateCommentInput: CreateCommentDomainServiceInput = {
        organization: {
            id: organization.getId()!,
            name: organization.getName()!,
            photo: organization.getPhoto()!,
            area: organization.getArea()!
        },
        publication: {
            content: {
                subject: 'subject',
                text: 'text'
            }
        },
        content: 'valid comment'
    };

    const validCreateReplyInput: CreateReplyDomainServiceInput = {
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
    };

    it('(createPublication) - Deve ser possível criar uma publicação se todos os dados forem válidos', () => {
        const publication = communityContentDomainService.createPublication(validCreatePublicationInput);
        expect(publication).toBeInstanceOf(PublicationDomainEntity);
    });

    it('(updatePublication) - Deve ser possível atualizar uma publicação se todos os dados forem válidos', () => {
        const actualData = PublicationDomainEntity.create(validCreatePublicationInput);
        const newData = {
            subject: 'Updated Subject',
            text: 'This is updated text for the publication.'
        };

        const input: UpdatePublicationDomainServiceInput = {
            actualData,
            newData
        };

        const updatedPublication = communityContentDomainService.updatePublication(input);

        expect(updatedPublication.getContent()!.subject).toBe('Updated Subject');
        expect(updatedPublication.getContent()!.text).toBe('This is updated text for the publication.');
    });

    it('(deletePublication) - Deve ser possível deletar uma publicação', () => {
        const publication = PublicationDomainEntity.create(validCreatePublicationInput);

        const input: DeletePublicationDomainServiceInput = { publication };

        const deletedPublication = communityContentDomainService.deletePublication(input);
        expect(deletedPublication.getIsDeleted()).toBe(true);
    });

    it('(createComment) - Deve ser possível criar um comentário se todos os dados forem válidos', () => {
        const comment = communityContentDomainService.createComment(validCreateCommentInput);
        expect(comment).toBeInstanceOf(CommentDomainEntity);
    });

    it('(updateComment) - Deve ser possível atualizar um comentário se todos os dados forem válidos', () => {
        const actualData = CommentDomainEntity.create(validCreateCommentInput);
        const newContent = 'Updated comment content';

        const input: UpdateCommentDomainServiceInput = {
            actualData,
            newContent
        };

        const updatedComment = communityContentDomainService.updateComment(input);
        expect(updatedComment.getContent()).toBe('Updated comment content');
    });

    it('(deleteComment) - Deve ser possível deletar um comentário', () => {
        const comment = CommentDomainEntity.create(validCreateCommentInput);

        const input: DeleteCommentDomainServiceInput = { comment };

        const deletedComment = communityContentDomainService.deleteComment(input);
        expect(deletedComment.getIsDeleted()).toBe(true);
    });

    it('(createReply) - Deve ser possível criar uma resposta se todos os dados forem válidos', () => {
        const reply = communityContentDomainService.createReply(validCreateReplyInput);
        expect(reply).toBeInstanceOf(ReplyDomainEntity);
    });

    it('(updateReply) - Deve ser possível atualizar uma resposta se todos os dados forem válidos', () => {
        const actualData = ReplyDomainEntity.create(validCreateReplyInput);
        const newContent = 'Updated reply content';

        const input: UpdateReplyDomainServiceInput = {
            actualData,
            newContent
        };

        const updatedReply = communityContentDomainService.updateReply(input);
        expect(updatedReply.getContent()).toBe('Updated reply content');
    });

    it('(deleteReply) - Deve ser possível deletar uma resposta', () => {
        const reply = ReplyDomainEntity.create(validCreateReplyInput);

        const input: DeleteReplyDomainServiceInput = { reply };

        const deletedReply = communityContentDomainService.deleteReply(input);
        expect(deletedReply.getIsDeleted()).toBe(true);
    });
});
