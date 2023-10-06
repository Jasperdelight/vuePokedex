export class Item{
  constructor(data){
    this.attributes = data.attributes
    this.category = data.category
    this.cost = data.cost
    this.effectEntries = data.effect_entries
  }
}