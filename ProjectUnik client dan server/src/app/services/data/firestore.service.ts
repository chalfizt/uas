import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Service } from '../../models/service.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }
  createService(
    name: string,
    penyumbang: string,
    serviceDescription: string,
    jenis: string
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc(`serviceList/${id}`).set({
      id,
      name,
      penyumbang,
      serviceDescription,
      jenis,
    });
   }
   deleteService(serviceId: string): Promise<void> {
    return this.firestore.doc(`serviceList/${serviceId}`).delete();
  }
   getServiceList(): AngularFirestoreCollection<Service> {
    return this.firestore.collection(`serviceList`);
  }
  getServiceDetail(serviceId: string): AngularFirestoreDocument<Service> {
    return this.firestore.collection('serviceList').doc(serviceId);
  }
}
