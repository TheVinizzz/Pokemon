import { IPokemon } from "../../types/Pokemon"
import pokemonTypes from "../../utils/colorsTypes"
import { useNavigate } from "react-router-dom";

const Card = ({ pokemon }: { pokemon: IPokemon }) => {
    const selectColor = pokemonTypes[pokemon.types[0].type.name]

    const navigate = useNavigate();

    const handleRedirect = () => {
        return navigate(`/pokemon/${pokemon.id}`)
    }

    return (
        <div className="bg-white p-2 cursor-pointer" style={{height: "fit-content"}} onClick={handleRedirect}>
            <div className={`rounded-full p-6`} style={{backgroundColor: selectColor.color}}>
                <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} className="h-20 w-20 hover:scale-125 transition" />
            </div>
            <h1 className="w-full bg-[#342452] text-center capitalize mt-2 text-white px-2">{pokemon.name}</h1>
        </div>
    )
}

export default Card