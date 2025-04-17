"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = { url: string };

function Actions({ url }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying((prev) => (prev = !prev));
  };

  return (
    <>
      <Button onClick={handlePlayClick} size="sm">
        {isPlaying ? "Stop Audio" : "Play Audio"}
      </Button>
      {isPlaying && (
        <span className="col-span-full">
          <audio controls autoPlay>
            <source src={url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </span>
      )}
    </>
  );
}

export default Actions;
