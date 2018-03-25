import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Injectable()
export class CommonService {

  constructor() { }

  createDialogRef({email, role, status, message}): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {email, role, status, message};
    return dialogConfig;
  }

}
