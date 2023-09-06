import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { pokemonService } from "../services/PokemonService";

export class PokemonController extends BaseController{
constructor(){
  super('api/pokemon')
  this.router
  .use(Auth0Provider.getAuthorizedUserInfo)
  .get('', this.getCaughtPokemon)
  .post('', this.catchPokemon)
}
  async getCaughtPokemon (req, res, next) {
  try{
      const pokemon = await pokemonService.getCaughtPokemon()
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

}