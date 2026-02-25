import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Timer } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface MiniTimerProps {
  defaultDuration?: number
  className?: string
}

export interface MiniTimerRef {
  start: () => void
}

export const MiniTimer = forwardRef<MiniTimerRef, MiniTimerProps>(({ defaultDuration = 90, className }, ref) => {
  const [timeLeft, setTimeLeft] = useState(defaultDuration)
  const [isRunning, setIsRunning] = useState(false)
  const [duration] = useState(defaultDuration)
  const [autoStart] = useKV<boolean>('rest-timer-auto-start', false)

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
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft])

  if (!isRunning && timeLeft === duration) {
    return null
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isWarning = timeLeft <= 5 && timeLeft > 0 && isRunning

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground shadow-lg transition-all",
        isWarning && "animate-pulse bg-destructive",
        className
      )}
    >
      <Timer size={16} weight="fill" />
      <span className="text-sm font-bold tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
})
