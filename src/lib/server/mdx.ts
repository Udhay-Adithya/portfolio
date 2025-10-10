import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import { BlogMeta } from '@/types';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import matter from 'gray-matter';
import type React from 'react';

const BLOG_PATH = path.join(process.cwd(), 'src/content/blog');
const options = {
    theme: 'github-dark',
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

export async function getBlogBySlug(slug: string): Promise<{ content: React.ReactNode; frontmatter: BlogMeta; slug: string; rawContent: string } | null> {
    const filePath = path.join(BLOG_PATH, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const source = fs.readFileSync(filePath, 'utf8');
    const { content: rawContentWithoutFrontmatter } = matter(source);

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
        rawContent: rawContentWithoutFrontmatter,
    };
}

export function getAllBlogs(): BlogMeta[] {
    const files = fs.readdirSync(BLOG_PATH);

    return files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
            const raw = fs.readFileSync(path.join(BLOG_PATH, file), 'utf8');
            const { data } = matter(raw);

            return {
                ...(data as BlogMeta),
                slug: file.replace(/\.mdx$/, ''),
            };
        })
        .sort((a, b) => {
            // Sort by date (newest first)
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
}