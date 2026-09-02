import { prisma } from '../lib/prisma.js'; // Ajusta la ruta a tu instancia de Prisma
import { createReviewSchema } from '../schemas/review.schema.js'; // Ajusta la ruta a tu esquema de Zod

// GET /api/products/:id/reviews - Obtener reseñas del producto y promedio de calificación
export const getProductReviews = async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);

    // Validar que el ID sea un número entero válido
    if (isNaN(productId)) {
      return res.status(400).json({ message: 'El ID del producto debe ser un número entero' });
    }

    // 1. Verificar si el producto existe
    const productExists = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!productExists) {
      return res.status(404).json({ message: 'El producto especificado no existe' });
    }

    // 2. Obtener las reseñas del producto
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });

    // 3. Calcular el promedio de calificación usando la agregación de Prisma
    const aggregate = await prisma.review.aggregate({
      where: { productId },
      _avg: {
        rating: true,
      },
      _count: {
        id: true,
      },
    });

    const averageRating = aggregate._avg.rating 
      ? Number(aggregate._avg.rating.toFixed(2)) 
      : 0;

    return res.status(200).json({
      productId,
      totalReviews: aggregate._count.id,
      averageRating,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener las reseñas del producto',
      error: error.message,
    });
  }
};

// POST /api/products/:id/reviews - Crear reseña para el producto
export const createReview = async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
      return res.status(400).json({ message: 'El ID del producto debe ser un número entero' });
    }

    // 1. Validar los datos ingresados en el body con Zod
    // Se combina req.body con productId recibido por req.params
    const validatedData = createReviewSchema.parse({
      ...req.body,
      productId,
    });

    // 2. Verificar si el producto existe
    const productExists = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!productExists) {
      return res.status(404).json({ message: 'El producto no existe' });
    }

    // 3. Crear la nueva reseña
    const newReview = await prisma.review.create({
      data: validatedData,
    });

    return res.status(201).json(newReview);
  } catch (error) {
    // Manejo de errores de validación con Zod
    if (error.name === 'ZodError') {
      return res.status(400).json({
        message: 'Error de validación en los datos provistos',
        errors: error.errors,
      });
    }

    return res.status(500).json({
      message: 'Error interno del servidor al crear la reseña',
      error: error.message,
    });
  }
};