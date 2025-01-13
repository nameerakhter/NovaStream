"use client"
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionProps {
	isFollowing: boolean
	userId: string
}
export default function Actions({
	isFollowing,
	userId
}: ActionProps) {
	const [isPending, startTransition] = useTransition()
	function handleFollow() {
		startTransition(() => {

			onFollow(userId)
				.then((data) => toast.success(`You are now following ${data.following.username}`))
				.catch(() => toast.error("Something went wrong"))
		})
	}
	function handleUnfollow() {
		startTransition(() => {

			onUnfollow(userId)
				.then((data) => toast.success(`You have unfollowed ${data.following.username}`))
				.catch(() => toast.error("Something went wrong"))
		})
	}
	function onClick() {
		if (isFollowing) {
			handleUnfollow()
		} else {
			handleFollow()
		}
	}
	return (
		<Button
			disabled={isPending}
			onClick={onClick}
			variant="primary">
			{isFollowing ? "Unfollow" : "Follow"}
		</Button >
	)
}
