import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { pokemonService } from "../services/PokemonService";

export class PokemonController extends BaseController{
constructor(){
  super('api/pokemon')
  this.router
  .get('', this.getCaughtPokemon)
  .use(Auth0Provider.getAuthorizedUserInfo)
  .post('', this.catchPokemon)
  .delete('/:pokeId', this.removePokemon)
}
  async getCaughtPokemon (req, res, next) {
  try{
      const pokemon = await pokemonService.getCaughtPokemon()
  return res.send(pokemon)
  } catch(error) {
      next(error);
  }
  }
  async getCaughtPokemonById (req, res, next) {
  try{
      const pokemonId = req.body.pokemonId
      const pokemon = await pokemonService.getCaughtPokemonById(pokemonId)
  return res.send(pokemon)
  } catch(error) {
      next(error);
  }
  }
  async catchPokemon (req, res, next) {
  try{
      req.body.creatorId = req.userInfo.id
      let pokemon = await pokemonService.catchPokemon(req.body)
  return res.send(pokemon)
  } catch(error) {
      next(error);
  }
  }
  async removePokemon (req, res, next) {
  try{
      const pokemonId = req.params.pokeId
      const userId = req.userInfo.id
      let removedPoke = await pokemonService.removePokemon(pokemonId, userId)
      return res.send(removedPoke)
  } catch(error) {
      next(error);
  }
  }

}