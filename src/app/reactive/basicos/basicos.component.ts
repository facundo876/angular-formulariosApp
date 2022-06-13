import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit{

  // miFormulario : FormGroup = new FormGroup({
  //   'nombre' : new FormControl('RTX 4080ti')
  // })

  miFormulario : FormGroup = this.fb.group({
    nombre: [ '', [Validators.required, Validators.minLength(3)] ],
    precio: [ , [Validators.required, Validators.min(0)] ],
    existecia: [ , [Validators.required, Validators.min(0)] ],
  })

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    
    this.miFormulario.reset({
      nombre: 'RTX 5080ti',
      precio: 100
    });
  }

  campoEsValid( campo : string ){

    return this.miFormulario.controls[campo].errors 
          && this.miFormulario.controls[campo].touched;
  }

  guardar(){

    if( this.miFormulario.invalid){

      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}
