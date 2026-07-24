import { db } from './db';
import { hashPassword } from './auth';

async function seed() {
  const email = process.env.ADMIN_EMAIL || 'admin@leaddesk.com';
  const password = process.env.ADMIN_PASSWORD || 'Admin@123';

  const existing = await db.admin.findUnique({ where: { email } });
  if (existing) {
    console.log('Admin already exists:', email);
    return;
  }

  const hashedPassword = await hashPassword(password);
  const admin = await db.admin.create({
    data: { email, password: hashedPassword },
  });
  console.log('Admin created:', admin.email);
}

seed()
  .catch(console.error)
  .finally(() => db.$disconnect());
