const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function main() {
  try {
    await prisma.$connect();
    console.log("Veritabanına bağlandı");

    await prisma.$disconnect();
    console.log("Veritabanı bağlantısı kesildi");
  } catch (error) {
    console.error("Bir hata oluştu:", error);
  }
}

main()
  .catch((error) => console.error("Ana işlev hatası:", error))
  .finally(async () => {
    await prisma.$disconnect();
  });
