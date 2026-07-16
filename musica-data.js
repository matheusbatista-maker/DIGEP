/* =========================================================================
   FAIXAS — trilhas de "DIGEP por Dentro".

   Pra adicionar uma faixa nova: preencha "status: 'lancado'", o caminho do
   áudio, a capa e a letra (um array de linhas com "texto", "estrofe" pra
   agrupar em blocos visuais, e "refrao: true" nas linhas do refrão).
   A letra é só exibida (estática), sem sincronismo com o tempo do áudio.
   ========================================================================= */
const FAIXAS = [
  {
    numero: 1,
    titulo: 'Abre a Porta',
    artista: 'GABDIGEP',
    status: 'lancado',
    audio: 'Abre a Porta.mp3',
    capa: 'Capa Música GABDIGEP.png',
    letra: [
      { texto: 'Alô, minha gente da DIGEP!', estrofe: 0 },
      { texto: 'Abre a porta e puxa o fole, sanfoneiro!', estrofe: 0 },

      { texto: 'No coração da nossa Diretoria,', estrofe: 1 },
      { texto: 'tem trabalho acontecendo todo dia.', estrofe: 1 },
      { texto: 'Chega prazo, processo e reunião,', estrofe: 1 },
      { texto: 'o Gabinete organiza a missão.', estrofe: 1 },

      { texto: 'Tem norma, meta e inspeção do CNJ,', estrofe: 2 },
      { texto: 'cada providência a equipe acompanha bem.', estrofe: 2 },
      { texto: 'Remoção, agenda e informação,', estrofe: 2 },
      { texto: 'tudo preparado pra melhor decisão.', estrofe: 2 },

      { texto: 'Ô, abre a porta, deixa o forró entrar!', estrofe: 3, refrao: true },
      { texto: 'É o GAB-DI-GEP fazendo a gestão girar!', estrofe: 3, refrao: true },
      { texto: 'Coordena, acompanha, ajuda a resolver,', estrofe: 3, refrao: true },
      { texto: 'é trabalho em equipe pra tudo acontecer!', estrofe: 3, refrao: true },

      { texto: 'Tem comitê, PLS e planejamento,', estrofe: 4 },
      { texto: 'prioridades e acompanhamento.', estrofe: 4 },
      { texto: 'Paula dá o rumo, Déborah faz articular,', estrofe: 4 },
      { texto: 'Matheus olha os detalhes pra nada escapar!', estrofe: 4 },

      { texto: 'Quando a agenda aperta e o relógio quer correr,', estrofe: 5 },
      { texto: 'todo mundo junta forças pra poder resolver.', estrofe: 5 },
      { texto: 'Do Gabinete às unidades, cada um tem seu valor,', estrofe: 5 },
      { texto: 'ninguém move o Tribunal sozinho, meu senhor!', estrofe: 5 },

      { texto: 'Ô, abre a porta, deixa o forró entrar!', estrofe: 6, refrao: true },
      { texto: 'É o GAB-DI-GEP fazendo a gestão girar!', estrofe: 6, refrao: true },
      { texto: 'De Palmas às comarcas, pode acreditar:', estrofe: 6, refrao: true },
      { texto: 'cuidar de quem cuida é o nosso jeito de trabalhar!', estrofe: 6, refrao: true },

      { texto: 'DIGEP por Dentro!', estrofe: 7 },
      { texto: 'GAB... DI... GEP!', estrofe: 7 },
      { texto: 'Fazendo a gestão acontecer!', estrofe: 7 }
    ]
  },
  {
    numero: 2,
    titulo: 'Em breve',
    artista: 'GABDIGEP',
    status: 'em_breve',
    audio: null,
    capa: null,
    letra: []
  }
];
