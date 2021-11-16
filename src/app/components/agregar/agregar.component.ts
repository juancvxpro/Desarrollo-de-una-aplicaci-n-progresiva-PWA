import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObrasService } from 'src/app/servicios/obras.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { FirestorageService } from 'src/app/servicios/firestorage.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})

export class AgregarComponent implements OnInit {
  newImg:string ='';
  createObra : FormGroup;
  submitted = false;
  loading = false;
  id:string | null;
  titulo ='Agregar Obra';
  newFile :string = "";


  constructor(private fb: FormBuilder,
    private obraService: ObrasService,
    private router: Router,private toastr: ToastrService,
    private firestorageService : FirestorageService,
    private aRoute :ActivatedRoute) {
  this.createObra =this.fb.group({
  titulo:['',Validators.required ],
  autor:['',Validators.required ],
  fecha:['',Validators.required ],
  descripcion:['',Validators.required ],
  imagen:['',Validators.required ]

})

this.id =this.aRoute.snapshot.paramMap.get('id');
console.log(this.id);
   }

  ngOnInit(): void {
    this.isEditar();
  }
  async AgregarObra(){
    this.titulo='Agregar Obra';
    const path = 'obras';
    const name = this.createObra.value.titulo;
    const res = await this.firestorageService.uploadImg(this.newFile,path, name);
    const obra : any = {
      titulo: this.createObra.value.titulo,
      autor: this.createObra.value.autor,
      fecha: this.createObra.value.fecha,
      descripcion: this.createObra.value.descripcion,
      imagen: res,
      fechaCreacion: new Date(),
      fechaActualizacion : new Date()
     }
     this.loading=true;

     this.obraService.agregarObra(obra).then(() =>{
      this.toastr.success('Obra registrada con éxito', 'Obra registrada',{positionClass:'toast-bottom-right'}) ;
      this.loading=false;
      this.router.navigate(['/lista-obras'])
 
     }).catch(error =>{
       console.log(error);
       this.loading=false;
     })
  }
  AgregarEditarObra () {

    this.submitted=true;

    if(this.createObra.invalid){
     
      return;
    }
    
    if(this.id==null){

      this.AgregarObra();

    }else{

      this.editarObra(this.id);
    }
  }
  isEditar(){
    if(this.id !== null){
      this.titulo="Editar Obra"
     this.loading = true;
     this.obraService.getObra(this.id).subscribe(data=>{
      this.loading=false;
      
      this.createObra.setValue({
        titulo:data.payload.data()['titulo'],
        autor: data.payload.data()['autor'],
        fecha: data.payload.data()['fecha'],
        descripcion: data.payload.data()['descripcion'],
        imagen:data.payload.data()['imagen'] 
      })
     

        this.newImg = this.createObra.value.imagen;
        console.log('aqui el path de lña ima',this.newImg);

    
    
     } )

    }
  }

  async editarObra(id:string){

    const path = 'obras';
    const name = this.createObra.value.titulo;
    const res = await this.firestorageService.uploadImg(this.newFile,path, name);
   

    const obra : any = {
      titulo: this.createObra.value.titulo,
      autor: this.createObra.value.autor,
      fecha: this.createObra.value.fecha,
      descripcion: this.createObra.value.descripcion,
      imagen: res,
      fechaActualizacion : new Date()
     }
     this.loading=true;

    this.obraService.actualizarObra(id,obra).then(() => {
     this.loading=false;
     this.toastr.info('La obra fue modificada con éxito', 'Obra Actualizada!',{
     positionClass:'toast-bottom-right'
    });
    this.router.navigate(['/lista-obras'])
     })
    }
    async newImage(event:any){

      if(event?.target.files && event.target.files[0]){

        this.newFile = event.target.files[0];
        const reader = new FileReader();
       reader.onload = ((image)=>{

          this.newImg = image.target?.result as string;
      });
       reader.readAsDataURL(event.target.files[0]);
         
     

    }
  }


}
