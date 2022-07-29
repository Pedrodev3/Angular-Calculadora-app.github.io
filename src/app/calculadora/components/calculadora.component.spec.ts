import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CalculadoraComponent } from './calculadora.component';
import { CalculadoraService } from '../services';

describe('CalculadoraComponent', () => {
  let component: CalculadoraComponent;
  let fixture: ComponentFixture<CalculadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculadoraComponent],
      providers: [CalculadoraService],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve garantir que 3 + 2 = 5', () => {
    let btn3 = fixture.debugElement.query(By.css('#btn3'));
    let btnSoma = fixture.debugElement.query(By.css('#btnSoma'));
    let btn2 = fixture.debugElement.query(By.css('#btn2'));
    let calcular = fixture.debugElement.query(By.css('#btnCalcular'));
    let display = fixture.debugElement.query(By.css('#display'));

    btn3.triggerEventHandler('click', null); // Método para chamar e fazer com que um evento seja executado
    fixture.detectChanges(); /* Como o teste é manual, você precisa executar esse método para mostrar que
                               a operação logo acima foi detectada*/

    btnSoma.triggerEventHandler('click', null);
    fixture.detectChanges();

    btn2.triggerEventHandler('click', null);
    fixture.detectChanges();

    calcular.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(display.nativeElement.value).toEqual('5'); /* Verificar se o valor que está no campo de texto do display
    é realmente igual a 5 */
    
  });
});
