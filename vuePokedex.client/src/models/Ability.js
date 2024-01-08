export class Ability{
  constructor(data){
    this.effectChanges = data.effect_changes
    this.effectEntries = data.effect_entries
    this.flavorTextEntries = data.flavor_text_entries
    this.generation = data.generation
    this.id = data.id
    this.name = data.name
    this.pokemon = data.pokemon
    this._id = data._id
  }
}