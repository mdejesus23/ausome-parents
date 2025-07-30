'use server';

import postgres from 'postgres';
import { z } from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  title: z
    .string({ error: 'Please fill up title field.' })
    .min(1, 'Please fill up title field.'),

  pubDate: z
    .string({ error: 'Please provide publish date.' })
    .min(1, 'Please provide publish date.')
    .transform((str) => new Date(str)),

  author: z
    .string({ error: 'Please fill up author field.' })
    .min(1, 'Please fill up author field.'),

  slug: z
    .string({ error: 'Please fill up slug field.' })
    .min(1, 'Please fill up slug field.'),

  image: z.string().min(1, 'Please upload image.'),
  description: z
    .string({ error: 'Please provide description.' })
    .min(1, 'Please provide description.'),
  content: z
    .string({ error: 'Please provide content.' })
    .min(1, 'Please provide content.'),
});

export type State = {
  errors?: Record<string, string[]>;
  message?: string | null;
};

export async function createPost(prevState: State, formData: FormData) {
  // Extract tags first
  const tags = formData.getAll('tags[]') as string[];

  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    author: formData.get('author'),
    slug: formData.get('slug'),
    pubDate: formData.get('pubDate'),
    image: formData.get('image'),
    description: formData.get('description'),
    content: formData.get('content'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to upload Post.',
    };
  }

  const { title, author, pubDate, slug, image, description, content } =
    validatedFields.data;

  // insert post record
  try {
    const [post] = await sql`
    INSERT INTO posts (title, pub_date, author, slug, image, description, content)
    VALUES (${title}, ${pubDate}, ${author}, ${slug}, ${image}, ${description}, ${content})
    RETURNING id;
  `;

    const postId = post.id;

    // Insert tags if any
    if (tags.length > 0) {
      // Map tags to values tuple
      const values = tags
        .map((tagId) => `('${postId}', '${tagId}')`)
        .join(', ');

      await sql.unsafe(
        `INSERT INTO post_tags (post_id, tag_id) VALUES ${values} ON CONFLICT DO NOTHING`,
      );
    }

    return { message: 'Post created successfully!' };
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Create Post.' };
  }
}
