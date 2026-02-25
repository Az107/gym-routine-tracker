export interface Exercise {
  nombre: string
  series: number
  repeticiones: number | string
}

export interface WorkoutDay {
  dia: string
  grupo_muscular: string
  ejercicios: Exercise[]
}

export interface Routine {
  rutina: WorkoutDay[]
}

export interface SetCompletion {
  [exerciseIndex: number]: boolean[]
}
