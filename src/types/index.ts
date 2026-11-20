export interface Evento {
  id: number;
  titulo: string;
  categoria: string;
  lugar: string;
  descripcion: string;
  starts_at: string;
  ends_at: string;
  capacity: number;
  status: string;
  organizer?: { id: number; name: string };
}

export interface Inscripcion {
  id: number;
  code: string;
  status: string;
  event?: Evento;
  user?: { id: number; name: string; email: string };
}
