import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      [ 'Metal Gear', Validators.required ],
      [ 'Death Stranding', Validators.required ],
      [ 'Mario 64', Validators.required ]
    ], Validators.required)
  });

  nuevoFavorito : FormControl = this.fb.control('', Validators.required);

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray
  }

  constructor( private fb: FormBuilder ) { }

  agregarFavorito(){

    if( this.nuevoFavorito.invalid ){ return; }

    this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required ) )

    this.nuevoFavorito.reset();
  }

  guardar(){

    if( this.miFormulario.invalid ){

      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

  campoEsValid( campo : string ){

    return this.miFormulario.controls[campo].errors 
          && this.miFormulario.controls[campo].touched;
  }

  borrar( index: number ){
    console.log(index)
    this.favoritosArr.removeAt(index);
  }
}
