import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReactiveFormService {
  public getFieldsErrors(form: FormGroup<any>, fieldName: string) {
    return Object.keys({ ...form.controls[fieldName].errors })
  }

  public displayFieldsErrors(form: FormGroup<any>, fieldName: string) {
    return form.controls[fieldName].invalid &&
      (form.controls[fieldName].dirty ||
        form.controls[fieldName].touched)
  }
}
