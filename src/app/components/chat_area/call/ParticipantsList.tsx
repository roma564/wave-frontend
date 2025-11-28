import {
  Call,
  CallParticipantsList,
  StreamCall,
} from "@stream-io/video-react-sdk";

type Props = {
  call: Call;
};

export const MyParticipantList = ({ call }: Props) => {
  return (
    <StreamCall call={call}>
      <CallParticipantsList onClose={() => {}} />
    </StreamCall>
  );
};


