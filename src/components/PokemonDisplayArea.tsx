'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { getLocationData, getPokemon } from '@/services/pokemon-services'
import { PokemonData } from '@/interfaces/pokemon-data-interface'
import { url } from 'inspector'
import { EncounterData } from '@/interfaces/encounter-data'

const PokemonDisplayArea = () => {
    const normal: string =  "bg-[#A4ACAF]"; 
    const fire: string =  "bg-[#FD7D25]"; 
    const water: string =  "bg-[#4592C4]"; 
    const electric: string =  "bg-[#EED536]"; 
    const grass: string =  "bg-[#9BCD50]"; 
    const ice: string =  "bg-[#51C4E7]"; 
    const fighting: string =  "bg-[#D56723]"; 
    const poison: string =  "bg-[#BA80CA]"; 
    const ground: string =  "bg-[#AC9943]"; 
    const flying: string =  "bg-[#889AFF]"; 
    const psychic: string =  "bg-[#F367B9]"; 
    const bug: string =  "bg-[#739F3F]"; 
    const rock: string =  "bg-[#A48C21]"; 
    const ghost: string =  "bg-[#7B62A3]"; 
    const dragon: string =  "bg-[#F16E58]"; 
    const dark: string =  "bg-[#717171]"; 
    const steel: string =  "bg-[#9EB8B8]";
    // bg-modalGray: #5E5E5E;
    // bg-pillGray: #D9D9D9;
    const [searchString, setSearchString] = useState("");
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
        species: {},
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
    const [locationData, setLocationData] = useState<EncounterData | string>("N/A");
    const [pokemonId, setPokemonId] = useState<number>(1);
    const [pokemonName, setPokemonName] = useState<string>("");
    const [isShiny, setIsShiny] = useState<boolean>(false);
    const [favoritesList, setFavoritesList] = useState<string[]>([]);


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
        } else {
            console.log(event.currentTarget.value);
        }
    }

    const handleShinyToggle = () => {
        setIsShiny(!isShiny);
    }

    const addToFavorites = (pokemonName: string) => {

    }

    const getPokemonTypes = (inputPokemon: PokemonData) => {

    }

    useEffect(() => {
        const fetchPokemonData = async () => {
            setPokemonData(await getPokemon(searchString))
        }
        // const fetchLocationData = async () => {
        //     setLocationData(await getLocationData())
        // }
        fetchPokemonData();
    }, [searchString])

    useEffect(() => {
        const onLoadDisplay = async () => {
            setPokemonData(await getPokemon(1))
        }
        onLoadDisplay();
    }, [])

  return (
    <div className='grid grid-cols-5 grid-rows-8 gap-5'>

        {/* Search Bar */}
        <article className='flex justify-evenly items-center col-start-2 col-span-3 row-start-2 bg-white/75 rounded-2xl'>
            <div className='inset-y-0 start-0 flex items-center ps-3 px-4 hover:cursor-pointer hover:bg-slate-300 hover:border hover:rounded-2xl'>
                <Button className='bg-transparent hover:bg-[#FFFFFF26] rounded-full p-0 cursor-pointer'>
                    <img className='size-6 md:size-12' src="/assets/icons/MagnifyingGlass.svg" alt="Search Icon" />
                </Button>
            </div>
            <Input className='border-none md:h-16 focus:rounded-2xl' type='text' placeholder='Search by name or Pokedex Number' onKeyDown={handleSearch}/>

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
                    <div id='favoritesArea'>
                        {/* Favorite Cards go here */}
                    </div>
                </DialogContent>
            </Dialog>


            <Button className='bg-transparent hover:bg-[#FFFFFF26] rounded-full p-0 cursor-pointer'>
                <img className='size-6 md:size-12' src="/assets/icons/shuffle-solid.svg" alt="Get Random Pokemon Button" />
            </Button>
        </article>

        <article className='flex flex-col col-start-2 col-span-3 row-start-3 row-span-5 bg-white/75 rounded-2xl p-8'>
            <section className='flex justify-between items-center'>
                <Button className='bg-transparent hover:bg-[#FFFFFF26] rounded-full p-0 cursor-pointer' onClick={() => addToFavorites("TemporaryValue")}>
                    <img className={`w-[1.563rem] h-[1.563rem] md:w-[3.125rem] md:h-[3.125rem] ${favoritesList.includes(pokemonData.name) ? null : 'grayscale opacity-50'}`} src="/assets/icons/pokeball.png" alt="Pokeball Icon" />
                </Button>
                <p>{`#${pokemonId}`}</p>
                <Button className='bg-transparent hover:bg-[#FFFFFF26] rounded-full p-0 cursor-pointer' onClick={handleShinyToggle}>
                    <img className='size-6 md:size-12' src={isShiny ? "../assets/icons/ShiningFilled.png" : "../assets/icons/shining.png"} alt="Toggle shiny view button icon" />
                </Button>
            </section>
            <section className='xl:grid xl:grid-cols-2'>
                <div>
                    {/* Pokemon Name */}
                    <div className='text-center'>
                        <h1>{pokemonData.name}</h1>
                    </div>
                    {/* Pokemon Image */}
                    {
                        pokemonData != null && pokemonData.sprites.other['official-artwork'].front_shiny != "" &&
                        <img className={"object-cover w-64 h-64 xl:min-w-80 xl:h-80 rounded-2xl"}  src={isShiny ? `${pokemonData.sprites.other["official-artwork"].front_shiny}` : `${pokemonData.sprites.other["official-artwork"].front_default}`} alt="Pokemon Image" />
                    }
                    
                    {/* Pokemon Type */}
                    <div>
                        {/* Type List Area */}
                        <div className="flex justify-center mt-3">
                        {/* {
                            pokemonData.past_types.length > 0 ? 
                            pokemonData.past_types.map((elementType, index) => {console.log(elementType)})
                            :
                            pokemonData.types.map((elementType, index) => (console.log(elementType))) 

                        } */}
                        </div>
                    </div>
                </div>

                <div className="col-start-2">
                    {/* <p className="text-xl"><b>Where:</b> <span id="encounterText">{}</span></p> */}
                    <p className="text-xl"><b>Abilities:</b> <span id="abilitiesText">{getPokemonAbilitiesList(pokemonData.abilities)}</span></p>
                    <p className="max-h-[150px] overflow-y-scroll xl:max-h-[300px] xl:overflow-y-scroll text-xl"><b>Moves:</b> <span id="movesText" >{getPokemonMovesList(pokemonData.moves)}</span> </p>
                </div>



            </section>
            <section>

            </section>
        </article>
    </div>
  )
}

export default PokemonDisplayArea