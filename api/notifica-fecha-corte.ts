import { getAllTarjetas } from "../src/services/ApiVercelService.ts";
// import { DateTime } from 'luxon';

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') 
        if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido' });

    try{
        const tarjetas = await getAllTarjetas();
        // res.status(200).json({ message: `${tarjetas.length}` });
        res.status(200).json({ message: `${tarjetas.length}` });
    }catch(e){
        console.log(e)
        res.status(500).json({ message: 'Ocurrió un problema al notificar la fecha de corte' });
    }

}