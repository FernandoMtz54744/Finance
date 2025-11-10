import { getAllTarjetas, getPeriodoByFechaCorte } from "../src/services/ApiVercelService.js";
import { enviarEmail } from "../src/lib/emailUtils.js";
import { DateTime } from 'luxon';

export default async function handler(req, res) {
    if (req.method !== 'GET') 
        if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido' });

    try{
        const diasAntes = [18,15,14,10,5,3,2];
        const tarjetas = await getAllTarjetas();
        const tarjetasCredito = tarjetas.filter(tarjeta => tarjeta.tipo === 'c');
        const hoy = DateTime.now();
        let emailed = 0;
        for(const tarjeta of tarjetasCredito){
            const fechaCorte = getLastFechaCorte(tarjeta.diaCorte);
            const fechaLimite = getFechaLimitePago(fechaCorte);
            const diff = Math.trunc(DateTime.fromJSDate(fechaLimite).diff(hoy, ["days"]).days);
            if(diasAntes.includes(diff)){ //Ya se debe empezar a notificar
                const periodo = await getPeriodoByFechaCorte(tarjeta.id, fechaCorte);
                const limiteFormatted = DateTime.fromJSDate(fechaLimite).setLocale("es").toLocaleString({ day: 'numeric', month: 'long', year: 'numeric' });
                let mensaje;

                if(periodo !== null && periodo.saldoFinal !== null){
                    if(periodo.saldoFinal !== 0){ //Falta pagar
                        const cantidad = new Intl.NumberFormat('es-MX', { style: "currency", currency: "MXN", minimumFractionDigits: 2})
                            .format(periodo.saldoFinal);
                        mensaje = `Faltan ${diff} días para la fecha límite de pago de tu tarjeta ${tarjeta.nombre} ${getTipoDescripcion[tarjeta.tipo]}, no olvides realizar el pago.
                        \nFecha límite de pago: ${limiteFormatted}
                        Pago pendiente de: ${cantidad}`
                        await enviarEmail(tarjeta.correo, mensaje);
                        emailed++;
                    }
                }else{
                    mensaje = `Faltan ${diff} días para la fecha límite de pago de tu tarjeta ${tarjeta.nombre} ${getTipoDescripcion[tarjeta.tipo]}, no olvides realizar el pago.
                    \nFecha límite de pago: ${limiteFormatted}
                    No se han cargado los movimientos, por lo que se sugiere cargar el estado de cuenta para saber la cantidad del pago.`
                    await enviarEmail(tarjeta.correo, mensaje);
                    emailed++;
                }
            }
        }

        res.status(200).json({ message: `Notificado ${emailed} fechas límite` });
    }catch(e){
        console.log(e)
        res.status(500).json({ message: 'Ocurrió un problema al notificar la fecha de corte' });
    }

}

function getFechaLimitePago(fechaCorte){
  return DateTime.fromJSDate(fechaCorte).plus({days: 20}).toJSDate();
}

function getLastFechaCorte(diaCorte) {
  const hoy = DateTime.now();
  let fechaCorte = hoy.set({ day: diaCorte });
  if (fechaCorte > hoy) {
    fechaCorte = fechaCorte.minus({ months: 1 });
  }
  return fechaCorte.toJSDate();
}

const getTipoDescripcion = {
  c: 'Crédito',
  d: 'Débito',
};