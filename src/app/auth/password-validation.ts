import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
    static validatePassword(control: AbstractControl): {[key: string]: boolean} {
            const password = control.get('userPassword').value;
            const confirmPassword = control.get('userConfirmPassword').value;
            return password !== confirmPassword ? { invalid: true } : null;
    }
}
