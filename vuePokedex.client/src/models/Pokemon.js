export class Pokemon{
  constructor(data){
    this.name = data.name
    this.abilities = data.abilities
    this.weight = data.weight
    this.height = data.height
    this.id = data.id
    this.weight = data.weight
    this.img = data.sprites.other.dream_world.front_default
    this.types = data.types
  }
}