
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const company = await prisma.company.create({
    data: {
      name: "Barbearia Premium",
      slug: "barbearia-premium",
      email: "contato@barbearia.com"
    }
  })

  const password = await bcrypt.hash("123456", 10)

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@admin.com",
      password,
      companyId: company.id
    }
  })

  const barber = await prisma.barber.create({
    data: {
      name: "Carlos",
      companyId: company.id
    }
  })

  await prisma.service.create({
    data: {
      name: "Corte Masculino",
      price: 40,
      duration: 30,
      companyId: company.id
    }
  })

  console.log("Seed executado com sucesso.")
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
