import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona{
  nombre: string,
  favoritos: Favorito[];
}

interface Favorito{
  id: number,
  nombre: string
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  @ViewChild('miFormulario') miFormulario! : NgForm;

  nuevoJuego: string = "";

  persona: Persona = {
    nombre: 'Fernando',
    favoritos: [
      { id: 1, nombre: 'Metal Gear' },
      { id: 2, nombre: 'DeathStranding' }
    ]
  }

  agregarJuego(){
    const nuevoFarovito: Favorito = {
      id: this.obtenerUltimoId() + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push({...nuevoFarovito});
    this.nuevoJuego = "";

    console.log(nuevoFarovito)
  }

  obtenerUltimoId(): number{
    
    return this.persona.favoritos[this.persona.favoritos.length - 1].id;
  }

  guardar(){
    console.log("Formulario posteado")
  }

  nombreValido(){
    return this.miFormulario?.controls['nombre']?.invalid && 
           this.miFormulario?.controls['nombre']?.touched;
  }

  borrar( index: number ){
    console.log(index);
    this.persona.favoritos.splice(index, 1);
  }

}
