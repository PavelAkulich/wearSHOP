import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllProductComponent } from './components/all-product/all-product.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from "./services/auth.service";



import { BusketService } from './services/busket.service';
import { DetailsComponent } from './components/details/details.component';
import { DetailResolver } from './components/details/detail.resolver';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    FooterComponent,
    AllProductComponent,
    HeaderComponent,
    HomeComponent,
    DetailsComponent,
    UserMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [BusketService, DetailResolver, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
