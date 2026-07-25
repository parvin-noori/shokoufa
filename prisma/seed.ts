import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ProductsData } from "../app/mocks/products";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function seed() {
  // for (const product of ProductsData) {
  //   await prisma.product.upsert({
  //     where: { slug: product.slug },
  //     update: {},
  //     create: {
  //       slug: product.slug,
  //       title: product.title,
  //       rate: product.rate,
  //       price: product.price,
  //       discount: product.discount,
  //       isBestSeller: product.isBestSeller,
  //       stock: product.stock,
  //       flowerType: product.flowerType as any,
  //       occasion: product.occasion as any,
  //       style: product.style as any,
  //       size: product.size as any,
  //       colors: product.colors as any,
  //       images: {
  //         create: product.images.map((img) => ({
  //           url: img.url,
  //           alt: img.alt,
  //         })),
  //       },
  //     },
  //   });
  // }
  console.log("Seed done ✅");
}

seed()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });