import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Play, Pause, ArrowCounterClockwise, Plus } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface RestTimerProps {
  defaultDuration?: number
  onComplete?: () => void
  className?: string
}

export interface RestTimerRef {
  start: () => void
}

export const RestTimer = forwardRef<RestTimerRef, RestTimerProps>(({ defaultDuration = 90, onComplete, className }, ref) => {
  const [timeLeft, setTimeLeft] = useState(defaultDuration)
  const [isRunning, setIsRunning] = useState(false)
  const [duration, setDuration] = useState(defaultDuration)
  const [autoStart, setAutoStart] = useKV<boolean>('rest-timer-auto-start', false)
  const [showCustomTimerDialog, setShowCustomTimerDialog] = useState(false)
  const [customMinutes, setCustomMinutes] = useState(1)
  const [customSeconds, setCustomSeconds] = useState(30)

  useImperativeHandle(ref, () => ({
    start: () => {
      if (autoStart) {
        setTimeLeft(duration)
        setIsRunning(true)
      }
    }
  }), [autoStart, duration])

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

  const handleCustomTimerSave = () => {
    const customDuration = customMinutes * 60 + customSeconds
    handleDurationChange(customDuration)
    setShowCustomTimerDialog(false)
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
          <button
            onClick={() => setShowCustomTimerDialog(true)}
            className="px-2 py-1 text-xs font-medium rounded transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            <Plus size={14} weight="bold" />
          </button>
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

      <div className="flex items-center gap-2">
        <Checkbox
          id="auto-start-timer"
          checked={autoStart}
          onCheckedChange={(checked) => setAutoStart((prev) => !!checked)}
        />
        <Label
          htmlFor="auto-start-timer"
          className="text-sm font-medium cursor-pointer select-none"
        >
          Auto-start timer after completing each set
        </Label>
      </div>

      <Dialog open={showCustomTimerDialog} onOpenChange={setShowCustomTimerDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Timer</DialogTitle>
            <DialogDescription>
              Set a custom rest duration
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 items-center justify-center py-6">
            <div className="flex flex-col items-center gap-2">
              <Label htmlFor="custom-minutes" className="text-sm font-medium">Minutes</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCustomMinutes((prev) => Math.max(0, prev - 1))}
                >
                  <span className="text-lg">−</span>
                </Button>
                <input
                  id="custom-minutes"
                  type="number"
                  min="0"
                  max="99"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(Math.max(0, Math.min(99, parseInt(e.target.value) || 0)))}
                  className="w-20 text-center text-2xl font-bold bg-secondary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCustomMinutes((prev) => Math.min(99, prev + 1))}
                >
                  <span className="text-lg">+</span>
                </Button>
              </div>
            </div>
            <span className="text-3xl font-bold text-muted-foreground">:</span>
            <div className="flex flex-col items-center gap-2">
              <Label htmlFor="custom-seconds" className="text-sm font-medium">Seconds</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCustomSeconds((prev) => Math.max(0, prev - 15))}
                >
                  <span className="text-lg">−</span>
                </Button>
                <input
                  id="custom-seconds"
                  type="number"
                  min="0"
                  max="59"
                  step="15"
                  value={customSeconds}
                  onChange={(e) => setCustomSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  className="w-20 text-center text-2xl font-bold bg-secondary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCustomSeconds((prev) => Math.min(59, prev + 15))}
                >
                  <span className="text-lg">+</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowCustomTimerDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleCustomTimerSave}
            >
              Set Timer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
})
