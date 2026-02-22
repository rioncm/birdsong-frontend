import { useEffect, useMemo, useRef, useState } from "react";

import { fetchRecordingMetadata } from "../api/client";

export interface RecordingClip {
  key: string;
  speciesName: string;
  scientificName?: string;
  wavId?: string;
  recordingUrl?: string;
  recordedAt?: string;
  durationSeconds?: number;
  deviceDisplayName?: string;
}

interface RecordingListenModalProps {
  isOpen: boolean;
  clips: RecordingClip[];
  initialIndex: number;
  onClose: () => void;
}

function formatTimestamp(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }
  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const remainder = total % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
}

function formatRecordedAt(recordedAt?: string): { dateLabel: string; timeLabel: string } {
  if (!recordedAt) {
    return {
      dateLabel: "Unknown date",
      timeLabel: "Unknown time"
    };
  }
  const parsed = new Date(recordedAt);
  if (Number.isNaN(parsed.getTime())) {
    return {
      dateLabel: "Unknown date",
      timeLabel: "Unknown time"
    };
  }

  return {
    dateLabel: parsed.toLocaleDateString(undefined, { dateStyle: "medium" }),
    timeLabel: parsed.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  };
}

export function RecordingListenModal({
  isOpen,
  clips,
  initialIndex,
  onClose
}: RecordingListenModalProps): JSX.Element | null {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);
  const [resolvedDuration, setResolvedDuration] = useState<number | null>(null);
  const [isResolving, setIsResolving] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);

  const safeIndex = useMemo(() => {
    if (clips.length === 0) {
      return 0;
    }
    if (initialIndex < 0) {
      return 0;
    }
    if (initialIndex >= clips.length) {
      return clips.length - 1;
    }
    return initialIndex;
  }, [clips.length, initialIndex]);

  const activeClip = clips[activeIndex] ?? null;

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setActiveIndex(safeIndex);
  }, [isOpen, safeIndex]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !activeClip) {
      return;
    }

    let isCancelled = false;

    const fallbackUrl = activeClip.recordingUrl ?? null;
    const fallbackDuration =
      typeof activeClip.durationSeconds === "number" && Number.isFinite(activeClip.durationSeconds)
        ? activeClip.durationSeconds
        : null;

    setResolvedUrl(fallbackUrl);
    setResolvedDuration(fallbackDuration);
    setIsResolving(Boolean(activeClip.wavId));
    setErrorMessage(null);
    setCurrentTime(0);
    setAudioDuration(0);
    setIsPlaying(false);

    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    if (!activeClip.wavId) {
      setIsResolving(false);
      if (!fallbackUrl) {
        setErrorMessage("No recording URL is available for this detection.");
      }
      return;
    }

    void fetchRecordingMetadata(activeClip.wavId)
      .then((metadata) => {
        if (isCancelled) {
          return;
        }
        setResolvedUrl(metadata.url || fallbackUrl);
        if (typeof metadata.duration_seconds === "number" && Number.isFinite(metadata.duration_seconds)) {
          setResolvedDuration(metadata.duration_seconds);
        }
      })
      .catch(() => {
        if (isCancelled) {
          return;
        }
        if (!fallbackUrl) {
          setErrorMessage("The recording could not be loaded from the server.");
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsResolving(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [activeClip, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const currentAudio = audioRef.current;
      if (currentAudio) {
        currentAudio.pause();
      }
      setIsPlaying(false);
    }
  }, [isOpen]);

  if (!isOpen || !activeClip) {
    return null;
  }

  const { dateLabel, timeLabel } = formatRecordedAt(activeClip.recordedAt);
  const canGoBack = activeIndex > 0;
  const canGoNext = activeIndex < clips.length - 1;
  const maxDuration =
    audioDuration > 0
      ? audioDuration
      : typeof resolvedDuration === "number" && Number.isFinite(resolvedDuration)
        ? resolvedDuration
        : 0;

  const handleTogglePlay = async () => {
    if (!audioRef.current || !resolvedUrl) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setErrorMessage("Playback failed. Try another clip.");
    }
  };

  const handleSeek = (value: number) => {
    if (!audioRef.current || !Number.isFinite(value)) {
      return;
    }
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const handleClose = () => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setIsPlaying(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="listen-modal-title"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-3xl border border-brand-borderSubtle bg-brand-card shadow-card"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="border-b border-brand-borderSubtle bg-brand-cardHeader px-5 py-4">
          <p id="listen-modal-title" className="text-xl font-bold text-brand-accentBlue">
            Listen to {activeClip.speciesName}
          </p>
          <p className="mt-1 text-sm text-brand-muted">
            Clip {activeIndex + 1} of {clips.length}
          </p>
        </header>

        <div className="space-y-5 px-5 py-5">
          <audio
            key={activeClip.key}
            ref={audioRef}
            src={resolvedUrl ?? undefined}
            preload="metadata"
            onLoadedMetadata={() => {
              if (!audioRef.current) {
                return;
              }
              const duration = audioRef.current.duration;
              if (Number.isFinite(duration) && duration > 0) {
                setAudioDuration(duration);
              }
            }}
            onDurationChange={() => {
              if (!audioRef.current) {
                return;
              }
              const duration = audioRef.current.duration;
              if (Number.isFinite(duration) && duration > 0) {
                setAudioDuration(duration);
              }
            }}
            onTimeUpdate={() => {
              if (!audioRef.current) {
                return;
              }
              setCurrentTime(audioRef.current.currentTime);
            }}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }}
            onError={() => {
              setIsPlaying(false);
              setErrorMessage("This recording cannot be played on your device.");
            }}
          />

          <div className="rounded-2xl border border-brand-borderSubtle bg-brand-page px-4 py-4">
            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">Date</p>
                <p className="mt-1 text-base font-semibold text-brand-text">{dateLabel}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">Time</p>
                <p className="mt-1 text-base font-semibold text-brand-text">{timeLabel}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">Playback</p>
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  disabled={!resolvedUrl || isResolving}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-accentBlue text-white transition hover:bg-brand-accentTeal disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={isPlaying ? "Pause recording" : "Play recording"}
                >
                  {isPlaying ? (
                    <span className="text-lg font-bold">II</span>
                  ) : (
                    <span className="ml-0.5 text-lg">▶</span>
                  )}
                </button>
                <input
                  type="range"
                  value={Math.min(currentTime, maxDuration || 0)}
                  min={0}
                  max={maxDuration || 0}
                  step={0.1}
                  disabled={!resolvedUrl || maxDuration <= 0 || isResolving}
                  onChange={(event) => handleSeek(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-pageAlt accent-brand-accentBlue disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Playback position"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-medium text-brand-muted">
                <span>{formatTimestamp(currentTime)}</span>
                <span>{formatTimestamp(maxDuration)}</span>
              </div>
            </div>

            {(activeClip.scientificName || activeClip.deviceDisplayName || activeClip.wavId) && (
              <div className="mt-4 space-y-1 text-xs text-brand-muted">
                {activeClip.scientificName && <p>{activeClip.scientificName}</p>}
                {activeClip.deviceDisplayName && <p>Source: {activeClip.deviceDisplayName}</p>}
                {activeClip.wavId && <p>Clip ID: {activeClip.wavId}</p>}
              </div>
            )}
          </div>

          {isResolving && <p className="text-sm text-brand-muted">Loading clip metadata…</p>}
          {errorMessage && <p className="text-sm font-medium text-brand-accentRed">{errorMessage}</p>}
        </div>

        <footer className="flex flex-col gap-3 border-t border-brand-borderSubtle bg-brand-cardHeader px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveIndex((current) => Math.max(current - 1, 0))}
              disabled={!canGoBack}
              className="rounded-lg bg-brand-accentBlue px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-accentTeal disabled:cursor-not-allowed disabled:opacity-50"
            >
              {'<<'} Back
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((current) => Math.min(current + 1, clips.length - 1))}
              disabled={!canGoNext}
              className="rounded-lg bg-brand-accentBlue px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-accentTeal disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next {'>>'}
            </button>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-brand-borderStrong bg-brand-card px-4 py-2 text-sm font-semibold text-brand-text transition hover:bg-brand-page"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
