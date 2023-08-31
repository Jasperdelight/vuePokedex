import { dbContext } from "../db/DbContext"

class PokemonService{
  async getCaughtPokemon() {
    const pokemon = await dbContext.Pokemon.find()
    return pokemon;
  }
  async catchPokemon(body) {
    let pokemon = await dbContext.Pokemon.create(body)
    return pokemon;
  }

}

export const pokemonService = new PokemonService()