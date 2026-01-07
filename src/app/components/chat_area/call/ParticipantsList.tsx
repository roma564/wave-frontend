import {
  Call,
  CallParticipantsList,
  StreamCall,
} from "@stream-io/video-react-sdk";

type Props = {
  call: Call;
};

export const ParticipantList = ({ call }: Props) => {
  return (
    <StreamCall call={call}>
      <CallParticipantsList onClose={() => {}} />
    </StreamCall>
  );
};


