import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css']
})
export class PagesListComponent implements OnInit {
  pages$: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    ) {}
  
  ngOnInit(): void {
    this.pages$ = this.db.list('pages').valueChanges()
  }


}
