import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimulacrumPage } from './simulacrum.page';

describe('SimulacrumPage', () => {
  let component: SimulacrumPage;
  let fixture: ComponentFixture<SimulacrumPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacrumPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimulacrumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
