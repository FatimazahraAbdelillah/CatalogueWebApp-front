import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products;
  mode = 'list';
  categories;
  currentProduct;
  cat: any;

  constructor(private catalogueService: CatalogueService, private router: Router) {

  }

  ngOnInit() {
    this.onGetAllProducts();
    this.onGetAllCategories();
  }

  onGetAllProducts() {
    this.catalogueService.getAllProducts()
      .subscribe(data => {
        console.log(this.products);
        this.products = data;
      }, error => {
        console.log(error);
      });
  }

  onGetCategorie(cat) {
    this.catalogueService.getRessource(cat)
      .subscribe(
        value => {
          console.log(value);
        },error => {
          console.log(error);
        }
      );
    /*this.catalogueService.getRessource(cat).subscribe(data =>{
      return data;
    },error => {
      console.log(error);
    });*/
}

  onGetAllCategories() {
    this.catalogueService.getAllCategories()
      .subscribe(data => {
        this.categories = data;
      }, error => {
        console.log(error);
      });
  }

  onDeleteProd(cat) {
    const c = confirm('Êtes vous sûr ?');
    if (!c) { return; }
    this.catalogueService.deleteRessource(cat._links.self.href)
      .subscribe(data => {
        this.mode = 'list';
        this.onGetAllProducts();
      }, error => {
        console.log(error);
      });
  }

  onNewProd() {
    this.mode = 'new-prod';
    this.onGetAllCategories();
  }

  onSaveProd(data) {
    const url = this.catalogueService.host + '/products';
    this.catalogueService.postRessource(url, data)
      .subscribe(data => {
        this.mode = 'list';
        this.onGetAllProducts();
      }, error => {
        console.log(error);
      });
  }

  onEditProd(p: any) {
  }
}
