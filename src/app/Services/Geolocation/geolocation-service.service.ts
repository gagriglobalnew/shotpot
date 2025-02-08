import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { NativeSettings, AndroidSettings, IOSSettings } from 'capacitor-native-settings';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';

declare var google: any;
import { GeneralServiceService } from '../Generals/general-service.service';
import { PermissionsService } from '../Permission/permissions.service';
@Injectable({
  providedIn: 'root'
})
export class GeolocationServiceService {
  Latitude: any;
  Longitude: any;
  constructor(private Service: GeneralServiceService, private http: HttpClient,
    private platform: Platform, private permissionService: PermissionsService, // Assuming you have a PermissionService for handling permissions,
    private locationAccuracy: LocationAccuracy,) { }

  

  async getCurrentLocation(): Promise<any> {
    try {
      const permissionStatus = await Geolocation.checkPermissions();
      console.log('Permission status: ', permissionStatus.location);
      if (permissionStatus?.location !== 'granted') {
        const requestStatus = await Geolocation.requestPermissions();
        if (requestStatus.location !== 'granted') {
          await this.openSettings(true);
          return;
        }
      }

      if (Capacitor.getPlatform() === 'android') {
        this.enableGps();
      }

      const position = await this.getCurrentPosition();
      this.Latitude = position.coords.latitude;
      this.Longitude = position.coords.longitude;

      const geocodeResult = await this.geocodeLocation(this.Latitude, this.Longitude);
      console.log(position);
      return geocodeResult;
    } catch (e: any) {
      if (e?.message === 'Location services are not enabled') {
        await this.openSettings();
      }
      console.error(e);
      throw e;
    }
  }

  async getCurrentPosition(): Promise<GeolocationPosition> {
    const options = {
      maximumAge: 3000,
      timeout: 10000,
      enableHighAccuracy: true
    };
    return await Geolocation.getCurrentPosition(options);
  }

  async geocodeLocation(latitude: number, longitude: number): Promise<any> {
    debugger
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(latitude, longitude);
      const request = { location: latlng };

      geocoder.geocode(request, (results: any, status: any) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          debugger
          // let fullAddress = results[1].formatted_address;

          const addressComponents = results[0].address_components;
          let areaName = null;
          for (let i = 0; i < addressComponents.length; i++) {
            const types = addressComponents[i].types;
            if (types.includes('sublocality_level_2')) {
              areaName = addressComponents[i].long_name;
              break;
            }
          }
          resolve({ lat: latitude, lng: longitude, area: areaName });
        } else {
          reject('Geocoder failed: ' + status);
        }
      });
    });
  }


  openSettings(app = false) {
    console.log('open settings...');
    return NativeSettings.open({
      optionAndroid: app ? AndroidSettings.ApplicationDetails : AndroidSettings.Location,
      optionIOS: app ? IOSSettings.App : IOSSettings.LocationServices
    });
  }

  async enableGps() {
    const canRequest = await this.locationAccuracy.canRequest();
    if (canRequest) {
      await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    }
  }


}
