import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from '../../interfaces/menu-item';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeroMenuComponent } from '../../shared/components/hero-menu/hero-menu.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FlowbiteService } from '../../services/flowbite.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HeroMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

	constructor() {}

	ngOnInit(): void {}

}
