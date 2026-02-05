import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

    // Checks if text contains Arabic characters: /[\u0600-\u06FF]/
    static isArabic(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) return null;
            const arregex = /[\u0600-\u06FF]/;
            const valid = arregex.test(String(control.value).toLowerCase());
            return valid ? null : { notArabic: true };
        };
    }

    // Checks if text is purely French/Latin: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    static isFrench(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) return null;
            const arregex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
            const valid = arregex.test(String(control.value).toLowerCase());
            return valid ? null : { notFrench: true };
        };
    }

    // Checks for strict 8-digit CIN
    static isValidCin(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) return null;
            const arregex = /^[0-9]{8}$/;
            const valid = arregex.test(String(control.value));
            return valid ? null : { invalidCin: true };
        };
    }

    // Checks for numeric input
    static isNumeric(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) return null;
            const arregex = /^[0-9]{1,}$/;
            const valid = arregex.test(String(control.value));
            return valid ? null : { notNumeric: true };
        };
    }
}
