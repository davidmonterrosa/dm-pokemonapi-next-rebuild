import { EncounterData } from "@/interfaces/encounter-data";
import { PokemonData } from "@/interfaces/pokemon-data-interface";

export const getPokemon = async (nameOrId: string | number) => {
    const response: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    // if(!response.ok) {
    //     return "error";
    // }
    const data: PokemonData = await response.json();
    return data;
}

export const getLocationData = async (inputIdNumber: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputIdNumber}/encounters`);
    const data: EncounterData[] = await response.json();
    if(data.length > 0) {
        const locationString = data[0].location_area.name;
        return locationString;
    } else {
        return "N/A";
    }
}

export const getEvolutionChain = async (inputSpeciesUrl: string) => {
    const imageArr: string[][] = [];
    const arr:string [] = [];
    const thirdEvoArr: string[] = [];
    const response = await fetch(inputSpeciesUrl);
    const speciesData = await response.json();
    console.log(speciesData.evolution_chain.url);
    const evolutionChainUrl = speciesData.evolution_chain.url;
    const evolutionChainResponse = await fetch(evolutionChainUrl);
    const evolutionChain = await evolutionChainResponse.json();
    console.log(evolutionChain);
    const firstEvolution = await getPokemon(evolutionChain.chain.species.name);
    if(firstEvolution != null) {
        imageArr.push([`${firstEvolution.sprites.other["official-artwork"].front_default}`]);

        if(evolutionChain.chain.evolves_to.length == 0) {
            return imageArr;
        } else {
            for(let i = 0; i < evolutionChain.chain.evolves_to.length; i++) {
                const secondEvolution = await getPokemon(evolutionChain.chain.evolves_to[i].species.name);
                if(secondEvolution.id <= 649) {
                    arr.push(`${secondEvolution.sprites.other["official-artwork"].front_default}`)
                }
                if(evolutionChain.chain.evolves_to[i].evolves_to.length != 0) {
                    for(let j = 0; j < evolutionChain.chain.evolves_to[i].evolves_to.length; j++) {
                        const thirdEvolution = await getPokemon(evolutionChain.chain.evolves_to[i].evolves_to[j].species.name);
                        if(thirdEvolution.id <= 649) {
                            thirdEvoArr.push(`${thirdEvolution.sprites.other["official-artwork"].front_default}`);
                        }
                    }
                }
            }
        }
        imageArr.push(arr);
        if(thirdEvoArr.length == 0){
            return imageArr;
        } else{
            imageArr.push(thirdEvoArr);
        }
    } 
    return imageArr;
}
