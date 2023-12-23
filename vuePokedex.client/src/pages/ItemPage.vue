<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-md-2 col-4 bg-danger text-white text-shadow">
        <section class="row">
          <div class="col-md-5 col-12"><button v-if="previousPG != null" @click="previousPage()" class="btn btn-secondary text-black"> Prev</button></div>
        <div class="col-md-2 col-12 d-flex align-items-center" title="Page Number">{{ pageCount }}</div>
        <div class="col-md-5 col-12"><button @click="nextPage()" class="btn btn-secondary text-black">Next</button></div>
          <p style="text-transform: capitalize;" v-for="item in allItems" :key="item.name" @click="setActiveItem(item)" class="selectable col-12" >
            {{ item.name }}
          </p>
        </section>
      </div>
      <section class="col-10">
        <div class="col-12 text-center">
          <div v-if="foundItem">
            <FoundItemCard/>
          </div>
        </div>
      </section>
      </section>
      </div>
</template>


<script>
import { computed, watchEffect } from "vue";
import { itemsService } from "../services/ItemsService";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import FoundItemCard from "../components/FoundItemCard.vue";

export default {
    setup() {
        async function getItems() {
            try {
                await itemsService.getItems();
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        watchEffect(() => {
            getItems();
        });
        return {
            allItems: computed(() => AppState.allItems),
            foundItem: computed(() => AppState.foundItem),
            pageCount: (0),
            previousPG: computed(() => AppState.previousPage),
            async setActiveItem(item) {
                try {
                    await itemsService.findItems(item.name);
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async nextPage() {
                try {
                    this.pageCount++;
                    await itemsService.nextPage();
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async previousPage() {
                try {
                    this.pageCount--;
                    await itemsService.previousPage();
                }
                catch (error) {
                    Pop.error(error.message);
                }
            }
        };
    },
    components: { FoundItemCard }
}
</script>


<style lang="scss" scoped>

</style>