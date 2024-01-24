import axios from "axios";
import { IListPokemon } from "./type";
import { IPokemon } from "../../types/Pokemon";


const listPokemon = async (offset: number = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`

    const response = await axios.get<IListPokemon>(url)

    return response.data
}

const detailsPokemon = async (id: number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    const response = await axios.get<IPokemon>(url)

    return response.data
}

export { listPokemon, detailsPokemon };