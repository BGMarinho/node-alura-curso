// const fs = require('fs');
// const trataErros = require('./errors/funcoesErro');

// Aqui, eu dei uma instrução no terminal para criar um arquivo package.json, que é um arquivo "manifest" que possui todas as informações mais pertinentes do pojeto, como versão do node utilizada, bibliotecas instaladas e outras coisas desse tipo Dentro desse arquivo, após a chave "main", eu adicionei uma outra chave chamada "type" com valor "module. É essa a adição dessa configuração que me permite usar as palavras import e export, sendo este um recurso recentemente implementado no Node.

import fs from 'fs';
import path from 'path'; // é uma biblioteca nativa do Node, o que significa que não precisaremos instalar via npm. O Node utiliza ela para fazer o gerenciamento de caminhos relativos e absolutos de todos os arquivos referenciados dentro do programa. A biblioteca commander precisa resolver os arquivos que são mandados internamente antes de utilizar os caminhos.
import trataErros from './errors/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();
// const caminhoArquivo = process.argv;
// const link = caminhoArquivo[2];
// const endereco = caminhoArquivo[3];

program
  .version('0.0.1')
  .option('-t,--texto <string>', 'caminho do texto a ser processado')
  .option(
    '-d, --destino <string>',
    'caminho da pasta onde será salvo o arquivo de resultados',
  )
  .action((options) => {
    const { texto, destino } = options;
    if (!texto || !destino) {
      console.error(
        chalk.red('Erro: favor inserir caminho de origem e destino'),
      );
      program.help();
      return;
    }

    const caminhoTexto = path.resolve(texto);
    const caminhoDestino = path.resolve(destino);

    try {
      processaArquivo(caminhoTexto, caminhoDestino);
      console.log(chalk.green('Texto processado com sucesso!'));
    } catch (erro) {
      console.log('Ocorreu um erro no processamento: ', erro);
    }
  });

program.parse();
// A partir de agora, o comando a ser digitado no terminal será da seguinte forma: node src/cli.js -t arquivos/texto-web.txt -d ./resultados . Dessa forma, não faz diferença a ordem com que eles serão escritos no terminal, pois eles estão identificados por suas respectivas flags.

function processaArquivo(texto, destino) {
  // Essa função fs.readFile também é uma função assíncrona, ainda que não seja chamada a partir do objeto promises. a diferença dela para a presente em writeFile é que ela lida com código assíncrono a partir do recebimento de uma função callback em sua lista de parâmetro. No entanto, essa função pode ser utilizada de forma síncrona, utilizando a sintaxe fs.readFileSync, mas este uso é restrito a contextos bem específicos.
  fs.readFile(texto, 'utf-8', (error, fileData) => {
    try {
      if (error) throw error;
      const resultado = contaPalavras(fileData);
      criaESalvaArquivos(resultado, destino);
    } catch (error) {
      trataErros(error);
    }
  });
}

async function criaESalvaArquivos(listaPalavras, endereco) {
  const arquivoNovo = `${endereco}/resultado.txt`;
  // Por que passar a lista de palavras para uma nova constante guardar essas informações? Porque arrays e objetos não são tipos conhecidos por aquivos .txt, que "lê" somente strings. Para conseguir escrever este arquivo precisaremos converter "listaPalavras" em string.
  const textoPalavras = montaSaidaArquivo(listaPalavras);
  try {
    await fs.promises.writeFile(arquivoNovo, textoPalavras);
    console.log('arquivo criado.');
  } catch (erro) {
    throw erro;
  }
}

/**
 * Quais são os casos de uso mais populares de código assíncrono?
 * - Leitura/manipulação de arquivos em disco;
 * - Comunicação entre cliente e servidor;
 * - Operações em bancos de dados.
 */

// Promessa é um tipo de objeto do Javascript e um termo usado para encapsular e lidar com as operações assíncronas. Sendo assim, esse objeto representa os possíveis estados de uma promessa.

// Uma promessa fica pendente (pending) enquanto ela não obtém uma resposta. Quando ela deixa de ser pendente, ela está resolvida (fulfilled). No entanto, quando essa comunicação falha, dizemos que essa promessa foi rejeitada (rejected), que são os casos de erro.

// Async e Await são uma dupla de termos que utilizamos para "avisar" ao interpretador que existe código assíncrono (ou operações assíncronas) em determinado trecho e que precisam ser processados no tempo certo.

