import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(public _authSvc: AuthService){}

  toggleProfileMenu() {
    this.isShowProfileMenu = !this.isShowProfileMenu;
  }

  toggleMobileMenu() {
    this.isShowMobileMenu = !this.isShowMobileMenu;
  }

  
  logoutUser() {
    this._authSvc.logout_user();
  }
}
