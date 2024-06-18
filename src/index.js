const fs = require('fs');
const trataErros = require('./errors/funcoesErro');

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];

fs.readFile(link, 'utf-8', (error, fileData) => {
  /**
   * O try funciona "monitorando" o código disposto dentro de seu
   * bloco. Caso haja algum erro, este erro será mandado para o
   * bloco catch, responsável por tratar erros.
   */
  try {
    if (error) throw error;
    /**
     * Esse erro que é passado como parâmetro do if é o mesmo erro
     * que é "lançado" pelo throw. Quando ele é lançado pelo throw,
     * se torna o erro passado como parâmetro do bloco catch. No
     * entanto, se não for lançado, o erro que é parâmetro do bloco
     * catch, será outro objeto diferente, será um erro "genérico".
     * Tanto o throw quanto o return param a execução do bloco de
     * código! O throw pode ser usado para lançar qualquer tipo de
     * dado mas não é recomendado que seja usado fora de um caso
     * como o aqui exemplificado. Usamos throw (por exemplo, throw
     * new Error()) quando queremos que o erro seja “lançado”, o
     * que normalmente resulta na interrupção do programa e no erro
     * sendo exibido no terminal junto com o stack trace. Não é em
     * todo caso que queremos que aconteça a interrupção do programa,
     * mas ainda queremos “capturar” o erro.
     */
    contaPalavras(fileData);
  } catch (error) {
    trataErros(error);
  }
});

function extraiParagrafos(texto) {
  return texto.toLowerCase().split('\n');
}

function contaPalavras(texto) {
  const paragrafos = extraiParagrafos(texto);
  const listaParagrafos = paragrafos.flatMap((paragrafo) => {
    if (!paragrafo) return [];
    return verificaPalavrasDuplicadas(paragrafo);
  });
  console.log(listaParagrafos);
}

function limpaPalavras(palavra) {
  return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function verificaPalavrasDuplicadas(text) {
  const listaPalavras = text.split(' ');
  const resultado = {};
  listaPalavras.forEach((palavra) => {
    const palavraLimpa = limpaPalavras(palavra);
    resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
  });
  return resultado;
}
