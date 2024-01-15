import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { ListProductsSupplierI } from '../../models/productSupplier.interface';
import { IdsSupplier } from '../../models/SupplierIDs.interface'
import { ListSupplierI} from '../../models/listSupplier.interface'
import { ListSupplierEditI } from '../../models/listSupplierEdit.interface'
import { ProductI } from '../../models/product.interface'

import Swal from 'sweetalert2'
//modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {

  public Ids: IdsSupplier[]=[];
  constructor(private activerouter:ActivatedRoute,
              private router:Router,
              private api:ApiService,
              private modal: NgbModal,) {

              }

  addProduct: ProductI[]=[];
  addSupplier: ListSupplierI[] = [];
  addSupplierEdit: ListSupplierEditI[] = [];

  ELEMENT_DATA: ListProductsSupplierI[] = [];
  displayedColumns: string[] = ['strname', 'strkeysupp', 'dlcost', 'Acciones' ];

  checkAvalible =false;
  checkType1=false;
  checkType2=false;
  checkType3=false;
  checkType4=false;
  checkTypes1=false;
  checkTypes2=false;
  checkTypes3=false;
  checkTypes4=false;
  checkTypes5=false;
  checkTypesc1=false;
  checkTypesc2=false;
  checkTypesc3=false;
  checkTypesc4=false;
  checkTypesc5=false;
  idsg:any;

  public idp:any='';
  public ids:string='';

  public ctrlKey: FormControl = new FormControl()
  public ctrlName: FormControl = new FormControl()
  public ctrlPrice: FormControl = new FormControl()
  public ctrlType: FormControl = new FormControl()
  public ctrlSupplier: FormControl = new FormControl()
  public ctrlSkey: FormControl = new FormControl()
  public ctrlScost: FormControl = new FormControl()
  public ctrlAvalible: FormControl = new FormControl()



  ngOnInit(): void {
    let prodcutid:any = this.activerouter.snapshot.paramMap.get('id');
    this.idp=prodcutid;
    this.checkLocalStorage();
    this.api.getProductSuppliers(prodcutid).subscribe(data =>{
      this.ELEMENT_DATA =data;
      console.log(this.ELEMENT_DATA)
    })
    //Llenado encabezado
    this.api.getAllProductsByid(prodcutid).subscribe(data =>{
      if(data.length==1 ){
        console.log(data)
        var resultado = data[0];
        this.ctrlKey.setValue(resultado.strkey)
        this.ctrlName.setValue(resultado.strname)
        this.ctrlPrice.setValue(resultado.intprice)
        if (resultado.stravailable){
          this.checkAvalible =true;
          this.ctrlAvalible.setValue(true)
        }
        if(resultado.inttype=="1"){
          this.checkType1=true;
          this.ctrlType.setValue("1")
        }
        if(resultado.inttype=="2"){
          this.checkType2=true;
          this.ctrlType.setValue("2")
        }
        if(resultado.inttype=="3"){
          this.checkType3=true;
          this.ctrlType.setValue("3")
        }
        if(resultado.inttype=="4"){
          this.checkType4=true;
          this.ctrlType.setValue("4")
        }
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    });

  }

  refreshSupplier(){
    let prodcutid:any = this.activerouter.snapshot.paramMap.get('id');
    this.api.getProductSuppliers(prodcutid).subscribe(data =>{
      this.ELEMENT_DATA =data;
      console.log(this.ELEMENT_DATA)
    });
  }

  checkLocalStorage(){
    if(!localStorage.getItem('token')){
      this.router.navigate(['login'])
    }
  }

  AbrirModal(modal:any){
    let j=this.ELEMENT_DATA.length

    for (var i =0 ; i<j; i++ ){

      if (this.ELEMENT_DATA[i].strname=="InnovateTech Solutions"){

        this.checkTypes1=true
      }
      if (this.ELEMENT_DATA[i].strname=="BioHarvest Innovations"){

        this.checkTypes2=true
      }
      if (this.ELEMENT_DATA[i].strname=="Quantum Logistics"){
        this.checkTypes3=true
      }
      if (this.ELEMENT_DATA[i].strname=="ProVision Enterprises"){
        this.checkTypes4=true
      }
      if (this.ELEMENT_DATA[i].strname=="EcoPower Solutions"){
        this.checkTypes5=true
      }

    }
    this.ctrlScost.setValue('')
    this.ctrlSkey.setValue('')
    this.modal.open(modal,{size:'sm'});
  }
  cerrarModal(){
    this.checkTypes1=false;
    this.checkTypes2=false;
    this.checkTypes3=false;
    this.checkTypes4=false;
    this.checkTypes5=false;
    this.checkTypesc1=false;
    this.checkTypesc2=false;
    this.checkTypesc3=false;
    this.checkTypesc4=false;
    this.checkTypesc5=false;
    /*
    this.ctrlSkey.setValue('');
    this.ctrlScost.setValue('');*/
    this.modal.dismissAll();


  }
  findBytype1(){
      this.ctrlSupplier.setValue(1)
    }

  findBytype2(){
    this.ctrlSupplier.setValue(2)
  }

  findBytype3(){
    this.ctrlSupplier.setValue(3)
  }

  findBytype4(){
    this.ctrlSupplier.setValue(4)
  }
  findBytype5(){
    this.ctrlSupplier.setValue(5)
  }

  deleteSupplier(id:string, name:string){
    this.ids=id
    Swal.fire({
      title: "¿Seguro?",
      text: "Borraras el prodeedor" + name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        var p =this.idp;
        var s = this.ids.toString();
        this.Ids[0]={
          "intidp": p,
          "intids":s
        }
        console.log(this.Ids[0])
        this.api.deleteSuppliers(this.Ids[0]).subscribe(data =>{
        })

        Swal.fire({
          title: "Borrado",
          text: "Se ha borrado " + name,
          icon: "success"
        });
        this.refreshSupplier()
      }
    });
    this.checkTypes1=false;
    this.checkTypes2=false;
    this.checkTypes3=false;
    this.checkTypes4=false;
    this.checkTypes5=false;

  }

  guardarSupplier(){
    if (this.ctrlSupplier.value!='' && this.ctrlSupplier.value!=null && this.ctrlSupplier.value!=undefined){
      if (this.ctrlScost.value!='' && this.ctrlScost.value!=null && this.ctrlScost.value!=undefined){
        if (this.ctrlSkey.value!='' && this.ctrlSkey.value!=null && this.ctrlSkey.value!=undefined){
          Swal.fire({
            title: "¿Estas seguro de guardar?",
            showCancelButton: true,
            confirmButtonText: "Guardar"

          }).then((result) => {

            if (result.isConfirmed){

              var a =this.idp;
              var b = this.ctrlSupplier.value;
              var c = this.ctrlScost.value;
              var d = this.ctrlSkey.value;
              this.addSupplier[0]={
                "intidp": a,
                "intids": b,
                "dlcost": c,
                "strkeys": d,
              }

              this.api.addSuppliers(this.addSupplier[0]).subscribe(data =>{
                this.refreshSupplier();
              });

              Swal.fire({
                title: "Guardado",
                text: "Se ha Guardo ",
                icon: "success"
              });


            }

          });

          this.cerrarModal();
        }else{
          Swal.fire("Falta la clave");
        }

      }else{
        Swal.fire("Falta el costo!");
      }

    }else{
      Swal.fire("Falta el proveedor");
    }



  }

  editSupplier(modal:any,idp:string,ids:string,key:string,cost:string){

    let j=this.ELEMENT_DATA.length
    for (var i =0 ; i<j; i++ ){

      if (this.ELEMENT_DATA[i].strname=="InnovateTech Solutions"){

        this.checkTypes1=true
      }
      if (this.ELEMENT_DATA[i].strname=="BioHarvest Innovations"){

        this.checkTypes2=true
      }
      if (this.ELEMENT_DATA[i].strname=="Quantum Logistics"){
        this.checkTypes3=true
      }
      if (this.ELEMENT_DATA[i].strname=="ProVision Enterprises"){
        this.checkTypes4=true
      }
      if (this.ELEMENT_DATA[i].strname=="EcoPower Solutions"){
        this.checkTypes5=true
      }

    }
    this.ctrlSupplier.setValue(ids)
    this.ctrlScost.setValue(cost);
    this.ctrlSkey.setValue(key);
    this.modal.open(modal,{size:'sm'});
    this.idsg= ids
    if (ids=="1"){
      this.checkTypesc1=true
    }
    if (ids=="2"){
      this.checkTypesc2=true
    }
    if (ids=="3"){
      this.checkTypesc3=true
    }
    if (ids=="4"){
      this.checkTypesc4=true
    }
    if (ids=="5"){
      this.checkTypesc5=true
    }
  }
  editSave(){
    if (this.ctrlSupplier.value!='' && this.ctrlSupplier.value!=null && this.ctrlSupplier.value!=undefined){
      if (this.ctrlScost.value!='' && this.ctrlScost.value!=null && this.ctrlScost.value!=undefined){
        if (this.ctrlSkey.value!='' && this.ctrlSkey.value!=null && this.ctrlSkey.value!=undefined){
          Swal.fire({
          title: "¿Estas seguro de guardar?",
          showCancelButton: true,
          confirmButtonText: "Guardar"

          }).then((result) => {

          if (result.isConfirmed){

          var a =this.idp;
          var b = this.ctrlSupplier.value;
          var c = this.ctrlScost.value;
          var d = this.ctrlSkey.value;
          var e = this.idsg
          this.addSupplierEdit[0]={
            "intidp": a,
            "intids": e,
            "dlcost": c,
            "strkeys": d,
            "intidsn": b
          }

          this.api.editSuppliers(this.addSupplierEdit[0]).subscribe(data =>{
            this.refreshSupplier();
          })


          Swal.fire({
            title: "Guardado",
            text: "Se ha Guardo ",
            icon: "success"
          });

            }

          });

          this.cerrarModal();
        }else{
          Swal.fire("Falta la clave");}
      }else{
        Swal.fire("falta el costo");}
    }else{
      Swal.fire("Falta el proveedor");}


  }
  findTypeP1(){
    this.ctrlType.setValue('1')
  }
  findTypeP2(){
    this.ctrlType.setValue('2')
  }
  findTypeP3(){
    this.ctrlType.setValue('3')
  }
  findTypeP4(){
    this.ctrlType.setValue('4')
  }
  selectkAvalible(){
    if (this.ctrlAvalible.value==true){
      this.ctrlAvalible.setValue(false)
    }else {
      this.ctrlAvalible.setValue(true)
    }
  }

  saveAll(){
    var a =this.idp;
    var b = this.ctrlType.value;
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
    console.log(this,this.addProduct[0])
    this.api.editProduct(this.addProduct[0]).subscribe(data =>{

    })


    Swal.fire("Producto guardado!");
    this.router.navigate(['product'])
  }
}
