import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Product} from './product';

@Injectable()
export class ProductService {
    private url = 'app/data/';

    constructor(private http: Http) {}

    getProductsExt(pageNum?:number) : Observable<Product[]>{
        let _num = (pageNum) ? pageNum : 1;
        return this.http.get(this.url+'mock'+_num+'.json')
                        .map(this.parseProducts)
                        .catch(this.handleError);
    }

    private parseProducts (res: Response) {
        let resData = res.json();
        resData = (<Product[]>resData.products) ? <Product[]>resData.products : [];
        return resData;
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        (error.status ? `${error.status} - ${error.statusText}` : 'Server error');
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}