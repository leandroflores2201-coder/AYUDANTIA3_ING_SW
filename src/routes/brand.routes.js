import { Router } from 'express';
import { getBrands, createBrand } from '../controllers/brand.controller.js';

const router = Router();

// GET /api/brands - Listar todas las marcas con el conteo de productos
router.get('/', getBrands);

// POST /api/brands - Crear una nueva marca
router.post('/', createBrand);

export default router;