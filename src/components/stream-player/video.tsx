import { ConnectionState, Track } from "livekit-client"
import {
	useConnectionState,
	useRemoteParticipant,
	useTracks,
} from "@livekit/components-react";

export function Video({ hostname, hostIdentity }: { hostname: string, hostIdentity: string }) {
	const connectionState = useConnectionState();
	const participant = useRemoteParticipant(hostIdentity);
	const tracks = useTracks([
		Track.Source.Camera,
		Track.Source.Microphone
	]).filter((track) => track.participant.identity === hostIdentity);

	let content;

	if (!participant && connectionState === ConnectionState.Connected) {
		content = <p> Host is offline </p>;
	} else if (!participant || tracks.length === 0) {
		content = <p> loading... </p>;
	} else {
		content = <p>Live Video</p>;
	}

	return (
	<div className="aspect-video border-b group relative">
		{content}
	</div>
	);
}

