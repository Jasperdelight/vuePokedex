import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class PokemonService{
  async getCaughtPokemonById(pokemonId) {
      const pokemon = await dbContext.Pokemon.findById( pokemonId ).populate(['creator', 'stats', 'moves'])
      return pokemon;
  }
  async removePokemon(pokeId, userId) {
    const removedPoke = await dbContext.Pokemon.findById(pokeId)
    if (!removedPoke) {
      throw new BadRequest("no pokemon with that ID exists")
    }
    if (removedPoke.creatorId != userId) {
      throw new Forbidden("That pokemon is not yours to delete!")
    }
    await removedPoke.remove()
    return removedPoke
  }
  async getCaughtPokemon() {
    const pokemon = await dbContext.Pokemon.find()
    
    return pokemon;
  }
  async catchPokemon(body) {
    const pokemon = await dbContext.Pokemon.create(body)
    await pokemon.populate('creator')
    return pokemon;
  }

}

export const pokemonService = new PokemonService()