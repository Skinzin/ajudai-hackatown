import { z } from "zod";

const schemaFormOrganization = z.object({
    name: z.string({
        required_error: "O nome é obrigatório",
    })
        .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
    area: z.string({
        required_error: "A área é obrigatória",
    })
        .min(3, { message: "A área deve ter no mínimo 3 caracteres" }),
    about: z.string({ required_error: "A descrição é obrigatória" })
        .min(10, { message: "A descrição deve ter no mínimo 10 caracteres" }),
    address: z.object({
        street: z.string({ required_error: "A rua é obrigatória" })
            .min(3, { message: "A rua deve ter no mínimo 3 caracteres" }),
        number: z.string({ required_error: "O número é obrigatório" })
            .min(1, { message: "O número deve ter no mínimo 1 caractere" }),
        city: z.string({ required_error: "A cidade é obrigatória" })
            .min(3, { message: "A cidade deve ter no mínimo 3 caracteres" }),
        state: z.string({ required_error: "O estado é obrigatório" })
            .min(2, { message: "O estado deve ter no mínimo 2 caracteres" }),
        cep: z.string({ required_error: "O CEP é obrigatório" })
            .min(8, { message: "O CEP deve ter no mínimo 8 caracteres" })
            .max(8, { message: "O CEP deve ter no máximo 8 caracteres" })
            .transform(value => {
                const numericValue = value.replace(/\D/g, '');
                return numericValue.replace(/(\d{5})(\d{3})/, '$1-$2');
            }),
        lat: z.number().optional(),
        lng: z.number().optional(),
    }),
    photo: z.any().optional(),
    email: z.string({ required_error: "O e-mail é obrigatório" })
        .email({ message: "O e-mail é inválido" }),
    password: z.string({ required_error: "A senha é obrigatória" })
        .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    phone: z.string({ required_error: "O telefone é obrigatório" })
        .min(10, { message: "O telefone deve ter no mínimo 10 caracteres" }),
    social: z.object({
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        linkedin: z.string().optional(),
        twitter: z.string().optional(),
    }).optional(),
    isNeedVoluntarys: z.boolean().default(false),
    isNeedSomeItems: z.boolean().default(true),
    isProvideSomeItems: z.boolean().default(false),
});

type FormOrganizationData = z.infer<typeof schemaFormOrganization>;

const schemaFormLoginOrganization = z.object({
    email: z.string({ required_error: "O e-mail é obrigatório" })
        .email({ message: "O e-mail é inválido" }),
    password: z.string({ required_error: "A senha é obrigatória" })
        .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

const schemaFormItem = z.object({
    type: z.enum(["need", "provide"]),
    title: z.string({ required_error: "O título é obrigatório" })
        .min(3, { message: "O título deve ter no mínimo 3 caracteres" }),
    photo: z.any().optional(),
    donationValue: z.number({ required_error: "O valor da doação é obrigatório" })
        .min(1, { message: "O valor da doação deve ser no mínimo 1" }),
    priority: z.enum(["emergency", "high", "moderate", "normal"])
        .default("normal"),
    category: z.string({ required_error: "A categoria é obrigatória" })
        .min(3, { message: "A categoria deve ter no mínimo 3 caracteres" }),
    amount: z.number().default(1),
    isDone: z.boolean().default(true),
});

type FormItemData = z.infer<typeof schemaFormItem>;

export {
    schemaFormOrganization,
    schemaFormLoginOrganization,
    schemaFormItem,
}

export type { 
    FormOrganizationData,
    FormItemData,
}
