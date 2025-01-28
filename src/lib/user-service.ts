import { db } from "@/lib/db"



export async function getUserByUsername(username: string) {
	const user = await db.user.findUnique({
		where: {
			username
		},
		include:{
			stream:true
		}
	})
	return user

}
