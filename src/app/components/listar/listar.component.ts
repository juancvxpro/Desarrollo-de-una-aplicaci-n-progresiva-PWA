import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ObrasService } from 'src/app/servicios/obras.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  obras: any[] =[];

  constructor(private _obrasService:ObrasService,
    private toastr: ToastrService) { 
  

  }
 
  ngOnInit(): void {
    this.getObras();
  }

  
  getObras(){
   
    this._obrasService.getObras().subscribe(data => {
    this.obras=[];
    data.forEach((element:any) => {
        this.obras.push({
       id:element.payload.doc.id,
       ...element.payload.doc.data()
        })
      });
      console.log(this.obras);
    });

  }

  eliminarObras(id:string){

   
    this._obrasService.eliminarObras(id).then(()=>{
     
      console.log('obra eliminada con éxito');
      this.toastr.error('La obra ha sido eliminada con éxito', 'Registro eliminado',{
      positionClass:'toast-bottom-right'
     });

    }).catch(error =>{
      
      console.log(error);

    })
  }

  buscarObras(id:String){


  }
}
