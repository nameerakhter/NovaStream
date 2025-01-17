import { IngressInput } from "livekit-server-sdk";
import { NextResponse } from "next/server";

export function GET() {
	try {
		const RTMP = String(IngressInput.RTMP_INPUT);
		const WHIP = String(IngressInput.WHIP_INPUT);

		return NextResponse.json({
			RTMP,
			WHIP
		}, { status: 200 })
	} catch (error) {
		console.error("Error fetching ingress types:", error);
		return NextResponse.json({
			error: "Failed to fetch ingress types"
		})
	}
}

