import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
	let userId;

	try {
		const self = await getSelf();
		userId = self.id;
	} catch (error) {
		userId = null;
	}

	let users = [];

	if (userId) {
		users = await db.user.findMany({
			where: {
				AND: [
					{
						NOT: {
							id: userId,
						},
					},
					{
						NOT: {
							FollowedBy: { //FIX: typo in both schema and queries
								some: {
									followerId: userId,
								},
							},
						},
					},
					{
						NOT: {
							blocking: {
								some: {
									blockedId: userId,
								},
							},
						},
					},
				],
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	} else {
		users = await db.user.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	return users;
};
