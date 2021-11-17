import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ObrasService } from 'src/app/servicios/obras.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  obras: any[] =[];
  resultado: any[] =[];
 
  titulo:string | null;
  constructor(private fb: FormBuilder,private _obrasService:ObrasService,
    private toastr: ToastrService) { 
    this.titulo=null;
     
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

  
 
}
