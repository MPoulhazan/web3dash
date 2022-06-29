import { BehaviorSubject } from 'rxjs';

const subjectChainId = new BehaviorSubject<string>('1');
const subjectAddressId = new BehaviorSubject<string>(null);

export const dataService = {
  setChainData: (val: string) => subjectChainId.next(val),
  clearChainData: () => subjectChainId.next(null),
  getChainData: () => subjectChainId.asObservable(),
  setAddressData: (val: string) => subjectAddressId.next(val),
  clearAddressData: () => subjectAddressId.next(null),
  getAddressData: () => subjectAddressId.asObservable()
};
