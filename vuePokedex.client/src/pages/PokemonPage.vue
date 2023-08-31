<template>
  poke page
</template>


<script>
import { onMounted } from "vue";
import { pokemonService } from "../services/PokemonService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";

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
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>