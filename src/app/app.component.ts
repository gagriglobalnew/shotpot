import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
Logindetails: any
  GetLogindetails: any;
  constructor(private Navctrl: NavController,) {
  
    this.GetLogindetails = localStorage.getItem('userdetails');

    // Check if data exists in localStorage
    if (this.GetLogindetails) {
      debugger
      // Parse the string to an array of objects
      this.Logindetails = JSON.parse(this.GetLogindetails);

      // Access the first element (index 0) from the array
      const firstLoginDetail = this.Logindetails;

      // Use the data (for example, display the FullName)
      //console.log(firstLoginDetail.FullName); // Outputs: "xfcsa"
    } else {
      console.log('No LoginDetails found in localStorage');
    }

    this.InitializeApp();
  }
  InitializeApp() {
    debugger
    if (this.Logindetails) {
      if (this.Logindetails.roleId == 1) {
        this.Navctrl.navigateForward('/tabs/tab1')
        
      }
      else if (this.Logindetails.roleId == 2) {
        this.Navctrl.navigateForward('/tabs/tab1')

      } else {
        this.Navctrl.navigateForward('/tabs/tab1')

      }
    } else {
      this.Navctrl.navigateForward('/login')

    }
  }
}
