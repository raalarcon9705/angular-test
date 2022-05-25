import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthStoreService } from 'src/app/store/auth';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthStoreService) { }

  ngOnInit(): void {
    this._buildForm();
  }

  onSubmit() {
    const { email, password } = this.loginForm.getRawValue();
    this._authService.signIn(email, password);
  }

  private _buildForm() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

}
