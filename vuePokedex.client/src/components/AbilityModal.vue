<template>


    <div class="modal fade"  tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="modalHeader">
            
            </slot>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <slot name="modalBody">

          </slot>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button @click="saveAbility()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Ability</button>
      </div>
    </div>
  </div>
</div>

</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { abilitiesService } from "../services/AbilitiesService";
import { logger } from "../utils/Logger";

export default {
  setup(){
    return {
      activeAbility: computed(()=> AppState.activeAbility),
      activeMove: computed(()=> AppState.activeMove),
      activePokemon: computed(() => AppState.activePokemon),
      myAbilities: computed(() => AppState.myAbilities),
      async saveAbility(){
        try{
          // logger.log(this.activeAbility)
          const pokemonId = this.activePokemon.id
          let abilityData = {}
          abilityData = this.activeAbility
          abilityData.pokemonId = pokemonId
          if (this.myAbilities.find(a => a.name == abilityData.name)) {
            Pop.toast('Already saved this ability!')
            logger.log('ability already saved')
            return
          }
          // let ability = this.activeAbility
          // ability.pokemonId = this.activePokemon.id
          // logger.log(ability)
            abilitiesService.saveAbility(abilityData)
            Pop.toast('Ability Saved',)
            
        } catch(error) {
            Pop.error(error.message);
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>