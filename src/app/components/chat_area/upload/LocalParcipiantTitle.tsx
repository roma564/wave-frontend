'use client';

import {
  StreamVideo,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  ParticipantView,
  useCallStateHooks,
  StreamVideoClient,
  Call,
} from '@stream-io/video-react-sdk';

function LocalParticipantTile() {
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  if (!localParticipant) return null;

  return (
    <div className="border rounded overflow-hidden">
      <ParticipantView participant={localParticipant} />
    </div>
  );
}

// 👇 тут описуємо пропси
interface CallUIProps {
  client: StreamVideoClient;
  call: Call;
}

export default function CallUI({ client, call }: CallUIProps) {
  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <div className="flex flex-col h-full">
            <div className="flex-1 grid grid-cols-2 gap-2">
              {/* твоя камера */}
              <LocalParticipantTile />
              {/* інші учасники */}
              <SpeakerLayout />
            </div>
            <CallControls />
          </div>
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
}
