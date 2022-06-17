import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor( private http: HttpClient ) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {


    const email = control.value;

    console.log(email);

    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${ email }`)
                    .pipe(
                      delay(3000),
                      map( result =>{
                        return ( result.length === 0 )
                            ? null 
                            : { emailTomado: true }
                      })
                    );

  }
}
