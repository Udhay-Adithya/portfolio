import { getBlogBySlug } from '@/lib/server/mdx';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';

type Props = {
    params: {
        slug: string;
    };
};

export default async function BlogPage({ params }: Props) {
    const { slug } = await params;
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


    return (
        <div className="min-h-screen justify-start bg-background py-16 px-4">
            <article className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">

                <h2 className="text-4xl md:text-4xl font-bold mb-4">{blog.frontmatter.title}</h2>

                <p className="text-muted-foreground text-sm mb-8">{formattedDate}</p>

                <div>{blog.content}</div>
            </article>
        </div>
    );
}