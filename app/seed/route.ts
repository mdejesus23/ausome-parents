import bcrypt from 'bcrypt';
import postgres from 'postgres';

const users = [
  {
    name: 'Melnard',
    email: 'me@melnerdz.com',
    password: 'adminPass123',
    role: 'ADMIN',
  },
];

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users ( name, email, password, role)
        VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.role})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

export async function GET() {
  try {
    return Response.json(await seedUsers());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
