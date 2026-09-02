import { z } from 'zod';

export const createReviewSchema = z.object({
  author: z
    .string({
      required_error: 'El autor es obligatorio',
      invalid_type_error: 'El autor debe ser una cadena de texto',
    })
    .min(2, { message: 'El autor debe tener al menos 2 caracteres' })
    .max(100, { message: 'El autor no puede exceder los 100 caracteres' }),

  rating: z
    .number({
      required_error: 'La calificación es obligatoria',
      invalid_type_error: 'La calificación debe ser un número',
    })
    .int({ message: 'La calificación debe ser un número entero' })
    .min(1, { message: 'La calificación mínima es 1' })
    .max(5, { message: 'La calificación máxima es 5' }),

  comment: z
    .string({
      required_error: 'El comentario es obligatorio',
      invalid_type_error: 'El comentario debe ser una cadena de texto',
    })
    .min(10, { message: 'El comentario debe tener al menos 10 caracteres' })
    .max(500, { message: 'El comentario no puede exceder los 500 caracteres' }),

  productId: z
    .number({
      required_error: 'El productId es obligatorio',
      invalid_type_error: 'El productId debe ser un número entero',
    })
    .int()
    .positive({ message: 'El productId debe ser un número positivo' }),
});