import dynamic from 'next/dynamic';

const CompareContent = dynamic(() => import('./CompareContent'), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                <p>Đang tải...</p>
            </div>
        </div>
    )
});

export default function ComparePage() {
    return <CompareContent />;
}
