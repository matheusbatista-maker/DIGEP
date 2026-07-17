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
    titulo: 'Deixa a DIGEP Passar',
    artista: 'GABDIGEP',
    status: 'lancado',
    audio: 'Musica 2.mp3',
    // capa provisória (extraída do próprio arquivo de áudio) — trocar quando a capa definitiva chegar
    capa: 'Capa Musica 2.jpg',
    letra: [
      { texto: 'Alô, minha gente da DIGEP!', estrofe: 0 },
      { texto: 'O Gabinete pode até puxar o bloco...', estrofe: 0 },
      { texto: 'Mas sem essa turma,', estrofe: 0 },
      { texto: 'não sai nem do lugar!', estrofe: 0 },

      { texto: 'Tânia põe projeto na pista,', estrofe: 1 },
      { texto: 'meta, competência e entrega à vista.', estrofe: 1 },
      { texto: 'Seny cuida da vida funcional,', estrofe: 1 },
      { texto: 'carreira, estágio e registro geral.', estrofe: 1 },

      { texto: 'Katiúcia atende com disposição,', estrofe: 2 },
      { texto: 'posse, crachá e e-Gesp na solução.', estrofe: 2 },
      { texto: 'Orlando faz a folha fechar,', estrofe: 2 },
      { texto: 'calcula, confere, faz tudo encaixar!', estrofe: 2 },

      { texto: 'Cada setor tem seu valor,', estrofe: 3 },
      { texto: 'cada entrega tem muito suor.', estrofe: 3 },
      { texto: 'Quando todo mundo entra em ação,', estrofe: 3 },
      { texto: 'a DIGEP bate forte no coração!', estrofe: 3 },

      { texto: 'Ô, ô, ô, deixa a DIGEP passar!', estrofe: 4, refrao: true },
      { texto: 'Cada equipe faz a roda girar.', estrofe: 4, refrao: true },
      { texto: 'O Gabinete organiza, mas precisa confessar:', estrofe: 4, refrao: true },
      { texto: 'sem vocês, minha gente, não dá pra trabalhar!', estrofe: 4, refrao: true },

      { texto: 'Ô, ô, ô, vem todo mundo cantar!', estrofe: 5, refrao: true },
      { texto: 'É talento e compromisso em cada lugar.', estrofe: 5, refrao: true },
      { texto: 'Do atendimento à folha, da saúde à decisão,', estrofe: 5, refrao: true },
      { texto: 'quem faz a DIGEP forte é a força da união!', estrofe: 5, refrao: true },

      { texto: 'Elaine cuida da prevenção,', estrofe: 6 },
      { texto: 'vacina, corrida, saúde e atenção.', estrofe: 6 },
      { texto: 'Bárbara, na Junta, trabalha com precisão,', estrofe: 6 },
      { texto: 'laudo responsável em cada avaliação.', estrofe: 6 },

      { texto: 'Jocelaine, no GGEM, faz tudo integrar,', estrofe: 7 },
      { texto: 'equipes e projetos pra Justiça avançar.', estrofe: 7 },
      { texto: 'Roosevelt e Ana Júlia vêm pra clarear:', estrofe: 7 },
      { texto: 'parecer, norma e contrato pra gestão caminhar!', estrofe: 7 },

      { texto: 'Gabinete sem vocês?', estrofe: 8 },
      { texto: 'Nem pensar, meu irmão!', estrofe: 8 },
      { texto: 'É pauta sem resposta,', estrofe: 8 },
      { texto: 'reunião sem conclusão!', estrofe: 8 },

      { texto: 'É despacho sem caminho,', estrofe: 9 },
      { texto: 'é café sem adoçar...', estrofe: 9 },
      { texto: 'Só com a DIGEP inteira', estrofe: 9 },
      { texto: 'a gestão pode avançar!', estrofe: 9 },

      { texto: 'Tânia!', estrofe: 10 },
      { texto: 'Projeto pra avançar!', estrofe: 10 },
      { texto: 'Seny!', estrofe: 10 },
      { texto: 'Gestão pra organizar!', estrofe: 10 },
      { texto: 'Katiúcia!', estrofe: 10 },
      { texto: 'Atender e orientar!', estrofe: 10 },
      { texto: 'Orlando!', estrofe: 10 },
      { texto: 'Folha certa pra pagar!', estrofe: 10 },
      { texto: 'Elaine!', estrofe: 10 },
      { texto: 'Saúde e prevenção!', estrofe: 10 },
      { texto: 'Bárbara!', estrofe: 10 },
      { texto: 'Perícia com precisão!', estrofe: 10 },
      { texto: 'Jocelaine!', estrofe: 10 },
      { texto: 'Equipes em conexão!', estrofe: 10 },
      { texto: 'Roosevelt e Ana Júlia!', estrofe: 10 },
      { texto: 'Direito e solução!', estrofe: 10 },

      { texto: 'Ô, ô, ô, deixa a DIGEP passar!', estrofe: 11, refrao: true },
      { texto: 'Cada equipe faz a roda girar.', estrofe: 11, refrao: true },
      { texto: 'De Palmas às comarcas, todo mundo pode ver:', estrofe: 11, refrao: true },
      { texto: 'é a união da DIGEP que faz acontecer!', estrofe: 11, refrao: true },

      { texto: 'Ô, ô, ô, pode o bloco encerrar,', estrofe: 12, refrao: true },
      { texto: 'mas essa parceria nunca vai parar.', estrofe: 12, refrao: true },
      { texto: 'O projeto chega ao fim, mas ficou a conclusão:', estrofe: 12, refrao: true },
      { texto: 'a maior força da DIGEP é trabalhar em união!', estrofe: 12, refrao: true },

      { texto: 'DIGEP por Dentro!', estrofe: 13 },
      { texto: 'O Gabinete agradece...', estrofe: 13 },
      { texto: 'Porque sozinho não faz é nada!', estrofe: 13 }
    ]
  }
];
