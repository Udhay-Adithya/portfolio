import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-6 px-4 pl-16 pr-16 bg-black text-white">
            <div className="text-sm md:text-base"><Link href="/">udhay adithya</Link> </div>
            <div className="flex gap-4 text-sm md:text-base">
                <Link href="/work">work</Link>
                <Link href="/blog">blog</Link>
                <Link href="/pov">point of view</Link>
            </div>
        </nav>
    );
}
