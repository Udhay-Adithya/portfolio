import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-6 px-4 bg-background">
            <div className="text-sm">udhay adithya</div>
            <div className="flex gap-4 text-sm">
                <Link href="/work">work</Link>
                <Link href="/thoughts">blog</Link>
                <Link href="/pov">point of view</Link>
            </div>
        </nav>
    );
}
