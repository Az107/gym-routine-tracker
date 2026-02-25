import { useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Barbell, CalendarDots } from '@phosphor-icons/react'
import { ExerciseCard } from '@/components/ExerciseCard'
import { RestTimer } from '@/components/RestTimer'
import { gymRoutine } from '@/data/routine'
import type { SetCompletion } from '@/types/routine'

function App() {
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const currentDay = dayNames[new Date().getDay()]

  const todayWorkout = useMemo(() => {
    return gymRoutine.rutina.find((workout) => workout.dia === currentDay)
  }, [currentDay])

  const initialCompletion: SetCompletion = useMemo(() => {
    if (!todayWorkout) return {}
    return todayWorkout.ejercicios.reduce((acc, exercise, index) => {
      acc[index] = Array(exercise.series).fill(false)
      return acc
    }, {} as SetCompletion)
  }, [todayWorkout])

  const [completion, setCompletion] = useKV<SetCompletion>(
    `workout-completion-${currentDay}`,
    initialCompletion
  )

  const handleSetToggle = (exerciseIndex: number, setIndex: number) => {
    setCompletion((currentCompletion) => {
      const newCompletion = { ...currentCompletion }
      if (!newCompletion[exerciseIndex]) {
        newCompletion[exerciseIndex] = Array(todayWorkout?.ejercicios[exerciseIndex].series || 0).fill(false)
      }
      newCompletion[exerciseIndex] = [...newCompletion[exerciseIndex]]
      newCompletion[exerciseIndex][setIndex] = !newCompletion[exerciseIndex][setIndex]
      return newCompletion
    })
  }

  const progressStats = useMemo(() => {
    if (!todayWorkout || !completion) return { completed: 0, total: 0, percentage: 0 }
    
    const total = todayWorkout.ejercicios.reduce((sum, exercise) => sum + exercise.series, 0)
    const completed = Object.values(completion).reduce(
      (sum, sets) => sum + sets.filter((s: boolean) => s).length,
      0
    )
    
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    }
  }, [todayWorkout, completion])

  if (!todayWorkout) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <Barbell size={32} className="text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Rest Day</h2>
          <p className="text-muted-foreground">
            No workout scheduled for {currentDay}. Enjoy your rest!
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-2xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDots size={18} />
              <span className="font-medium">{currentDay}</span>
            </div>
            <Badge variant="secondary" className="font-semibold">
              <Barbell size={14} className="mr-1.5" weight="fill" />
              {todayWorkout.grupo_muscular}
            </Badge>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Today's Workout
          </h1>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-muted-foreground">Progress</span>
              <span className="font-bold text-foreground">
                {progressStats.completed} / {progressStats.total} sets
              </span>
            </div>
            <Progress value={progressStats.percentage} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6">
        <div className="flex flex-col gap-4">
          {todayWorkout.ejercicios.map((exercise, index) => (
            <ExerciseCard
              key={index}
              exercise={exercise}
              exerciseIndex={index}
              completedSets={(completion && completion[index]) || Array(exercise.series).fill(false)}
              onSetToggle={(setIndex) => handleSetToggle(index, setIndex)}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg">
        <div className="max-w-2xl mx-auto px-6 py-6">
          <RestTimer />
        </div>
      </div>
    </div>
  )
}

export default App