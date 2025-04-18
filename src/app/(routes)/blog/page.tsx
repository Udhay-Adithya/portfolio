import Link from 'next/link';
import { getAllBlogs } from '@/lib/mdx';
import { format } from 'date-fns';

export default function ThoughtsPage() {
    const blogs = getAllBlogs();

    return (
        <div className="min-h-screen max-w-4xl mx-auto bg-background text-foreground px-4 py-16">
            <div className="mb-12">
                <h1 className="text-4xl font-medium mb-2">blogs</h1>
                <p className="text-muted-foreground">the writer is by nature a dreamer</p>
            </div>
            <ul className="space-y-6">
                {blogs.map((blog) => {
                    // Attempt to parse the date, default to original string if invalid
                    let formattedDate = blog.date;
                    try {
                        const dateObject = new Date(blog.date);
                        // Check if the dateObject is valid before formatting
                        if (!isNaN(dateObject.getTime())) {
                            formattedDate = format(dateObject, 'MMMM d, yyyy');
                        }
                    } catch (error) {
                        console.error("Error formatting date:", error);
                        // Keep the original date string if formatting fails
                    }

                    return (
                        <li key={blog.slug} className="border-b border-border pb-6">
                            <Link href={`/blog/${blog.slug}`} className="flex justify-between items-center w-full group">
                                <span className="text-lg group-hover:text-primary transition-colors">{blog.title}</span>
                                <span className="text-sm text-muted-foreground">{formattedDate}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
