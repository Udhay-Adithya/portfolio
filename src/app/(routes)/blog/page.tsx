import Link from 'next/link';
import { getAllBlogs } from '@/lib/server/mdx';
import { format } from 'date-fns';

export default function BlogsListPage() {
    const blogs = getAllBlogs();

    return (
        <div className="min-h-screen max-w-4xl mx-auto bg-background text-foreground px-4 py-16">
            <div className="mb-12">
                <h1 className="text-4xl font-light mb-2">blogs</h1>
                <p className="text-muted-foreground">thoughts, stories, and ideas worth sharing</p>
            </div>
            <ul className="space-y-6">
                {blogs.map((blog) => {
                    let formattedDate = blog.date;
                    try {
                        const dateObject = new Date(blog.date);
                        if (!isNaN(dateObject.getTime())) {
                            formattedDate = format(dateObject, 'MMMM d, yyyy');
                        }
                    } catch (error) {
                        console.error("Error formatting date:", error);
                    }

                    return (
                        <li key={blog.slug} className="border-b border-border pb-6">
                            <Link href={`/blog/${blog.slug}`} className="flex justify-between items-center w-full group">
                                <span className="text-base md:text-lg group-hover:text-primary transition-colors">{blog.title.toLowerCase()}</span>
                                <span className="text-sm md:text-sm text-muted-foreground">{formattedDate}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
