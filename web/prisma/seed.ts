import { PrismaClient } from "@prisma/client";
import jackets from "./data/jackets.json";
import shirts from "./data/shirts.json";
import suits from "./data/suits.json";
import trousers from "./data/trousers.json";

const prisma = new PrismaClient();

async function main() {
  console.log("Remove all products...");
  await prisma.product.deleteMany();

  console.log("Inserting jackets....");
  for (const jacket of jackets) {
    await prisma.product.create({
      data: {
        id: jacket.id,
        actualPrice: Number(jacket.actualPrice.replaceAll(",", "")),
        discountedPrice: Number(jacket.discountedPrice.replaceAll(",", "")),
        name: jacket.name,
        brand: jacket.brand,
        category: "jacket",
        src: `${jacket.id}.jpg`,
      },
    });
  }

  console.log("Inserting suits....");
  for (const suit of suits) {
    await prisma.product.create({
      data: {
        id: suit.id,
        actualPrice: Number(suit.actualPrice.replaceAll(",", "")),
        discountedPrice: Number(suit.discountedPrice.replaceAll(",", "")),
        name: suit.name,
        brand: suit.brand,
        category: "suit",
        src: `${suit.id}.jpg`,
      },
    });
  }

  console.log("Inserting shirts....");
  for (const shirt of shirts) {
    await prisma.product.create({
      data: {
        id: shirt.id,
        actualPrice: Number(shirt.actualPrice.replaceAll(",", "")),
        discountedPrice: Number(shirt.discountedPrice.replaceAll(",", "")),
        name: shirt.name,
        brand: shirt.brand,
        category: "shirt",
        src: `${shirt.id}.jpg`,
      },
    });
  }

  console.log("Inserting trousers....");
  for (const trouser of trousers) {
    await prisma.product.create({
      data: {
        id: trouser.id,
        actualPrice: Number(trouser.actualPrice.replaceAll(",", "")),
        discountedPrice: Number(trouser.discountedPrice.replaceAll(",", "")),
        name: trouser.name,
        brand: trouser.brand,
        category: "trouser",
        src: `${trouser.id}.jpg`,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
