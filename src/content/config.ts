import { defineCollection, z } from 'astro:content';

const reflexiones = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.string(),
    tag:         z.string(),
    readTime:    z.number().optional(),
    featured:    z.boolean().default(false),
  }),
});

export const collections = { reflexiones };
