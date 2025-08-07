import { unstable_cache } from 'next/cache';
import postgres from 'postgres';
import type { Tag, Post } from '@/types';
import { POSTS_PER_PAGE } from '@/app/_data/constant';

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

export const getFilteredPosts = unstable_cache(
  async (query: string, currentPage: number) => {
    const offset = (currentPage - 1) * POSTS_PER_PAGE;
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
        WHERE
      posts.title ILIKE ${`%${query}%`} OR
      posts.author ILIKE ${`%${query}%`} OR
      posts.description ILIKE ${`%${query}%`}
      GROUP BY posts.id
      ORDER BY posts.pub_date DESC
      LIMIT ${POSTS_PER_PAGE} OFFSET ${offset}
    `;

      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch posts data.');
    }
  },
  ['posts'], // 🔹 cache key
  { tags: ['posts'] }, // 🔹 cache tags
);

export const getPosts = unstable_cache(
  async () => {
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
  },
  ['posts'], // 🔹 cache key
  { tags: ['posts'] }, // 🔹 cache tags
);

export async function fetchPostsPages(query: string): Promise<number> {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM posts
    WHERE
      posts.title ILIKE ${`%${query}%`} OR
      posts.author ILIKE ${`%${query}%`} OR
      posts.description ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / POSTS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of posts.');
  }
}

export async function getPostById(id: string) {
  try {
    const rows = await sql<Post[]>`
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
    WHERE posts.id = ${id}
    GROUP BY posts.id
  `;

    return rows[0] || null; // ✅ rows is typed as Post[]
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post data.');
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const rows = await sql<Post[]>`
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
    WHERE posts.slug = ${slug}
    GROUP BY posts.id
  `;

    return rows[0] || null; // ✅ rows is typed as Post[]
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post data.');
  }
}
