/**
 * Helper functions, como são chamadas, são funções
 * simples que fazem coisas específicas.
 */

function filtraOcorrencias(paragrafo) {
  /**
   * Object.keys() é um método que recebe um objeto como
   * argumento e retorna um array com todas as chaves desse
   * objeto
   */
  return Object.keys(paragrafo).filter((chave) => paragrafo[chave] > 1);
}

function montaSaidaArquivo(listaPalavras) {
  let textoFinal = '';
  listaPalavras.forEach((paragrafo, indice) => {
    /**
     * o método .join() serve para transformar arrays em strings e juntar
     * cada elemento do array de acordo com o que é passado como argumento
     * de sua chamada!
     */
    const duplicadas = filtraOcorrencias(paragrafo).join(', ');
    textoFinal += `Palavras duplicadas no parágrafo ${
      indice + 1
    }: ${duplicadas} \n`;
    // alt + z faz o código ir pra linha debaixo sem abrir
    // mais uma linha! É a mesma linha, só que expandida
    // para baixo.
  });

  return textoFinal;
}

/**
 * Uma outra forma de exportar funções de um arquivo:
 */
export { montaSaidaArquivo };
