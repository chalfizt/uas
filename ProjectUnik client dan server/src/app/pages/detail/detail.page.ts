import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../../models/service.interface';
import { FirestoreService } from '../../services/data/firestore.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public service: Observable<Service>;
  
  
  constructor(private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController) { }

  ngOnInit() {
    const serviceId: string = this.route.snapshot.paramMap.get('id');
    this.service = this.firestoreService.getServiceDetail(serviceId).valueChanges();
    
  }
  async deleteService() {
    const serviceId: string = this.route.snapshot.paramMap.get('id');
    const alert = await this.alertController.create({
      message: 'Apakah kamu ingin menghapus layanan?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.firestoreService.deleteService(serviceId).then(() => {
              this.router.navigateByUrl('tab1');
            });
          },
        },
      ],
    });
  
    await alert.present();
  }
}
  