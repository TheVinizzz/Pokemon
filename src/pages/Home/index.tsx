import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { FieldValues, useForm } from "react-hook-form";
import { listPokemon, detailsPokemon } from "../../hooks/usePokemon";
import { IPokemon } from "../../types/Pokemon";
//import removeDuplicates from "../../utils/removeDuplicates";
import Card from "../../components/Card";

const Home = () => {
    const [data, setData] = useState<IPokemon[]>([]);
    const [filter, setFilter] = useState<IPokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(0);

    const { register, handleSubmit } = useForm();

    const filterItems = (input: string) => {
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(input.toLowerCase()) ||
            item.types[0].type.name.toLowerCase().includes(input.toLowerCase()) ||
            String(item.id).toLowerCase().includes(input.toLowerCase())
        );
        setFilter(filtered);
    };

    const submitData = (data: FieldValues) => {
        filterItems(data.name);
    }

    useEffect(() => {
        const getList = async () => {
            try {
                setLoading(true)
                const pokemons = await listPokemon(pageNumber)
                const details = await Promise.all(pokemons.results.map(async (val) => {
                    const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
                    const pokemonId = val.url.replace(baseUrl, '').replace('/', '')
                    return await detailsPokemon(Number(pokemonId))
                }))
                setData(details)
                setFilter(details)
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }
        getList()
    }, [pageNumber])

    return (
        <div className="h-full">
            <div className="flex items-center bg-[#EF5350]  border-b-4 border-black px-[20%]">
                <form className="flex w-full justify-between items-center" onSubmit={handleSubmit((data) => submitData(data))}>
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                        alt="logo"
                        className="h-16"
                    />
                    <div className="my-5 flex gap-2">
                        <Input type="text" placeholder="Ex: Pikachu Or Type Or ID" prop={{ ...register("name") }} />
                        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" />
                    </div>
                </form>
            </div>

            {loading ? (
                <div className="flex w-full h-full justify-center items-center">
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
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-7 gap-4 p-6 bg-[#E9FCFA]">
                        {filter?.map((val: IPokemon) => (
                            <div className="flex justify-center">
                                <Card pokemon={val} />
                            </div>
                        ))}
                    </div>
                    <div className="flex w-full justify-center py-10 gap-4">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                            onClick={() => setPageNumber(old => old - 20)}
                            disabled={pageNumber === 0}
                        >
                            Back
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPageNumber(old => old + 20)}>Next</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Home