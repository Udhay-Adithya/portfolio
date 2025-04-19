import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import { BlogMeta } from '@/types';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import matter from 'gray-matter'; // Added import for gray-matter

const BLOG_PATH = path.join(process.cwd(), 'src/content/blog');
const options = {
    theme: 'one-dark-pro',
    keepBackground: true,
    bypassInlineCode: true,
    defaultLang: 'plaintext',
    transformers: [
        transformerCopyButton({
            visibility: 'hover',
            feedbackDuration: 3_000,
        }),
    ],
};

export async function getBlogBySlug(slug: string) {
    const filePath = path.join(BLOG_PATH, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, 'utf8');
    const { content, frontmatter } = await compileMDX<BlogMeta>({
        source,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [[rehypePrettyCode, options]],
            },
        },
    });
    return {
        content,
        frontmatter,
        slug,
    };
}

export function getAllBlogs(): BlogMeta[] {
    const files = fs.readdirSync(BLOG_PATH);
    return files.map((file) => {
        const raw = fs.readFileSync(path.join(BLOG_PATH, file), 'utf8');
        const { data } = matter(raw); // Changed from require('gray-matter')(raw)
        return {
            ...(data as BlogMeta),
            slug: file.replace(/\.mdx$/, ''),
        };
    });
}