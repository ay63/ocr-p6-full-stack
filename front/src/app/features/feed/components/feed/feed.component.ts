import {Component,  OnInit} from '@angular/core';
import {FeedApiService} from "../../services/feed-api.service";
import {Observable} from "rxjs";
import {BaseItem} from "../../../../core/interfaces/baseItem";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  standalone: false
})
export class FeedComponent implements OnInit {
  items$!:Observable<BaseItem[]>;

  constructor(
    private feedApi: FeedApiService,
  ) {
  }

  ngOnInit(): void {
    this.items$ =  this.feedApi.get()
  }

}
