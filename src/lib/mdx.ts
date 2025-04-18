import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import { BlogMeta } from '@/types';

const BLOG_PATH = path.join(process.cwd(), 'src/content/blog');

export async function getBlogBySlug(slug: string) {
    const filePath = path.join(BLOG_PATH, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, 'utf8');

    const { content, frontmatter } = await compileMDX<BlogMeta>({
        source,
        options: { parseFrontmatter: true },
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
        const { data } = require('gray-matter')(raw);

        return {
            ...(data as BlogMeta),
            slug: file.replace(/\.mdx$/, ''),
        };
    });
}
