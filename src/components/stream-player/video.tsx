import { ConnectionState, Track } from "livekit-client"
import {
	useConnectionState,
	useRemoteParticipant,
	useTracks,
} from "@livekit/components-react";
import { OfflineVideo } from "./offline-video";

import { Room } from "livekit-client";
import { LoadingVideo } from "./loading-video";
import { Skeleton } from "../ui/skeleton";

export function Video({ hostName, hostIdentity, room }: { hostName: string, hostIdentity: string, room: Room }) {
	const connectionState = useConnectionState(room);
    console.log("connectionState", connectionState);
	const participant = useRemoteParticipant(hostIdentity);
	const tracks = useTracks([
		Track.Source.Camera,
		Track.Source.Microphone
	]).filter((track) => track.participant.identity === hostIdentity);

	let content;

	if (!participant && connectionState === ConnectionState.Connected) {
		content = <OfflineVideo username={hostName} />;
	} else if (!participant || tracks.length === 0) {
		console.log("participant", participant);
		console.log("tracks", tracks);
				content =  <LoadingVideo label={connectionState} />;
	} else {
		content = <p>Live Video</p>;
	}

	return (
		<div className="aspect-video border-b group relative">
			{content}
		</div>
	);
}

export function VideoSkeleton() {
	return (
	  <div className="aspect-video border-x border-background">
		<Skeleton className="h-full w-full rounded-none" />
	  </div>
	);
  }
