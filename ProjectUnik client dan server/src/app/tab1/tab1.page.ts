import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/data/firestore.service';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  sliderConfig = {
    slidesPerView: 1.4,
    spaceBetween: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 0,
      modifier: 0,
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
  tasks: any = [];

  constructor(private firestoreService: FirestoreService,
    private router: Router, private auth: AngularFireAuth
    ,private afFirestore: AngularFirestore) {}
    ngOnInit() {
      this.serviceList = this.firestoreService.getServiceList().valueChanges();
    }
    
  fetch() {
    this.afFirestore.collection(this.auth.auth.currentUser.uid).snapshotChanges().subscribe((res: any) => {
      console.log(res);
      let tmp = [];
      res.forEach(task => {
        tmp.push({ key: task.payload.doc.id, ...task.payload.doc.data() });
      })
      console.log(tmp);
      this.tasks = tmp;
    })
  }
    logout() {
      this.auth.auth.signOut().then(() => {
        this.router.navigateByUrl('/login');
      }).catch(e => {
        console.log(e);
      })
    }
}
