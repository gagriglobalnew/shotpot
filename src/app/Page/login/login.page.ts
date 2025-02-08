import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GeneralServiceService } from '../../Services/Generals/general-service.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],

})
export class LoginPage implements OnInit {
  LoginForm!: FormGroup;
  val: any;
  logidetais: any;
  constructor(private navctrl: NavController, private formBuilder: FormBuilder, private general: GeneralServiceService,) {
    this.LoginForm = this.formBuilder.group({
      Mobile: ['', [Validators.required,
        Validators.pattern(/^[0-9]{10}$/),  // Only 10 digit numbers
        Validators.maxLength(10),],],
      Password: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(6), Validators.required])]
    });

  }

  ngOnInit() {
  }
  click(values: any) {
    debugger
    this.val = values
    if (this.LoginForm.valid) {
      
      //var UploadFile = new FormData();
     // UploadFile.append("emailOrMobile", values.Mobile);
    //  UploadFile.append("password", values.Password);
      this.logidetais = {
        emailOrMobile: values.Mobile, // Email or Mobile field
        password: values.Password // Password
      }
      const url = `api/ShotSpot/Memberlogin`;    //  const url = 'api/shotspot/Login';
      this.general.PostData(url, this.logidetais).subscribe((data: any) => {
        this.general.presentAlert("SUCCESS", "Your login successfulley");
        this.navctrl.navigateForward(['/tabs/tab1'])
        debugger
        localStorage.setItem('userdetails', JSON.stringify(data))
      });
    }
  }
   mobileControl() {
     //return this.LoginForm.get('Mobile');
  }

  signup() {
    this.navctrl.navigateForward(['/registration'])
  }
  btn(val: any) {
    debugger
    if (val=='t') {
      this.navctrl.navigateForward(['/termsconditions'])

    } else {
      this.navctrl.navigateForward(['/privacypolicy'])

    }
  }
}
