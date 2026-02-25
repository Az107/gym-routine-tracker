import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowsOut } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { RestTimer, type RestTimerRef } from '@/components/RestTimer'

interface FullscreenTimerProps {
  timerRef: React.RefObject<RestTimerRef | null>
}

export function FullscreenTimer({ timerRef }: FullscreenTimerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex-1" onClick={() => setIsFullscreen(false)}>
          <RestTimer ref={timerRef} />
        </div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b bg-background/95 backdrop-blur-sm">
              <h2 className="text-xl font-bold">Rest Timer</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(false)}
                className="gap-2"
              >
                <X size={20} weight="bold" />
                Close
              </Button>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-lg">
                <RestTimer ref={timerRef} className="scale-150 origin-center" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
