import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

//interface UserPageProps {
//  params: { username: string };
//}
//
export default async function userPage({ params }: { params: Promise<{ username: string }> }) {
  const awaitedParams = (await params).username
  const user = await getUserByUsername(awaitedParams)

  if (!user) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)
  const isBlockedByThisUser = await isBlockedByUser(user.id)

  return (
    <div className="flex flex-col gap-y-4">
      <p>username: {user.username}</p>
      <p>userID: {user.id}</p>
      <p>isFollowing: {`${isFollowing}`}</p>
      <p>isBlockedByThisUser: {`${isBlockedByThisUser}`}</p>
      <Actions
        isBlocked={isBlockedByThisUser}
        userId={user.id}
        isFollowing={isFollowing}
      />
    </div>
  )
}
