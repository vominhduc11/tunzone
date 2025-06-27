// services/postService.ts
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho Blog
export interface Partner {
    id: number;
    name: string;
    logo: string;
}

/**
 * Lấy danh sách blog mới nhất
 * @param limit số lượng bài lấy, mặc định 3
 */
export async function getMostTrustedPartners(): Promise<Partner[]> {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/partners`, {
        params: { _limit: 4 }
    });
    const filtered = res.data.map((partner: Partner) => ({
        id: partner.id,
        name: partner.name,
        logo: partner.logo
    }));

    return filtered;
}
