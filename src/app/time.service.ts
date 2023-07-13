import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  constructor() {}

  getTimeAgo(createdDate: string | null): string {
    if (!createdDate) {
      return '';
    }

    const utcDate = new Date(createdDate + 'Z'); // Append 'Z' to indicate UTC time
    const localDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000); // Adjust for GMT+7

    const currentDate = new Date();
    const diff = Math.abs(currentDate.getTime() - localDate.getTime());
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return hours + 'h ago';
    } else {
      return minutes + 'm ago';
    }
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    return date.toLocaleDateString(undefined, options);
  }

  convertToTimezone(date: Date, timezoneOffset: number): Date {
    const offsetInMillis = timezoneOffset * 60 * 60 * 1000;
    const utcTimestamp = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
    const timezoneTimestamp = utcTimestamp + offsetInMillis;

    return new Date(timezoneTimestamp);
  }
}
