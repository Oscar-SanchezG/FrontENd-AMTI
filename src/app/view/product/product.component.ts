import { Component } from '@angular/core';
import { ApiService } from '../../services/api/api.service'
import { Router } from '@angular/router'
import { ListProductsI } from '../../models/listProduct.interface';
import { FormControl } from '@angular/forms';
import { ProductI } from '../../models/product.interface'
import Swal from 'sweetalert2'
//modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],

})
export class ProductComponent {
  public ctrlType: FormControl = new FormControl()
  public ctrlTypeP: FormControl = new FormControl()
  public ctrlAvalible: FormControl = new FormControl()
  public ctrlKey: FormControl = new FormControl()
  public ctrlName: FormControl = new FormControl()
  public ctrlPrice: FormControl = new FormControl()
  addProduct: ProductI[]=[];
  typesP = [
    {value: '1', viewValue: 'Electrónicos'},
    {value: '2', viewValue: 'Muebles'},
    {value: '3', viewValue: 'Deportes'},
    {value: '4', viewValue: 'Hogar'}
  ];
  ELEMENT_DATA: ListProductsI[] = [];
  products: ListProductsI[] = []
  displayedColumns: string[] = ['intid', 'strname', 'strkey', 'intprice', 'Acciones' ];

  constructor(private api:ApiService, private router:Router,private modal: NgbModal,){  }

  ngOnInit(): void {
    this.ctrlTypeP.setValue('')
    this.ctrlAvalible.setValue(false);
    this.checkLocalStorage();
    this.api.getAllProducts().subscribe(data =>{
      this.ELEMENT_DATA =data;
    });

  }

  findBytype1(){
    let type= "1"
    this.api.getAllProductsByType(type).subscribe(data =>{
      this.ELEMENT_DATA =data;

    });
    }

  findBytype2(){
    let type= "2"
    this.api.getAllProductsByType(type).subscribe(data =>{
      this.ELEMENT_DATA =data;

    });
  }

  findBytype3(){
    let type= "3"
    this.api.getAllProductsByType(type).subscribe(data =>{
      this.ELEMENT_DATA =data;

    });
  }

  findBytype4(){
    let type= "4"
    this.api.getAllProductsByType(type).subscribe(data =>{
      this.ELEMENT_DATA =data;

    });
  }

  findBykey(){

    let key =this.ctrlType.value;
    this.api.getAllProductsBykey(key).subscribe(data =>{
      this.ELEMENT_DATA =data;

    });
  }

  goEditProduct(id:string, name:string){
    Swal.fire("Editar el registtro llamado:" + name  + ", con id:" + id);
    this.router.navigate(['addproduct',id]);
  }

  goDeleteProduct(id:string){
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Borraras de forma permanente el producto " + id,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo"
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteProductsById(id).subscribe(data =>{
          this.ELEMENT_DATA =data;
        });
        Swal.fire({
          title: "Borrado",
          text: "El producto ha sido borrado",
          icon: "success"
        });
      }
    });
    this.router.navigate(['product']);
  }

  refresh(){
    this.api.getAllProducts().subscribe(data =>{
      this.ELEMENT_DATA =data;
    });
  }

  checkLocalStorage(){
    if(!localStorage.getItem('token')){
      this.router.navigate(['login'])

    }
  }

  cerrarModal(){
    this.ctrlName.setValue('')
    this.ctrlKey.setValue('')
    this.ctrlPrice.setValue('')
    this.modal.dismissAll();
  }

  AbrirModal(modal:any){
    this.modal.open(modal,{size:'xl'});
  }

  findTypeP1(){
    this.ctrlTypeP.setValue('1')
  }
  findTypeP2(){
    this.ctrlTypeP.setValue('2')
  }
  findTypeP3(){
    this.ctrlTypeP.setValue('3')
  }
  findTypeP4(){
    this.ctrlTypeP.setValue('4')
  }

  selectkAvalible(){
    if (this.ctrlAvalible.value==true){
      this.ctrlAvalible.setValue(false)
    }else {
      this.ctrlAvalible.setValue(true)
    }
  }



  saveProduct(){
    if (this.ctrlTypeP.value!='' && this.ctrlTypeP.value!=null && this.ctrlTypeP.value!=undefined){
      if (this.ctrlKey.value!='' && this.ctrlKey.value!=null && this.ctrlKey.value!=undefined){
        if (this.ctrlPrice.value!='' && this.ctrlPrice.value!=null && this.ctrlPrice.value!=undefined){
          if (this.ctrlName.value!='' && this.ctrlName.value!=null && this.ctrlName.value!=undefined){

              var a = '0';
              var b = this.ctrlTypeP.value;
              var c = this.ctrlKey.value;
              var d = this.ctrlPrice.value;
              var e = this.ctrlName.value;
              var f = this.ctrlAvalible.value;
              var g = 'descripcion de producto'

              this.addProduct[0]={
                "intid": a,
                "inttype": b,
                "strkey": c,
                "intprice": d,
                "strname": e,
                "stravailable": f,
                "strdescription": g
              }
              this.api.addProduct(this.addProduct[0]).subscribe(data =>{
                this.router.navigate(['addproduct',data]);
              });


              Swal.fire("Producto guardado!");

              this.cerrarModal();


          }
          else{
            Swal.fire("Falta el nombre!");
          }
        }else{
          Swal.fire("Falta el precio!");
        }
      }else{
        Swal.fire("Falta la clave");
      }
    }else{
      Swal.fire("Falta el Tipo!");

    }

  }
}
