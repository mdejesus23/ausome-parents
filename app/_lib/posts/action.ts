'use server';

import postgres from 'postgres';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { protectedAction } from '../protected-action';

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
  const { userId } = await protectedAction();

  if (!userId) {
    throw new Error('Not authenticated');
  }

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
    INSERT INTO posts (title, pub_date, author, slug, image, description, content, user_id)
    VALUES (${title}, ${pubDate}, ${author}, ${slug}, ${image}, ${description}, ${content}, ${userId})
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

    // return { message: 'Post created successfully!' };
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Create Post.' };
  }

  // revalidatePath('/admin/dashboard/posts');
  revalidateTag('posts');
  redirect('/admin/dashboard/posts');
}

export async function updatePost(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const { userId } = await protectedAction();

  if (!userId) {
    throw new Error('Not authenticated');
  }

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

  // If form validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update Post.',
    };
  }

  const { title, author, pubDate, slug, image, description, content } =
    validatedFields.data;

  try {
    // 1️⃣ Update the post
    await sql`
      UPDATE posts
      SET title = ${title},
          pub_date = ${pubDate},
          author = ${author},
          slug = ${slug},
          image = ${image},
          description = ${description},
          content = ${content}
      WHERE id = ${id};
    `;

    // 2️⃣ Update tags
    // Remove old tags
    await sql`DELETE FROM post_tags WHERE post_id = ${id};`;

    // Insert new tags if any
    if (tags.length > 0) {
      const values = tags.map((tagId) => `('${id}', '${tagId}')`).join(', ');

      await sql.unsafe(
        `INSERT INTO post_tags (post_id, tag_id) VALUES ${values} ON CONFLICT DO NOTHING`,
      );
    }

    // revalidatePath('/admin/dashboard/posts');
    // return { message: 'Post updated successfully!' };
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to update Post.', errors: {} };
  }

  revalidateTag('posts');
  redirect('/admin/dashboard/posts');
}

export async function deletePost(id: string) {
  await sql`DELETE FROM posts WHERE id = ${id}`;
  revalidateTag('posts');
  // revalidatePath('/admin/dashboard/posts');
}
