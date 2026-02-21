import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { name, slug, ownerName, ownerEmail, ownerPassword } = req.body;

  const exists = await prisma.tenant.findUnique({ where: { slug } });

  if (exists) {
    return res.status(400).json({ error: "Slug já existe" });
  }

  const tenant = await prisma.tenant.create({
    data: {
      name,
      slug,
      subscription: {
        create: {
          plan: "START",
          status: "TRIALING",
        },
      },
    },
  });

  const hashed = await bcrypt.hash(ownerPassword, 10);

  await prisma.user.create({
    data: {
      name: ownerName,
      email: ownerEmail,
      password: hashed,
      role: "OWNER",
      tenantId: tenant.id,
    },
  });

  res.json({ success: true, tenant });
}
