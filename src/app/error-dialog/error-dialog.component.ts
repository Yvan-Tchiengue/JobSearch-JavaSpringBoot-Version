import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public errorMessage: string) {}

  closeDialog(): void {
    // You can add additional logic if needed before closing the dialog.
    // For example, navigate to another page, perform a certain action, etc.
    // The dialog will close automatically once this method is called.
  }

}
