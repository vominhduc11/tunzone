export interface Blog {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    image: string;
    views?: number;
    content?: string[];
}
