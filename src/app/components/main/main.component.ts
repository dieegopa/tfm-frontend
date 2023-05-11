import {Component, OnInit, ViewChild} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {UserService} from "../../data/services/user.service";
import {University} from "../../shared/models/university.model";
import {Degree} from "../../shared/models/degree.model";
import {Subject} from "../../shared/models/subject.model";
import {User} from "../../shared/models/user.model";
import {File} from "../../shared/models/file.model";
import {Loading} from "notiflix/build/notiflix-loading-aio";
import {Sections} from "../../shared/models/sections.interface";
import {UserHomeFlatNode} from "../../shared/models/userhomeflatnode.interface";
import {TREE_DATA} from "../../shared/data/tree.data";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FileService} from "../../data/services/file.service";
import {Category} from "../../shared/models/category.enum";
import {MatDialog} from "@angular/material/dialog";
import {MatSelect} from "@angular/material/select";
import {Report} from "notiflix";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  universities: University[] | null | undefined;
  degrees: Degree[] | null | undefined;
  subjects: Subject[] | null | undefined;
  user: User | null = null;
  selectedFiles: File[] = [];
  displayedColumns: string[] = ['name', 'category', 'user', 'extra', 'actions'];
  dataSourceArray: any[] = [];
  dataSourceTable = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  insideOwnFiles: boolean = false;
  categories: any[] = [];
  @ViewChild('matSelectRef') matSelectRef: MatSelect | undefined;
  previousNodeRefName: string = '';

  private _transformer = (node: Sections, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.id,
      type: node.type,
    };
  };

  treeControl = new FlatTreeControl<UserHomeFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private userService: UserService,
    private fileService: FileService,
    private router: Router,
  ) {
  }

  hasChild = (_: number, node: UserHomeFlatNode) => node.expandable;

  ngOnInit(): void {
    Loading.pulse({
      svgColor: '#0D9488',
    });
    setTimeout(() => {
      try {
        this.setThreeData();
        this.setCategoryData();
      } catch (e) {
      }

      Loading.remove();
    }, 1000);
  }

  setThreeData() {

    this.userService.getUserData()
      .subscribe((user) => {
        this.user = user;
        this.universities = user?.universities;
        this.degrees = user?.degrees;
        this.subjects = user?.subjects;

        this.getMainData();

        TREE_DATA.map((item) => {
          if (item.name === 'Favoritos') {
            item.children?.map((subItem) => {

              switch (subItem.name) {
                case 'Universidades':
                  let universityNodes: Sections[] | { name: string | undefined; children: never[]; }[] | null | undefined = [];
                  this.universities?.map((university) => {
                    // @ts-ignore
                    universityNodes.push({name: university.name, children: [], id: university.id, type: 'university'})
                  })
                  // @ts-ignore
                  subItem.children = universityNodes;
                  break;
                case 'Titulaciones':
                  let degreeNodes: Sections[] | { name: string | undefined; children: never[]; }[] | null | undefined = [];
                  this.degrees?.map((degree) => {
                    // @ts-ignore
                    degreeNodes.push({name: degree.name, children: [], id: degree.id, type: 'degree'})
                  })
                  // @ts-ignore
                  subItem.children = degreeNodes;
                  break;
                case 'Asignaturas':
                  let subjectNodes: Sections[] | { name: string | undefined; children: never[]; }[] | null | undefined = [];
                  this.subjects?.map((subject) => {
                    // @ts-ignore
                    subjectNodes.push({name: subject.name, children: [], id: subject.id, type: 'subject'})
                  });
                  // @ts-ignore
                  subItem.children = subjectNodes;
                  break;
              }

            })
          }
        });


        this.dataSource.data = TREE_DATA;

        document.getElementById('Mis Aportaciones')?.classList.add('active-link');

      })
  }

  setPanel(node: UserHomeFlatNode) {
    const elementRef = document.getElementById(node.name);
    if (this.previousNodeRefName == '') {
      this.previousNodeRefName = node.name;
    }
    if (elementRef?.classList.contains('active-link') && elementRef?.id != this.previousNodeRefName) {
      elementRef?.classList.remove('active-link');
    } else {
      this.previousNodeRefName = node.name;
      document.getElementsByName('buttonRefName').forEach((item) => {
        item.classList.remove('active-link');
      })
      elementRef?.classList.add('active-link');
    }
    this.matSelectRef?.options.forEach((item) => {
      item.deselect();
    });
    this.selectedFiles = [];
    this.insideOwnFiles = false;
    this.displayedColumns = ['name', 'category', 'user', 'extra', 'actions'];
    switch (node.type) {
      case 'contributions':
        this.getMainData();
        break;
      case null:
        break;
      default:
        this.fileService
          .getDifferentFiles(node.type, node.id)
          .subscribe((files) => {
            this.selectedFiles = files;
            this.setSelectedFilesTableData(this.selectedFiles);
          })
        break;
    }

  }

  getMainData() {
    this.selectedFiles = [];
    this.insideOwnFiles = true;
    this.displayedColumns = ['name', 'category', 'extra', 'actions'];
    this.fileService.getUserFiles(this.user?.sub)
      .subscribe((files) => {
        this.selectedFiles = files;
        this.setSelectedFilesTableData(this.selectedFiles);
      });
  }

  setSelectedFilesTableData(files: File[]) {
    this.dataSourceArray = [];
    files.map((file) => {
      const categoryString = file?.category.toUpperCase();
      const index = Object.keys(Category).indexOf(categoryString);
      const category = Object.values(Category)[index];
      this.dataSourceArray.push({
        id: file?.id,
        name: file?.name,
        category: category,
        type: file?.type,
        user: file.user,
        extra: file?.extra,
        url: file?.url,
      });
    });

    this.dataSourceTable = new MatTableDataSource<any>(this.dataSourceArray);
    this.dataSourceTable.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSourceTable.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.user.toLowerCase().includes(filter);
    }

    this.dataSourceTable.filter = filterValue.trim().toLowerCase();
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

}
