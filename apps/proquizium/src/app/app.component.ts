import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MenuModule,
    PanelModule,
    MenubarModule,
    ButtonModule,
    CommonModule,
  ],
  selector: 'app-root',
  template: `
    <p-menubar [model]="menuItems" />
    <div class="layout-content">
      <router-outlet />
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Proquizium',
      icon: 'pi pi-question',
      routerLink: ['/'],
    },
    {
      label: 'Create',
      icon: 'pi pi-save',
      routerLink: ['create'],
    },
  ];
}
