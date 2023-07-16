import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegisterDto } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerDto: RegisterDto = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    phone_number: '',
  };

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService
  ) {}

  register() {
    const { fullname, username, email, password, phone_number } =
      this.registerDto;

    if (!fullname || !username || !email || !password || !phone_number) {
      console.log('Please fill in all the required fields.');
      return;
    }

    this.usersService.register(this.registerDto).subscribe(
      (response) => {
        this.registerDto = {
          fullname: '',
          username: '',
          email: '',
          password: '',
          phone_number: '',
        };
        this.toastr.success('Register successfully');
        window.location.href = '/login';
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
