import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  
  nextPage: null,
  previousPage: null,
  allPokemon: [],

  /** @type {import('./models/Pokemon.js').Pokemon | null} */
  activePokemon: null,
  /** @type {import('./models/Pokemon.js').Pokemon[]} */
  caughtPokemon: [],
  /** @type {import('./models/Ability.js').Ability | null} */
  activeAbility: null,
  /** @type {import('./models/Move.js').Move | null} */
  activeMove: null,
  /** @type {import('./models/Move.js').Move | null} */
  foundMove: null,
  /** @type {import('./models/Ability.js').Ability | null} */
  foundAbility: null,
  foundItem: null,
  /** @type {import('./models/Ability.js').Ability[]} */
  allAbilities: [],
  /** @type {import('./models/Ability.js').Item[]} */
  allItems: [],
  /** @type {import('./models/Ability.js').Ability[]} */
  myAbilities: []
})
