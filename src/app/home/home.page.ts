import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { GoogleMaps, GoogleMap, GoogleMapOptions, Marker } from '@ionic-native/google-maps/ngx';

import { Environment } from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: GoogleMap;
  lat: number;
  lng: number;

  constructor(private platform: Platform, private geolocation: Geolocation) {}

  async ngOnInit() {

    await this.platform.ready();
    await this.loadMap();

  }

  loadMap() {

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAh_Xhj6BbzJ95wYEDShgyWD9wwxZ2oCZ4',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAh_Xhj6BbzJ95wYEDShgyWD9wwxZ2oCZ4'

    });


    this.map = GoogleMaps.create('map_canvas');

    this.geolocation.getCurrentPosition()
    .then((resp) => {

      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

    })
    .catch((error) => {
      console.log(error);
    });

    let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      });
    
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 15,
        tilt: 30
      }
    };

    this.map.setOptions(mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'My Marker',
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: this.lat,
        lng: this.lng
      }
    });
  }

}
