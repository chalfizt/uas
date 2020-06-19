import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/data/firestore.service';
import { Router } from '@angular/router'
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public createServiceForm: FormGroup;
  serviceList : Observable<any[]>;

  newTodo: string = '';
  serviceListRef: AngularFirestoreCollection;

  selectedFile: any;
  loading: HTMLIonLoadingElement;
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private loadingController: LoadingController,
    private router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder
  ) {
    this.serviceListRef = db.collection('serviceList')
    this.serviceList = this.serviceListRef.valueChanges();
    this.createServiceForm = formBuilder.group({
      name: ['', Validators.required],
      penyumbang: ['', Validators.required],
      serviceDescription: ['', Validators.required],
      jenis: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    
  }
  async createService() {
    const loading = await this.loadingCtrl.create();
  
    const name = this.createServiceForm.value.name;
    const penyumbang = this.createServiceForm.value.penyumbang;
    const serviceDescription = this.createServiceForm.value.serviceDescription;
    const jenis = this.createServiceForm.value.jenis;
  
    this.firestoreService
      .createService(name, penyumbang, serviceDescription, jenis)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('');
          });
        },
        error => {
          console.error(error);
        }
      );
  
    return await loading.present();
  }

  chooseFile (event) {
    this.selectedFile = event.target.files
  }

  addTodo(){
    this.serviceListRef.add({
      
      name : this.createServiceForm.value.name,
      penyumbang : this.createServiceForm.value.penyumbang,
      serviceDescription : this.createServiceForm.value.serviceDescription,
      jenis : this.createServiceForm.value.jenis,
    })
    .then(async resp => {

      const imageUrl = await this.uploadFile(resp.id, this.selectedFile)

      this.serviceListRef.doc(resp.id).update({
        id: resp.id,
        imageUrl: imageUrl || null
      })
    }).catch(error => {
      console.log(error);
    })
  }

  async uploadFile(id, file): Promise<any> {
    if(file && file.length) {
      try {
        await this.presentLoading();
        const task = await this.storage.ref('images').child(id).put(file[0])
        this.loading.dismiss();
        return this.storage.ref(`images/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    return this.loading.present();
  }



  remove(service){
    console.log(service);
    if(service.imageUrl) {
      this.storage.ref(`images/${service.id}`).delete()
    }
    this.serviceListRef.doc(service.id).delete()
  }
}