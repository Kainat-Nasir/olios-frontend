import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { SubPropertyService } from 'src/app/services/sub-property.service';


@Component({
  selector: 'app-lpr-sub-property-add',
  templateUrl: './lpr-sub-property-add.component.html',
  styleUrls: ['./lpr-sub-property-add.component.scss']
})
export class LprSubPropertyAddComponent implements OnInit {

  public form: any;
  public displayedColumns: string[] = [
    'name',
    'propertyName',
    'parkingCapacity',
    'parkingType',
    'actions'
  ];

  public dataSource = new MatTableDataSource();
  public ActionBtn = "Add";
  public selectedSubProperty: any = {};
  public parkingTypeList = ['ALLOTTED','GUEST'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<LprSubPropertyAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subPropertyService: SubPropertyService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    //console.log("Parking Type : "+this.parkingTypeList);
    this.initlizeSubPropertyForm();
    this.getAllSubPropertyByPropertyId();
  }

  initlizeSubPropertyForm() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      parkingCapacity: new FormControl(0, Validators.required),
      parkingType: new FormControl(this.parkingTypeList[0], Validators.required)
    });
  }

  getAllSubPropertyByPropertyId() {
    this.subPropertyService.findSubPropertyByPropertyId(this.data.id)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          let subPropertyList = response.data;
          this.dataSource = new MatTableDataSource<unknown>(subPropertyList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          //console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
  }

  deleteSubProperty(subProperty: any) {
    this.subPropertyService.deleteSubPropertyById(subProperty.id)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Deleted Successfully!");
          this.getAllSubPropertyByPropertyId();
        } else {
          this.toastrService.error(response.value,"Failed To Delete Data!")
        }
      });
  }

  submit(){
    if(this.ActionBtn=="Add"){
      this.addSubPropertyData();
    }else{
      this.updateSubPropertyData();
    }
  }

  addSubPropertyData() {
    //console.log("add Sub Property data ",this.form.getRawValue() );
    let data = this.form.getRawValue()
    data.propertyId = this.data.id;
    this.subPropertyService.addSubProperty(data)
      .pipe(first())
      .subscribe(response => {
        if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Data Add Successfully!");
          this.ActionBtn="Add";
          this.form.reset();
          this.getAllSubPropertyByPropertyId();
        } else {
          this.toastrService.error(response.value,"Failed To Add Data!")
        }
      });
  }

  updateSubPropertyData() {
    //console.log("update Sub Property data ",this.form.getRawValue() );
    let updatedData = this.form.getRawValue()
    updatedData.id = this.selectedSubProperty.id;
    updatedData.propertyId = this.data.id;
    this.subPropertyService.updateSubProperty(updatedData)
      .pipe(first())
      .subscribe(response => {
        if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Data Updated Successfully!");
          this.ActionBtn="Add";
          this.form.reset();
          this.getAllSubPropertyByPropertyId();
        } else {
          this.toastrService.error(response.value,"Failed To Update Data!")
        }
      });
  }

  update(element){
    this.ActionBtn = "Edit";
    this.selectedSubProperty = element;

    this.form.get('name').setValue(element.name);
    this.form.get('parkingCapacity').setValue(element.parkingCapacity);
    this.form.get('parkingType').setValue(element.parkingType);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
