import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient({
	log: ["query"],
});
process.on('beforeExit', async () => {
    console.log("Prisma Client is disconnecting...");
    await prisma.$disconnect();
});
prisma
	.$connect()
	.then(() => console.log("Connecting to database with Prisma.."))
	.catch((error) =>
		console.log("Error while connecting to the database", error)
	);
export default prisma;
