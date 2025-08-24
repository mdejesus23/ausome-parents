import { unstable_cache } from 'next/cache';
import postgres from 'postgres';
import { SAINTS_PER_PAGE } from '@/app/_data/constant';
import type { Saint } from '@/types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const _getFilteredSaints = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * SAINTS_PER_PAGE;
  try {
    const data = await sql<Saint[]>`
      SELECT 
        saints.id,
        saints.name,
        saints.pub_date,
        saints.feast_day,
        saints.author,
        saints.image,
        saints.slug,
        saints.description,
        saints.content,
        saints.user_id
      FROM saints
      WHERE
        saints.name ILIKE ${`%${query}%`} OR
        saints.author ILIKE ${`%${query}%`} OR
        saints.description ILIKE ${`%${query}%`}
      GROUP BY saints.id
      ORDER BY saints.pub_date DESC
      LIMIT ${SAINTS_PER_PAGE} OFFSET ${offset}
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts data.');
  }
};

export const getFilteredSaints = (query: string, currentPage: number) =>
  unstable_cache(
    () => _getFilteredSaints(query, currentPage),
    ['saints', query, String(currentPage)], // cache keys
    { tags: ['saints'] }, // cache tag
  )();

// for json-ld in posts/page.tsx
export const getSaints = unstable_cache(
  async () => {
    try {
      const data = await sql<Saint[]>`
      SELECT 
        saints.id,
        saints.name,
        saints.pub_date,
        saints.feast_day,
        saints.author,
        saints.image,
        saints.slug,
        saints.description,
        saints.content,
        saints.user_id
      FROM saints
      GROUP BY saints.id
      ORDER BY saints.pub_date DESC
      `;

      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch posts data.');
    }
  },
  ['saints'], // 🔹 cache key
  { tags: ['saints'] }, // 🔹 cache tags
);

// to fetch editing post.
export async function getSaintById(id: string) {
  try {
    const rows = await sql<Saint[]>`
      SELECT 
        saints.id,
        saints.name,
        saints.pub_date,
        saints.feast_day,
        saints.author,
        saints.image,
        saints.slug,
        saints.description,
        saints.content,
        saints.user_id
    FROM saints
    WHERE saints.id = ${id}
    GROUP BY saints.id
  `;

    return rows[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post data.');
  }
}

export async function fetchSaintsPages(query: string): Promise<number> {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM saints
    WHERE
      saints.name ILIKE ${`%${query}%`} OR
      saints.author ILIKE ${`%${query}%`} OR
      saints.description ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / SAINTS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of posts.');
  }
}

export async function getSaintBySlug(slug: string) {
  try {
    const rows = await sql<Saint[]>`
      SELECT 
        saints.id,
        saints.name,
        saints.pub_date,
        saints.feast_day
        saints.author,
        saints.image,
        saints.slug,
        saints.description,
        saints.content,
        saints.user_id
      FROM saints
      GROUP BY saints.id
      ORDER BY saints.pub_date DESC
  `;

    return rows[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post data.');
  }
}
