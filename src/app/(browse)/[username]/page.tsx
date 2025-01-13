import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";

interface UserPageProps {
  params: { username: string };
}

export default async function userPage({ params }: UserPageProps) {
  const awaitedParams = (await params).username
  const user = await getUserByUsername(awaitedParams)
  if (!user) {
    notFound()
  }
  const isFollowing = await isFollowingUser(user.id)
  return (
    <div className="flex flex-col gap-y-4">
      <p>username: {user.username}</p>
      <p>userID: {user.id}</p>
      <p>isFollowing: {`${isFollowing}`}</p>
      <Actions
        userId={user.id}
        isFollowing={isFollowing}
      />
    </div>
  )
}
