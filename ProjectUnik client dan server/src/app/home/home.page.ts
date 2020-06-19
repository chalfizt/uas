import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service.interface';
import { FirestoreService } from '../services/data/firestore.service';
import { Router } from '@angular/router'
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 15,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },}

    sliderConfigg = {
      slidesPerView: 2,
      spaceBetween: 6,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },}

  public serviceList;
  constructor(private firestoreService: FirestoreService,
    private router: Router) {}
    ngOnInit() {
      this.serviceList = this.firestoreService.getServiceList().valueChanges();
    }
    
}
