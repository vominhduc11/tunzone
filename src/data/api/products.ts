import { Product } from '@/types/product';

export const products: Product[] = [
    {
        id: 1,
        name: 'Cardo G7 Plus Bluetooth Headset',
        avatar: '/images/cardog7plus.jpg',
        images: ['/images/prod1.jpg', '/images/prod2.jpg', '/images/prod3.jpg'],
        rating: 4.2,
        reviewsCount: 2,
        features: ['Kết nối Bluetooth', 'Chống ồn chủ động', 'Pin 20 giờ'],
        description:
            'Tai nghe không dây Cardo G7 Plus với âm thanh chất lượng cao và khả năng chống ồn tối ưu.',
        specs: { weight: '50g', battery: '20 giờ', connectivity: 'Bluetooth 5.0' },
        boxItems: ['Tai nghe', 'Dây sạc USB-C', 'Hướng dẫn sử dụng'],
        faqs: [{ q: 'Bảo hành bao lâu?', a: '12 tháng kể từ ngày mua.' }],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 2,
        name: 'Cardo Packtalk Bold',
        avatar: '/images/packtalkbold.jpg',
        images: ['/images/packtalkbold1.jpg', '/images/packtalkbold2.jpg'],
        rating: 4.5,
        reviewsCount: 5,
        features: ['Công nghệ DMC', 'Âm thanh JBL', 'Pin 13 giờ'],
        description:
            'Tai nghe giao tiếp mô tô với công nghệ Dynamic Mesh Communication và âm thanh chất lượng cao.',
        specs: { weight: '60g', battery: '13 giờ', connectivity: 'Bluetooth 4.1' },
        boxItems: ['Tai nghe', 'Microphone', 'Dây sạc USB-C', 'Hướng dẫn sử dụng'],
        faqs: [{ q: 'Có hỗ trợ cập nhật firmware không?', a: 'Có, qua OTA.' }],
        videoUrl: 'https://www.youtube.com/embed/xyz123'
    },
    {
        id: 3,
        name: 'Cardo Freecom 4X',
        avatar: '/images/freecom4x.jpg',
        images: ['/images/freecom4x1.jpg', '/images/freecom4x2.jpg', '/images/freecom4x3.jpg'],
        rating: 4.0,
        reviewsCount: 3,
        features: ['Kết nối nhóm 4 người', 'Âm thanh JBL', 'Pin 12 giờ'],
        description:
            'Hệ thống giao tiếp không dây cho nhóm người dùng lên đến 4, với âm thanh sống động và pin bền lâu.',
        specs: { weight: '58g', battery: '12 giờ', connectivity: 'Bluetooth 4.2' },
        boxItems: ['Tai nghe', 'Dây sạc USB-C', 'Microphone', 'Hướng dẫn sử dụng'],
        faqs: [
            { q: 'Có thể kết nối với điện thoại không?', a: 'Có, hỗ trợ gọi điện và nghe nhạc.' }
        ],
        videoUrl: 'https://www.youtube.com/embed/abc456'
    },
    {
        id: 4,
        name: 'Cardo Spirit',
        avatar: '/images/spirit.jpg',
        images: ['/images/spirit1.jpg', '/images/spirit2.jpg'],
        rating: 4.3,
        reviewsCount: 4,
        features: ['Chip Bluetooth mới nhất', 'Cập nhật OTA', 'Pin sạc nhanh'],
        description:
            'Tai nghe Bluetooth với khả năng cập nhật firmware dễ dàng và thiết kế tiện lợi.',
        specs: { weight: '52g', battery: '15 giờ', connectivity: 'Bluetooth 5.1' },
        boxItems: ['Tai nghe', 'Dây sạc USB-C', 'Hướng dẫn sử dụng'],
        faqs: [{ q: 'Có chống nước không?', a: 'Có, chuẩn IP67.' }],
        videoUrl: 'https://www.youtube.com/embed/def789'
    },
    {
        id: 5,
        name: 'Cardo Neo',
        avatar: '/images/neo.jpg',
        images: ['/images/neo1.jpg', '/images/neo2.jpg'],
        rating: 4.1,
        reviewsCount: 3,
        features: ['Thiết kế nhỏ gọn', 'Pin 10 giờ', 'Bluetooth 5.0'],
        description: 'Cardo Neo – tai nghe gọn nhẹ, pin lâu và kết nối ổn định cho mọi hành trình.',
        specs: { weight: '45g', battery: '10 giờ', connectivity: 'Bluetooth 5.0' },
        boxItems: ['Tai nghe', 'Dây sạc USB-C', 'Hướng dẫn sử dụng'],
        faqs: [{ q: 'Neo có chống ồn không?', a: 'Không, nhưng âm thanh trong trẻo.' }],
        videoUrl: 'https://www.youtube.com/embed/sample5'
    },
    {
        id: 6,
        name: 'Cardo Freecom 2X',
        avatar: '/images/freecom2x.jpg',
        images: ['/images/freecom2x1.jpg', '/images/freecom2x2.jpg'],
        rating: 4.0,
        reviewsCount: 2,
        features: ['Kết nối nhóm 2 người', 'Âm thanh JBL', 'Pin 11 giờ'],
        description: 'Phiên bản 2X cho nhóm 2 người, âm thanh chất lượng và pin bền bỉ.',
        specs: { weight: '56g', battery: '11 giờ', connectivity: 'Bluetooth 4.2' },
        boxItems: ['Tai nghe', 'Dây sạc USB-C', 'Hướng dẫn sử dụng'],
        faqs: [{ q: 'Có điều khiển thoại không?', a: 'Có, trên thiết bị.' }],
        videoUrl: 'https://www.youtube.com/embed/sample6'
    },
    {
        id: 7,
        name: 'Cardo Spirit HD',
        avatar: '/images/spirithd.jpg',
        images: ['/images/spirithd1.jpg', '/images/spirithd2.jpg'],
        rating: 4.4,
        reviewsCount: 4,
        features: ['Âm thanh HD', 'Pin 16 giờ', 'Bluetooth 5.1'],
        description: 'Spirit HD với âm thanh độ phân giải cao, pin lâu và tính năng OTA.',
        specs: { weight: '53g', battery: '16 giờ', connectivity: 'Bluetooth 5.1' },
        boxItems: ['Tai nghe', 'Dây sạc USB-C', 'Hướng dẫn sử dụng'],
        faqs: [{ q: 'HD có hỗ trợ FM không?', a: 'Không hỗ trợ.' }],
        videoUrl: 'https://www.youtube.com/embed/sample7'
    },
    {
        id: 8,
        name: 'Cardo G9 Pro',
        avatar: '/images/cardog9pro.jpg',
        images: ['/images/g9pro1.jpg', '/images/g9pro2.jpg'],
        rating: 4.6,
        reviewsCount: 6,
        features: ['Chống ồn chủ động', 'Pin 22 giờ', 'Bluetooth 5.2'],
        description: 'G9 Pro – nâng cấp G7 với chống ồn tốt hơn và thời gian sử dụng dài.',
        specs: { weight: '51g', battery: '22 giờ', connectivity: 'Bluetooth 5.2' },
        boxItems: ['Tai nghe', 'Dây sạc USB-C', 'Hướng dẫn sử dụng'],
        faqs: [{ q: 'Pro có đa kết nối?', a: 'Có thể kết nối 2 thiết bị.' }],
        videoUrl: 'https://www.youtube.com/embed/sample8'
    },
    {
        id: 9,
        name: 'Cardo Packtalk Edge',
        avatar: '/images/packtalkedge.jpg',
        images: ['/images/edge1.jpg', '/images/edge2.jpg'],
        rating: 4.3,
        reviewsCount: 5,
        features: ['Công nghệ DMC', 'Âm thanh JBL', 'Pin 13 giờ'],
        description: 'Packtalk Edge – tối ưu DMC, độ bền cao và âm thanh chất lượng.',
        specs: { weight: '61g', battery: '13 giờ', connectivity: 'Bluetooth 4.1' },
        boxItems: ['Tai nghe', 'Microphone', 'Dây sạc USB-C', 'Hướng dẫn sử dụng'],
        faqs: [{ q: 'Có hỗ trợ Siri/Google Assistant?', a: 'Có hỗ trợ.' }],
        videoUrl: 'https://www.youtube.com/embed/sample9'
    },
    {
        id: 10,
        name: 'Cardo Freecom 2S',
        avatar: '/images/freecom2s.jpg',
        images: ['/images/2s1.jpg', '/images/2s2.jpg'],
        rating: 4.0,
        reviewsCount: 3,
        features: ['Kết nối an toàn', 'Pin 10 giờ', 'Bluetooth 4.2'],
        description: 'Freecom 2S – kết nối 2 thành viên an toàn, thiết kế gọn nhẹ.',
        specs: { weight: '55g', battery: '10 giờ', connectivity: 'Bluetooth 4.2' },
        boxItems: ['Tai nghe', 'Dây sạc USB-C', 'Hướng dẫn sử dụng'],
        faqs: [{ q: '2S có hỗ trợ đàm thoại nhóm không?', a: 'Không, chỉ 2-user.' }],
        videoUrl: 'https://www.youtube.com/embed/sample10'
    }
];
