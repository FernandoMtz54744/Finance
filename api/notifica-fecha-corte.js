import { getAllTarjetas } from "@/services/ApiVercelService.js";
import { enviarEmail } from "@/lib/emailUtils.js";
import { DateTime } from 'luxon';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const tarjetas = await getAllTarjetas();
    const ayer = DateTime.now().minus({ days: 1 });

    const tarjetasNotificar = tarjetas.filter(t => t.diaCorte === ayer.day);

    await Promise.all(tarjetasNotificar.map(async tarjeta => {
      const fechaCorteFormatted = ayer
        .setLocale("es")
        .toLocaleString({ day: 'numeric', month: 'long', year: 'numeric' });
      const mensaje = `El día de ayer ${fechaCorteFormatted} fue la fecha de corte de tu tarjeta ${getTipoDescripcion[tarjeta.tipo]} ${tarjeta.nombre}, no olvides consultar su estado de cuenta.`;
      await enviarEmail(tarjeta.correo, mensaje);
    }));

    return res.status(200).json({ message: `Notificado ${tarjetasNotificar.length} de ${tarjetas.length}` });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Ocurrió un problema al notificar la fecha de corte' });
  }
}

const getTipoDescripcion = {
  c: 'Crédito',
  d: 'Débito',
};