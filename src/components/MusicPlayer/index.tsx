import styles from "./index.less";
import React, { useEffect, useRef, useState, FC } from "react";
import { ReactComponent as Play } from "./assets/play.svg";
import { ReactComponent as Pause } from "./assets/pause.svg";
import { ReactComponent as Next } from "./assets/next.svg";
import { ReactComponent as Prev } from "./assets/prev.svg";

interface IProps {
  tracks: {
    title?: string;
    artist?: string;
    audioSrc: string;
    image?: string;
    color?: string;
  }[];
}

const AudioPlayer = ({ tracks }: IProps) => {
  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { title, artist, color, image, audioSrc } = tracks[trackIndex];

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef<any>();
  const isReady = useRef(false);

  // Destructure for conciseness
  const { duration } = audioRef.current;

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);
  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    }
  }, [trackIndex]);

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };
  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };
  const onScrub = (value: any) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fffffff4), color-stop(${currentPercentage}, #777))
`;
  return (
    <div className={styles.audioPlayer}>
      <div className={styles.trackInfo}>
        {image && (
          <img
            className={styles.artwork}
            src={image}
            alt={`track artwork for ${title} by ${artist}`}
          />
        )}
        {title && <h2>{title}</h2>}
        {artist && <h3>{artist}</h3>}
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        ></AudioControls>
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className={styles.progress}
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={
            {
              // background: trackStyling,
            }
          }
        />
      </div>
    </div>
  );
};
const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}: any) => (
  <div className={styles.audioControls}>
    <button
      type="button"
      className={styles.prev}
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <Prev />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className={styles.pause}
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <Pause />
      </button>
    ) : (
      <button
        type="button"
        className={styles.play}
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <Play />
      </button>
    )}
    <button
      type="button"
      className={styles.next}
      aria-label="Next"
      onClick={onNextClick}
    >
      <Next />
    </button>
  </div>
);

export default AudioPlayer;
