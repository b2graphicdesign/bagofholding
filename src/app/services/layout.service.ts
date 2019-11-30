import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';

export interface IComponent {
  id: string;
  componentRef: string;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public options: GridsterConfig = {
    draggable: {
      enabled: true
    },
    pushItems: false,
    swap: false,
    swapWhileDragging: false,
    disablePushOnDrag: true,
    disablePushOnResize: true,
    resizable: {
      enabled: true
    },
    gridType: 'fixed',
    fixedColWidth: 50,
    fixedRowHeight: 50,
    maxCols: 5,
    maxRows: 12,
    enableEmptyCellDrop: true,
    enableEmptyCellDrag: true,
    enableOccupiedCellDrop: true,
    enableEmptyCellClick: true,
    defaultItemCols: 1,
    defaultItemRows: 1,
    displayGrid: 'always'
  };
  public layout: GridsterItem[] = [];

  public components: IComponent[] = [];

  dropId: string;

  constructor() { }

  addItem(): void {
    this.layout.push({
      cols: 5,
      id: UUID.UUID(),
      rows: 5,
      x: 0,
      y: 0
    });
  }
  deleteItem(id: string): void {
    const item = this.layout.find(d => d.id === id);
    this.layout.splice(this.layout.indexOf(item), 1);
    const comp = this.components.find(c => c.id === id);
    this.components.splice(this.components.indexOf(comp), 1);
  }
  setDropId(dropId: string): void {
    this.dropId = dropId;
  }
  dropItem(dragId: string): void {
    const { components } = this;
    const comp: IComponent = components.find(c => c.id === this.dropId);

    const updateIdx: number = comp ? components.indexOf(comp) : components.length;
    const componentItem: IComponent = {
      id: this.dropId,
      componentRef: dragId
    };
    this.components = Object.assign([], components, { [updateIdx]: componentItem });
  }
  getComponentRef(id: string): string {
    const comp = this.components.find(c => c.id === id);
    return comp ? comp.componentRef : null;
  }
}
