import { Component, OnInit } from '@angular/core';
import { BusketService } from './../../services/busket.service';

@Component({
  selector: 'app-busket-page',
  templateUrl: './busket-page.component.html',
  styleUrls: ['./busket-page.component.scss']
})
export class BusketPageComponent implements OnInit {

  public defaultImg = '../../assets/noimage.png';

  constructor(public busket: BusketService) { }

  ngOnInit(): void {
  }

  public deleteFromBusket(key: number){
    this.busket.removeFromBusket(key);
  }

  public getPrice(){
    return this.busket.getAveragePrice()
  }
}
