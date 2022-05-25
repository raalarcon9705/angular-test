import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services';
import { AuthStoreService } from 'src/app/store/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthStoreService) { }

  ngOnInit() {
    this._buildForm();
  }

  onSubmit() {
    const user = this.registerForm.getRawValue();
    this._authService.signUp({ user });
  }

  private _buildForm() {
    this.registerForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

}
