import { db } from "./db";

export async function getRecommended() {
	const users = await db.user.findMany({
		orderBy: {
			createdAt: "desc"
		}
	})

	return users
}
