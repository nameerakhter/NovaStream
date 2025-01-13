"use client"
import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionProps {
	isFollowing: boolean
	isBlocked: boolean
	userId: string
}
export default function Actions({
	isFollowing,
	isBlocked,
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
	function handleBlock() {
		startTransition(() => {
			onBlock(userId)
				.then((data) =>
					!!data
						? toast.success(`You have blocked ${data?.blocked.username}`)
						: toast.success("Blocked guest")
				)
				.catch(() => toast.error("Something went wrong, failed to block"));
		});
	};
	function handleUnblock() {
		startTransition(() => {
			onUnblock(userId)
				.then((data) =>
					toast.success(`You have unblocked ${data.blocked.username}`)
				)
				.catch(() => toast.error("Something went wrong, failed to unblock"));
		});
	};

	function onClickBlock() {
		if (isBlocked) {
			handleUnblock()
		} else {
			handleBlock()
		}
	}
	return (
		<>
			<Button
				disabled={isPending}
				onClick={onClick}
				variant="primary">
				{isFollowing ? "Unfollow" : "Follow"}
			</Button >
			<Button
				disabled={isPending}
				onClick={onClickBlock}
				variant="destructive"
			>
				{isBlocked ? "Unblock" : "Block"}
			</Button>


		</>
	)
}
