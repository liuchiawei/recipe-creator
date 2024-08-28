import Link from 'next/link';

export default function MainMenu() {
    return (
        <header className="bg-red-400 text-white">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link href="/">
                        レシピクリエイター
                    </Link>
                </h1>
                <nav className="space-x-4">
                    <Link href="/recipe" className="hover:text-gray-300">
                        レシピ一覧
                    </Link>
                    <Link href="/admin/recipe" className="hover:text-gray-300">
                        レシピ作成
                    </Link>
                </nav>
            </div>
        </header>
    );
}
