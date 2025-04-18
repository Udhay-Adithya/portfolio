"use client";

import Link from "next/link";

const links = [
    { label: "tweets", href: "https://twitter.com/yourhandle" },
    { label: "code", href: "https://github.com/Udhay-Adithya" },
    { label: "network", href: "https://linkedin.com/in/udhay-adithya" },
];

export default function LinkButtons() {
    return (
        <div className="flex gap-4 mt-8 pl-16 flex-wrap justify-center">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1.5 border border-white/20 rounded-full text-white hover:bg-white/10 transition-all"
                >
                    {link.label} ↗
                </Link>
            ))}
        </div>
    );
}
