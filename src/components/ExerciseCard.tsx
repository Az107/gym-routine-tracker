import { Card } from '@/components/ui/card'
import { Check } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import type { Exercise } from '@/types/routine'

interface ExerciseCardProps {
  exercise: Exercise
  exerciseIndex: number
  completedSets: boolean[]
  onSetToggle: (setIndex: number) => void
}

export function ExerciseCard({ 
  exercise, 
  completedSets, 
  onSetToggle 
}: ExerciseCardProps) {
  const allSetsCompleted = completedSets.every((completed) => completed)
  const completedCount = completedSets.filter((completed) => completed).length

  return (
    <Card className={cn(
      "p-6 transition-all duration-300",
      allSetsCompleted && "bg-accent/5 border-accent/20"
    )}>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium leading-tight">
              {exercise.nombre}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {exercise.series} series × {exercise.repeticiones} reps
            </p>
          </div>
          {allSetsCompleted && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground">
              <Check weight="bold" size={20} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Sets
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {completedCount} / {exercise.series}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: exercise.series }).map((_, index) => (
              <button
                key={index}
                onClick={() => onSetToggle(index)}
                className={cn(
                  "w-12 h-12 rounded-full border-2 transition-all duration-150",
                  "flex items-center justify-center font-semibold text-sm",
                  "hover:scale-105 active:scale-95",
                  completedSets[index]
                    ? "bg-accent border-accent text-accent-foreground"
                    : "bg-background border-border text-muted-foreground hover:border-primary/50"
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
        </div>
      </div>
    </Card>
  )
}
