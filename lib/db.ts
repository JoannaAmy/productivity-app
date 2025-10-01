import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"], // optional
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;



// OLD CODE
// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

// export default prisma;


