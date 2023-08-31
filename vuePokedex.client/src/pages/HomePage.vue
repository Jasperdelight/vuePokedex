<template>
<div class="container-fluid">
  <section class="row">
    <div class="col-4">
      <p v-for="p in allPokemon" :key="p.name" @click="getPokemonDetails(p.name)" class="selectable">{{ p.name }}</p>
    </div>
    <div class="col-6">
      <img :src="activePokemon?.img" alt="">
      <button @click="catchPokemon(activePokemon)"><i class="mdi mdi-pokeball"></i></button>
    </div>
  </section>
</div>
</template>

<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import {pokemonService} from "../services/PokemonService"
import { AppState } from "../AppState";
export default {
  setup() {
    async function getPokemon(){
      try{
          await pokemonService.getPokemon()
      } catch(error) {
          Pop.error(error.message);
          logger.log(error);
      }
    }

    onMounted(()=> {
      getPokemon()
      // getMyPokemon()
    }
      )

    
    return {
      allPokemon: computed(()=> AppState.allPokemon),
      activePokemon: computed(()=> AppState.activePokemon),
      async getPokemonDetails(name){
        try{
            await pokemonService.getPokemonDetails(name)
        } catch(error) {
            Pop.error(error.message);
            logger.log(error);
        }
      },
      async catchPokemon(poke){
        try{
            await pokemonService.catchPokemon(poke)
        } catch(error) {
            Pop.error(error.message);
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
