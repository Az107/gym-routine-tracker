import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause, ArrowCounterClockwise } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface RestTimerProps {
  defaultDuration?: number
  onComplete?: () => void
  className?: string
}

export function RestTimer({ defaultDuration = 90, onComplete, className }: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(defaultDuration)
  const [isRunning, setIsRunning] = useState(false)
  const [duration, setDuration] = useState(defaultDuration)

  useEffect(() => {
    let interval: number | undefined

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            onComplete?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, onComplete])

  const handlePlayPause = () => {
    if (timeLeft === 0) {
      setTimeLeft(duration)
    }
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(duration)
  }

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration)
    if (!isRunning) {
      setTimeLeft(newDuration)
    }
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isWarning = timeLeft <= 5 && timeLeft > 0 && isRunning

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Rest Timer
        </span>
        <div className="flex gap-1">
          {[60, 90, 120].map((dur) => (
            <button
              key={dur}
              onClick={() => handleDurationChange(dur)}
              className={cn(
                "px-2 py-1 text-xs font-medium rounded transition-colors",
                duration === dur
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {dur}s
            </button>
          ))}
        </div>
      </div>

      <div className={cn(
        "text-5xl font-bold tracking-tighter transition-all",
        isWarning && "animate-pulse text-destructive"
      )}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handlePlayPause}
          size="lg"
          className={cn(
            "flex-1 transition-all",
            isRunning ? "bg-accent hover:bg-accent/90" : ""
          )}
        >
          {isRunning ? (
            <>
              <Pause className="mr-2" weight="fill" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2" weight="fill" />
              {timeLeft === 0 ? 'Restart' : 'Start'}
            </>
          )}
        </Button>
        <Button
          onClick={handleReset}
          size="lg"
          variant="outline"
        >
          <ArrowCounterClockwise />
        </Button>
      </div>
    </div>
  )
}
