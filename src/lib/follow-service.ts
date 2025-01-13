import { getSelf } from "./auth-service";
import { db } from "./db";



export async function getFollowedUser() {
	try {
		const self = await getSelf()
		const followedUser = await db.follow.findMany({
			where: {
				followerId: self.id,
				following: {
					blocking: {
						none: {
							blockedId: self.id,
						},
					},
				},
			},
			include: {
				following: true
			}
		})

		return followedUser

	} catch (error) {
		return []
	}
}

export async function isFollowingUser(id: string) {
	try {
		const self = await getSelf()
		const otherUser = await db.user.findUnique({
			where: { id }

		})
		if (!otherUser) {
			throw new Error("NO user found")
		}
		if (otherUser.id === self.id) {
			return true
		}
		const existingFollow = await db.follow.findFirst({
			where: {
				followerId: self.id,
				followingId: otherUser.id
			}
		})
		return !!existingFollow
	} catch (error) {
		return false
	}

}


export async function followUser(id: string) {
	const self = await getSelf();

	const otherUser = await db.user.findUnique({
		where: { id },
	});

	if (!otherUser) throw new Error("User not found");

	if (otherUser.id === self.id) throw new Error("You can't follow yourself");

	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followingId: otherUser.id,
		},
	});

	if (existingFollow) throw new Error("You are already following this user");

	const follow = await db.follow.create({
		data: {
			followerId: self.id,
			followingId: otherUser.id,
		},
		include: {
			follower: true,
			following: true,
		},
	});

	return follow;
}

export async function unFollowUser(id: string) {
	const self = await getSelf()

	const otherUser = await db.user.findFirst({
		where: { id }
	})

	if (!otherUser) {
		throw new Error("User not found")
	}

	if (otherUser.id === self.id) throw new Error("You can't unfollow yourself");

	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followingId: otherUser.id,
		},
	});

	if (!existingFollow) throw new Error("You are not following this user");

	const follow = await db.follow.delete({
		where: {
			id: existingFollow.id,
		},
		include: {
			following: true,
		},
	});

	return follow;
}
