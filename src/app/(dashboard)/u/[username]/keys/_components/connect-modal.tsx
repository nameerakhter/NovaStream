
"use client";

import React, { useState, useTransition, useRef, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createIngress } from "@/actions/ingress";

type IngressOptions = { RTMP: string; WHIP: string };

export function ConnectModal() {
	const closeRef = useRef<HTMLButtonElement>(null);
	const [isPending, startTransition] = useTransition();
	const [ingressType, setIngressType] = useState<string | null>(null);
	const [ingressOptions, setIngressOptions] = useState<IngressOptions | null>(null);

	useEffect(() => {
		const fetchIngressTypes = async () => {
			try {
				const response = await fetch("/api/ingress");
				if (!response.ok) {
					throw new Error("Failed to fetch ingress types");
				}
				const data: IngressOptions = await response.json();
				setIngressOptions(data);
			} catch (error) {
				console.error(error);
				toast.error("Failed to fetch ingress types");
			}
		};

		fetchIngressTypes();
	}, []);

	const onSubmit = () => {
		startTransition(() => {
			if (!ingressType) {
				toast.error("Please select an ingress type");
				return;
			}
			createIngress(parseInt(ingressType)) // Assuming createIngress expects an integer
				.then(() => {
					toast.success("Ingress created successfully");
					closeRef?.current?.click();
				})
				.catch(() => toast.error("Failed to create ingress"));
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="primary">Generate connection</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate connection</DialogTitle>
				</DialogHeader>
				<Select
					disabled={isPending || !ingressOptions}
					value={ingressType ?? ""}
					onValueChange={(value) => setIngressType(value)}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Ingress Type" />
					</SelectTrigger>
					<SelectContent>
						{ingressOptions && (
							<>
								<SelectItem value={ingressOptions.RTMP}>RTMP</SelectItem>
								<SelectItem value={ingressOptions.WHIP}>WHIP</SelectItem>
							</>
						)}
					</SelectContent>
				</Select>
				<Alert>
					<AlertTriangle className="h-4 w-4" />
					<AlertTitle>Warning!</AlertTitle>
					<AlertDescription>
						This action will reset all active streams using the current connection.
					</AlertDescription>
				</Alert>
				<div className="flex justify-between">
					<DialogClose ref={closeRef} asChild>
						<Button variant="ghost">Cancel</Button>
					</DialogClose>
					<Button disabled={isPending || !ingressType} onClick={onSubmit} variant="primary">
						Generate
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
