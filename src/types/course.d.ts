export interface CourseCreateData {
  titulo: string;
  desc: string;
  horas: number;
  img: string;
  status: 'ativo' | 'inativo';
}

export interface CourseUpdateData {
  titulo?: string;
  desc?: string;
  horas?: number;
  img?: string;
  status?: 'ativo' | 'inativo';
}

interface PrismaError extends Error {
  code?: string;
  meta?: {
    target?: string[];
  };
}