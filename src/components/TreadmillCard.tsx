import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  ArrowCounterClockwise,
  Check,
  PersonSimpleRun,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface TreadmillCardProps {
  isCompleted: boolean;
  onComplete: (completed: boolean) => void;
  onCardClick?: () => void;
  isInFocusMode?: boolean;
}

export function TreadmillCard({
  isCompleted,
  onComplete,
  onCardClick,
  isInFocusMode = false,
}: TreadmillCardProps) {
  const defaultDuration = 10 * 60;
  const [timeLeft, setTimeLeft] = useState(defaultDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [duration] = useState(defaultDuration);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onComplete]);

  const handlePlayPause = () => {
    if (timeLeft === 0) {
      setTimeLeft(duration);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
    onComplete(false);
  };

  const handleMarkComplete = () => {
    onComplete(!isCompleted);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((defaultDuration - timeLeft) / defaultDuration) * 100;

  return (
    <Card
      className={cn(
        "p-6 transition-all duration-300 relative overflow-hidden bg-linear-to-br from-primary to-secondary border-primary/20",
        isCompleted && "bg-accent/5 border-accent/20",
        !isInFocusMode &&
          onCardClick &&
          "cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
      )}
    >
      <PersonSimpleRun
        size={320}
        className="z-0 absolute top-1/12 left-1 translate-x-2/5 fill-background"
      />
      <div
        className="absolute bottom-0 left-0 h-1 bg-done transition-all duration-300"
        style={{ width: `${progress}%` }}
      />

      <div className="flex flex-col gap-4 z-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div>
                <h3
                  onClick={() => !isInFocusMode && onCardClick?.()}
                  className="text-lg  text-secondary font-semibold leading-tight"
                >
                  Treadmill Warmup
                </h3>
                <p className="text-sm text-muted-foreground">
                  10 minutes • Moderate pace
                </p>
              </div>
            </div>
          </div>
          {isCompleted && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-done text-done-foreground">
              <Check weight="bold" size={20} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-4">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Time Remaining
            </span>
            <div className="text-4xl font-bold tracking-tighter tabular-nums">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handlePlayPause}
              size="lg"
              variant={isRunning ? "secondary" : "default"}
              className="h-14 w-14 p-0"
            >
              {isRunning ? (
                <Pause size={24} weight="fill" />
              ) : (
                <Play size={24} weight="fill" />
              )}
            </Button>
            <Button
              onClick={handleReset}
              size="lg"
              variant="outline"
              className="h-14 w-14 p-0"
            >
              <ArrowCounterClockwise size={24} />
            </Button>
          </div>
        </div>

        <Button
          onClick={handleMarkComplete}
          variant={isCompleted ? "secondary" : "default"}
          className="w-full"
        >
          {isCompleted ? (
            <>
              <Check className="mr-2" weight="bold" />
              Completed
            </>
          ) : (
            <>
              <Check className="mr-2" />
              Mark as Complete
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
