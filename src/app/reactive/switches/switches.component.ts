import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  persona = {
    genero: 'F',
    notificaciones: true,
  }

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });
  
  constructor( private fb : FormBuilder ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      ...this.persona,
      condiciones: true
    });

    //el formulario cambia por cada cambio que se hace
    this.miFormulario.valueChanges.subscribe(({ condiciones, ...rest }) => {

      //delete form.condiciones por desestructuracion
      this.persona = rest;
    });
  }

  guardar(){
    const formValue = { ...this.miFormulario.value};
    delete formValue.condiciones;

    this.persona = formValue;
  }




}
