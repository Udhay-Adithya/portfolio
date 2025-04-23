// src/app/(routes)/blog/[slug]/page.tsx

import { getBlogBySlug } from '@/lib/server/mdx';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function BlogPage({ params }: Props) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    let formattedDate = blog.frontmatter.date;
    try {
        const dateObject = new Date(blog.frontmatter.date);
        if (!isNaN(dateObject.getTime())) {
            formattedDate = format(dateObject, 'MMMM d, yyyy');
        }
    } catch (error) {
        console.error("Error formatting date:", error);
    }

    // Calculate reading time (rough estimate)
    const wordsPerMinute = 200;
    const contentText = blog.content.toString().replace(/<[^>]*>/g, '');
    const wordCount = contentText.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <article className="prose prose-lg dark:prose-invert max-w-2xl mx-auto">
                {/* Featured image - if available */}
                {blog.frontmatter.image && (
                    <div className="mb-8 relative rounded-lg overflow-hidden h-64 w-full">
                        <Image
                            src={blog.frontmatter.image}
                            alt={blog.frontmatter.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Article header */}
                <div className="mb-10 border-b border-border pb-6">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{blog.frontmatter.title}</h1>

                    <div className="flex items-center text-sm text-muted-foreground">
                        <time>{formattedDate}</time>
                        <span className="mx-2">·</span>
                        <span>{readingTime} min read</span>
                        {/* {blog.frontmatter.category && (
                            <>
                                <span className="mx-2">·</span>
                                <span className="px-2 py-1 rounded-full text-xs bg-muted">{blog.frontmatter.category}</span>
                            </>
                        )} */}
                    </div>
                </div>

                {/* Article content */}
                <div className="blog-content leading-relaxed">
                    {blog.content}
                </div>

                {/* Tags section - if available */}
                {blog.frontmatter.tags && blog.frontmatter.tags.length > 0 && (
                    <div className="mt-12 pt-6 border-t border-border">
                        <div className="flex flex-wrap gap-2">
                            {blog.frontmatter.tags.map((tag: string) => (
                                <span key={tag} className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
}