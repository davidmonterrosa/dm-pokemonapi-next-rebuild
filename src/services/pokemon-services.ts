import { EncounterData } from "@/interfaces/encounter-data";
import { PokemonData } from "@/interfaces/pokemon-data-interface";

export const getPokemon = async (nameOrId: string | number) => {
    const response: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    // if(!response.ok) {
    //     return "error";
    // }
    const data: PokemonData = await response.json();
    console.log(data);
    return data;
}

export const getLocationData = async (inputIdNumber: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputIdNumber}/encounters`);
    const data: EncounterData[] = await response.json();
    if(data.length > 0) {
        let locationString = data[0].location_area.name;
        return locationString;
    } else {
        return "N/A";
    }
}
