import type { Routine } from '@/types/routine'

export const gymRoutine: Routine = {
  rutina: [
    {
      dia: "Lunes",
      grupo_muscular: "Empuje",
      nota: "Pecho y Tríceps, prioriza técnica en press banca, no carga",
      ejercicios: [
        { nombre: "Press banca", series: 4, repeticiones: 8, nota: "Peso controlado, aprende el movimiento" },
        { nombre: "Press banca inclinado mancuernas", series: 3, repeticiones: 10 },
        { nombre: "Contractor o máquina pecho", series: 3, repeticiones: 12 },
        { nombre: "Tríceps polea", series: 3, repeticiones: 12 },
        { nombre: "Plancha abdominal", series: 3, repeticiones: "30 segundos", nota: "Core - no negociar esto" }
      ]
    },
    {
      dia: "Martes",
      grupo_muscular: "Tirón",
      nota: "Espalda y Bíceps, el remo es tu ejercicio más importante para los dolores de espalda",
      ejercicios: [
        { nombre: "Remo polea baja", series: 4, repeticiones: 10, nota: "Ejercicio clave postural" },
        { nombre: "Jalones al pecho agarre medio", series: 4, repeticiones: 10 },
        { nombre: "Máquina de remo", series: 3, repeticiones: 12 },
        { nombre: "Bíceps barra Z", series: 3, repeticiones: 10 },
        { nombre: "Bíceps martillo mancuerna", series: 3, repeticiones: 10 },
        { nombre: "Dead bug (suelo)", series: 3, repeticiones: 8, nota: "Core lumbar - ideal para teletrabajadores" }
      ]
    },
    {
      dia: "Miércoles",
      grupo_muscular: "Pierna",
      nota: "Día más exigente, empieza el peso muerto con poco peso y céntrate en la técnica",
      ejercicios: [
        { nombre: "Peso muerto mancuernas o barra", series: 4, repeticiones: 6, nota: "Técnica ante todo, vídeo tu forma si puedes" },
        { nombre: "Prensa", series: 4, repeticiones: 10 },
        { nombre: "Extensiones de cuádriceps", series: 3, repeticiones: 15 },
        { nombre: "Femoral tumbado", series: 3, repeticiones: 12 },
        { nombre: "Gemelo de pie o sentado", series: 3, repeticiones: 20 }
      ]
    },
    {
      dia: "Jueves",
      grupo_muscular: "Hombro + Core",
      nota: "Hombro posterior es prioritario para corregir postura de ordenador",
      ejercicios: [
        { nombre: "Press de hombro mancuernas sentado", series: 4, repeticiones: 10 },
        { nombre: "Elevaciones laterales", series: 3, repeticiones: 12 },
        { nombre: "Máquina hombro posterior (o pájaro con mancuernas)", series: 4, repeticiones: 12, nota: "Muy importante para cuello y postura" },
        { nombre: "Trapecio barra (encogimientos)", series: 3, repeticiones: 12 },
        { nombre: "Crunch en polea o abdominal máquina", series: 3, repeticiones: 15 },
        { nombre: "Plancha lateral", series: 2, repeticiones: "20 segundos cada lado" }
      ]
    },
    {
      dia: "Viernes",
      grupo_muscular: "Espalda postural + Brazos + Cardio suave",
      nota: "Día más ligero para cerrar semana. Ideal para reforzar lo postural y rematar brazos",
      ejercicios: [
        { nombre: "Remo en máquina o mancuerna unilateral", series: 3, repeticiones: 12, nota: "Foco en retracción escapular" },
        { nombre: "Face pull en polea (o banda)", series: 4, repeticiones: 15, nota: "Ejercicio clave para cuello y manguito rotador" },
        { nombre: "Tríceps francés mancuerna", series: 3, repeticiones: 12 },
        { nombre: "Fondos en banco", series: 3, repeticiones: 12 },
        { nombre: "Bíceps concentrado", series: 3, repeticiones: 12 },
        { nombre: "Bici estática", series: 1, repeticiones: "10 minutos ritmo suave", nota: "Para activar circulación, no para quemar" }
      ]
    }
  ]
}
