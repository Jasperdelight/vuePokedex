import { AppState } from "../AppState"
import { Ability } from "../models/Ability"
import { Move } from "../models/Move"
import { logger } from "../utils/Logger"
import { blankApi, pokemonApi } from "./AxiosService"

class AbilitiesService{
async getAbilityDetails(ability){
  const res = await blankApi.get(`${ability}`)
  AppState.activeAbility = new Ability(res.data)
  logger.log(AppState.activeAbility)
}

async findAbility(name){
  const res = await pokemonApi.get(`/ability/${name}`)
  AppState.foundAbility = new Ability(res.data)
  AppState.foundMove = null
  AppState.foundItem = null
  AppState.activePokemon = null
  logger.log(res.data)
}
}
export const abilitiesService = new AbilitiesService()