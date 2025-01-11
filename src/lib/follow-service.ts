import { getSelf } from "./auth-service";
import { db } from "./db";


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
	const self = await getSelf()
	const otherUser = await db.user.findFirst({
		where: { id }
	})

	if (!otherUser) {
		throw new Error("User not found")
	}

	if (otherUser.id === self.id) {
		throw new Error("Cannot follow yourself")
	}

	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: self.id,
			followingId: otherUser.id
		}
	})

	if (existingFollow) {

		throw new Error("Already following user")
	}

	const follow = await db.follow.create({
		data: {
			followingId: self.id,
			followerId: otherUser.id
		},
		include: {
			following: true,
			follower: true
		}
	})

	return follow
}
