import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  nombreApellidoPattern : string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  miFormulario: FormGroup = this.fb.group({
    nombre:  ['',[ Validators.required, Validators.pattern( this.nombreApellidoPattern ) ]],
    email:  ['',[ Validators.required, Validators.pattern( this.emailPattern ) ]]
  });

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  campoEsValid( campo : string ){

    return this.miFormulario.controls[campo].errors 
          && this.miFormulario.controls[campo].touched;
  }

  guardar(){

    if( this.miFormulario.invalid ){

      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}
