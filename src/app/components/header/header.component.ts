import { Component, Input, OnInit } from '@angular/core';
import { BusketService } from './../../services/busket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public showBusketProduct = false;
  public busketCount: any;

  constructor(private share:BusketService) {
    this.share.onClick.subscribe((cnt: any)=>{
      return this.busketCount = cnt;
    });
  }

  ngOnInit(): void {}
  
  public showBuscket() {
    this.showBusketProduct = !this.showBusketProduct;
  }

  public deleteFromBusket(key: number){
    this.share.removeFromBusket(key);
  }
}
