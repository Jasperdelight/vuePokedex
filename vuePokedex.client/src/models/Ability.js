export class Ability{
  constructor(data){
    this.effectChanges = data.effect_changes || data.effectChanges
    this.effectEntries = data.effect_entries || data.effectEntries
    this.flavorTextEntries = data.flavor_text_entries || data.flavorTextEntries
    this.generation = data.generation
    this.id = data.id
    this.name = data.name
    this.pokemon = data.pokemon
    this._id = data._id
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt
    this.mainPokemon = data.mainPokemon
  }
  // TODO effectEntries and changes don't get saved properly when pulling info from my database since its set up to receive info from poke API
}