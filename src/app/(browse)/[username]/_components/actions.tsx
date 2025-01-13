"use client"
import { onFollow } from "@/actions/follow";
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
	function onClick() {
		startTransition(() => {

			onFollow(userId)
				.then(() => toast.success("Followed the user"))
				.catch(() => toast.error("Something went wrong"))
		})
	}
	return (
		<Button
			disabled={isFollowing || isPending}
			onClick={onClick}
			variant="primary">
			Follow
		</Button >
	)
}
