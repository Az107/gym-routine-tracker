import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Check, Info } from '@phosphor-icons/react'
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
  const [showNoteDialog, setShowNoteDialog] = useState(false)
  const allSetsCompleted = completedSets.every((completed) => completed)
  const completedCount = completedSets.filter((completed) => completed).length

  return (
    <>
      <Card className={cn(
        "p-6 transition-all duration-300",
        allSetsCompleted && "bg-accent/5 border-accent/20"
      )}>
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-2">
                <h3 className="text-lg font-medium leading-tight flex-1">
                  {exercise.nombre}
                </h3>
                {exercise.nota && (
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

      <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{exercise.nombre}</DialogTitle>
            <DialogDescription className="text-base pt-2">
              {exercise.nota}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
