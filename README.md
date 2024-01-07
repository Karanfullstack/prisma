# install npm i prisma
# npx prisma
# npx prisma init
## Folder initialzied
# create db.config file in DB folder and install prisma client - npm install @prisma/client
# after installing initialize the instace of prisma

import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient({
 log:["query"]
})

export default prisma
