import prisma from '../config/prisma.js'; 

/**
 * Obtener todos los productos con filtros avanzados
 * GET /api/products?categoryId=1&brandId=1&minPrice=10000&maxPrice=50000&inStock=true
 */
export const getAllProducts = async (req, res, next) => {
  try {
    const { categoryId, brandId, minPrice, maxPrice, inStock } = req.query;

    const where = {};

    if (categoryId !== undefined) {
      where.categoryId = Number(categoryId);
    }

    // Selección por ID de marca
    if (brandId !== undefined) {
      where.brandId = Number(brandId);
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = Number(minPrice);
      if (maxPrice !== undefined) where.price.lte = Number(maxPrice);
    }

    if (inStock !== undefined) {
      const onlyInStock = inStock === true || inStock === 'true';
      where.stock = onlyInStock ? { gt: 0 } : 0;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        },
        brand: {
          select: {
            id: true,
            name: true,
            country: true,
            website: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      total: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

    // Filtro por Stock
    if (inStock !== undefined) {
      const onlyInStock = inStock === true || inStock === 'true';
      where.stock = onlyInStock ? { gt: 0 } : 0;
    }

    // Consulta a la Base de Datos
    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: { id: true, name: true }
        },
        brand: {
          select: { id: true, name: true, country: true, website: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      total: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};
