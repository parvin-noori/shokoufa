import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { Productcategories } from "./categories";
import { ProductsData } from "./products";
import { reviews } from "./reviews";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function seed() {
  for (const category of Productcategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { title: category.title },
      create: category,
    });
  }

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

  for (const review of reviews) {
    const product = await prisma.product.findUnique({
      where: {
        slug: review.productSlug,
      },
    });

    if (!product) continue;

    await prisma.review.create({
      data: {
        username: review.username,
        comment: review.comment,
        productId: product.id,
      },
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
