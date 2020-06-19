import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  user: any = {};
  constructor(
    private auth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    private afDB: AngularFireDatabase,
  ) { }

  ngOnInit() {
    this.afDB.object('users/' + this.auth.auth.currentUser.uid).snapshotChanges().subscribe((usersnap: any) => {
      this.user = { 'key': usersnap.key, ...usersnap.payload.val() };
    })
  }


  update() {
    this.afDB.object('users/' + this.auth.auth.currentUser.uid).update(this.user);
  }


}