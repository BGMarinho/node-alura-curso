const fs = require('fs');
const trataErros = require('./errors/funcoesErro');

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
