import axios from "axios";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: NextRequest, res: NextApiResponse) {
    // Pegue o endereço
    // Valide se há o endereço, se não houver, retorne um erro
    // Se houver, faça a requisição para a API do Google Maps
    // Retorne a resposta da API do Google Maps
    // Se houver erro, retorne um erro

    const address = req.nextUrl.searchParams.get('address') as string;
    if(!address) return Response.json({ message: "O endereço é obrigatório" }, { status: 400 });

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address,
                key: process.env.NEXT_PRIVATE_GOOGLE_API_KEY
            }
        });
        return Response.json(response.data, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Erro ao buscar endereço" }, { status: 500 });
    }
}