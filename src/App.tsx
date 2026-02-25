import { useMemo, useRef, useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Barbell, CalendarDots, Info, CaretDown, Play, Pause } from '@phosphor-icons/react'
import { ExerciseCard } from '@/components/ExerciseCard'
import { TreadmillCard } from '@/components/TreadmillCard'
import { MiniTimer } from '@/components/MiniTimer'
import {RestTimer, type RestTimerRef} from '@/components/RestTimer'
import { FocusMode } from '@/components/FocusMode'
import { gymRoutine } from '@/data/routine'
import type { SetCompletion } from '@/types/routine'

function App() {
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const actualCurrentDay = dayNames[new Date().getDay()]
  const timerRef = useRef<RestTimerRef>(null)
  const [showDayNoteDialog, setShowDayNoteDialog] = useState(false)
  const [overrideDay, setOverrideDay] = useKV<string | null>('day-override', null)
  const [focusModeOpen, setFocusModeOpen] = useState(false)
  const [focusModeIndex, setFocusModeIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isTimerExpanded, setIsTimerExpanded] = useState(false)
  const [timerState, setTimerState] = useState({ timeLeft: 90, isRunning: false })

  const currentDay = overrideDay || actualCurrentDay

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      
      setIsScrolled(scrollTop > 50)
      
      if (isTimerExpanded && scrollTop > 0) {
        setIsTimerExpanded(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isTimerExpanded])

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRef.current) {
        setTimerState({
          timeLeft: timerRef.current.timeLeft,
          isRunning: timerRef.current.isRunning
        })
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [])

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

  const [treadmillCompleted, setTreadmillCompleted] = useKV<boolean>(
    `treadmill-completion-${currentDay}`,
    false
  )

  const handleSetToggle = (exerciseIndex: number, setIndex: number) => {
    setCompletion((currentCompletion) => {
      const newCompletion = { ...currentCompletion }
      if (!newCompletion[exerciseIndex]) {
        newCompletion[exerciseIndex] = Array(todayWorkout?.ejercicios[exerciseIndex].series || 0).fill(false)
      }
      newCompletion[exerciseIndex] = [...newCompletion[exerciseIndex]]
      const wasCompleted = newCompletion[exerciseIndex][setIndex]
      newCompletion[exerciseIndex][setIndex] = !newCompletion[exerciseIndex][setIndex]
      
      if (!wasCompleted && newCompletion[exerciseIndex][setIndex]) {
        timerRef.current?.start()
      }
      
      return newCompletion
    })
  }

  const handleCardClick = (index: number) => {
    setFocusModeIndex(index)
    setFocusModeOpen(true)
  }

  const progressStats = useMemo(() => {
    if (!todayWorkout || !completion) return { completed: 0, total: 0, percentage: 0 }
    
    const total = todayWorkout.ejercicios.reduce((sum, exercise) => sum + exercise.series, 0) + 1
    const exercisesCompleted = Object.values(completion).reduce(
      (sum, sets) => sum + sets.filter((s: boolean) => s).length,
      0
    )
    const completed = exercisesCompleted + (treadmillCompleted ? 1 : 0)
    
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    }
  }, [todayWorkout, completion, treadmillCompleted])

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
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b transition-all duration-300">
        <div className={`max-w-2xl mx-auto px-6 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6'}`}>
          <div className={`flex items-center gap-3 transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 mb-0 opacity-0' : 'max-h-20 mb-4 opacity-100'}`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-sm text-muted-foreground h-auto p-2 -ml-2">
                  <CalendarDots size={18} />
                  <span className="font-medium">{currentDay}</span>
                  <CaretDown size={14} weight="bold" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {gymRoutine.rutina.map((workout) => (
                  <DropdownMenuItem
                    key={workout.dia}
                    onClick={() => setOverrideDay(workout.dia === actualCurrentDay ? null : workout.dia)}
                    className="flex items-center justify-between"
                  >
                    <span>{workout.dia}</span>
                    {workout.dia === actualCurrentDay && (
                      <Badge variant="secondary" className="ml-2 text-xs">Today</Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Badge variant="secondary" className="font-semibold">
              <Barbell size={14} className="mr-1.5" weight="fill" />
              {todayWorkout.grupo_muscular}
            </Badge>
            {todayWorkout.nota && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 ml-auto"
                onClick={() => setShowDayNoteDialog(true)}
              >
                <Info size={18} className="text-primary" weight="fill" />
              </Button>
            )}
          </div>
          
          <h1 className={`font-bold tracking-tight transition-all duration-300 overflow-hidden ${isScrolled ? 'text-xl mb-3 max-h-8 opacity-0' : 'text-3xl mb-4 max-h-20 opacity-100'}`}>
            Today's Workout
          </h1>

          <div className="space-y-2">
            <div className={`flex items-center justify-between text-sm transition-all duration-300 ${isScrolled ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-10'}`}>
              <span className="font-medium text-muted-foreground">Progress</span>
              <span className="font-bold text-foreground">
                {progressStats.completed} / {progressStats.total} items
              </span>
            </div>
            <Progress value={progressStats.percentage} className="h-2" />
          </div>
        </div>
      </div>

      <div className={`max-w-2xl mx-auto px-6 py-6 ${focusModeOpen ? '' : 'pb-24'}`}>
        <div className="flex flex-col gap-4">
          <TreadmillCard
            isCompleted={treadmillCompleted || false}
            onComplete={setTreadmillCompleted}
            onCardClick={() => handleCardClick(0)}
          />
          
          {todayWorkout.ejercicios.map((exercise, index) => (
            <ExerciseCard
              key={index}
              exercise={exercise}
              exerciseIndex={index}
              completedSets={(completion && completion[index]) || Array(exercise.series).fill(false)}
              onSetToggle={(setIndex) => handleSetToggle(index, setIndex)}
              onCardClick={() => handleCardClick(index + 1)}
            />
          ))}
        </div>
      </div>

      <FocusMode
        isOpen={focusModeOpen}
        onClose={() => setFocusModeOpen(false)}
        initialIndex={focusModeIndex}
        exercises={todayWorkout.ejercicios}
        treadmillCompleted={treadmillCompleted || false}
        onTreadmillComplete={setTreadmillCompleted}
        completedSets={completion || {}}
        onSetToggle={handleSetToggle}
        timerRef={timerRef}
        renderTreadmill={() => (
          <TreadmillCard
            isCompleted={treadmillCompleted || false}
            onComplete={setTreadmillCompleted}
            isInFocusMode
          />
        )}
        renderExercise={(exercise, index) => (
          <ExerciseCard
            exercise={exercise}
            exerciseIndex={index}
            completedSets={(completion && completion[index]) || Array(exercise.series).fill(false)}
            onSetToggle={(setIndex) => handleSetToggle(index, setIndex)}
            isInFocusMode
          />
        )}
      />

      <div className={`fixed bottom-0 w-full z-50 bg-card border-t transition-all duration-300 ${
        focusModeOpen ? 'hidden' : ''
      }`}>
        <div className={`max-w-2xl mx-auto px-6 overflow-hidden transition-all duration-300 ${
          isTimerExpanded ? 'py-5' : 'py-3'
        }`}>
          {isTimerExpanded ? (
            <RestTimer ref={timerRef} />
          ) : (
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setIsTimerExpanded(true)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className={`text-2xl font-bold tracking-tighter transition-colors ${
                  timerState.isRunning && timerState.timeLeft <= 5 && timerState.timeLeft > 0
                    ? 'animate-pulse text-destructive'
                    : ''
                }`}>
                  {String(Math.floor(timerState.timeLeft / 60)).padStart(2, '0')}:
                  {String(timerState.timeLeft % 60).padStart(2, '0')}
                </div>
                <span className="text-sm font-medium text-muted-foreground">Rest Timer</span>
              </button>
              <Button
                onClick={() => timerRef.current?.toggle()}
                size="sm"
                className={timerState.isRunning ? "bg-accent hover:bg-accent/90" : ""}
              >
                {timerState.isRunning ? (
                  <>
                    <Pause className="mr-2" size={16} weight="fill" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2" size={16} weight="fill" />
                    Start
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    

      <Dialog open={showDayNoteDialog} onOpenChange={setShowDayNoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{todayWorkout.grupo_muscular}</DialogTitle>
            <DialogDescription className="text-base pt-2">
              {todayWorkout.nota}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App