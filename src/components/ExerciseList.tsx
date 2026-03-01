import { ExerciseCard } from "./ExerciseCard";
import { TreadmillCard } from "./TreadmillCard";
import { useLocalStorageState } from "../lib/utils";
import { Exercise, WorkoutDay } from "@/types/routine";

const handleCardClick = (index: number) => {
  // setFocusModeIndex(index);
  // setFocusModeOpen(true);
};

interface ExerciseListProps {
  exercises: Exercise[];
  onCompletion: any;
  completion: any;
}

export function ExerciseList(props: ExerciseListProps) {
  const { exercises, onCompletion, completion } = props;
  if (!exercises) return null;

  return (
    <div className="flex flex-col gap-4">
      <TreadmillCard
        isCompleted={false}
        onComplete={() => onCompletion(-1, 0)}
        onCardClick={() => handleCardClick(0)}
      />

      {exercises.map((exercise, index) => (
        <ExerciseCard
          key={index}
          exercise={exercise}
          exerciseIndex={index}
          completedSets={
            (completion && completion[index]) ||
            Array(exercise.series).fill(false)
          }
          onSetToggle={(setIndex) => onCompletion(index, setIndex)}
          onCardClick={() => handleCardClick(index + 1)}
        />
      ))}
    </div>
  );
}
