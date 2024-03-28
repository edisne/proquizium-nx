import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  imports: [RouterModule, MenuModule, PanelModule, MenubarModule, ButtonModule],
  selector: 'app-root',
  template: `
    <p-menubar [model]="menuItems">
      <p-button icon="pi pi-bars"></p-button>
    </p-menubar>
    <div class="layout-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Item 1',
      icon: 'pi pi-fw pi-file',
      routerLink: ['link1'],
    },
    {
      label: 'Item 2',
      icon: 'pi pi-fw pi-pencil',
      routerLink: ['link2'],
    },
  ];
}
