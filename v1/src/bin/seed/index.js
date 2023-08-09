const CryptoJS = require("crypto-js");

const hashPassword = (password) =>
  CryptoJS.HmacSHA512(password, process.env.PASSWORD_KEY).toString();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function createAdminUser() {
  const email = "superadmin1@blog.com";
  const admin = {
    email: email,
    first_name: "Super",
    last_name: "Admin",
    password: "123456",
    role: "ADMIN",
  };

  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email },
    });

    admin.password = hashPassword(admin.password);

    if (!existingAdmin) {
      await prisma.user.create({ data: admin });
      console.log("Admin created successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function main() {
  try {
    await prisma.$connect();
    console.log("Successfully connected to database");

    // Admin kullanıcısını oluştur
    await createAdminUser();

    await prisma.$disconnect();
    console.log("Successfully disconnected from database");
  } catch (error) {
    console.error("Error:", error);
  }
}

main()
  .catch((error) => console.error("Error:", error))
  .finally(async () => {
    await prisma.$disconnect();
  });
