import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculadoraService {
  static readonly SOMA: string = 'SOMA';
  static readonly SUBTRACAO: string = 'SUBTRACAO';
  static readonly DIVISAO: string = 'DIVISAO';
  static readonly MULTIPLICACAO: string = 'MULTIPLICACAO';

  constructor() {}

  calcular(num1: number, num2: number, operacao: string): number {
    let resultado: number; //armazena o resultado da operação

    switch (operacao) {
      case CalculadoraService.SOMA:
        resultado = num1 + num2;
        break;
      case CalculadoraService.SUBTRACAO:
        resultado = num1 - num2;
        break;
      case CalculadoraService.DIVISAO:
        resultado = num1 / num2;
        break;
      case CalculadoraService.MULTIPLICACAO:
        resultado = num1 * num2;
        break;
      default:
        resultado = 0;
    }
    
    return resultado;
  }
}
