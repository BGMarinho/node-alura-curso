const fs = require("fs"); // fs significa "file system", biblioteca que permite interagir com o sistema de arquivos do computador.

const caminhoArquivo = process.argv; // "argv" significa "argument vector"
/** saída:
 *  [
        'C:\\Program Files\\nodejs\\node.exe',
        'C:\\Users\\MARINHO\\Desktop\\3709-nodejs-lib-arquivos-iniciais\\src\\index.js'
    ]
 */

const link = caminhoArquivo[2];

/**
 * Toda vez que rodamos o comando "node src/index.js", colocamos o Node
 * pra "processar" o código. Esse processamento gera o vetor de argumentos
 * (argv) que contém o caminho dos arquivos que serão executados nesse
 * processamento. Para adicionar mais um arquivo a esse vetor, é necessário
 * colocar o caminho dele - seja relativo ou absoluto - logo após a declaração
 * do comando no terminal.
 */

fs.readFile(link, "utf-8", (error, fileData) => {
  if (error) {
    /**
     * Quando damos return num bloco de código, a execução termina. Sendo
     * assim, a mensagem de erro no console sairá mais limpa, sem outros
     * erros acumulados.
     */
    console.log("qual é o erro?", error);
    /**
     * Esse erro é um objeto que tem algumas propriedades e que podem ser
     * usadas para formar uma mensagem de erro mais completa e personalizada
     * para cada caso.
     */
    return;
  }
  /**
   * O método readFile possui três parâmetros: o caminho do arquivo que se quer ler, o tipo
   * de "encodamento" dos caracteres desse texto e uma função callback anônima (arrow ou
   * comum) que, por sua vez, possui dois parâmetros, sendo um para erro e outro para o
   * conteúdo do arquivo a ser lido.
   */
  contaPalavras(fileData);
});

function extraiParagrafos(texto) {
  return texto.toLowerCase().split("\n");
}

function contaPalavras(texto) {
  const paragrafos = extraiParagrafos(texto);
  /**
   * O método flatMap() é um método de arrays que serve para retirar itens de arrays inclusos
   * em outros arrays e, em seguida, iterar sobre cada item em sua nova camada. Tem link de
   * documentação na pasta "Node" nos favoritos do navegador.
   */
  const listaParagrafos = paragrafos.flatMap((paragrafo) => {
    if (!paragrafo) return [];
    return verificaPalavrasDuplicadas(paragrafo);
  });
  console.log(listaParagrafos);
}

function limpaPalavras(palavra) {
  /**
   * O replace() é um método de strings, utilizado para indicar qual trecho de uma string deve
   * ser substituído - primeiro argumento/parâmetro - por outro dado - segundo argumento/parâmetro.
   */
  return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

function verificaPalavrasDuplicadas(text) {
  const listaPalavras = text.split(" ");
  const resultado = {};
  /**
   * O forEach() é um método de arrays que consiste em iterar sobre todos os itens de um array
   * sem retornar nenhum outro valor, apenas realizando processamentos sobre cada item. Ele se
   * difere do map() exatamente por não ter retorno; o map retorna um novo array.
   */
  listaPalavras.forEach((palavra) => {
    const palavraLimpa = limpaPalavras(palavra);
    resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
  });
  return resultado;
}

/**
 * Sempre que um erro ocorre, ele é propagado para outros módulos
 * do Node.js, até um ponto final de execução. Essa propagação é
 * evidenciada pela stack trace, que dá o caminho de onde esse
 * erro foi propagado, em qual método, linha e coluna. Isso serve
 * para entendermos os processos que foram executados com o erro,
 * onde ele afetou funcionamento e outras evidências importantes.
 * Coloquei um artigo sobre erros em Node.js na pasta da barra de
 * favoritos do navegador.
 */
