function trataErros(erro) {
  if (erro.code === 'ENOENTE') {
    throw new Error('Arquivo não encontrado.');
  }
}
