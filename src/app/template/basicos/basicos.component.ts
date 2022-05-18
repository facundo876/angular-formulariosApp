import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario! : NgForm;

  initForm = {
    producto: 'Algo init',
    precio: 10,
    existecias: 10
  }

  constructor() { }

  ngOnInit(): void {
  }

  guardar( ){
    console.log( this.miFormulario )
    console.log( 'Poste echo correctamente.' )
    
    this.miFormulario.resetForm({
      producto: '',
      precio: 0,
      existecias: 0
    });
  }
  
  nombreValido(): boolean{
    return this.miFormulario?.controls['producto']?.invalid && 
           this.miFormulario?.controls['producto']?.touched;
  }

  precioValido(): boolean{
    return  this.miFormulario?.controls['precio']?.touched || 
            this.miFormulario?.controls['precio']?.value < 0;
  }
}
