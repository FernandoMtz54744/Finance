import { google } from 'googleapis';
import { Readable } from "stream";

const SCOPE = ['https://www.googleapis.com/auth/drive'];

//Funcion que maneja el post  
export default async function handler(req, res) {
    if (req.method !== 'POST') 
        return res.status(405).json({ error: 'Método no permitido' });

    try{
        const { fileName, mime, bytes } = req.body;
        if (!bytes || !Array.isArray(bytes)) {
            return res.status(400).json({ error: "No se recibieron bytes del archivo" });
        }
        //Se realiza la autenticación
        const jwtClient = new google.auth.JWT(
            process.env.GOOGLE_DRIVE_EMAIL,
            null,
            Buffer.from(process.env.GOOGLE_DRIVE_PRIVATE_KEY, "base64").toString("ascii"),
            SCOPE
        );
        await jwtClient.authorize();
        
        //Se sube el archivo
        const drive = google.drive({ version: 'v3', auth: jwtClient });
        const fileMetaData = {
            name: fileName,
            parents: ["1DyFl7lGsXOWXTqWmnwuz-isa-PkSJPmg"]
        }
        
        const response = await drive.files.create({
            resource: fileMetaData,
            media: {
                body: Readable.from(Buffer.from(bytes)),
                mimeType: mime,
            },
            fields: "webViewLink",
        });

        res.status(200).json({link: response.data.webViewLink});
    }catch (error) {
        console.error("Error al subir el archivo:", error);
        res.status(500).json({
            error: error.message 
        });
    }
};