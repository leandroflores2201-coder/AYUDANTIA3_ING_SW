import prisma from '../config/prisma.js';
import { createBrandSchema } from '../schemas/brand.schema.js'; // Ajusta la ruta a tu esquema de Zod

// GET /api/brands - Listar marcas con la cantidad de productos de cada una
export const getBrands = async (req, res) => {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return res.status(200).json(brands);
  } catch (error) {
    return res.status(500).json({ 
      message: 'Error al obtener las marcas', 
      error: error.message 
    });
  }
};

// POST /api/brands - Crear marca con validación Zod y control de nombre duplicado
export const createBrand = async (req, res) => {
  try {
    // 1. Validar los datos ingresados con Zod
    const validatedData = createBrandSchema.parse(req.body);

    // 2. Verificar si el nombre ya existe en la base de datos
    const existingBrand = await prisma.brand.findUnique({
      where: { name: validatedData.name },
    });

    if (existingBrand) {
      return res.status(409).json({ 
        message: 'Ya existe una marca registrada con este nombre' 
      });
    }

    // 3. Crear la nueva marca
    const newBrand = await prisma.brand.create({
      data: validatedData,
    });

    return res.status(201).json(newBrand);
  } catch (error) {
    // Manejo de errores de validación de Zod
    if (error.name === 'ZodError') {
      return res.status(400).json({
        message: 'Error de validación en los datos provistos',
        errors: error.errors,
      });
    }

    // Manejo genérico para excepciones de Prisma u otros errores
    return res.status(500).json({ 
      message: 'Error interno del servidor al crear la marca', 
      error: error.message 
    });
  }
};