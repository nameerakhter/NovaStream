"use client"

import { User } from "@clerk/nextjs/server"

import { LiveKitRoom } from "@livekit/components-react"
import { useViewerToken } from "../../../hooks/use-viewer-token"
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Room } from "livekit-client";
import { Video, VideoSkeleton } from "./video";
import { Chat, ChatSkeleton } from "./chat";
import { Header, HeaderSkeleton } from "./header";


interface Stream {
	id: string;
	isChatEnabled: boolean;
	isChatDelayed: boolean;
	isChatFollowersOnly: boolean;
	isLive: boolean;
	thumbnailUrl: string | null;
	name: string;
}

interface StreamPlayerProps {
	user: User & { stream: Stream | null }
	stream: Stream
	isFollowing: boolean
}

export function StreamPlayer({ user, stream, isFollowing }: StreamPlayerProps) {
	const { token, name, identity } = useViewerToken(user.id)
	const { collapsed } = useChatSidebar((state) => state);

	if (!token || !name || !identity) {
		return (
			<div>Cannot watch the stream</div>
		)
	}
	if(!user || user.username === null){
		return (
			<div>Cannot find user</div>
		)
	}
	console.log("stream", stream)
	return (
		<LiveKitRoom
			token={token}
			serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
			className={cn(
				"grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
				collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
			  )}		>
			<div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
				<Video hostName={user.username} hostIdentity={user.id} room={new Room(stream)}/>
			</div>
			<div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
		</LiveKitRoom>
	)
}

export function StreamPlayerSkeleton() {
	return (
	  <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
		<div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
		  <VideoSkeleton />
		  <HeaderSkeleton />
		</div>
		<div className="col-span-1 bg-background">
		  <ChatSkeleton />
		</div>
	  </div>
	);
  }