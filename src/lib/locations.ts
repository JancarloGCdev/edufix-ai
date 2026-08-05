export const GRADE_LOCATIONS = [
  "6-1",
  "6-2",
  "6-3",
  "7-1",
  "7-2",
  "7-3",
  "8-1",
  "8-2",
  "8-3",
  "9-1",
  "9-2",
  "9-3",
  "10-1",
  "10-2",
  "10-3",
  "11-1",
  "11-2",
  "11-3",
] as const;

export const AREA_LOCATIONS = [
  "Biblioteca",
  "Laboratorio",
  "Cafetería",
  "Patio",
  "Baños",
  "Coordinación",
  "Rectoría",
  "Otro",
] as const;

export const ALL_LOCATIONS = [...GRADE_LOCATIONS, ...AREA_LOCATIONS] as const;
