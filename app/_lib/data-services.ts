import postgres from 'postgres';
import type { Tag } from '@/types';

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
