import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-deliver-page',
  templateUrl: './deliver-page.component.html',
  styleUrls: ['./deliver-page.component.scss'],
})
export class DeliverPageComponent implements OnInit {
  public payForm: FormGroup;
  constructor() {
    this.payForm = new FormGroup({
      city: new FormControl('Minsk', Validators.required),
      street: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      comment: new FormControl(''),
      cartNomber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{16}")]),
      mounth: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
}
