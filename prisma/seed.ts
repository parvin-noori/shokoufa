import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { Productcategories } from "./categories";
import { posts } from "./posts";
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

  const seedUser = await prisma.user.upsert({
    where: { email: "seed-reviewer@example.com" },
    update: {},
    create: {
      name: "کاربر نمونه",
      email: "seed-reviewer@example.com",
      password: "seed-only-not-a-real-password",
    },
  });

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

    await prisma.review.upsert({
      where: {
        userId_productId: {
          userId: seedUser.id,
          productId: product.id,
        },
      },
      update: {
        comment: review.comment,
      },
      create: {
        comment: review.comment,
        productId: product.id,
        userId: seedUser.id,
      },
    });
  }

  for (const post of posts) {
    await prisma.post.upsert({
      where: {
        slug: post.slug,
      },
      update: {
        title: post.title,
      },
      create: {
        ...post,
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
