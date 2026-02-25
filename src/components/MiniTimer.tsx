import {useEffect, useImperativeHandle, forwardRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Timer } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface MiniTimerProps {
  defaultDuration?: number
  className?: string
}



export const MiniTimer = (props: {ref: RestTimerRef }) => {


  const minutes = Math.floor(props.ref.timeLeft / 60)
  const seconds = props.ref.timeLeft % 60
  const isWarning = props.ref.timeLeft <= 5 && props.ref.timeLeft > 0 && props.ref.isRunning

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground shadow-lg transition-all",
        isWarning && "animate-pulse bg-destructive"
      )}
    >
      <Timer size={16} weight="fill" />
      <span className="text-sm font-bold tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
}
