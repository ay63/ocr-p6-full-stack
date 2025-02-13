import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../../shared/components/card/card.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {BaseItem} from "../../../../core/interfaces/baseItem";
import {ArticleApiService} from "../../services/article-api.service";

@Component({
  selector: 'app-list',
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    RouterLink,
    CardComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items$!:Observable<BaseItem[]>;

  constructor(
    private articleApiService: ArticleApiService,
  ) {
  }

  ngOnInit(): void {
    this.items$ =  this.articleApiService.getAllArticles()
  }

}
