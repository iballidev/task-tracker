import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  isShowProfileMenu = false;
  isShowMobileMenu = false;

  toggleProfileMenu() {
    this.isShowProfileMenu = !this.isShowProfileMenu;
  }

  toggleMobileMenu() {
    this.isShowMobileMenu = !this.isShowMobileMenu;
  }
}
