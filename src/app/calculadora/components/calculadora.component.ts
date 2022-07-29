import { Component, OnInit } from '@angular/core';

import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
})
export class CalculadoraComponent implements OnInit {

  private num1: string; // primeiro número
  private num2: string; // segundo número
  private operacao: string; // operação é feita através de uma concatenação de Strings
  private resultado: number; // resultado sai com tipo Number

  constructor(private calculadoraService: CalculadoraService) { }

  /* Como ele é chamado logo após a iniciação da Calculadora, então defini um método(limpar())
  para iniciar junto com o ngOnInit */
  ngOnInit() {
    this.limpar();
  }

  //Método limpar() -> Contém os valores padrões logo quando a aplicação é iniciada
  limpar(): void {
    this.num1 = '0';
    this.num2 = null; //É nulo pelo fato que ainda não foi iniciado, mesma coisa para os outros
    this.resultado = null;
    this.operacao = null;
  }

  /* ADICIONAR NÚMERO
  Momento que você clica em um número e precisa associar ele ao "num1" ou "num2" */
  /* E para poder concatenar os dois valores, é preciso criar um método "concatenarNum"
  que está logo abaixo */
  adicionarNum(num: string): void {
    if (this.operacao === null) {
      this.num1 = this.concatenarNum(this.num1, num);
    } else {
      this.num2 = this.concatenarNum(this.num2, num);
    }
  }

  // CONCATENAR NÚMERO
  concatenarNum(numAtual: string, numConcat: string): string {
    // 0 ou null vai reiniciar o valor, por isso as aspas
    if (numAtual === '0' || numAtual === null) {
      numAtual = '';
    }
    /* Se o número que vai ser concatenado (o que está como 2º parâmetro)
    começar com um '.' e o numAtual for vazio, basicamente não tendo sido colocado nada,
    então o método deve colocar automaticamente um '0.' antes/no lugar do '.' */
    if (numConcat === '.' && numAtual === '') {
      return '0.';
    }
    /* Para não repetir o '.*/
    if (numConcat === '.' && numAtual.indexOf('.') > -1) {
      return numAtual;
    }

    return numAtual + numConcat;
  }

  /**
   * DEFINIR NÚMERO
   *Método específico para definir qual operação que utilizará dos "num1" e "num2"
   *para realizar a conta.
   *
   * @param operacao
   * @return void
   */
  definirOperacao(operacao: string): void {
    // Como o 2° número (num2) não foi definido, então não retorna nada
    if (this.operacao === null) {
      this.operacao = operacao;
      return;
    }
    /* A partir do momento que foi definido o tipo de operação (logo acima).
    Foi criado essa condicional para confirmar se foi adicionado um 2º número para a conta.
    Com ele adicionado, já que está diferente de nulo, é instanciado o objeto calculadoraService
    e agora que há o controle do componente que tá no modulo "services" (procure e vai lá ver),
    da para pegar o método "calcular" que tem nesse componente e definir a operação que será feita */
    if (this.num2 !== null) {
      this.resultado = this.calculadoraService.calcular(
        // Como são duas Strings, você deve transformar em dois flutuantes (floats)
        parseFloat(this.num1), // num1: number - Agora voltou a ser um NUMBER
        parseFloat(this.num2), // num2: number - Agora voltou a ser um NUMBER
        this.operacao // operacao: string
        /* Lembre-se que nesse momento está sendo preenchido os 3 PARÂMETROS do método "calcular"
        que está no componente "calculadora.service.ts", tem que ir lá para acompanhar
        Ou pode clicar em cima do nome desse método logo acima para entender */
      );
      this.operacao = operacao; /* Para ficar salvo no atributo no atributo do objeto com esse
      valor no momento */
      this.num1 = this.resultado.toString();
      this.num2 = null;
      this.resultado = null;
    }
  }

  /**
   * CALCULAR (MOMENTO DE APERTAR O IGUAL)
   * Por último tem o método "calcular" PARA ESSE COMPONENTE AQUI, lembre-se que o outro
  *"calcular" tem outro significado e pertence a outro componente
  *Esse método agora tem como objetivo pegar o */
  /**
   * @return void
   */
  calcular(): void {
    //Validação para saber se o número 2 é igual a nulo
    if (this.num2 === null) {
      return;
    }
    //Chama o método "calcular" do componente CalculadoraService
    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.num1),
      parseFloat(this.num2),
      this.operacao
    );
  }

  /**
   * Método para EXIBIR NA TELA o valor que foi obtido
   *
   * @return string
   */
  get display(): string {
    if (this.resultado !== null) {
      return this.resultado.toString();
    }
    if (this.num2 !== null) {
      return this.num2
    }
    return this.num1
  }

}
