import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-suggestion-user',
  templateUrl: './suggestion-user.component.html',
  styleUrls: ['./suggestion-user.component.css'],
})
export class SuggestionUserComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  suggestions: User[] = [];

  constructor(
    private usersService: UsersService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getSuggestions();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getSuggestions(): void {
    this.usersService.getSuggestionFollow().subscribe(
      (response) => {
        this.suggestions = response.data;
      },
      (error: any) => {
        console.error('Failed to fetch suggestion list:', error);
      }
    );
  }
}
