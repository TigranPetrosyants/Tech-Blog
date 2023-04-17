import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Menu } from 'src/app/providers/menu';
import { MenusService } from 'src/app/services/menus/menus.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit, AfterViewInit {

  menuDeteils: Menu = {
    title: '',
    url: ''
  }

  displayedColumns: string[] = ['id', 'title', 'url', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private menus: MenusService,
    public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.menus.getMenus().subscribe(
      data => {
        this.dataSource.data = data; 
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addMenu() {
    this.menus.addMenu(this.menuDeteils);
  }

  editMenu(menuId: string, menu: Menu) {
    this.menus.updateMenu(menuId, menu);
  }

  deleteMenu(menuId: string) {
    this.menus.deleteMenu(menuId);
  }

  openDialog(menuId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "true") {
        this.deleteMenu(menuId);
      }
    });
  }

  openEditDialog(menuId: string, title: string, url: string): void {
    const dialogRef = this.dialog.open(EditMenuComponent, {
      data: {title, url},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== "false") {
        this.editMenu(menuId, result)
      }
    });
  }
}