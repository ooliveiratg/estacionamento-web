/* eslint-disable @typescript-eslint/no-explicit-any */
import type { validationRegisterType } from "../types/typesOfZod";
import { ZodValidate } from "../utils/zodValidationUtil";
import { RegisterSchema } from "../validations/validation-zod";
import { api } from "./BaseURL";

export async function RegisterApi(data: validationRegisterType) {
    try {
        const result = ZodValidate(RegisterSchema,data)
        if (!result.success === true) {
      const { fieldErrors } = result.error.flatten();
      return {
        success: false,
        message: fieldErrors,
      };
    }
        const response = await api.post('/auth/register', {
            nome: data.name,
            email: data.email,
            senha: data.senha
        })

         return { success: true, response: response }
    } catch (error:any) {
        return { success: false, error: error.message || error.data }
    }
}