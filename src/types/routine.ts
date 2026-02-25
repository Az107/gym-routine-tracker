export interface Exercise {
  nombre: string
  series: number
  repeticiones: number | string
  nota?: string
}

export interface WorkoutDay {
  dia: string
  grupo_muscular: string
  nota?: string
  ejercicios: Exercise[]
}

export interface Routine {
  rutina: WorkoutDay[]
}

export interface SetCompletion {
  [exerciseIndex: number]: boolean[]
}
