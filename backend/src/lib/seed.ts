import { db } from './db'
import { hashPassword } from './auth'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from './config'

async function seed() {
  const email = ADMIN_EMAIL
  const password = ADMIN_PASSWORD

  const existing = await db.admin.findUnique({ where: { email } })
  if (existing) {
    console.log('Admin already exists:', email)
    return
  }

  const hashedPassword = await hashPassword(password)
  const admin = await db.admin.create({
    data: { email, password: hashedPassword },
  })
  console.log('Admin created:', admin.email)
}

seed()
  .catch(console.error)
  .finally(() => db.$disconnect())
