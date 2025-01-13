"use server";

import { revalidatePath } from "next/cache";

import { followUser, unFollowUser } from "@/lib/follow-service";

export const onFollow = async (id: string) => {
  try {
    console.log("ID passed to onFollow:", id);
    const followedUser = await followUser(id);
    console.log(followedUser)

    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (error) {
    console.log(error)
    throw new Error("Internal server error");
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unFollowUser(id);

    revalidatePath("/");

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }

    return unfollowedUser;
  } catch (error) {
    throw new Error("Internal server error");
  }
};
