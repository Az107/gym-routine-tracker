export interface Exercise {
  name: string;
  note?: string;
}

export interface ExerciseTime extends Exercise {
  kind: "time";
  time: number; // time in seconds
}

export interface ExerciseSet extends Exercise {
  kind: "set";
  sets: number;
  reps: number | string;
}
export type AnyExercise = ExerciseTime | ExerciseSet;

export interface WorkoutDay {
  dia: string;
  grupo_muscular: string;
  nota?: string;
  ejercicios: AnyExercise[];
}

export interface Routine {
  rutina: WorkoutDay[];
}

export interface SetCompletion {
  [exerciseIndex: number]: boolean[];
}
