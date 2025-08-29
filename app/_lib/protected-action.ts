'use server';

import { auth } from '@/auth';

export async function protectedAction() {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  // ✅ user id & role now available
  const userId = session.user.id;
  const userRole = session.user.role;

  return { userId, userRole };
}
