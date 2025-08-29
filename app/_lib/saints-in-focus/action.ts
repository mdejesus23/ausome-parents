'use server';

import postgres from 'postgres';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { protectedAction } from '../protected-action';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  name: z
    .string({ error: 'Please fill up title field.' })
    .min(1, 'Please fill up title field.'),

  pub_date: z
    .string({ error: 'Please provide publish date.' })
    .min(1, 'Please provide publish date.')
    .transform((str) => new Date(str)),

  feast_day: z
    .string({ error: 'Please provide feast day.' })
    .min(1, 'Please provide feast day.')
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

export async function createSaint(prevState: State, formData: FormData) {
  const { userId } = await protectedAction();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    author: formData.get('author'),
    slug: formData.get('slug'),
    pub_date: formData.get('pub_date'),
    feast_day: formData.get('feast_day'),
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

  const {
    name,
    author,
    pub_date,
    slug,
    feast_day,
    image,
    description,
    content,
  } = validatedFields.data;

  // insert post record
  try {
    const [saint] = await sql`
    INSERT INTO saints (name, pub_date, author, slug, feast_day, image, description, content, user_id)
    VALUES (${name}, ${pub_date}, ${author}, ${slug}, ${feast_day}, ${image}, ${description}, ${content}, ${userId})
    RETURNING id;
  `;
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Create Saint.' };
  }

  // revalidatePath('/admin/dashboard/posts');
  revalidateTag('saints');
  redirect('/admin/dashboard/saint-in-focus');
}
