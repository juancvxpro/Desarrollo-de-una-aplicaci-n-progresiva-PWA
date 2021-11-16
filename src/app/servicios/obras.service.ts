import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ObrasService {

 

  constructor(private afs : AngularFirestore) { }


  agregarObra(obra: any):Promise <any>{
  
    return this.afs.collection('obras').add(obra);

  }

  getObras(): Observable<any> {
  
    return this.afs.collection('obras', ref => ref.orderBy('fechaCreacion','asc') ).snapshotChanges();

  }

  eliminarObras(id:string):Promise <any> {

   return this.afs.collection('obras').doc(id).delete();

  }

  getObra(id:string):Observable<any>{

    return this.afs.collection('obras').doc(id).snapshotChanges();
  }

  actualizarObra(id: string, data:any) :Promise <any>{
     
    return this.afs.collection('obras').doc(id).update(data);

  }

 getObrasFiltro(filtro:string):Observable<any>{

  return this.afs.collection('obras').doc(filtro).snapshotChanges();
}

}
