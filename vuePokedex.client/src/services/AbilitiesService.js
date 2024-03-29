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
async getMyAbilityDetails(abilityId){
  const res = await api.get(`api/abilities/${abilityId}`)
  logger.log(res.data)
  AppState.foundAbility = new Ability(res.data)
  AppState.activePokemon = null
  AppState.foundItem = null
  AppState.foundMove = null
  logger.log(AppState.foundAbility, 'found ability in appstate')
}
async getAbilities(){
  const res = await pokemonApi.get('/ability')
  logger.log(res.data)
  AppState.nextPage = res.data.next
  AppState.previousPage = res.data.previous
  AppState.allAbilities = res.data.results.map(a => new Ability(a))
}
async getMyAbilities(){
  const res = await api.get('api/abilities')
  logger.log(res.data, 'abilities')
  AppState.myAbilities = res.data.map(a => new Ability(a))
  logger.log(AppState.myAbilities, `app state`)
  
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
async removeAbility(abilityId){
  const res = await api.delete(`api/abilities/${abilityId}`)
  Pop.toast(`Ability Deleted`)
  logger.log(res.data)
  const abilityToRemove = AppState.myAbilities.findIndex(a => a._id == abilityId)
  AppState.myAbilities.splice(abilityToRemove, 1)
  AppState.activeAbility = null
}
async saveAbility(ability){
  const res = await api.post('api/abilities', ability)
  AppState.myAbilities.push(a => new Ability(a))
  logger.log(res.data)
}
async nextPage(){
  const nextPG = AppState.nextPage
  const res = await blankApi.get(`${nextPG}`)
  logger.log(res.data)
  AppState.nextPage = res.data.next
  AppState.allAbilities = res.data.results
  AppState.previousPage = res.data.previous
}
async previousPage(){
  const previousPG = AppState.previousPage
  const res = await blankApi.get(`${previousPG}`)
  logger.log(res.data)
  AppState.nextPage = res.data.next
  AppState.allAbilities = res.data.results
  AppState.previousPage = res.data.previous
}
}
export const abilitiesService = new AbilitiesService()