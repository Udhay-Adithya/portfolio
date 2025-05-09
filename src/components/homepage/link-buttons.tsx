"use client";

import Link from "next/link";
import { MoveUpRight } from "lucide-react";

const links = [
    { label: "tweets", href: "https://x.com/UdhayFtw" },
    { label: "code", href: "https://github.com/Udhay-Adithya" },
    { label: "network", href: "https://linkedin.com/in/udhay-adithya" },
    { label: "resume", href: "https://github.com/Udhay-Adithya/Udhay-Adithya/releases/latest/download/Adithya.Resume.pdf" },
];

export default function LinkButtons() {
    return (
        <div className="flex gap-4 mt-18 md:mt-18 pl-16 md:pl-16 flex-wrap">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1.5 border border-white/20 rounded-full text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
                >
                    {link.label}
                    <MoveUpRight size={13} className="inline-block" />
                </Link>
            ))}
        </div>
    );
}
