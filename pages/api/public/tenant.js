import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { slug } = req.query;

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
  });

  if (!tenant) {
    return res.status(404).json({ error: "Barbearia não encontrada" });
  }

  res.json(tenant);
}
