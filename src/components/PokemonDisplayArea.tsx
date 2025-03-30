'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { getEvolutionChain, getLocationData, getPokemon } from '@/services/pokemon-services'
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '@/services/local-storage'
import { PokemonData } from '@/interfaces/pokemon-data-interface'

const PokemonDisplayArea = () => {
    const [searchString, setSearchString] = useState<string>("");
    const [outOfBounds, setOutOfBounds] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [pokemonData, setPokemonData] = useState<PokemonData>({
        abilities: [],
        base_experience: 0,
        cries: [],
        forms: [],
        game_indices: [],
        height: 0,
        held_items: [],
        id: 1,
        is_default: false,
        location_area_encounters: "",
        moves: [],
        name: "",
        order: 0,
        past_abilities: [],
        past_types: [],
        species: {
            url: "",
        },
        sprites: {
            back_default: "",
            back_female: "",
            back_shiny: "",
            back_shiny_female: "",
            front_default: "",
            front_female: "",
            front_shiny: "",
            front_shiny_female: "",
            other: {
                dream_world: {},
                home: {},
                "official-artwork": {
                    front_default: "",
                    front_shiny: "",
                },
                showdown: {},
            },
            versions: {},
        },        
        stats: [],
        types: [{
            slot: 0,
            type: {
                name: "",
                url: "",
            },
        }],
        weight: 0,
    });
    const [locationData, setLocationData] = useState<string>("N/A");
    const [evolutionImages, setEvolutionImages] = useState<string[][]>([])
    const [isShiny, setIsShiny] = useState<boolean>(false);
    const [favoritesList, setFavoritesList] = useState<string[]>([]);
    const [favoritesTotal, setFavoritesTotal] = useState<number>(0);


    const getPokemonAbilitiesList = (inputArray: {ability: {name: string, url: string}}[]) => {
        let tempArray = [];
        for(let i: number = 0; i < inputArray.length; i++)
        {
            tempArray.push(inputArray[i].ability.name)
        }
        return tempArray.join(", ");
    }

    const getPokemonMovesList = (inputArray: {move: {name: string, url: string}}[]) => {
        let tempArray: string[] = [];
        for(let i: number = 0; i < inputArray.length; i++)
        {
            tempArray.push(inputArray[i].move.name)
        }
        return tempArray.join(", ");
    }

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            setSearchString(event.currentTarget.value);
            // setPokemonData(await getPokemon(searchString))
        } else {
            // console.log(event.currentTarget.value);
        }
    }

    const getRandomPokemon = () => {
        const randomId = Math.floor(Math.random() * 650);
        setSearchString(`${randomId}`);
    }

    const deleteFavoriteItem = (nameOfPokemon: string) => {
        removeFromLocalStorage(nameOfPokemon)
        setFavoritesList(getFromLocalStorage)
        setFavoritesTotal(favoritesTotal - 1)
    }

    // const handleSearchOnclick = () => {
    //     // I need help with this function.
    // }

    const handleShinyToggle = () => {
        setIsShiny(!isShiny);
    }

    const addToFavorites = () => {
        saveToLocalStorage(pokemonData.name)
        setFavoritesList(getFromLocalStorage)
        setFavoritesTotal(favoritesTotal + 1)
    }

    useEffect(() => {
        const fetchPokemonData = async () => {
            const rawData = await getPokemon(searchString);
            if(rawData != null) {
                setNotFound(false);
                if(rawData.id <= 649) {
                    setPokemonData(rawData);
                    setOutOfBounds(false);
                } else {
                    setOutOfBounds(true);
                }
            } else {
                setNotFound(true);
            }
            
        }
        fetchPokemonData();
    }, [searchString])

    useEffect(() => {
        const onLoadDisplay = async () => {
            setPokemonData(await getPokemon(1))
            setLocationData(await getLocationData(1))
            setFavoritesList(getFromLocalStorage)
            setFavoritesTotal(1);
        }
        onLoadDisplay();
    }, [])

    useEffect(() => {
        const fetchAdditionalData = async () => {
            setLocationData(await getLocationData(pokemonData.id))
            const imageArray = await getEvolutionChain(pokemonData.species.url);
            setEvolutionImages(imageArray);
        }
        fetchAdditionalData();
    }, [pokemonData])

    useEffect(() => {
        setFavoritesList(getFromLocalStorage)
    }, [favoritesTotal])

  return (
    <div className='grid grid-cols-5 grid-rows-8 gap-5'>

        {/* Search Bar */}
        <article className='flex justify-evenly items-center col-start-2 col-span-3 row-start-2 bg-white/75 rounded-2xl'>
            <div className='inset-y-0 start-0 flex items-center ps-3 px-4 hover:cursor-pointer hover:bg-slate-300 hover:border hover:rounded-2xl'>
                <Button className='bg-transparent hover:bg-[#FFFFFF26] rounded-full p-0 cursor-pointer'>
                    <img className='size-6 md:size-12' src="/assets/icons/MagnifyingGlass.svg" alt="Search Icon" />
                </Button>
            </div>
            <Input id='searchBarInput' className='border-none md:h-16 focus:rounded-2xl' type='text' placeholder='Search by name or Pokedex Number' onKeyDown={handleSearch}/>

            {/* Favorites Modal */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='bg-transparent hover:bg-[#FFFFFF26] rounded-full p-0 cursor-pointer'>
                        <img className='size-6 md:size-12' src="/assets/icons/pokeball.png" alt="Pokeball Icon" />
                    </Button>
                </DialogTrigger>

                <DialogContent className='bg-[#5e5e5e] dark:bg-gray-700 text-white '>
                    <DialogHeader>
                        <DialogTitle>
                            Favorites
                        </DialogTitle>
                    </DialogHeader>
                    <hr />
                    <div>
                        {/* Favorite Cards go here */}
                        {
                            favoritesList.map((pokemon, index) => (
                                <div key={index} className='rounded-full bg-[#D9D9D9] flex justify-between items-center py-4 px-5'>
                                    <Button className='text-black montserratFont bg-transparent hover:bg-[#FFFFFF26] rounded-full p-0 cursor-pointer' onClick={() => setSearchString(pokemon)}>{pokemon}</Button>
                                    <Button className='bg-transparent hover:bg-[#FFFFFF26] rounded-full p-0 cursor-pointer' onClick={() => deleteFavoriteItem(pokemon)}>
                                        <img className='size-12' src="/assets/icons/delete.png" alt="remove pokemon button" />
                                    </Button>
                                </div>
                            ))
                        }
                    </div>
                </DialogContent>
            </Dialog>


            <Button className='bg-transparent hover:bg-[#FFFFFF26] rounded-full p-0 cursor-pointer' onClick={getRandomPokemon}>
                <img className='size-6 md:size-12' src="/assets/icons/shuffle-solid.svg" alt="Get Random Pokemon Button" />
            </Button>
        </article>

        <article className='flex flex-col col-start-2 col-span-3 row-start-3 row-span-5 bg-white/75 rounded-2xl p-8'>
        {
            notFound ?
            (<section className='flex place-content-center'>
                <p>There was an issue with your search query. Please check the spelling of your query and try again.</p>
            </section>)
            :
            (<>
                <section className={`flex justify-between items-center`}>
                    <Button className='bg-transparent hover:bg-[#FFFFFF26] rounded-full p-0 cursor-pointer' onClick={addToFavorites}>
                        <img className={`w-[1.563rem] h-[1.563rem] md:w-[3.125rem] md:h-[3.125rem] ${favoritesList.includes(pokemonData.name) ? null : 'grayscale opacity-50'}`} src="/assets/icons/pokeball.png" alt="Pokeball Icon" />
                    </Button>
                    <p>{`#${pokemonData.id}`}</p>
                    <Button className='bg-transparent hover:bg-[#FFFFFF26] rounded-full p-0 cursor-pointer' onClick={handleShinyToggle}>
                        <img className='size-6 md:size-12' src={isShiny ? "../assets/icons/ShiningFilled.png" : "../assets/icons/shining.png"} alt="Toggle shiny view button icon" />
                    </Button>
                </section>
                <section className='xl:grid xl:grid-cols-2'>
                    <div className='place-items-center'>
                        {/* Pokemon Name */}
                        <div className='text-center poppinsFont'>
                            <h1 className='text-2xl'>{pokemonData.name}</h1>
                        </div>
                        {/* Pokemon Image */}
                        {
                            pokemonData != null && pokemonData.sprites.other["official-artwork"].front_shiny != "" &&
                            <img className={`object-cover w-64 h-64 xl:min-w-80 xl:h-80 rounded-2xl ${pokemonData.types[0].type.name}`}  src={isShiny ? `${pokemonData.sprites.other["official-artwork"].front_shiny}` : `${pokemonData.sprites.other["official-artwork"].front_default}`} alt="Pokemon Image" />
                        }
                        
                        {/* Pokemon Type */}
                        <div>
                            {/* Type List Area */}
                            <div className="flex justify-center mt-3">
                            {

                                pokemonData != null && pokemonData.types.length > 0 ?
                                    (<div className={`flex justify-center items-center border rounded-full py-1.5 px-2.5 ${pokemonData.types[0].type.name}`}>
                                        <p>{pokemonData.types[0].type.name}</p>
                                    </div>)
                                    :
                                    null
                                }
                                {
                                pokemonData != null && pokemonData.types.length > 1 ?
                                    (<div className={`justify-center items-center border rounded-full py-1.5 px-2.5 ${pokemonData.types[1].type.name}`}>
                                        <p>{pokemonData.types[1].type.name}</p>
                                    </div>)
                                    :
                                    null
                                }

                            </div>
                        </div>
                    </div>

                    <div className="xl:col-start-2 montserratFont">
                        <p className="text-xl"><b>Where:</b> <span id="encounterText">{locationData}</span></p>
                        <p className="text-xl"><b>Abilities:</b> <span id="abilitiesText">{getPokemonAbilitiesList(pokemonData.abilities)}</span></p>
                        <p className="max-h-[150px] overflow-y-scroll xl:max-h-[300px] xl:overflow-y-scroll text-xl"><b>Moves:</b> <span id="movesText" >{getPokemonMovesList(pokemonData.moves)}</span> </p>
                    </div>



                </section>

                {/* Evolutions Area */}
                <section className='flex xl:justify-between'>
                    <div  className="flex flex-col items-center w-1/3 max-h-64">
                        <p>Base Form</p>
                        {
                            pokemonData != null && pokemonData.sprites.other["official-artwork"].front_shiny != "" &&
                            <div id="baseFormDisplayArea">
                                <img className="size-20 xl:size-40" src={`${evolutionImages[0]}`} alt="Base Form of Pokemon"/>
                            </div>
                        }
                    </div>
                    <div  className="flex flex-col items-center w-1/3 max-h-64">
                        <p>1st Evolution</p>
                            <div id="firstEvolutionDisplayArea" className=" overflow-y-scroll">
                            {
                                pokemonData != null && evolutionImages.length > 1 ? evolutionImages[1].map((image, index) => (
                                    <img key={index} className="size-20 xl:size-40" src={`${image}`} alt="First Evolution of Pokemon"/>
                                ))
                                :
                                <p className='text-2xl'>N/A</p>
                            }
                            </div>
                    </div>
                    <div  className="flex flex-col items-center w-1/3 max-h-64">
                        <p>Final Evolution</p>
                        {
                            <div id="secondEvolutionDisplayArea" className=" overflow-y-scroll">
                            {
                                pokemonData != null && evolutionImages.length > 2 ? evolutionImages[2].map((image, index) => (
                                    <img key={index} className="size-20 xl:size-40" src={`${image}`} alt="First Evolution of Pokemon"/>
                                ))
                                :
                                <p className='text-2xl'>N/A</p>
                            }
                            </div>
                        }
                    </div>
                </section>
            </>) 
        }
        </article>
    </div>
  )
}

export default PokemonDisplayArea