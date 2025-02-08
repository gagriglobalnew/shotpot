import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GeolocationServiceService } from '../Services/Geolocation/geolocation-service.service'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  GetLogindetails: any;
  Logindetails: any; personname: any;
  //latitude: number | undefined;
  latitude: any;
  longitude: any;
  city: any;
  selectedCity: any;
  area: any;
  selectedarea: any;
  pincode: any;
  selectedpincode: any;
  state: any;
  selectedState: any;
  country: any;
  Distict: any;
  selectedDistrict: any;
  constructor(private http: HttpClient, private GeolocationService: GeolocationServiceService) {

    debugger
    this.GetLogindetails = localStorage.getItem('userdetails');

    // Check if data exists in localStorage
    if (this.GetLogindetails) {
      debugger
      // Parse the string to an array of objects
      this.Logindetails = JSON.parse(this.GetLogindetails);

      // Access the first element (index 0) from the array
      const firstLoginDetail = this.Logindetails;
      this.personname = this.Logindetails.fullName
      // Use the data (for example, display the FullName)
      console.log(firstLoginDetail.FullName); // Outputs: "xfcsa"
    } else {
      console.log('No LoginDetails found in localStorage');
    }
  }
  ngOnInit() {
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
    console.log('Latitude:', this.latitude);
    console.log('Longitude:', this.longitude);

    // Get area name (Reverse Geocoding)
    this.getCityAndArea(this.latitude, this.longitude);
  }



  getCityAndArea(lat: number, lng: number) {
    debugger
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBPFXmwHMaoN_CVZ2K1w2kMLm5qpSXD_s8`; // Replace with your API key
    this.http.get(url).subscribe((response: any) => {
      if (response && response.results && response.results.length > 0) {
        const result = response.results[0];
        this.latitude = lat;
        this.longitude = lng;
        this.city = this.getAddressComponent(result.address_components, 'locality');
        this.selectedCity = this.city
        this.area = this.getAddressComponent(result.address_components, 'sublocality') ||
          this.getAddressComponent(result.address_components, 'sublocality_level_1');
        this.selectedarea = this.area
        this.pincode = this.getAddressComponent(result.address_components, 'postal_code');
        this.selectedpincode = this.pincode
        this.state = this.getAddressComponent(result.address_components, 'administrative_area_level_1');
        this.selectedState = this.state
        this.country = this.getAddressComponent(result.address_components, 'country');
        //this.Distict = this.getAddressComponent(result.address_components, 'administrative_area_level_2');
        this.Distict = this.getAddressComponent(result.address_components, 'administrative_area_level_3');
        this.selectedDistrict = this.Distict
        //this.BloodRequestForm.controls['area'].setValue(this.area);
        //this.BloodRequestForm.controls['Pincode'].setValue(this.pincode);


      } else {
        console.log('No results found');
      }
    }, (error: any) => {
      console.error('Error getting geocode', error);
    });
  }

  getAddressComponent(components: any[], type: string) {
    for (const component of components) {
      if (component.types.includes(type)) {
        return component.long_name;
      }
    }
    return null;
  }
}
