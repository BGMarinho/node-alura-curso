// const fs = require('fs');
// const trataErros = require('./errors/funcoesErro');

/**
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

fs.readFile(link, 'utf-8', (error, fileData) => {
  try {
    if (error) throw error;

    contaPalavras(fileData);
  } catch (error) {
    trataErros(error);
  }
});
