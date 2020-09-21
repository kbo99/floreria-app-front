import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/shared/service/producto/producto.service';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.scss']
})
export class TipoProductoComponent implements OnInit {
  public productForm: FormGroup;
  public closeResult: string;
  constructor(private modalService: NgbModal, private reference: NgbModal,private fb: FormBuilder,
     private productoService:ProductoService) { 
      this.productForm = this.fb.group({
        tpoprodNombre: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
        tpoprodDecrip: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      });
     }
     public settings = {
      actions: false,
      columns: {
        
        tpoprodNombre: {
          title: 'Nombre',
          editable: false,
        },
        tpoprodDecrip: {
          title: 'Descripcion',
          editable: false,
        },
        
      },
    };
  ngOnInit(): void {
  }



  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
