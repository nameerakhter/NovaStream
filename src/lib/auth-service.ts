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

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (self.username !== username) {
    throw new Error("Unauthorized");
  }

  return user;
};
