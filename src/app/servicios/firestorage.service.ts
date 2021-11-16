import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(public fireStorage: AngularFireStorage) {}


   uploadImg(file:any,path:string, nombre: string):Promise<string>{
     
      return new Promise( resolve =>  {
       
        const filePath = path +'/'+ nombre ;
        const ref = this.fireStorage.ref(filePath);
        const task = ref.put(file);
         
    
        task.snapshotChanges().pipe(
        finalize(() => {
          
          ref.getDownloadURL().subscribe(res => {

            const DownloadURL = res;

             resolve(DownloadURL);

             return

          }); 
        
        })
     )
    .subscribe()
      });

   }
}
