interface Props {
  message: string | null;
  isError: boolean;
}

export function CallFeedback({ message, isError }: Props) {
  if (!message) return null;
  return (
    <div className={`call-feedback${isError ? ' call-feedback--error' : ' call-feedback--ok'}`}>
      {message}
    </div>
  );
}
