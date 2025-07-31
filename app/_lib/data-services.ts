import postgres from 'postgres';
import type { Tag, Post } from '@/types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getTags() {
  try {
    const data = await sql<Tag[]>`
        SELECT * FROM tags
    `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tags data.');
  }
}

export async function getPosts() {
  try {
    const data = await sql<Post[]>`
      SELECT 
        posts.id,
        posts.title,
        posts.pub_date,
        posts.author,
        posts.image,
        posts.slug,
        posts.description,
        posts.content,
        array_remove(array_agg(tags.name), NULL) AS tags
      FROM posts
      LEFT JOIN post_tags ON posts.id = post_tags.post_id
      LEFT JOIN tags ON post_tags.tag_id = tags.id
      GROUP BY posts.id
      ORDER BY posts.pub_date DESC
    `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts data.');
  }
}
