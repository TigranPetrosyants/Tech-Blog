import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css'],
})
export class EditMenuComponent {
  editForm: FormGroup = this.data.postForm;

  EDIT_VALIDATION_RULES = {
    title: ['', [Validators.required, Validators.minLength(6)]],
    url: ['', [Validators.required, Validators.minLength(6)]],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group(this.EDIT_VALIDATION_RULES);
  }
}
