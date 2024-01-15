import { Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface'
import { ResponseI } from '../../models/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListProductsI } from '../../models/listProduct.interface';
import { ListProductsSupplierI } from '../../models/productSupplier.interface';
import { ListSupplierI } from '../../models/listSupplier.interface'
import { ProductI } from '../../models/product.interface'
import { IdsSupplier } from '../../models/SupplierIDs.interface'
import { ListSupplierEditI } from '../../models/listSupplierEdit.interface'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://amti-backend.onrender.com/api/";

  constructor(private http:HttpClient) { }

  loginByEmail(form:LoginI):Observable<ResponseI>{
    let addres = this.url + "user";
    return this.http.post<ResponseI>(addres,form)
  }

  getAllProducts():Observable<ListProductsI[]>{
    let addres = this.url + "product";
    return this.http.get<ListProductsI[]>(addres);
  }

  getAllProductsByType(id:string):Observable<ListProductsI[]>{
    let addres = this.url + "product" + "/type/" + id;

    return this.http.get<ListProductsI[]>(addres);
  }

  getAllProductsBykey(key:string):Observable<ListProductsI[]>{
    let addres = this.url + "product" + "/key/" + key;

    return this.http.get<ListProductsI[]>(addres);
  }

  getAllProductsByid(id:string):Observable<ProductI[]>{
    let addres = this.url + "product" + "/" + id;

    return this.http.get<ProductI[]>(addres);
  }

  deleteProductsById(key:string):Observable<ListProductsI[]>{
    let addres = this.url + "product" + "/delete/" + key;
    return this.http.delete<ListProductsI[]>(addres);
  }

  getProductSuppliers(id:string):Observable<ListProductsSupplierI[]>{
    let addres = this.url + "productSupplier" + "/" + id;
    return this.http.get<ListProductsSupplierI[]>(addres);
  }

  deleteSuppliers(x:IdsSupplier):Observable<ListSupplierI[]>{
    let addres = this.url + "supplier" + "/delete";
    return this.http.post<ListSupplierI[]>(addres,x);
  }

  addSuppliers(x:ListSupplierI):Observable<ListSupplierI[]>{
    let addres = this.url + "supplier" + "/add";
    return this.http.post<ListSupplierI[]>(addres,x);
  }

  editSuppliers(x:ListSupplierEditI):Observable<ListSupplierEditI[]>{
    let addres = this.url + "supplierUpdate" ;
    return this.http.put<ListSupplierEditI[]>(addres,x);
  }

  editProduct(x:ProductI):Observable<ProductI[]>{
    let addres = this.url + "product/update" ;
    return this.http.put<ProductI[]>(addres,x);
  }

  addProduct(x:ProductI):Observable<string>{
    let addres = this.url + "product/add" ;
    return this.http.post<string>(addres,x);
  }

}
