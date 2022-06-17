import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre:  ['',[ Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern ) ]],
    email:  ['',[ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ], [ this.emailValidator ]],
    username:  ['',[ Validators.required, this.validatorService.noPuedeSerStrider ]],
    password:  ['',[ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]]
  }, {
    validators: [ this.validatorService.camposIguales('password', 'password2') ]
  });

get emailErrorMsg(): string{

  const errors = this.miFormulario.get('email')?.errors;

  if(errors?.['required']){
    return 'Email es obligatorio.'
  } else if( errors?.['pattern'] ){
    return 'El valor ingresado no tiene el formato correo.'
  } else if( errors?.['emailTomado'] ){
    return 'El email ya fue tomado.'
  }

  return ''
}


  constructor( private fb: FormBuilder, 
               private validatorService: ValidatorService,
               private emailValidator: EmailValidatorService ) { }

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
