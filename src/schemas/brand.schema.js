import { z } from 'zod';

export const createBrandSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre es obligatorio',
      invalid_type_error: 'El nombre debe ser una cadena de texto',
    })
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .max(80, { message: 'El nombre no puede exceder los 80 caracteres' }),

  country: z
    .string({
      invalid_type_error: 'El país debe ser una cadena de texto',
    })
    .max(60, { message: 'El país no puede exceder los 60 caracteres' })
    .optional(),

  website: z
    .string({
      invalid_type_error: 'El sitio web debe ser una cadena de texto',
    })
    .max(200, { message: 'El sitio web no puede exceder los 200 caracteres' })
    .url({ message: 'El sitio web debe tener un formato de URL válido' })
    .optional()
    .or(z.literal('')), // Permite enviar un string vacío ("") sin fallar la validación de URL
});