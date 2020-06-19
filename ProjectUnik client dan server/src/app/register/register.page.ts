import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: any = {};

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFireDatabase
  ) { }

  ngOnInit() {
  }

  register() {

    if (this.user.email && this.user.password) {
      this.auth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password).then((r) => {
        console.log(r);

        this.afDB.object('users/' + r.user.uid).set({
          name: this.user.name,
          email: this.user.email,
          createdAt: Date.now(),
        }).then(() => {
          this.router.navigateByUrl('/home');
        });

      }).catch(e => {
        console.log(e);
      })
    }
  }

}
