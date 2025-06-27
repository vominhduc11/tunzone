// services/postService.ts
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho Blog
export interface Blog {
    id: number;
    title: string;
    excerpt: string;
    image: string;
}

/**
 * Lấy danh sách blog mới nhất
 * @param limit số lượng bài lấy, mặc định 3
 */
export async function getLatestBlogs(): Promise<Blog[]> {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
        params: { _limit: 3 }
    });
    const filtered = res.data.map((blog: Blog) => ({
        id: blog.id,
        title: blog.title,
        excerpt: blog.excerpt,
        image: blog.image
    }));

    return filtered;
}

/**
 * Lấy chi tiết một bài blog theo id
 * @param id ID của blog
 */
// export async function fetchBlogById(id: number): Promise<Blog> {
//     const res = await axios.get<Blog>(`${API_BASE}/blogs/${id}`);
//     return res.data;
// }
