'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

const PokemonDisplayArea = () => {
    const [pokemonId, setPokemonId] = useState<string>("0");
    const [pokemonName, setPokemonName] = useState<string>("");
    const [isShiny, setIsShiny] = useState<boolean>(false);
    const [favoritesList, setFavoritesList] = useState<string[]>([]);

    const handleShinyToggle = () => {
        setIsShiny(!isShiny);
    }

    const addToFavorites = (pokemonName: string) => {

    }

    useEffect(() => {
        const fetchPokemonData = async () => {

        }
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
            <Input className='border-none md:h-16 focus:rounded-2xl' type='text' placeholder='Search by name or Pokedex Number'/>

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
                    <img className={`w-[1.563rem] h-[1.563rem] md:w-[3.125rem] md:h-[3.125rem] ${favoritesList.includes(pokemonName) ? null : 'grayscale opacity-50'}`} src="/assets/icons/pokeball.png" alt="Pokeball Icon" />
                </Button>
                <p>{pokemonId}</p>
                <Button className='bg-transparent hover:bg-[#FFFFFF26] rounded-full p-0 cursor-pointer' onClick={handleShinyToggle}>
                    <img className='size-6 md:size-12' src={isShiny ? "../assets/icons/ShiningFilled.png" : "../assets/icons/shining.png"} alt="Toggle shiny view button icon" />
                </Button>
            </section>
            <section>

            </section>
            <section>

            </section>
        </article>
    </div>
  )
}

export default PokemonDisplayArea