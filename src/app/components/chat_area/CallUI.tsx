'use client';

import React, { useState } from 'react';
import {
  StreamVideo,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
} from '@stream-io/video-react-sdk';
import { useStreamClient } from '@/app/lib/features/api/stream/streamClient';

export default function CallUI() {
  const streamClient = useStreamClient();
  const [call, setCall] = useState<any>(null);

  const handleStartCall = async () => {
    if (!streamClient) return;

    const callId = `call-${Math.random().toString(36).substring(2, 10)}`;
    const newCall = streamClient.call('default', callId);

    await newCall.getOrCreate();
    await newCall.join();

    setCall(newCall); // 👈 зберігаємо у state
  };

  return (
    <div className="h-screen flex flex-col">
      {!call ? (
        <button
          onClick={handleStartCall}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start Call
        </button>
      ) : (
        <StreamVideo client={streamClient}>
          <StreamTheme>
            <StreamCall call={call}>
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <SpeakerLayout />
                </div>
                <CallControls />
              </div>
            </StreamCall>
          </StreamTheme>
        </StreamVideo>
      )}
    </div>
  );
}
