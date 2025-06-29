export type Review = {
    id: number;
    username: string;
    rating: number;
    title: string;
    text: string;
    time: string;
    images?: string[];
    verified: boolean;
    productId: number;
};
