/* =========================================================================
   CONFIGURAÇÃO DAS EDIÇÕES DO GIBI — edite aqui quando lançar uma nova.

   Para cada edição, o campo "status" controla o que aparece no site:
     "lancado"  -> abre o leitor de página em página direto no site
     "em_breve" -> mostra a capa escurecida com cadeado e selo "EM BREVE"
                   (os campos pdf/paginas/pastaPaginas podem já estar
                   preenchidos, mas só aparecem pro público quando você
                   trocar o status pra "lancado")

   "paginas" é o número de páginas da edição e "pastaPaginas" é a pasta
   com as imagens "pagina-01.jpg", "pagina-02.jpg", etc. (geradas a partir
   do PDF). Se você adicionar uma edição nova, renderize as páginas do PDF
   pra imagens nesse formato antes de trocar o status pra "lancado".

   Pra lançar uma edição nova: troque "em_breve" por "lancado" na linha
   do status. Pra adicionar uma edição, copie um bloco { ... } inteiro
   e ajuste os campos.
   ========================================================================= */
const EDICOES_GIBI = [
  {
    numero: 1,
    titulo: 'O Chamado',
    tagline: 'Quando a burocracia ataca, quem defende o Tribunal?',
    status: 'lancado',
    capa: 'gibi-assets/edicao-01-capa.png',
    pdf: 'gibi-assets/edicao-01.pdf',
    paginas: 11,
    pastaPaginas: 'gibi-assets/edicao-01-paginas'
  },
  {
    numero: 2,
    titulo: 'Portas Abertas',
    tagline: 'Nenhum gabinete move um Tribunal sozinho.',
    status: 'lancado',
    capa: 'gibi-assets/edicao-02-capa.png',
    pdf: 'gibi-assets/edicao-02.pdf',
    paginas: 9,
    pastaPaginas: 'gibi-assets/edicao-02-paginas'
  },
  {
    numero: 3,
    titulo: 'O Efeito Cascata',
    tagline: 'Ele nunca vai saber os nomes de quem fez isso acontecer.',
    status: 'lancado',
    capa: 'gibi-assets/edicao-03-capa.png',
    pdf: null,
    paginas: 10,
    pastaPaginas: 'gibi-assets/edicao-03-paginas'
  }
];
