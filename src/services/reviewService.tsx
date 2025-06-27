// services/postService.ts
import { Review } from '@/types/review';
import axios from 'axios';

export async function getReviews(): Promise<Review[]> {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews`);
    const filtered = res.data.map((review: Review) => ({
        id: review.id,
        user: { name: review.user.name },
        title: review.title,
        rating: review.rating,
        text: review.text,
        time: review.time
    }));

    return filtered;
}

export async function getDetailReview(id: number): Promise<Review> {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews?id=${id}`);
    return res.data[0];
}
