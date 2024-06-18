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
