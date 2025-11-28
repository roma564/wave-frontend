'use client';

import {
  StreamVideo,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
} from '@stream-io/video-react-sdk';
import { useStreamClient } from '@/app/lib/features/api/stream/streamClient';
import { MyParticipantList } from '@/app/components/chat_area/call/ParticipantsList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CallPage() {
  const client = useStreamClient();
  const searchParams = useSearchParams();
  const callId = searchParams.get('callId');

  const [call, setCall] = useState<any>(null);

  useEffect(() => {
    if (!client || !callId) return;

    const existingCall = client.call('default', callId);

    existingCall.join();
    setCall(existingCall);

    return () => {
      existingCall.leave();
    };
  }, [client, callId]);

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
