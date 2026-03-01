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

export function ExerciseList(props) {
  const { exercises, onCompletion, completion } = props;
  console.log(exercises);
  if (!exercises) return null;

  return (
    <div className="flex flex-col gap-4">
      {/*<TreadmillCard
          isCompleted={treadmillCompleted || false}
        onComplete={setTreadmillCompleted}
        onCardClick={() => handleCardClick(0)}
      />*/}

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
