import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { ProductsData } from "./products";
import { Productcategories } from "./categories";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function seed() {
  for (const product of ProductsData) {
    const { images, categories = [], ...rest } = product;
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...rest,
        images: { create: product.images },
        categories: { connect: categories.map((slug) => ({ slug })) },
      },
    });
  }

  for (const category of Productcategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { title: category.title },
      create: category,
    });
  }
  console.log("Seed done ✅");
}

seed()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
