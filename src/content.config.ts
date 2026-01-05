import { defineCollection, z, type CollectionEntry } from 'astro:content';
import { glob } from 'astro/loaders';

const rawArticle = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      thumbnail: z.string().optional(),
      tags: z.array(z.string()).default([]),
      // Transform string to Date object
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional()
    })
});

export const collections = { rawArticle };

export type RawArticle = CollectionEntry<'rawArticle'>;
