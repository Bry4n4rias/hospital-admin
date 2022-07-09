import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmited = false;

  public registerForm = this.fb.group(
    {
      nombre: ['Bryan', [Validators.required, Validators.minLength(3)]],
      email: ['bryan20@gmail.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  crearUsuario() {
    this.formSubmited = true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    } else {
      // crear usuario
      // auqneu le estamos mandando mas campos como el password2 el backend lo ignora al no estar en su modelo
      this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
        (resp) => {
          console.log('Usuario creado');
          console.log(resp);
          this.router.navigateByUrl('/');
        },
        (err) => {
          // si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
        }
      );
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }

  constrasenasNoCoinciden() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmited;
  }

  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1control = formGroup.get(pass1);
      const pass2control = formGroup.get(pass2);

      if (pass1control?.value === pass2control?.value) {
        pass2control?.setErrors(null);
      } else {
        pass2control?.setErrors({ noEsIgual: true });
      }
    };
  }
}
