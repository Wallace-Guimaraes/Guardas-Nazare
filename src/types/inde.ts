export type StatusFrequencia = "Alta" | "Média" | "Baixa";

export interface Evento {
  id: number;
  nome: string;
  data: string;
}

export interface Frequencia {
  evento: string;
  status: "Presente" | "Ausente" | "Justificado";
}
