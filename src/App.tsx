import { useMemo, useRef, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Barbell, CalendarDots, Info, CaretDown } from "@phosphor-icons/react";
import { RestTimer, type RestTimerRef } from "@/components/RestTimer";
import { FocusMode } from "@/components/FocusMode";
import { gymRoutine } from "@/data/routine";
import type { SetCompletion } from "@/types/routine";
import { supabase, useLocalStorageState } from "./lib/utils";
import { User, UserResponse } from "@supabase/supabase-js";
import { ExerciseList } from "./components/ExerciseList";

const develop = true;

function App() {
  const dayNames = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const actualCurrentDay = dayNames[new Date().getDay()];
  const timerRef = useRef<RestTimerRef>(null);
  const [showDayNoteDialog, setShowDayNoteDialog] = useState(false);
  const [overrideDay, setOverrideDay] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [focusModeOpen, setFocusModeOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [focusModeIndex, setFocusModeIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTimerExpanded, setIsTimerExpanded] = useState(false);
  const [timerState, setTimerState] = useState({
    timeLeft: 90,
    isRunning: false,
  });

  const handleBlur = () => {
    if (userName && userName !== userData?.user_metadata.display_name) {
      supabase.auth.updateUser({ data: { display_name: userName } });
    }
  };

  const currentDay = overrideDay || actualCurrentDay;

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserData(user);
      if (user!.user_metadata.display_name == null) {
      } else {
        setUserName(user.user_metadata.display_name ?? null);
      }
    });
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      setIsScrolled(scrollTop > 50);

      if (isTimerExpanded && scrollTop > 0) {
        setIsTimerExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTimerExpanded]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRef.current) {
        setTimerState({
          timeLeft: timerRef.current.getTimeLeft(),
          isRunning: timerRef.current.getIsRunning(),
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const todayWorkout = useMemo(() => {
    return gymRoutine.rutina.find((workout) => workout.dia === currentDay);
  }, [currentDay]);

  const initialCompletion: SetCompletion = useMemo(() => {
    if (!todayWorkout) return {};
    return todayWorkout.ejercicios.reduce((acc, exercise, index) => {
      if (exercise.kind == "set") {
        acc[index] = Array(exercise.sets).fill(false);
      } else if (exercise.kind == "time") {
        acc[index] = [false];
      }
      return acc;
    }, {} as SetCompletion);
  }, [todayWorkout]);

  const [completion, setCompletion] = useLocalStorageState<SetCompletion>(
    `workout-completion-${currentDay}`,
    initialCompletion,
  );

  const handleSetToggle = (exerciseIndex: number, setIndex: number) => {
    setCompletion((currentCompletion) => {
      const newCompletion = { ...currentCompletion };
      if (!newCompletion[exerciseIndex]) {
        newCompletion[exerciseIndex] = Array(
          todayWorkout?.ejercicios[exerciseIndex].sets || 0,
        ).fill(false);
      }
      newCompletion[exerciseIndex] = [...newCompletion[exerciseIndex]];
      const wasCompleted = newCompletion[exerciseIndex][setIndex];
      newCompletion[exerciseIndex][setIndex] =
        !newCompletion[exerciseIndex][setIndex];

      if (!wasCompleted && newCompletion[exerciseIndex][setIndex]) {
        timerRef.current?.start();
      }

      return newCompletion;
    });
  };

  const progressStats = useMemo(() => {
    if (!todayWorkout || !completion)
      return { completed: 0, total: 0, percentage: 0 };

    const total = todayWorkout.ejercicios.reduce(
      (sum, exercise) => sum + (exercise.kind == "time" ? 1 : exercise.sets),
      0,
    );
    const exercisesCompleted = Object.values(completion).reduce(
      (sum, sets) => sum + sets.filter((s: boolean) => s).length,
      0,
    );
    const completed = exercisesCompleted;

    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [todayWorkout, completion]);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b transition-all duration-300">
        <div
          className={`max-w-2xl mx-auto px-6 transition-all duration-300 ${isScrolled ? "py-3" : "py-6"}`}
        >
          <div
            className={`flex items-center gap-3 transition-all duration-300 overflow-hidden ${isScrolled ? "max-h-0 mb-0 opacity-0" : "max-h-20 mb-4 opacity-100"}`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-sm text-muted-foreground h-auto p-2 -ml-2"
                >
                  <CalendarDots size={18} />
                  <span className="font-medium">{currentDay}</span>
                  <CaretDown size={14} weight="bold" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {gymRoutine.rutina.map((workout) => (
                  <DropdownMenuItem
                    key={workout.dia}
                    onClick={() =>
                      setOverrideDay(
                        workout.dia === actualCurrentDay ? null : workout.dia,
                      )
                    }
                    className="flex items-center justify-between"
                  >
                    <span>{workout.dia}</span>
                    {workout.dia === actualCurrentDay && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Today
                      </Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Badge variant="secondary" className="font-semibold">
              <Barbell size={14} className="mr-1.5" weight="fill" />
              {todayWorkout?.grupo_muscular ?? "No Workout"}
            </Badge>
            {todayWorkout?.nota && (
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

          <div className="flex flex-row items-baseline gap-2 mb-4">
            <h1 className="font-bold tracking-tight text-3xl transition-all duration-300">
              Bienvenido{" "}
            </h1>
            <input
              type="text"
              value={userName ?? ""}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={handleBlur}
              placeholder="Tu nombre"
              className="
                font-bold tracking-tight text-3xl
                bg-transparent border-none outline-none
                text-gray-800 focus:ring-0
                placeholder:text-gray-400
                w-auto min-w-[4ch]
              "
            />
          </div>

          {todayWorkout && (
            <div className="space-y-2">
              <div
                className={`flex items-center justify-between text-sm transition-all duration-300 ${isScrolled ? "opacity-0 max-h-0 overflow-hidden" : "opacity-100 max-h-10"}`}
              >
                <span className="font-medium text-muted-foreground">
                  Progress
                </span>
                <span className="font-bold text-foreground">
                  {progressStats.completed} / {progressStats.total} items
                </span>
              </div>
              <Progress value={progressStats.percentage} className="h-2" />
            </div>
          )}
        </div>
      </div>

      {todayWorkout ? (
        <div
          style={{ overflowAnchor: "none" }} // Prevents the page from jumping when scrolling
          className={`max-w-2xl mx-auto px-6 py-6 ${focusModeOpen ? "" : "pb-24"}`}
        >
          <ExerciseList
            exercises={todayWorkout.ejercicios}
            onCompletion={handleSetToggle}
            completion={completion}
          />
        </div>
      ) : (
        <div className="bg-background px-3 flex items-center justify-center p-6 min-h-full">
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
      )}

      <div
        className={`fixed bottom-0 w-full z-50 bg-card border-t transition-all duration-300 ${
          focusModeOpen ? "hidden" : ""
        }`}
      >
        <div
          className={`max-w-2xl mx-auto px-6 overflow-hidden transition-all duration-300 ${
            isTimerExpanded ? "py-5" : "py-3"
          }`}
        >
          <RestTimer
            ref={timerRef}
            isTimerExpanded={isTimerExpanded}
            onToggleExpand={() => setIsTimerExpanded(!isTimerExpanded)}
          />
        </div>
      </div>

      <Dialog open={showDayNoteDialog} onOpenChange={setShowDayNoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {todayWorkout?.grupo_muscular ?? "No group"}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {todayWorkout?.nota ?? "No note"}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
