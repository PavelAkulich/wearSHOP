import { Component, Input, OnInit } from '@angular/core';
import { CompareService } from 'src/app/services/compare.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
 
  public showBusketProduct = false;
  public compareCount: any;

  constructor(public compare:CompareService,) {
    this.compare.onClick.subscribe((cnt: any)=>{
      return this.compareCount = cnt;
    });
  }

  ngOnInit(): void {}

  public deleteFromCompareList(key: number){
    this.compare.removeFromCompareList(key);
  }

}
