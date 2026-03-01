import type { Routine } from "@/types/routine";

export const gymRoutine: Routine = {
  rutina: [
    {
      dia: "Lunes",
      grupo_muscular: "Empuje",
      nota: "Pecho y Tríceps, prioriza técnica en press banca, no carga",
      ejercicios: [
        {
          kind: "time",
          name: "Cinta",
          time: 600,
        },
        {
          kind: "set",
          name: "Press banca",
          sets: 4,
          reps: 8,
          note: "Peso controlado, aprende el movimiento",
        },
        {
          kind: "set",
          name: "Press banca inclinado mancuernas",
          sets: 3,
          reps: 10,
        },
        { kind: "set", name: "Contractor o máquina pecho", sets: 3, reps: 12 },
        { kind: "set", name: "Tríceps polea", sets: 3, reps: 12 },
        {
          kind: "set",
          name: "Plancha abdominal",
          sets: 3,
          reps: "30 segundos",
          note: "Core - no negociar esto",
        },
      ],
    },
    {
      dia: "Martes",
      grupo_muscular: "Tirón",
      nota: "Espalda y Bíceps, el remo es tu ejercicio más importante para los dolores de espalda",
      ejercicios: [
        {
          kind: "set",
          name: "Remo polea baja",
          sets: 4,
          reps: 10,
          note: "Ejercicio clave postural",
        },
        {
          kind: "set",
          name: "Jalones al pecho agarre medio",
          sets: 4,
          reps: 10,
        },
        { kind: "set", name: "Máquina de remo", sets: 3, reps: 12 },
        { kind: "set", name: "Bíceps barra Z", sets: 3, reps: 10 },
        { kind: "set", name: "Bíceps martillo mancuerna", sets: 3, reps: 10 },
        {
          kind: "set",
          name: "Dead bug (suelo)",
          sets: 3,
          reps: 8,
          note: "Core lumbar - ideal para teletrabajadores",
        },
      ],
    },
    {
      dia: "Miércoles",
      grupo_muscular: "Pierna",
      nota: "Día más exigente, empieza el peso muerto con poco peso y céntrate en la técnica",
      ejercicios: [
        {
          kind: "set",
          name: "Peso muerto mancuernas o barra",
          sets: 4,
          reps: 6,
          note: "Técnica ante todo, vídeo tu forma si puedes",
        },
        { kind: "set", name: "Prensa", sets: 4, reps: 10 },
        { kind: "set", name: "Extensiones de cuádriceps", sets: 3, reps: 15 },
        { kind: "set", name: "Femoral tumbado", sets: 3, reps: 12 },
        { kind: "set", name: "Gemelo de pie o sentado", sets: 3, reps: 20 },
      ],
    },
    {
      dia: "Jueves",
      grupo_muscular: "Hombro + Core",
      nota: "Hombro posterior es prioritario para corregir postura de ordenador",
      ejercicios: [
        {
          kind: "set",
          name: "Press de hombro mancuernas sentado",
          sets: 4,
          reps: 10,
        },
        { kind: "set", name: "Elevaciones laterales", sets: 3, reps: 12 },
        {
          kind: "set",
          name: "Máquina hombro posterior (o pájaro con mancuernas)",
          sets: 4,
          reps: 12,
          note: "Muy importante para cuello y postura",
        },
        {
          kind: "set",
          name: "Trapecio barra (encogimientos)",
          sets: 3,
          reps: 12,
        },
        {
          kind: "set",
          name: "Crunch en polea o abdominal máquina",
          sets: 3,
          reps: 15,
        },
        {
          kind: "set",
          name: "Plancha lateral",
          sets: 2,
          reps: "20 segundos cada lado",
        },
      ],
    },
    {
      dia: "Viernes",
      grupo_muscular: "Espalda postural + Brazos + Cardio suave",
      nota: "Día más ligero para cerrar semana. Ideal para reforzar lo postural y rematar brazos",
      ejercicios: [
        {
          kind: "set",
          name: "Remo en máquina o mancuerna unilateral",
          sets: 3,
          reps: 12,
          note: "Foco en retracción escapular",
        },
        {
          kind: "set",
          name: "Face pull en polea (o banda)",
          sets: 4,
          reps: 15,
          note: "Ejercicio clave para cuello y manguito rotador",
        },
        { kind: "set", name: "Tríceps francés mancuerna", sets: 3, reps: 12 },
        { kind: "set", name: "Fondos en banco", sets: 3, reps: 12 },
        { kind: "set", name: "Bíceps concentrado", sets: 3, reps: 12 },
        {
          name: "Bici estática",
          kind: "time",
          time: 60,
          note: "Para activar circulación, no para quemar",
        },
      ],
    },
  ],
};
