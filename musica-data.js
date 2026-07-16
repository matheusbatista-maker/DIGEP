/* =========================================================================
   LETRA SINCRONIZADA — "Abre a Porta" (GABDIGEP)

   Marcação oficial (tempos em segundos, só o início de cada linha). Uma
   linha fica destacada em dourado desde o seu "t" até o "t" da próxima.
   "estrofe" agrupa as linhas em blocos (verso/refrão/final) só pra
   formatação visual; "refrao: true" destaca as linhas do refrão.
   ========================================================================= */
const LETRA_MUSICA = [
  { t: 1.00,   texto: 'Alô, minha gente da DIGEP!', estrofe: 0 },
  { t: 5.02,   texto: 'Abre a porta e puxa o fole, sanfoneiro!', estrofe: 0 },

  { t: 13.58,  texto: 'No coração da nossa Diretoria,', estrofe: 1 },
  { t: 17.53,  texto: 'tem trabalho acontecendo todo dia.', estrofe: 1 },
  { t: 21.80,  texto: 'Chega prazo, processo e reunião,', estrofe: 1 },
  { t: 25.82,  texto: 'o Gabinete organiza a missão.', estrofe: 1 },

  { t: 29.79,  texto: 'Tem norma, meta e inspeção do CNJ,', estrofe: 2 },
  { t: 33.79,  texto: 'cada providência a equipe acompanha bem.', estrofe: 2 },
  { t: 37.78,  texto: 'Remoção, agenda e informação,', estrofe: 2 },
  { t: 41.80,  texto: 'tudo preparado pra melhor decisão.', estrofe: 2 },

  { t: 44.30,  texto: 'Ô, abre a porta, deixa o forró entrar!', estrofe: 3, refrao: true },
  { t: 48.14,  texto: 'É o GAB-DI-GEP fazendo a gestão girar!', estrofe: 3, refrao: true },
  { t: 52.13,  texto: 'Coordena, acompanha, ajuda a resolver,', estrofe: 3, refrao: true },
  { t: 56.12,  texto: 'é trabalho em equipe pra tudo acontecer!', estrofe: 3, refrao: true },

  { t: 60.12,  texto: 'Tem comitê, PLS e planejamento,', estrofe: 4 },
  { t: 63.81,  texto: 'prioridades e acompanhamento.', estrofe: 4 },
  { t: 67.80,  texto: 'Paula dá o rumo, Déborah faz articular,', estrofe: 4 },
  { t: 72.14,  texto: 'Matheus olha os detalhes pra nada escapar!', estrofe: 4 },

  { t: 76.14,  texto: 'Quando a agenda aperta e o relógio quer correr,', estrofe: 5 },
  { t: 80.16,  texto: 'todo mundo junta forças pra poder resolver.', estrofe: 5 },
  { t: 84.15,  texto: 'Do Gabinete às unidades, cada um tem seu valor,', estrofe: 5 },
  { t: 88.17,  texto: 'ninguém move o Tribunal sozinho, meu senhor!', estrofe: 5 },

  { t: 94.20,  texto: 'Ô, abre a porta, deixa o forró entrar!', estrofe: 6, refrao: true },
  { t: 98.20,  texto: 'É o GAB-DI-GEP fazendo a gestão girar!', estrofe: 6, refrao: true },
  { t: 102.21, texto: 'De Palmas às comarcas, pode acreditar:', estrofe: 6, refrao: true },
  { t: 106.21, texto: 'cuidar de quem cuida é o nosso jeito de trabalhar!', estrofe: 6, refrao: true },

  { t: 110.23, texto: 'DIGEP por Dentro!', estrofe: 7 },
  { t: 112.92, texto: 'GAB... DI... GEP!', estrofe: 7 },
  { t: 114.92, texto: 'Fazendo a gestão acontecer!', estrofe: 7 }
];
