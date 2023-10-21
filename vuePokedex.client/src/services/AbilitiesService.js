import { AppState } from "../AppState"
import { Ability } from "../models/Ability"
import { Move } from "../models/Move"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api, blankApi, pokemonApi } from "./AxiosService"

class AbilitiesService{
async getAbilityDetails(ability){
  const res = await blankApi.get(`${ability}`)
  AppState.activeAbility = new Ability(res.data)
  logger.log(AppState.activeAbility)
}
async getMyAbilities(){
  const res = await api.get('api/abilities')
  logger.log(res.data)
  AppState.myAbilities = res.data.map(a => new Ability(a))
}

async findAbility(name){
  const res = await pokemonApi.get(`/ability/${name}`)
  if (res.data.name == undefined) {
    Pop.error('Enter Valid Search Term')
    return
  }
  AppState.foundAbility = new Ability(res.data)
  AppState.foundMove = null
  AppState.foundItem = null
  AppState.activePokemon = null
  logger.log(res.data)
}
async saveAbility(ability){
  const res = await api.post('api/abilities', ability)
  logger.log(res.data)
}
}
export const abilitiesService = new AbilitiesService()