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

async function criaESalvaArquivos(listaPalavras, endereco) {
  const arquivoNovo = `${endereco}/resultado.txt`;
  /**
   * Por que passar a lista de palavras para uma nova constante guardar
   * essas informações? Porque arrays e objetos não são tipos conhecidos
   * por aquivos .txt, que "lê" somente strings. Para conseguir escrever
   * este arquivo precisaremos converter "listaPalavras" em string.
   */
  const textoPalavras = JSON.stringify(listaPalavras);
  try {
    await fs.promises.writeFile(arquivoNovo, textoPalavras);
    console.log('arquivo criado.');
  } catch (erro) {
    throw erro;
  }
}
