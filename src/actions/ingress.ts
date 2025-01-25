"use server";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
  TrackSource,
  IngressVideoOptions,
  IngressAudioOptions,
} from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";


const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

const ingressClient = new IngressClient(process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!, process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!);


 // Fetches ingresses associated with a host ID, then retrieves and deletes corresponding rooms.
export async function resetIngresses(hostId: string) {
  try {
    const ingresses = await ingressClient.listIngress({
      roomName: hostId,
    });

    const rooms = await roomService.listRooms([hostId]);
    console.log(rooms)

    for (const room of rooms) {
      await roomService.deleteRoom(room.name);
    }

    for (const ingress of ingresses) {
      if (ingress.ingressId) {
        await ingressClient.deleteIngress(ingress.ingressId);
      }
    }
  } catch (error) {
    console.error("Error resetting ingresses:", error);
    throw new Error("Failed to reset ingresses");
  }

};

export async function createIngress(ingressType: IngressInput) {
  const self = await getSelf();

  await resetIngresses(self.id);

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  console.log(options)
  if (ingressType === IngressInput.WHIP_INPUT) {
    options.enableTranscoding = true
  } else {
    options.video = new IngressVideoOptions({
      source: TrackSource.CAMERA,
      encodingOptions: {
        case: 'preset',
        value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      },
    });
    options.audio = new IngressAudioOptions({
      source: TrackSource.MICROPHONE,
      encodingOptions: {
        case: 'preset',
        value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
      },
    });
  }

  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress");
  }

  await db.stream.update({
    where: {
      userId: self.id,
    },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  const ingressData = {
    ingressId: ingress.ingressId,
    serverUrl: ingress.url,
    streamKey: ingress.streamKey,
  };

  revalidatePath(`/u/${self.username}/keys`);
  return ingressData;
};
