import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo, useMotionValue } from 'framer-motion'
import { X, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Exercise } from '@/types/routine'

interface FocusModeProps {
  isOpen: boolean
  onClose: () => void
  initialIndex: number
  exercises: Exercise[]
  treadmillCompleted: boolean
  onTreadmillComplete: (completed: boolean) => void
  completedSets: Record<number, boolean[]>
  onSetToggle: (exerciseIndex: number, setIndex: number) => void
  renderTreadmill: () => React.ReactNode
  renderExercise: (exercise: Exercise, index: number) => React.ReactNode
}

export function FocusMode({
  isOpen,
  onClose,
  initialIndex,
  exercises,
  renderTreadmill,
  renderExercise,
}: FocusModeProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const x = useMotionValue(0)
  const constraintsRef = useRef(null)
  
  const totalCards = exercises.length + 1
  const canGoNext = currentIndex < totalCards - 1
  const canGoPrev = currentIndex > 0

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, initialIndex])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    const velocity = info.velocity.x
    const offset = info.offset.x

    if (offset > threshold || velocity > 500) {
      if (canGoPrev) {
        setCurrentIndex(prev => prev - 1)
      }
    } else if (offset < -threshold || velocity < -500) {
      if (canGoNext) {
        setCurrentIndex(prev => prev + 1)
      }
    }
  }

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const getCurrentCard = () => {
    if (currentIndex === 0) {
      return renderTreadmill()
    } else {
      return renderExercise(exercises[currentIndex - 1], currentIndex - 1)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background z-50 flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b bg-background/95 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="gap-2"
          >
            <X size={20} weight="bold" />
            Exit Focus
          </Button>
          <div className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {totalCards}
          </div>
        </div>

        <div
          ref={constraintsRef}
          className="flex-1 relative overflow-hidden"
        >
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className="h-full flex items-center justify-center p-6 cursor-grab active:cursor-grabbing"
          >
            <div className="w-full max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {getCurrentCard()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {canGoPrev && (
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-16 w-16 rounded-full p-0 hidden md:flex"
            >
              <CaretLeft size={24} weight="bold" />
            </Button>
          )}

          {canGoNext && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-16 w-16 rounded-full p-0 hidden md:flex"
            >
              <CaretRight size={24} weight="bold" />
            </Button>
          )}
        </div>

        <div className="flex items-center justify-center gap-1.5 px-4 py-6 border-t bg-background/95 backdrop-blur-sm">
          {Array.from({ length: totalCards }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
