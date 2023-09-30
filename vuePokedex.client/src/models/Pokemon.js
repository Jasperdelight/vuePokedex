export class Pokemon{
  constructor(data){
    this.name = data.name
    this.abilities = data.abilities
    this.weight = data.weight
    this.height = data.height
    this.id = data.id 
    this.img = data.sprites?.other.dream_world.front_default || data.img
    // this.types = data.types
    this.stats = data.stats
    this.moves = data.moves
    this._id = data._id
  }
}