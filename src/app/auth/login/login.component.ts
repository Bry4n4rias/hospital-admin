import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm = this.fb.group({
    email: ['bryan1@gmail.com', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  login() {
    this.usuarioService.login(this.loginForm.value).subscribe(
      (resp: any) => {
        this.router.navigateByUrl('/');
      },
      (err) => {

        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
}
