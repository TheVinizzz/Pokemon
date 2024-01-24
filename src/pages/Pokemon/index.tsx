import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { detailsPokemon } from '../../hooks/usePokemon';
import pokemonTypes from '../../utils/colorsTypes';
import { IPokemon } from '../../types/Pokemon';

const Pokemon = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<IPokemon>({} as IPokemon)
    const [background, setBackground] = useState<any>("#fff")

    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const getPokemon = async () => {
            try {
                setLoading(true)
                const pokemons = await detailsPokemon(Number(id))
                setBackground(pokemonTypes[pokemons.types[0].type.name].color)
                setData(pokemons)
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }
        getPokemon()
    }, [])

    if (loading) return (<div className="flex w-full h-full justify-center items-center">
        <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
        >
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >
                Loading...
            </span>
        </div>
    </div>)

    return (
        <div className='p-10'>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={() => navigate("/")}
            >
                {"< Voltar"}
            </button>
            <div className='h-full w-full flex justify-center items-center px-[30%] self-center'>
                <div className='w-full flex flex-col items-center w-[60%] bg-white rounded-lg overflow-hidden'>
                    <div style={{ backgroundColor: background }} className='w-full flex flex-col items-center p-2'>
                        <div className='flex justify-between w-full px-2'>
                            <div>
                                <h1 className='mb-2 capitalize font-semibold'>{data?.name}</h1>
                                <div className='flex gap-1'>
                                    {data?.types?.map(val => (
                                        <div className='bg-white font-semibold text-[#808080] w-fit px-2 text-xs rounded capitalize'>{val.type.name}</div>
                                    ))}
                                </div>
                            </div>

                            <h1 className='text-sm font-white'>#{data?.id}</h1>
                        </div>
                        <img src={data?.sprites?.other?.dream_world?.front_default} alt={data?.name} className="h-40 w-40 hover:scale-125 transition" />
                    </div>
                    <div className='text-center'>
                        <h1 className='font-bold text-sm border-b border-black'>Status</h1>
                        {data?.stats?.map(val => (
                            <h2 className='font-semibold text-[#808080] border-b border-black'>{val.stat.name}: {val.base_stat}</h2>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pokemon