"use server";

import { revalidatePath } from "next/cache";

import { blockUser, unblockUser } from "@/lib/block-service";


export const onBlock = async (id: string) => {
  //TODO: Adapt to disconnect from livestream
  //TODO: Allow to kick the guest
  try {
    const blockedUser = await blockUser(id)
    revalidatePath("/")

    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocked.username}`)
    }

    return blockedUser;

  } catch (error) {
    console.log(error)
    throw new Error("Internal server error");
  }
};

export const onUnblock = async (id: string) => {
  try {
    const unblockedUser = await unblockUser(id);
    revalidatePath("/")

    if (unblockedUser) {
      revalidatePath(`/${unblockedUser.blocked.username}`)
    }
    return unblockedUser;

  } catch (error) {

    console.log(error)
    throw new Error("Internal server error");
  }
};
