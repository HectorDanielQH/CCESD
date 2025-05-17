import {z} from "zod";

export const resgisterSchema = z.object({
    username: z.string({
        required_error:"Username es requerido"
    }),
    email: z
        .string({
            required_error:"email es requerido"
        })
        .email({
            message:"email invalido"
        }),
    password: z
        .string({
            required_error:"password es requerido"
        })
        .min(6,{
            message:"password debe ser mayor a 6 letras"
        })
});

export const loginSchema=z.object({
    email: z
        .string({
            required_error:"email es requerido"
        })
        .email({
            message:"email invalido"
        }),
    password: z
        .string({
            required_error:"password es requerido"
        })
        .min(6,{
            message:"password debe ser mayor a 6 letras"
        })
})