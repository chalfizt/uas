import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from './services/data/firestore.service';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    firestore: AngularFirestore,
    private firestoreService: FirestoreService,
    private router: Router, private auth: AngularFireAuth
    ,private afFirestore: AngularFirestore,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  logout() {
    this.auth.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    }).catch(e => {
      console.log(e);
    })
  }
}
