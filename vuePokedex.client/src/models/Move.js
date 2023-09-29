export class Move{
  constructor(data){
    this.accuracy = data.accuracy
    this.power = data.power
    this.pp = data.pp
    this.damageClass = data.damage_class
    this.flavorText = data.flavor_text_entries
    this.effectChanges = data.effect_changes
    this.effectChance = data.effect_chance
    this.effectEntries = data.effect_entries
    this.name = data.name
    this.statChanges = data.stat_changes
    this.target = data.target
    this.type = data.type
    this.pastValues = data.past_values
  }
}