import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Section } from '../model/interfaces/Section';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  constructor() {}

  $selectedSection: BehaviorSubject<Section> = new BehaviorSubject(undefined);

  get selectedSection(): Section {
    return this.$selectedSection.getValue();
  }

  set selectedSection(selectedSection: Section) {
    this.$selectedSection.next(selectedSection);
  }
}
