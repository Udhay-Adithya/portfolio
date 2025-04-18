import { getBlogBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { format } from 'date-fns'; // Import date-fns for formatting

type Props = {
    params: {
        slug: string;
    };
};

export default async function BlogPage({ params }: Props) {

    const blog = await getBlogBySlug(params.slug);

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
        <div className="min-h-screen bg-background text-foreground py-16 px-4">
            <article className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">

                <h1 className="text-4xl font-bold mb-4">{blog.frontmatter.title}</h1>

                <p className="text-muted-foreground text-sm mb-8">{formattedDate}</p>

                <div>{blog.content}</div>
            </article>
        </div>
    );
}