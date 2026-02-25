import type { Routine } from '@/types/routine'

export const gymRoutine: Routine = {
  rutina: [
    {
      dia: "Lunes",
      grupo_muscular: "Espalda",
      ejercicios: [
        { nombre: "Jalones tras nuca", series: 4, repeticiones: 12 },
        { nombre: "Remo punta polea baja", series: 4, repeticiones: 12 },
        { nombre: "Jalones al pecho agarre estrecho", series: 4, repeticiones: 12 },
        { nombre: "Máquina de Remo", series: 4, repeticiones: 12 },
        { nombre: "Peso Muerto Mancuernas", series: 3, repeticiones: 15 },
        { nombre: "Femoral tumbado", series: 4, repeticiones: 10 }
      ]
    },
    {
      dia: "Martes",
      grupo_muscular: "Pecho",
      ejercicios: [
        { nombre: "Press banca", series: 4, repeticiones: 12 },
        { nombre: "Press banca inclinado", series: 4, repeticiones: 12 },
        { nombre: "Máquina pecho superior", series: 4, repeticiones: 12 },
        { nombre: "Contractor", series: 4, repeticiones: 12 },
        { nombre: "Flexiones suelo", series: 3, repeticiones: "al límite" },
        { nombre: "Gemelo", series: 4, repeticiones: 25 }
      ]
    },
    {
      dia: "Miércoles",
      grupo_muscular: "Pierna",
      ejercicios: [
        { nombre: "Extensiones de cuádriceps", series: 4, repeticiones: 25 },
        { nombre: "Hack squat sentado", series: 4, repeticiones: 12 },
        { nombre: "Prensa", series: 4, repeticiones: 12 },
        { nombre: "Hack squat de pie", series: 4, repeticiones: "pasillos" },
        { nombre: "Femoral tumbado", series: 4, repeticiones: 12 }
      ]
    },
    {
      dia: "Jueves",
      grupo_muscular: "Brazo",
      ejercicios: [
        { nombre: "Bíceps barra Z", series: 4, repeticiones: 12 },
        { nombre: "Bíceps martillo mancuerna", series: 4, repeticiones: 12 },
        { nombre: "Bíceps concentrado", series: 3, repeticiones: 15 },
        { nombre: "Tríceps polea", series: 4, repeticiones: 12 },
        { nombre: "Tríceps Francés", series: 4, repeticiones: 12 },
        { nombre: "Fondos", series: 3, repeticiones: 15 }
      ]
    },
    {
      dia: "Viernes",
      grupo_muscular: "Hombro",
      ejercicios: [
        { nombre: "Press de hombro con mancuernas", series: 4, repeticiones: 12 },
        { nombre: "Elevaciones laterales", series: 4, repeticiones: 12 },
        { nombre: "Elevaciones frontales barra Z", series: 4, repeticiones: 12 },
        { nombre: "Máquina de Hombro Posterior", series: 4, repeticiones: 12 },
        { nombre: "Trapecio Barra", series: 4, repeticiones: 15 }
      ]
    }
  ]
}
