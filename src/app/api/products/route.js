import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';


export async function GET(request) {
  try {
    const products = await prisma.product.findMany();
    
    if (products.length === 0) {
      throw new Error('No products in database');
    }
    
    // Group them for frontend
    const merchandise = products.filter(p => p.type === 'merchandise');
    const collectibles = products.filter(p => p.type === 'collectible').map(c => ({
      ...c,
      logo: c.image // Map image back to logo for collectible rendering
    }));
    
    return NextResponse.json({ merchandise, collectibles });
  } catch (error) {
    console.error('Error fetching products from database, using JSON fallback:', error);
    try {
      const productsDataPath = path.join(process.cwd(), 'src/data/products.json');
      if (fs.existsSync(productsDataPath)) {
        const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));
        return NextResponse.json(productsData);
      }
    } catch (fsError) {
      console.error('Failed to read products.json fallback:', fsError);
    }
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
