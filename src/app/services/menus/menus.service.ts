import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subject, takeUntil } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';

@Injectable({
  providedIn: 'root',
})
export class MenusService implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(private afs: AngularFirestore) {}

  getMenus() {
    return this.afs
      .collection('menus')
      .snapshotChanges()
      .pipe(
        takeUntil(this.unsubscribe$),
        map((menu) => {
          return menu.map((a) => {
            const data = a.payload.doc.data() as Menu;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getConditionalMenus(field?: string, condition?: any, value?: string) {
    return this.afs
      .collection('menus', (ref) => ref.where(field, condition, value))
      .snapshotChanges()
      .pipe(
        takeUntil(this.unsubscribe$),
        map((menu) => {
          return menu.map((a) => {
            const data = a.payload.doc.data() as Menu;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  addMenu(menu: Menu): void {
    this.afs.collection('menus').add(menu);
  }

  deleteMenu(menuId: string): void {
    this.afs.doc(`menus/${menuId}`).delete();
  }

  updateMenu(menuId: string, menu: Menu): void {
    this.afs.doc(`menus/${menuId}`).update(menu);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