// Async será sempre adicionado no momento da declaração de uma função, antes da palavra reservada "function".

// Await é adicionado na linha em que houver o método que precisa ser executado de forma assíncrona. No exemplo acima, writeFile não possui nenhum retorno, mas caso retornasse algo, deveríamos atribuir o que foi retornado pelo método em uma variável ou constante. Ex: const retorno = await fs.promises.writeFile(arg, arg2)

// function criaESalvaArquivos(listaPalavras, endereco) {
//   const arquivoNovo = `${endereco}/resultado.txt`;
//   const textoPalavras = JSON.stringify(listaPalavras);
//   fs.promises
//     .writeFile(arquivoNovo, textoPalavras)
//     .then(() => {
//       console.log('arquivo criado.');
//     })
//     .catch((erro) => {
//       throw erro;
//     });}

// O objeto promisse representa a eventual conclusão (ou falha) de uma operação assíncrona e seu valor resultante. Significa que métodos assíncronos não retornam dados finais mas sim objetos promise! E não é possível abrí-lo e retirar dados de dentro dele, porque ele é uma representação de uma conclusão que não sabemos ao certo se ocorrerá.

//O then é a função responsável por fazer a conclusão - seja ela qual for - dessa promessa, e é dentro da função callback do then que será colocado o processamento realizado com o resultado dessa promessa. Se algum dado for retornado da promessa, é dentro dos parâmetros da função callback do then que ele será colocado, para poder ser tratado no bloco de código da função.

// Caso a resolução da promessa tratada pelo then dê erro, deveremos tratar este erro em um catch, quase igual como fazemos em um try/catch comum. No entanto, nesse caso, o catch será como um then e receberá uma função callback, a qual por sua vez receberá o parâmetro "error/erro". O erro será tratado dentro do corpo des função.

// O finally é onde colocamos o código que queremos que seja executado independentemente do resultado da promessa. Além disso, ele também recebe como argumento uma função callback na qual será tratado o objeto promise. Ele costuma ser muito útil para fechar conexões com bancos de dados.

// A utilização do async/await é conhecida como um sintax sugar porque ela deixa evidente que aquela função é assíncrona. No caso da utilização do then, a função terá um aspecto muito mais comum e que evidencia menos o assincronismo. É comum encontrar o then em implementações mais antigas e o async/await em implementações mais recentes.

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

// Foi instalada a biblioteca commander para ajudar a organizar os comandos em uma linha de comando do terminal.

// Quando um método possui em seus argumentos uma função callback, esta só será executada depois que o método, em si, retornar para ela os valores que ela utilizará como parâmetro.

// Grande parte das ferramentas de CLI mais estruturadas têm por padrão um comando --help (node --help, por exemplo), que mostra uma lista de todos os comandos possíveis da ferramenta. O mesmo vale para o padrão -v ou --version

// Chalk: biblioteca instalada que permite que as mensagens no terminal, as saídas e tudo mais, possuam cores específicas. Isso ajuda a identificar que tipo de mensagem é aquela que está aparecendo no terminal e guia o usuário. O uso da biblioteca se baseia em importá-la para o arquivo em que ocorrerão as manipulações via terminal e utilizar os métodos de acordo com as cores que se quer aplicar aos console logs.

// O NPM é um repositório de código específico, e significa Node Package Manager (ou repositório de pacotes do Node). Ou seja, todas as bibliotecas/frameworks instalados via npm, são hospedados e baixados deste repositório. Além disso, o npm é instalado juntamente com o Node, por isso é possível utilizar diretamente o comando npm no terminal. Todos os pacotes/bibliotecas baixados vão para uma pasta chamada node_modules.

// A primeira coisa que fazemos ao trabalhar com um projeto em Node.js do zero é criar um arquivo package.json utilizando o comando npm init

// Versionamento Semântico: esse conceito se baseia em três formas de publicar uma versão de um software. A alteração de número da primeira dezena são chamadas Major, e referem a grandes alterações com potencial de quebrar eventuais implementações de versões anteriores. Já a segunda, tem o nome de Minor e se caracteriza por novas implementações relevantes mas que não tem potencial de quebra em softwares que utilizem versões anteriores. Por fim, temos a Patch, que consiste em pequenas alterações, como resolução de bugs, melhoramento de performance ou alterações similares que não introduzem necessiamente coisas novas.
