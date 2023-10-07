<template>
<div class="container-fluid">
  <section class="row">
    <div class="col-md-2 col-4 bg-danger text-white text-shadow">
      <section class="row">
        <div class="col-md-5 col-12"><button v-if="previousPG != null" @click="previousPage()" class="btn btn-secondary text-black"> Prev</button></div>
        <div class="col-md-2 col-12 d-flex align-items-center" title="Page Number">{{ pageCount }}</div>
        <div class="col-md-5 col-12"><button @click="nextPage()" class="btn btn-secondary text-black">Next</button></div>
        <p style="text-transform: capitalize;" v-for="p in allPokemon" :key="p.name" @click="getPokemonDetails(p.name)" class="selectable col-12">{{ p.name }}</p>
      </section>
    </div>
    <div v-if="activePokemon == null && foundMove == null" class="col-10 d-flex justify-content-center flex-column">
      <p class="fs-2 text-center">Select a Pokemon!</p>
      <img src="https://www.gamespot.com/a/uploads/scale_medium/1601/16018044/3968710-pokedex-run.jpg" alt="pokedex" class="img-fluid ">
    </div>
    <div class="col-md-10 col-8">

      <div class="col-12 d-flex justify-content-center">
        <button v-if="account.id && activePokemon" @click="catchPokemon(activePokemon)" class="btn btn-outline-danger"><i class="mdi mdi-pokeball"></i></button>
      </div>
      <!-- Pokemon Search Results -->
      <div v-if="activePokemon">
        <ActivePokemonCard :activePokemon = "activePokemon"/>
      </div>
      <!-- Move Search Results -->
      <div v-if="foundMove">
        <FoundMoveCard/>
      </div>
      <div v-if="foundAbility">
        <FoundAbilityCard/>
      </div>
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
import ActivePokemonCard from "../components/ActivePokemonCard.vue";
import FoundMoveCard from "../components/FoundMoveCard.vue";
import FoundAbilityCard from "../components/FoundAbilityCard.vue";
export default {
    setup() {
        async function getPokemon() {
            try {
                await pokemonService.getPokemon();
            }
            catch (error) {
                Pop.error(error.message);
                logger.log(error);
            }
        }
        onMounted(() => {
            getPokemon();
            AppState.activePokemon = null
            // getMyPokemon()
        });
        return {
            pageCount: (0),
            allPokemon: computed(() => AppState.allPokemon),
            activePokemon: computed(() => AppState.activePokemon),
            caughtPokemon: computed(() => AppState.caughtPokemon),
            account: computed(() => AppState.account),
            previousPG: computed(() => AppState.previousPage),
            foundMove: computed(() => AppState.foundMove),
            foundAbility: computed(() => AppState.foundAbility),
            foundItem: computed(() => AppState.foundItem),
            async getPokemonDetails(name) {
                try {
                    await pokemonService.getPokemonDetails(name);
                }
                catch (error) {
                    Pop.error(error.message);
                    logger.log(error);
                }
            },
            async catchPokemon(poke) {
                try {
                    if (this.caughtPokemon.find(p => p.name == poke.name)) {
                        logger.log('already caught');
                        Pop.toast('pokemon already caught!');
                    }
                    else {
                        await pokemonService.catchPokemon(poke);
                    }
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async nextPage(){
              try{
                this.pageCount++;
                  await pokemonService.nextPage();
              } catch(error) {
                  Pop.error(error.message);
              }
            },
            async previousPage(){
              try{
                this.pageCount--
                  await pokemonService.previousPage();
              } catch(error) {
                  Pop.error(error.message);
              }
            }
        };
    },
    components: { ActivePokemonCard, FoundMoveCard, FoundAbilityCard }
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
