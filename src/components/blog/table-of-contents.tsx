'use client';

import { useEffect, useState } from 'react';
import { ChevronRight, List } from 'lucide-react';

interface Heading {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Extract headings from the blog content
        const extractHeadings = () => {
            const blogContent = document.getElementById('blog-content');
            if (!blogContent) return;

            const headingElements = blogContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
            const headingsData: Heading[] = [];

            headingElements.forEach((heading, index) => {
                const id = heading.id || `heading-${index}`;
                if (!heading.id) {
                    heading.id = id;
                }

                headingsData.push({
                    id,
                    text: heading.textContent || '',
                    level: parseInt(heading.tagName.charAt(1))
                });
            });

            setHeadings(headingsData);
        };

        // Run after content is rendered
        const timer = setTimeout(extractHeadings, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Intersection Observer to track active heading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0% -35% 0%',
                threshold: 0
            }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setIsOpen(false); // Close mobile menu after navigation
        }
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 p-2 border border-border/30 rounded-lg bg-background/50 backdrop-blur-sm"
            >
                <List className="w-4 h-4" />
                Table of Contents
                <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>

            {/* Table of Contents */}
            <div className={`
                lg:block
                ${isOpen ? 'block' : 'hidden'}
                bg-background/80 backdrop-blur-sm border border-border/30 rounded-lg p-4
                lg:bg-transparent lg:border-none lg:backdrop-blur-none lg:p-0
            `}>
                <h3 className="text-sm font-medium text-foreground mb-3 lg:text-muted-foreground">
                    On this page
                </h3>

                <nav className="space-y-1">
                    {headings.map((heading) => (
                        <button
                            key={heading.id}
                            onClick={() => scrollToHeading(heading.id)}
                            className={`
                                block w-full text-left text-sm transition-colors py-1 px-2 rounded
                                ${heading.level === 1 ? 'font-medium' : ''}
                                ${heading.level === 2 ? 'pl-3' : ''}
                                ${heading.level === 3 ? 'pl-5' : ''}
                                ${heading.level === 4 ? 'pl-7' : ''}
                                ${heading.level >= 5 ? 'pl-9' : ''}
                                ${activeId === heading.id
                                    ? 'text-foreground bg-muted/50'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                                }
                            `}
                        >
                            {heading.text}
                        </button>
                    ))}
                </nav>
            </div>
        </>
    );
}