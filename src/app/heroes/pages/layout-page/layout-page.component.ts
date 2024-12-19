import { Component } from '@angular/core';
import { SideBarItem } from '../../interfaces/sidebarItems.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
public sidebarItems : SideBarItem[] = [
  { label: 'Listado', icon: 'label', url: './list' },
  { label: 'Añadir', icon: 'add', url: './new-hero' },
  { label: 'Buscar', icon: 'search', url: './search' },
];
}
