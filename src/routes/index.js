import { Router } from 'express';
import categoryRoutes from './category.routes.js';
import productRoutes from './product.routes.js';
import brandRoutes from './brand.routes.js';
import reviewRoutes from './review.routes.js';

const apiRouter = Router();

// Estado de la API (Health check)
apiRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'TechStore API (Productos, Categorías,marcas y Reseñas)',
  });
});

// Enrutadores modulares
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/brands', brandRoutes);
apiRouter.use('/products/:id/reviews', reviewRoutes);

export default apiRouter;
