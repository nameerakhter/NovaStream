"use client"

import { User } from "@clerk/nextjs/server"
import { Stream } from "stream"

interface StreamPlayerProps{
    user: User & {stream: Stream | null}
    stream: Stream
    isFollowing: boolean
}

export  function StreamPlayer({user, stream, isFollowing}:StreamPlayerProps){
    return(
        <div>Stream Player</div>
    )
}