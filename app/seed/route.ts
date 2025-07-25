import { prisma } from '@/app/_lib/prisma';

async function main() {
  const adminEmail = 'dejesusmelnard@gmail.com'; // Your real Google email
  const googleSubId = '123456789012345678901'; // <-- Must match your real Google `sub` ID

  // Avoid duplicate user
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingUser) {
    console.log('Admin already seeded.');
    return;
  }

  const user = await prisma.user.create({
    data: {
      email: adminEmail,
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: new Date(),
      accounts: {
        create: {
          type: 'oauth',
          provider: 'google',
          providerAccountId: googleSubId,
        },
      },
    },
  });

  console.log('Seeded admin user:', user.email);
}

main()
  .catch((e) => {
    console.error('Error seeding admin:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
