import { Review } from '@/types/review';

export const reviews: Review[] = [
    {
        id: 1,
        username: 'Nguyen Van A',
        title: 'Sản phẩm tuyệt vời',
        rating: 5,
        text: 'Chất lượng âm thanh rất tốt, pin lâu, kết nối ổn định.',
        time: '1 ngày trước',
        verified: true,
        productId: 7
    },
    {
        id: 2,
        username: 'Tran Thi B',
        title: 'Rất hài lòng',
        rating: 4,
        text: 'Mình dùng khi đi phượt, nghe gọi rõ ràng. Giá ổn.',
        time: '2 ngày trước',
        verified: true,
        productId: 6
    },
    {
        id: 3,
        username: 'Phan Minh C',
        title: 'Đáng tiền',
        rating: 5,
        text: 'Đã mua thêm cho bạn bè, ai cũng thích. Đáng đồng tiền.',
        time: '3 ngày trước',
        verified: true,
        productId: 5
    },
    {
        id: 4,
        username: 'Lê Dũng',
        title: 'Hỗ trợ tốt',
        rating: 4,
        text: 'Nhân viên tư vấn nhiệt tình, giao hàng nhanh.',
        time: '4 ngày trước',
        verified: false,
        productId: 1
    },
    {
        id: 5,
        username: 'Ngoc Mai',
        title: 'Thiết kế đẹp',
        rating: 5,
        text: 'Tai nghe nhẹ, đeo không đau tai, thiết kế thời trang.',
        time: '5 ngày trước',
        verified: true,
        productId: 1
    },
    {
        id: 6,
        username: 'Hoang Quan',
        title: 'Cần cải thiện app',
        rating: 3,
        text: 'Sản phẩm tốt nhưng app hơi khó dùng, mong cập nhật thêm.',
        time: '6 ngày trước',
        verified: false,
        productId: 1
    },
    {
        id: 7,
        username: 'Minh Châu',
        title: 'Pin rất trâu',
        rating: 5,
        text: 'Đi tour 2 ngày vẫn chưa hết pin. Rất ấn tượng!',
        time: '7 ngày trước',
        verified: true,
        productId: 1
    }
];
