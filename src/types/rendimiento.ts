export type Rendimiento = {
  fecha: string;
  cantidad: number;
  motivo: string;
  periodo: {
    nombre: string;
    tarjeta: {
      tipo: string;
      nombre: string;
    };
  };
};