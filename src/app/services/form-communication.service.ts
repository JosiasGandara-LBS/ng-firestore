import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  	providedIn: 'root',
})
export class FormCommunicationService {
	private submitFormSubject = new Subject<void>();

	submitForm$ = this.submitFormSubject.asObservable();

	triggerSubmitForm() {
		this.submitFormSubject.next();
	}
}