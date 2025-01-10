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
