/* eslint-disable @typescript-eslint/no-explicit-any */
import type { validationVehicleType } from "../types/typesOfZod";
import { ZodValidate } from "../utils/zodValidationUtil";
import { VehicleSchema } from "../validations/validation-zod";
import { api } from "./BaseURL";


export async function VehicleRegistrationApi(data: validationVehicleType, token: string) {
  try {
    const result = ZodValidate(VehicleSchema, data);

    if (!result.success === true) {
      const { fieldErrors } = result.error.flatten();
      return {
        success: false,
        message: fieldErrors,
      };
    }
    
    const response = await api.post(
      "/api/veiculos/entrada",
      { placa: data.placa },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, response: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || error.data };
  }
}