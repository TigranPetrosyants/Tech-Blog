import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Menu } from 'src/app/providers/menu';
import { MenusService } from 'src/app/services/menus/menus.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  MENU_VALIDATION_RULES = {
    title: ['', [Validators.required, Validators.minLength(6)]],
    url: ['', [Validators.required, Validators.minLength(6)]]
  };

  postForm: FormGroup;

  displayedColumns: string[] = ['id', 'title', 'url', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private menusService: MenusService,
    public dialog: MatDialog,
    private fb: FormBuilder
    ) {
      this.postForm = this.fb.group(this.MENU_VALIDATION_RULES)
  }

  ngOnInit(): void {
    this.menusService.getMenus()
    .subscribe(
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
    if (this.postForm.valid) {
      this.menusService.addMenu(this.postForm.value);
    }
  }

  editMenu(menuId: string, menu: Menu) {
    this.menusService.updateMenu(menuId, menu);
  }

  deleteMenu(menuId: string) {
    this.menusService.deleteMenu(menuId);
  }

  openDialog(menuId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result === "true") {
        this.deleteMenu(menuId);
      }
    });
  }

  openEditDialog(menuId: string, title: string, url: string): void {
    const dialogRef = this.dialog.open(EditMenuComponent, {
      data: {title, url},
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result !== "false" && result) {
        this.editMenu(menuId, result.value)
      }
    });
  }

}
