import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'test@test.pl' },
        update: {},
        create: {
            email: 'test@test.pl',
            name: 'Test User',
            password: 'test',
            investments: {
                create: [
                    {
                        "name": "Stock A",
                        "quantity": 10,
                        "buyPrice": 150,
                        "currentPrice": 175
                    },
                    {
                        "name": "Stock B",
                        "quantity": 5,
                        "buyPrice": 200,
                        "currentPrice": 190
                    },
                    {
                        "name": "Mutual Fund",
                        "quantity": 100,
                        "buyPrice": 15,
                        "currentPrice": 16
                    }
                ]

            }
        }

    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })