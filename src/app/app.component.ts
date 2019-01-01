import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipe';
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyDU9hGDNN_XtMWX8eWsCeirP89e4Im70d8",
      authDomain: "ng-recipe-book-44be3.firebaseapp.com"
    });
  }
  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
}
