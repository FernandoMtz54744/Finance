import { getAllTarjetas } from "../src/services/ApiVercelService.js";
import { enviarEmail } from "../src/lib/emailUtils.js";
import { DateTime } from 'luxon';

export default async function handler(req, res) {
    if (req.method !== 'GET') 
        if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido' });

    try{
        const tarjetas = await getAllTarjetas();
        const ayer = DateTime.now().minus({day: 1});

        const tarjetasNotificar = tarjetas.filter(tarjeta => tarjeta.diaCorte === ayer.day);
        for(const tarjeta of tarjetasNotificar){
            const fechaCorteFormatted = ayer.setLocale("es").toLocaleString({ day: 'numeric', month: 'long', year: 'numeric' });
            const mensaje = `El día de ayer ${fechaCorteFormatted} fue la fecha de corte de tu tarjeta ${getTipoDescripcion[tarjeta.tipo]} ${tarjeta.nombre}, no olvides consultar su estado de cuenta.`                   
            await enviarEmail(tarjeta.correo, mensaje);
        }

        res.status(200).json({ message: `Notificado ${tarjetasNotificar.length} de ${tarjetas.length}` });
    }catch(e){
        console.log(e)
        res.status(500).json({ message: 'Ocurrió un problema al notificar la fecha de corte' });
    }

}

export const getTipoDescripcion = {
  c: 'Crédito',
  d: 'Débito',
};
