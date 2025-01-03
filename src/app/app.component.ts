import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuItem } from './interfaces/menu-item';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

	constructor() {}

	ngOnInit() : void {
		initFlowbite();
	}
}

