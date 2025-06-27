import { User } from './user';

export type Review = {
    id: number;
    user: User;
    title: string;
    rating: number;
    text: string;
    time: string;
    images: string[];
    verified: boolean;
};
