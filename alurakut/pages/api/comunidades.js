import { SiteClient } from 'datocms-client';


export default async function recebedorDeRequests(request, response) {
    
    if(request.method === 'POST') {
        const TOKEN = 'ad466c5a2fdd2d55f427a200fe8c11';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "977469",
            ...request.body,
            //title: "Comunidade teste",
            //imageUrl: "https://picsum.photos/300/300",
            //creatorSlug: "keev-loop"
        })

        response.json({
            resultado: 'Ok',
            registroCriado: registroCriado,
        })
        return;
    }
    response.status(404).json({
        message: 'GET vazio, POST contem!'
    })
}