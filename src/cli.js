/**
 * const fs = require('fs');
 * const trataErros = require('./errors/funcoesErro');
 *
 * Aqui, eu dei uma instrução no terminal para criar um arquivo
 * package.json, que é um arquivo "manifest" que possui todas as
 * informações mais pertinentes do pojeto, como versão do node
 * utilizada, bibliotecas instaladas e outras coisas desse tipo.
 * Dentro desse arquivo, após a chave "main", eu adicionei uma
 * outra chave chamada "type" com valor "module. É essa a adição
 * dessa configuração que me permite usar as palavras import e
 * export, sendo este um recurso recentemente implementado no
 * Node.
 */

import fs from 'fs';
import trataErros from './errors/funcoesErro.js';
import { contaPalavras } from './index.js';

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3];

fs.readFile(link, 'utf-8', (error, fileData) => {
  try {
    if (error) throw error;
    const resultado = contaPalavras(fileData);
    criaESalvaArquivos(resultado, endereco);
  } catch (error) {
    trataErros(error);
  }
});

// async function criaESalvaArquivos(listaPalavras, endereco) {
//   const arquivoNovo = `${endereco}/resultado.txt`;
//   /**
//    * Por que passar a lista de palavras para uma nova constante guardar
//    * essas informações? Porque arrays e objetos não são tipos conhecidos
//    * por aquivos .txt, que "lê" somente strings. Para conseguir escrever
//    * este arquivo precisaremos converter "listaPalavras" em string.
//    */
//   const textoPalavras = JSON.stringify(listaPalavras);
//   try {
//     await fs.promises.writeFile(arquivoNovo, textoPalavras);
//     console.log('arquivo criado.');
//   } catch (erro) {
//     throw erro;
//   }
// }

/**
 * Quais são os casos de uso mais populares de
 * código assíncrono?
 * - Leitura/manipulação de arquivos em disco;
 * - Comunicação entre cliente e servidor;
 * - Operações em bancos de dados.
 */

/**
 * Promessa é um tipo de objeto do Javascript e
 * um termo usado para encapsular e lidar com as
 * operações assíncronas. Sendo assim, esse
 * objeto representa os possíveis estados de uma
 * promessa.
 *
 * Uma promessa fica pendente (pending) enquanto
 * ela não obtém uma resposta. Quando ela deixa
 * de ser pendente, ela está resolvida (fulfilled).
 * No entanto, quando essa comunicação falha,
 * dizemos que essa promessa foi rejeitada (rejected),
 * que são os casos de erro.
 */

/**
 * Async e Await são uma dupla de termos que utilizamos
 * para "avisar" ao interpretador que existe código
 * assíncrono (ou operações assíncronas) em determinado
 * trecho e que precisam ser processados no tempo certo.
 *
 * Async será sempre adicionado no momento da declaração
 * de uma função, antes da palavra reservada "function".
 *
 * Await é adicionado na linha em que houver o método
 * que precisa ser executado de forma assíncrona. No
 * exemplo acima, writeFile não possui nenhum retorno,
 * mas caso retornasse algo, deveríamos atribuir o que
 * foi retornado pelo método em uma variável ou constante.
 * Ex: const retorno = await fs.promises.writeFile(arg, arg2)
 */

function criaESalvaArquivos(listaPalavras, endereco) {
  const arquivoNovo = `${endereco}/resultado.txt`;
  const textoPalavras = JSON.stringify(listaPalavras);

  fs.promises
    .writeFile(arquivoNovo, textoPalavras)
    .then(() => {
      console.log('arquivo criado.');
    })
    .catch((erro) => {
      throw erro;
    });
  /**
   * O objeto promisse representa a eventual conclusão (ou falha)
   * de uma operação assíncrona e seu valor resultante. Significa
   * que métodos assíncronos não retornam dados finais mas sim
   * objetos promise! E não é possível abrí-lo e retirar dados
   * de dentro dele, porque ele é uma representação de uma
   * conclusão que não sabemos ao certo se ocorrerá.
   *
   * O then é a função responsável por fazer a conclusão - seja
   * ela qual for - dessa promessa, e é dentro da função callback
   * do then que será colocado o processamento realizado com o
   * resultado dessa promessa. Se algum dado for retornado da
   * promessa, é dentro dos parâmetros da função callback do then
   * que ele será colocado, para poder ser tratado no bloco de
   * código da função.
   *
   * Caso a resolução da promessa tratada pelo then dê erro,
   * deveremos tratar este erro em um catch, quase igual como
   * fazemos em um try/catch comum. No entanto, nesse caso, o
   * catch será como um then e receberá uma função callback, a
   * qual por sua vez receberá o parâmetro "error/erro". O erro
   * será tratado dentro do corpo des função.
   *
   * O finally é onde colocamos o código que queremos que seja
   * executado independentemente do resultado da promessa. Além
   * disso, ele também recebe como argumento uma função callback
   * na qual será tratado o objeto promise. Ele costuma ser
   * muito útil para fechar conexões com bancos de dados.
   *
   * A utilização do async/await é conhecida como um sintax sugar
   * porque ela deixa evidente que aquela função é assíncrona.
   * No caso da utilização do then, a função terá um aspecto muito
   * mais comum e que evidencia menos o assincronismo. É comum
   * encontrar o then em implementações mais antigas e o async/await
   * em implementações mais recentes.
   */
}

// Exemplo de uso do construtor "new Promise(callback)"
// function promessa(bool) {
//   const x = bool;
//   return new Promise((resolve, reject) => {
//     if (!x) {
//       reject(new Error("falha na promessa"));
//     }
//     resolve("sucesso na promessa");
//   });
//  }

//  function exibeResposta(textoResult) {
//   console.log(textoResult);
//  }

//  promessa(true)
//   .then((texto) => exibeResposta(texto))
//  // sucesso na promessa
