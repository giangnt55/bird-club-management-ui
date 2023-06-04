import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/auth.model';
import { Response } from 'src/app/models/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoginDisabled: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.isLoginDisabled = this.loginForm.invalid;
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(username, password).subscribe(
      (response: Response<LoginResponse>) => {
        this.toastr.success('Login successful', 'Success');
        const { access_token, refresh_token } = response.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        // Redirect to home page
        console.log(response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login error:', error);
        this.toastr.error('Invalid username or password', 'Error');
      }
    );
  }
}
