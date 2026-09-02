import { Router } from 'express';
import { getProductReviews, createReview } from '../controllers/review.controller.js';

// Usamos mergeParams: true para poder acceder al :id del producto desde la ruta padre
const router = Router({ mergeParams: true });

// GET /api/products/:id/reviews - Obtener reseñas de un producto y su promedio
router.get('/', getProductReviews);

// POST /api/products/:id/reviews - Crear una reseña para un producto
router.post('/', createReview);

export default router;