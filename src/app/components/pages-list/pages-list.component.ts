import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css'],
})
export class PagesListComponent implements OnInit, OnDestroy {
  pages: any;

  private destroy$ = new Subject<void>();

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.db
      .list('pages')
      .valueChanges()
      .pipe(takeUntil(this.destroy$))
      .subscribe((pages) => (this.pages = pages));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
