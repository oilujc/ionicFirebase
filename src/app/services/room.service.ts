import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
  	private database: AngularFirestore,
  	public alertController: AlertController,
  	public toastController: ToastController
  	) { }

  dbRef  = this.database.collection('rooms');

  readRooms() {
  	return this.dbRef.snapshotChanges().pipe(map(rooms => {
  		return rooms.map(room => {
  			const data = room.payload.doc.data();
  			const id = room.payload.doc.id;
  			return {id,...data};
  		});
  	}));
  }

  createRoom(name: string) {
  	this.dbRef.add({
  		name: name,
  		status: true
  	}).then(() => {
  		this.showToast("Room created succesfully");
  	}).catch( err => {
  		console.log(err.message);
  	});
  }

  updateRoom(id:string, name:string) {
  	this.dbRef.doc(id).update({
  		name: name
  	})
  }

  deleteRooms(id:string) {
  	this.dbRef.doc(id).delete()
  	.then(() => this.showToast("Room deleted"))
  	.catch(err => console.log(err.message));
  }

  /* Components */
	async addRoomAlert() {
    const alert = await this.alertController.create({
      header: 'New Room!',
      inputs: [
        {
          name: 'nameRoom',
          type: 'text',
          placeholder: 'Name Room'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (name) => {
          	this.createRoom(name.nameRoom);
          }
        }
      ]
    });

    await alert.present();
  }

  async updateRoomAlert(id:string, name:string) {
    const alert = await this.alertController.create({
      header: 'New Room!',
      inputs: [
        {
          name: 'nameRoom',
          type: 'text',
          value: name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (name) => {
          	this.updateRoom(id, name.nameRoom);
          }
        }
      ]
    });

    await alert.present();
  }

  async showToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
