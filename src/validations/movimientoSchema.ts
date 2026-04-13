import { z } from "zod"

export const movimientoSchema = z.object({
    fecha: z.date({
        error: "Ingresa una fecha"
    }),
    tipo: z.enum(['c', 'a', 'r', 't'], { message: "Selecciona un tipo"}), //cargo, abono, rendimiento, transferencia
    cantidad: z.number()
        .refine(val => val !== 0, { message: "Ingresa una cantidad" }),
    motivo: z.string()
        .min(1, "Ingresa un motivo")
        .max(50, "Ingresa un motivo más corto"),
    idCategoria: z.number({error: "Ingresa una categoría"})
}).superRefine((data, ctx) => {
    const { tipo, cantidad } = data;
  if ((tipo === 'a' || tipo === 'r') && cantidad < 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La cantidad debe ser positiva para abonos o rendimientos",
      path: ["cantidad"]
    });
  }

  if (tipo === 'c' && cantidad > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La cantidad debe ser negativa para cargos",
      path: ["cantidad"]
    });
  }
});