import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() totalItems : number;
  @Input() pageSize : number; 
  
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  totalPages: number;
  currentPage = 1;
  isVisible = false;
  previousEnabled = false;
  nextEnabled = true;
  pages: number[] = [];
  constructor() {
  	
  }

  ngOnInit() {
  	this.update();
  }

  	previousNext(direction: number, event?: MouseEvent) {
	    let page: number = this.currentPage;

	    if (direction === -1) {
	        if (page > 1) { page--; }
	    } else {
	        if (page < this.totalPages) { page++; }
	    }
	    this.changePage(page, event);
  	}

  	changePage(page: number, event?: MouseEvent) {

	    if (event) {
	      event.preventDefault();
	    }

	    if (this.currentPage === page) { return; }
	    this.currentPage = page;
	    this.previousEnabled = this.currentPage > 1;
	    this.nextEnabled = this.currentPage < this.totalPages;
	    this.pageChanged.emit(page);
  	}

  update() {

    if(this.totalItems && this.pageSize){

      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      
      if (this.totalItems >= this.pageSize) {
      	this.isVisible = true;

        for (let i = 1; i < this.totalPages + 1; i++) {
          this.pages.push(i);
        }
      }
      

      return;
    }

    this.isVisible = false;

  }


}
