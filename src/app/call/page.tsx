'use client';

import {
  StreamVideo,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
} from '@stream-io/video-react-sdk';
import { useStreamClient } from '@/app/lib/features/api/stream/streamClient';
import { MyParticipantList } from '../components/chat_area/call/ParticipantsList';
import { useEffect, useState } from 'react';

type CallPageProps = {
  callId?: string; 
};

export default function CallPage({ callId: initialCallId }: CallPageProps) {
  const client = useStreamClient();
  const [callId, setCallId] = useState<string | null>(initialCallId ?? null);
  const [call, setCall] = useState<any>(null);

  useEffect(() => {
    if (!client) return;

    // якщо callId не передали — генеруємо новий
    const effectiveCallId =
      callId ?? `call-${Math.random().toString(36).substring(2, 10)}`;

    const newCall = client.call('default', effectiveCallId);

    newCall.getOrCreate().then(() => {
      newCall.join();
    });

    setCallId(effectiveCallId);
    setCall(newCall);

    return () => {
      newCall.leave();
    };
  }, [client]);

  if (!client || !call || !callId) {
    return <div className="p-4 text-red-500">❌ Call not initialized</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <div className="h-screen flex flex-col">
            <div className="p-4 text-sm text-gray-500 bg-gray-100 border-b">
              📞 Call ID: <span className="font-mono">{callId}</span>
            </div>

            <MyParticipantList call={call} />

            <div className="flex-1">
              <SpeakerLayout />
            </div>
            <CallControls />
          </div>
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
}
