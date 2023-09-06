<template>
  <div class="container-fluid">
    <section class="row"></section>
  </div>
<div v-for="pokemon in caughtPokemon" :key="pokemon.name" @click="setActivePokemon(pokemon)" class="selectable" >
{{ pokemon.name }}
</div>
</template>


<script>
import { computed, onMounted } from "vue";
import { pokemonService } from "../services/PokemonService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";

export default {
  setup(){
    async function getMyPokemon(){
      try{
        await pokemonService.getMyPokemon()
        // debugger;
      } catch(error) {
          Pop.error(error.message);
      }
    }
    onMounted(()=> {
      // getPokemon()
      getMyPokemon()
    }
      )
    return {
      caughtPokemon: computed(()=> AppState.caughtPokemon),
      activePokemon: computed(()=> AppState.activePokemon),

      setActivePokemon(pokemon){
        try{
          pokemonService.setActivePokemon(pokemon)
          
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