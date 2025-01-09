import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db"


export async function getSelf() {
  const self = await currentUser()

  if (!self || !self.username) {
    throw new Error("Not found")
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id
    }
  })


  if (!user) {
    throw new Error("Not found")
  }
  return user
}

