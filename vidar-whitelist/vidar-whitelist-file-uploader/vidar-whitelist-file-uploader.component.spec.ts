import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VidarWhitelistFileUploaderComponent } from './vidar-whitelist-file-uploader.component';

describe('VidarWhitelistFileUploaderComponent', () => {
  let component: VidarWhitelistFileUploaderComponent;
  let fixture: ComponentFixture<VidarWhitelistFileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VidarWhitelistFileUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VidarWhitelistFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
