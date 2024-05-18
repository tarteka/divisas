export class ListaDivisas {

  [key: string]: string;

  constructor(
    datos:{[key:string]:string} = {}
  ){
    Object.assign(this, datos);
  }
}
