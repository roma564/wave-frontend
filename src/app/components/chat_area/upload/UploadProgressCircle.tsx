'use client'
import { CircularProgress, Box, Typography } from '@mui/material';

type Props = {
  progress: number;
};

export default function UploadProgressCircle({ progress }: Props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={progress} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {`${progress}%`}
        </Typography>
      </Box>
    </Box>
  );
}
