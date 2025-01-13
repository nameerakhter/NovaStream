"use client"
import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";


export default function Actions() {
	const [isPending, startTransition] = useTransition()
	function onClick() {
		startTransition(() => {

			onFollow("123")
		})
	}
	return (
		<Button disabled={isPending} onClick={onClick} variant="primary">
			Follow
		</Button >
	)
}
