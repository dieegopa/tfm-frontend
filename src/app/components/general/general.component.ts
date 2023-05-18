import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FileService} from "../../data/services/file.service";
import {Category} from "../../shared/models/category.enum";
import {Report} from "notiflix";
import {UserService} from "../../data/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'user', 'subject', 'rating', 'actions'];
  dataSourceArray: any[] = [];
  dataSourceTable = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  categories: any[] = [];
  @ViewChild('input') input: any;

  constructor(
    private fileService: FileService,
    private userService: UserService,
    private router: Router,
  ) {
    this.setAllFiles();
    this.setCategoryData();
  }

  ngOnInit(): void {
  }

  setAllFiles() {
    this.fileService.getFiles()
      .subscribe((files: any[]) => {

        files.map((file: any) => {

          const categoryString = file?.category.toUpperCase();
          const index = Object.keys(Category).indexOf(categoryString);
          const category = Object.values(Category)[index];

          this.dataSourceArray.push({
            id: file.id,
            name: file.name,
            category: category,
            user: file.user,
            subject: file.subject,
            rating: file.rating,
            url: file.url,
          })
        });


        this.dataSourceTable = new MatTableDataSource<any>(this.dataSourceArray);
        this.dataSourceTable.paginator = this.paginator;
      });

  }

  applyFilter(event: Event | null) {
    if (event != null) {
      const filterValue = (event.target as HTMLInputElement).value;

      this.dataSourceTable.filterPredicate = function (data, filter: string): boolean {
        return data.name.toLowerCase().includes(filter) || data.user.toLowerCase().includes(filter);
      }

      this.dataSourceTable.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSourceTable.filter = '';
    }
  }

  onChange($event: any) {
    const filterValue = $event.value;
    this.dataSourceTable.filterPredicate = function (data, filter: string): boolean {
      return data.category.toLowerCase() == filter.toLowerCase();
    }

    this.dataSourceTable.filter = filterValue;
  }

  setCategoryData() {
    this.categories = [];
    Object.keys(Category).map((key) => {
      const index = Object.keys(Category).indexOf(key);
      const category = Object.values(Category)[index];
      this.categories.push({
        name: category,
        value: key,
      });
    })
  }

  getRecord(row: any) {
    if (!this.userService.isLogged()) {
      Report.warning(
        'No has iniciado sesión',
        'Debes iniciar sesión para poder acceder a los archivos',
        'Ok',
      );
    } else {
      this.router.navigate(['/file/details/', row.id.toString()]);
    }
  }

  resetSearch() {
    this.applyFilter(null);
    this.input.nativeElement.value = '';
  }

}
