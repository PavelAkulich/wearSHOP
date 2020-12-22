import { EventEmitter } from '@angular/core';

export class BusketService {
  private busketCnt: number = 0;
  private busketList: string[] = [];
  onClick: EventEmitter<any> = new EventEmitter();

  public addToBusket(key: string) {
    this.busketCnt++;
    this.busketList.push(key);
    this.onClick.emit(this.busketCnt);
    this.onClick.emit(this.busketList);
  }
  public removeFromBusket(id: number) {
    this.busketCnt--;
    this.busketList.splice(id, 1);
    this.onClick.emit(this.busketCnt);
    this.onClick.emit(this.busketList);
  }
}
