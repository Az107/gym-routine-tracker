import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowCounterClockwise,
  Check,
  Info,
  Pause,
  Play,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { Exercise, AnyExercise, ExerciseSet } from "@/types/routine";

interface ExerciseCardProps {
  exercise: AnyExercise;
  exerciseIndex: number;
  completedSets: boolean[];
  onSetToggle: (setIndex: number) => void;
  onCardClick?: () => void;
  isInFocusMode?: boolean;
}

function TimeCompletion(props: {
  isCompleted: boolean;
  seconds: number;
  handleMarkComplete: (isCompleted: boolean) => void;
}) {
  const { isCompleted, seconds, handleMarkComplete } = props;
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [duration] = useState(seconds);
  const minutes = Math.floor(timeLeft / 60);
  const secondsRemaining = timeLeft % 60;

  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            handleMarkComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const handlePlayPause = () => {
    if (timeLeft === 0) {
      setTimeLeft(duration);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
    handleMarkComplete(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 z-1">
        <div className="flex items-start justify-between gap-4">
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
              {String(secondsRemaining).padStart(2, "0")}
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
          onClick={() => handleMarkComplete(!isCompleted)}
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
    </div>
  );
}

function SetCompletion(props: {
  exercise: ExerciseSet;
  completedCount: number;
  completedSets: boolean[];
  onSetToggle: (setIndex: number) => void;
}) {
  const { exercise, completedCount, completedSets, onSetToggle } = props;
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
          Sets
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {completedCount} / {exercise.sets}
        </span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: exercise.sets }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSetToggle(index)}
            className={cn(
              "w-12 h-12 rounded-full border-2 transition-all duration-150",
              "flex items-center justify-center font-semibold text-sm",
              "hover:scale-105 active:scale-95",
              completedSets[index]
                ? "bg-accent border-accent text-accent-foreground"
                : "bg-background border-border text-muted-foreground hover:border-primary/50",
            )}
          >
            {completedSets[index] ? (
              <Check weight="bold" size={20} />
            ) : (
              index + 1
            )}
          </button>
        ))}
      </div>
    </>
  );
}

export function ExerciseCard({
  exercise,
  completedSets,
  onSetToggle,
  onCardClick,
  isInFocusMode = false,
}: ExerciseCardProps) {
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const allSetsCompleted = completedSets.every((completed) => completed);
  const completedCount = completedSets.filter((completed) => completed).length;

  return (
    <>
      <Card
        className={cn(
          "p-6 transition-all duration-300",
          allSetsCompleted && "bg-accent/5 border-accent/20",
          !isInFocusMode &&
            onCardClick &&
            "cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-2">
                <h3
                  onClick={() => !isInFocusMode && onCardClick?.()}
                  className="text-lg font-medium leading-tight flex-1"
                >
                  {exercise.name}
                </h3>
                {exercise.note && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 shrink-0"
                    onClick={() => setShowNoteDialog(true)}
                  >
                    <Info size={18} className="text-primary" weight="fill" />
                  </Button>
                )}
              </div>
              {exercise.kind == "set" && (
                <p className="text-sm text-muted-foreground mt-1">
                  {exercise.sets} series × {exercise.reps} reps
                </p>
              )}
              {exercise.kind == "time" && (
                <p className="text-sm text-muted-foreground mt-1">
                  {exercise.time} seconds
                </p>
              )}
            </div>
            {allSetsCompleted && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground">
                <Check weight="bold" size={20} />
              </div>
            )}
          </div>
          {exercise.kind == "set" && (
            <SetCompletion
              exercise={exercise}
              completedCount={completedCount}
              completedSets={completedSets}
              onSetToggle={onSetToggle}
            />
          )}
          {exercise.kind == "time" && (
            <TimeCompletion
              isCompleted={allSetsCompleted}
              seconds={exercise.time}
              handleMarkComplete={(isCompleted) => onSetToggle(0)}
            />
          )}
          <div className="flex flex-col gap-2"></div>
        </div>
      </Card>

      <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{exercise.name}</DialogTitle>
            <DialogDescription className="text-base pt-2">
              {exercise.note}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
