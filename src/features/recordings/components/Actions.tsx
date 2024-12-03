import { Button } from "@/components/ui/button";
import { sendTranscribeRequest } from "@/lib/services";
import { useState } from "react";

interface IActions {
  url: string;
}

export const Actions: React.FC<IActions> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleTranscribe = async (url) => {
    setLoading(true);
    setError(null);

    try {
      const result = await sendTranscribeRequest(url);
      console.log(result); // Handle success if needed
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayClick = () => {
    setIsPlaying((prev) => (prev = !prev));
  };

  return (
    <div className="grid gap-2 grid-cols-2">
      <Button onClick={handlePlayClick} size="sm">
        {isPlaying ? "Stop Audio" : "Play Audio"}
      </Button>
      <Button disabled={loading} size="sm" onClick={() => handleTranscribe(url)}>
        {loading ? "Transcring" : "Transcribe"}
      </Button>
      {isPlaying && (
        <span className="col-span-full">
          <audio controls autoPlay>
            <source src={url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </span>
      )}
    </div>
  );
};
