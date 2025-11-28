import React from 'react';
import {
  StreamVideo,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
} from '@stream-io/video-react-sdk';
import type { Call, StreamVideoClient } from '@stream-io/video-react-sdk';

export default function CallUI({
  client,
  call,
}: {
  client: StreamVideoClient;
  call: Call;
}) {

  console.log('CallUI received call:', call);

  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <div className="h-screen flex flex-col">
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
