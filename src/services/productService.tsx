// services/postService.ts
import { Product } from '@/types/product';
import axios from 'axios';

export async function getRecommentProduct(): Promise<Product[]> {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        params: { _limit: 5 }
    });
    const filtered = res.data.map((product: Product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        avatar: product.avatar
    }));

    return filtered;
}

export async function getProductById(id: string): Promise<Product> {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?id=${id}`);
    return res.data[0];
}
