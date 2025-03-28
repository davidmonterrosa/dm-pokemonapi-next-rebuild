export interface PokemonData {
    abilities: []
    base_experience: number
    cries: []
    forms: []
    game_indices: []
    height: number
    held_items: []
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: []
    name: string
    order: number
    past_abilities: []
    past_types: {
        generation: {
            name: string
            url: string
        }
        types: TypeArray[]
    }[]
    species: {}
    sprites: {
        back_default: string
        back_female: string
        back_shiny: string
        back_shiny_female: string
        front_default: string
        front_female: string
        front_shiny: string
        front_shiny_female: string
        other: {
            dream_world: {}
            home: {}
            "official-artwork": {
                front_default: string
                front_shiny: string
            }
            showdown: {}
        }
        versions: {}
    }
    stats: []
    types: TypeArray[]
    weight: number
} 

interface TypeArray {
    slot: number
    type: {
        name: string
        url: string
    }
}