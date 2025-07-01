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
        text: 'Mình dùng khi đi phượt, nghe gọi rõ ràng. Giá ổn. Chất lượng âm thanh tốt, pin trâu, kết nối bluetooth ổn định.',
        time: '2 ngày trước',
        verified: true,
        productId: 1,
        images: ['/images/products/packtalkbold.png', '/images/products/cardog7plus.png']
    },
    {
        id: 3,
        username: 'Phan Minh C',
        title: 'Đáng tiền',
        rating: 5,
        text: 'Đã mua thêm cho bạn bè, ai cũng thích. Đáng đồng tiền. Thiết kế đẹp, dễ sử dụng, âm thanh trong trẻo.',
        time: '3 ngày trước',
        verified: true,
        productId: 1,
        images: ['/images/products/packtalkbold.png']
    },
    {
        id: 4,
        username: 'Lê Dũng',
        title: 'Hỗ trợ tốt',
        rating: 4,
        text: 'Nhân viên tư vấn nhiệt tình, giao hàng nhanh. Sản phẩm đúng như mô tả.',
        time: '4 ngày trước',
        verified: false,
        productId: 1
    },
    {
        id: 5,
        username: 'Ngoc Mai',
        title: 'Thiết kế đẹp',
        rating: 5,
        text: 'Tai nghe nhẹ, đeo không đau tai, thiết kế thời trang. Âm thanh bass ấm, treble trong.',
        time: '5 ngày trước',
        verified: true,
        productId: 1,
        images: ['/images/products/cardog7plus.png', '/images/products/packtalkbold.png', '/images/freecom4x.jpg']
    },
    {
        id: 6,
        username: 'Hoang Quan',
        title: 'Cần cải thiện app',
        rating: 3,
        text: 'Sản phẩm tốt nhưng app hơi khó dùng, mong cập nhật thêm. Chất lượng âm thanh ổn.',
        time: '6 ngày trước',
        verified: false,
        productId: 1
    },
    {
        id: 7,
        username: 'Minh Châu',
        title: 'Pin rất trâu',
        rating: 5,
        text: 'Đi tour 2 ngày vẫn chưa hết pin. Rất ấn tượng! Kết nối bluetooth ổn định, không bị rớt.',
        time: '7 ngày trước',
        verified: true,
        productId: 1,
        images: ['/images/products/packtalkbold.png']
    },
    {
        id: 8,
        username: 'Thanh Tùng',
        title: 'Chất lượng tuyệt vời',
        rating: 5,
        text: 'Mua cho cả team đi phượt, ai cũng khen. Âm thanh rõ ràng, micro nhạy.',
        time: '1 tuần trước',
        verified: true,
        productId: 2,
        images: ['/images/products/cardog7plus.png', '/images/freecom4x.jpg']
    },
    {
        id: 9,
        username: 'Kim Anh',
        title: 'Giao hàng nhanh',
        rating: 4,
        text: 'Đặt hàng chiều, tối đã nhận được. Đóng gói cẩn thận, sản phẩm nguyên seal.',
        time: '1 tuần trước',
        verified: true,
        productId: 2
    },
    {
        id: 10,
        username: 'Văn Hải',
        title: 'Giá hợp lý',
        rating: 4,
        text: 'So với chất lượng thì giá này rất hợp lý. Recommend cho ae nào cần.',
        time: '2 tuần trước',
        verified: false,
        productId: 3,
        images: ['/images/freecom4x.jpg']
    }
];
