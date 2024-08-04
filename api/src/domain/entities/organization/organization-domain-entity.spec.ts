import { InvalidOrganizationPropetyDomainException } from "../../domain-exceptions/invalid-organization-propety-domain-exception";
import { OrganizationDomainEntity } from "./organization-domain-entity";
import { CreateOrganizationInput, RestoreOrganizationInput } from "@/domain/entities/organization/types/organization-domain-entity-inputs";
import { PhoneValueObject } from "../value-objects/phone-value-object";
import { AddressValueObject } from "../value-objects/address-value-object";
import { SocialNetworkValueObject } from "../value-objects/social-networking-value-object";
import { LinkedinSocialNetworkValueObject } from "../value-objects/linkedin-social-network-value-object";
import { InstagramSocialNetworkValueObject } from "../value-objects/instragram-social-network-value-object";
import { EmptySocialNetworkValueObject } from "../value-objects/empty-social-network-value-object";
import { CommentDomainEntity } from "../community-content/comments/comment-domain-entity";


describe("(UnityTest) - OrganizationDomainEntity \n\n", () => {

    const defaultInstagramSocialNetworkValueObject = new SocialNetworkValueObject<InstagramSocialNetworkValueObject>(
        "https://www.instagram.com/PulseMais/",
    );

    const defaultLinkedinSocialNetworkValueObject = new SocialNetworkValueObject<LinkedinSocialNetworkValueObject>(
        "https://www.linkedin.com/company/pulse-mais/",
    );

    const input: CreateOrganizationInput = {
        name: "Pulse Mais",
        area: "Animais de Rua",
        about: "About the organization",
        email: "test@organization.com",
        password: "123456",
        Address: new AddressValueObject(),
        phone: new PhoneValueObject("+1234567890", true, true, false),
        photo: "https://example.com/photo.jpg",
        social: {
            linkedin: new EmptySocialNetworkValueObject(),
            instagram: new EmptySocialNetworkValueObject(),
            twitter: new EmptySocialNetworkValueObject(),
            facebook: new EmptySocialNetworkValueObject(),
        }
    };

    const someComment: CommentDomainEntity = CommentDomainEntity.create({
 
        organization: {
            id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
            name: "Pulse Mais",
            area: "Animais de Rua",
            photo: "https://example.com/photo.jpg",
        },
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaa",
        publish: {
            content: {
                subject: "subject",
                text: "text",
            }
        }
    });


    const defaultRestoreOrganizationInput: RestoreOrganizationInput = {
        ...input,

        id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
        interations: {
            publications: [],
            comments: [someComment],
            replies: [],
        },

        address: new AddressValueObject(),
        password: "123456",

        isActive: true,
        isNeedSomeItems: true,
        isNeedVoluntarys: false,
        isProvideSomeItems: true,

        items: {
            needs: [],
            provide: [],
        },


        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const organizationDefault = OrganizationDomainEntity.create(input);

    it("(create) - Deve ser possível criar uma organização se todos os dados forem válidos", () => {
        const organization = OrganizationDomainEntity.create(input);

        expect(organization).toBeTruthy();
        expect(organization).toBeInstanceOf(OrganizationDomainEntity);

        expect(organization.getName()).toEqual("Pulse Mais");
        expect(organization.getEmail()).toEqual("test@organization.com");
        expect(organization.getArea()).toEqual("Animais de Rua");
        expect(organization.getAbout()).toEqual("About the organization");
        expect(organization.getAddress()).toEqual(input.Address);
        expect(organization.getPhone()).toEqual(input.phone);
        expect(organization.getPhoto()).toEqual("https://example.com/photo.jpg");
    });

    it("(create [name]) - Não deve ser possível criar uma organização com o nome inválido", () => {
        const inputWithInvalidName = { ...input, name: "" };

        expect(() => OrganizationDomainEntity.create(inputWithInvalidName)).toThrow(
            new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                196,
                "name",
                "O nome não pode ser vazio!"
            )
        );
    });

    it("(create [email]) - Não deve ser possível criar uma organização com um e-mail inválido", () => {
        const inputWithInvalidEmail = { ...input, email: "invalid-email" };

        expect(() => OrganizationDomainEntity.create(inputWithInvalidEmail)).toThrow(
            new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                325,
                "email",
                "O e-mail fornecido não é válido."
            )
        );
    });

    it("(create [email]) - Não deve ser possível criar uma organização com um e-mail banido", () => {
        const inputWithBannedEmail = { ...input, email: "test@fake.com" };

        expect(() => OrganizationDomainEntity.create(inputWithBannedEmail)).toThrow(
            new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                332,
                "email",
                "O domínio do e-mail fornecido está banido."
            )
        );
    });

    it("(create [photo]) - Não deve ser possível criar uma organização com uma URL de foto inválida", () => {
        const inputWithInvalidPhoto = { ...input, photo: "invalid-url" };

        expect(() => OrganizationDomainEntity.create(inputWithInvalidPhoto)).toThrow(
            new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                457,
                "photo",
                "A URL da foto fornecida não é válida."
            )
        );
    });

    it("(restore) - Deve ser possível restaurar uma organização se todos os dados forem válidos", () => {

        const organization = OrganizationDomainEntity.restore(defaultRestoreOrganizationInput);

        expect(organization).toBeTruthy();
        expect(organization).toBeInstanceOf(OrganizationDomainEntity);

        expect(organization.getId()).toEqual(defaultRestoreOrganizationInput.id);
        expect(organization.getName()).toEqual("Pulse Mais");
        expect(organization.getEmail()).toEqual("test@organization.com");
        expect(organization.getArea()).toEqual("Animais de Rua");
        expect(organization.getAbout()).toEqual("About the organization");
        expect(organization.getAddress()).toEqual(defaultRestoreOrganizationInput.address);
        expect(organization.getPhone()).toEqual(defaultRestoreOrganizationInput.phone);
        expect(organization.getPhoto()).toEqual("https://example.com/photo.jpg");
        expect(organization.getInterations()).toEqual(defaultRestoreOrganizationInput.interations);
        expect(organization.getCreatedAt()).toEqual(defaultRestoreOrganizationInput.createdAt);
        expect(organization.getUpdatedAt()).toEqual(defaultRestoreOrganizationInput.updatedAt);
    });

    it("(restore [id]) - Não deve ser possível restaurar uma organização se o id não for válido", () => {
        const restoreInputWithInvalidId: RestoreOrganizationInput = {
            ...defaultRestoreOrganizationInput,
        };

        restoreInputWithInvalidId.id = "invalid-id";

        expect(() => OrganizationDomainEntity.restore(restoreInputWithInvalidId)).toThrow(
            new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                131,
                "id",
                "O id da organização não é válido."
            )
        );
    });

    it("(restore [email]) - Não deve ser possível restaurar uma organização com um e-mail inválido", () => {
        const restoreInputWithInvalidEmail = {
            ...defaultRestoreOrganizationInput,
        };

        restoreInputWithInvalidEmail.email = "invalid-email";

        expect(() => OrganizationDomainEntity.restore(restoreInputWithInvalidEmail)).toThrow(
            new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                325,
                "email",
                "O e-mail fornecido não é válido."
            )
        );
    });

    it("(restore [photo]) - Não deve ser possível restaurar uma organização com uma URL de foto inválida", () => {
        const restoreInputWithInvalidPhoto = {
            ...defaultRestoreOrganizationInput,
        }

        restoreInputWithInvalidPhoto.photo = "invalid-url";

        expect(() => OrganizationDomainEntity.restore(restoreInputWithInvalidPhoto)).toThrow(
            new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                457,
                "photo",
                "A URL da foto fornecida não é válida."
            )
        );
    });

    it("(setName) - Deve alterar o nome caso seja válido", () => {
        organizationDefault.setName("New Organization Name");
        expect(organizationDefault.getName()).toEqual("New Organization Name");
    });

    it("(setName) - Não deve alterar o nome caso não seja válido", () => {
        expect(() => organizationDefault.setName("")).toThrow(
            new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                196,
                "name",
                "O nome não pode ser vazio!"
            )
        );
    });

    it("(setEmail) - Deve alterar o e-mail caso seja válido", () => {
        organizationDefault.setEmail("new@organization.com");
        expect(organizationDefault.getEmail()).toEqual("new@organization.com");
    });

    it("(setEmail) - Não deve alterar o e-mail caso não seja válido", () => {
        expect(() => organizationDefault.setEmail("invalid-email")).toThrow(
            new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                325,
                "email",
                "O e-mail fornecido não é válido."
            )
        );
    });

    it("(setPhone) - Deve alterar o telefone caso seja válido", () => {
        const newPhone = new PhoneValueObject("+5511970707777", false, true, false);
        organizationDefault.setPhone(newPhone);
        expect(organizationDefault.getPhone()).toEqual(newPhone);
    });

    it("(setPhoto) - Deve alterar a URL da foto caso seja válida", () => {
        organizationDefault.setPhoto("https://example.com/newphoto.jpg");
        expect(organizationDefault.getPhoto()).toEqual("https://example.com/newphoto.jpg");
    });

    it("(setPhoto) - Não deve alterar a URL da foto caso não seja válida", () => {
        expect(() => organizationDefault.setPhoto("invalid-url")).toThrow(
            new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                457,
                "photo",
                "A URL da foto fornecida não é válida."
            )
        );
    });

    it("(setCreatedAt) - Deve alterar a data de criação caso seja válida", () => {
        const newDate = new Date();
        organizationDefault.setCreatedAt(newDate);
        expect(organizationDefault.getCreatedAt()).toEqual(newDate);
    });

    it("(setCreatedAt) - Não deve alterar a data de criação caso não seja válida", () => {
        expect(() => organizationDefault.setCreatedAt(new Date("invalid-date"))).toThrow(
            new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                551,
                "createdAt",
                "A data de criação fornecida não é válida."
            )
        );
    });

    it("(setUpdatedAt) - Deve alterar a data de atualização caso seja válida", () => {
        const newDate = new Date();
        organizationDefault.setUpdatedAt(newDate);
        expect(organizationDefault.getUpdatedAt()).toEqual(newDate);
    });

    it("(setUpdatedAt) - Não deve alterar a data de atualização caso não seja válida", () => {
        expect(() => organizationDefault.setUpdatedAt(new Date("invalid-date"))).toThrow(
            new InvalidOrganizationPropetyDomainException(
                "organization-domain-entity.ts",
                569,
                "updatedAt",
                "A data de atualização fornecida não é válida."
            )
        );
    });
});
