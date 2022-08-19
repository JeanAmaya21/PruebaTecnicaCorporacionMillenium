import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  listEstudiantes: any[] = [];
  accion = 'Agregar';
  id: any;
  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _estudianteService: EstudianteService) {
    this.form = this.fb.group(
      {
        //estudiante_Id: [''],
        nombre: ['', Validators.required],
        primer_apellido: ['', [Validators.required, Validators.maxLength(80), Validators.minLength(2)]],
        segundo_apellido: ['', [Validators.required, Validators.maxLength(80), Validators.minLength(2)]],
        edad: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(1)]],
      })
  }

  ngOnInit(): void {
    this.obtenerEstudiantes();
  }

  obtenerEstudiantes() {
    this._estudianteService.getListaEstudiantes().subscribe(data => {
      console.log(data);
      this.listEstudiantes = data;
      console.log();
    }, error => {
      console.log(error);
    })
  }

  guardarEstudiante() { 
    const estudiante: any =
    {
      estudianteId: 0,
      nombre: this.form.get('nombre')?.value,
      primerApellido: this.form.get('primer_apellido')?.value,
      segundoApellido: this.form.get('segundo_apellido')?.value,
      edad: this.form.get('edad')?.value,
    }

    if(this.id == undefined){
      //en caso de que no este el id se agrega una nueva tarjeta
      console.log(estudiante);
      this._estudianteService.addEstudiante(estudiante).subscribe(data =>{
      // Intente implementar toastr para realizar una notificacion pero no se logro obtener el objetivo deseado
      //this.toastr.success('El estudiante fue agregado con exito', 'Estudiante registrado');
      this.obtenerEstudiantes();
      this.form.reset();
    }, error =>{
      console.log(error);
    })

    }else //editar tarjeta
    {
      estudiante.estudianteId = this.id;
      this._estudianteService.updateEstudiante(this.id, estudiante).subscribe(data =>
        {
          this.form.reset();
          this.accion = 'Agregar';
          this.id = undefined;
          this.obtenerEstudiantes();
        }, error=>
        {
          console.log(error);
        });
    }
}



  eliminarEstudiante(id: number) {
    //console.log(Number(id));
    this._estudianteService.deleteEstudiante(id).subscribe(data => {
      this.obtenerEstudiantes();
    }, error => {
      console.log(error);
      //this.toastr.error('El estudiante fue eliminado con exito', 'Estudiante eliminado');
    })
  }

  editEstudiante(estudiante: any)
  {
    this.accion = 'Editar';
    this.id = estudiante.estudianteId;

    this.form.patchValue({
      estudianteId: estudiante.estudainteId,
      nombre: estudiante.nombre,
      primer_apellido: estudiante.primerApellido,
      segundo_apellido: estudiante.segundoApellido,
      edad: estudiante.edad
    })
  }
}
