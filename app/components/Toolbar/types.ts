export interface Props {
  onHandleStartRecording: () => void;
  onHandleStopRecording: () => void;
  onHandleSessionRestart: () => void;
  onHandleSaveState: () => void;
  onHandleLoadState: () => void;
}
