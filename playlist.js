// Função fábrica para criar objetos música
function criarMusicas(nome, artista, tempo) {
  return {
    nome: nome,               // Nome da música
    artista: artista,         // Nome do artista
    reproducoes: 0,           // Número de vezes que a música foi tocada
    tempo: tempo              // Duração da música
  };
}

// Variável global que controla o índice da música atual
let musicaAtual = 0;

// Objeto playlist contendo todas as funcionalidades
const playlist = {
  musicas: [],  // Array que armazenará todas as músicas da playlist

  // Adiciona uma nova música no início da playlist
  adicionarMusica: function (nome, artista, tempo) {
    const novaMusica = criarMusicas(nome, artista, tempo);  // Cria nova música
    for (let i = this.musicas.length; i > 0; i--) {
      this.musicas[i] = this.musicas[i - 1];  // Desloca todas as músicas uma posição para frente
    }
    this.musicas[0] = novaMusica;  // Insere a nova música na primeira posição
    console.log(`🎶 Música "${nome}" foi adicionada à playlist.`);
  },

  // Remove uma música pelo nome
  removerMusica: function (nome) {
    let index = -1;  // Armazena o índice da música a ser removida
    for (let i = 0; i < this.musicas.length; i++) {
      if (this.musicas[i].nome === nome) {
        index = i;  // Encontra o índice da música
        break;
      }
    }
    if (index === -1) {
      console.log(`⚠️ Música "${nome}" não encontrada.`);
      return;
    }
    // Move as músicas seguintes uma posição para trás
    for (let i = index; i < this.musicas.length - 1; i++) {
      this.musicas[i] = this.musicas[i + 1];
    }
    this.musicas.length--;  // Diminui o tamanho do array
    console.log(`🗑️ Música "${nome}" removida da playlist.`);
  },

  // Move uma música para uma nova posição
  moverMusica: function (nome, novaPosicao) {
    let index = -1;
    for (let i = 0; i < this.musicas.length; i++) {
      if (this.musicas[i].nome === nome) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      console.log(`⚠️ Música "${nome}" não encontrada.`);
      return;
    }
    let musica = this.musicas[index];  // Guarda a música selecionada

    // Remove a música da posição original
    for (let i = index; i < this.musicas.length - 1; i++) {
      this.musicas[i] = this.musicas[i + 1];
    }
    this.musicas.length--;

    // Insere na nova posição
    for (let i = this.musicas.length; i > novaPosicao; i--) {
      this.musicas[i] = this.musicas[i - 1];
    }
    this.musicas[novaPosicao] = musica;
    console.log(`📍 Música "${nome}" movida para a posição ${novaPosicao}.`);
  },

  // Toca todas as músicas da playlist (em sequência)
  tocarPlaylist: function () {
    if (this.musicas.length === 0) {
      console.log("📭 Playlist está vazia.");
      return;
    }
    console.log("▶️ Tocando a playlist completa:");
    for (let i = 0; i < this.musicas.length; i++) {
      this.musicas[i].reproducoes++;  // Incrementa contador de reproduções
      console.log(`🎵 Tocando "${this.musicas[i].nome}" - ${this.musicas[i].artista} (${this.musicas[i].tempo})`);
    }
  },

  // Toca uma música específica pelo nome
  tocarMusica: function (nome) {
    for (let i = 0; i < this.musicas.length; i++) {
      if (this.musicas[i].nome === nome) {
        this.musicas[i].reproducoes++;
        console.log(`🎶 Tocando "${this.musicas[i].nome}" - ${this.musicas[i].artista} (${this.musicas[i].tempo})`);
        return;
      }
    }
    console.log(`❌ Música "${nome}" não encontrada.`);
  },

  // Exibe a playlist atual
  mostrarPlaylist: function () {
    if (this.musicas.length === 0) {
      console.log("📭 Playlist está vazia.");
    } else {
      console.log("📋 Playlist atual:");
      for (let i = 0; i < this.musicas.length; i++) {
        console.log(`${i + 1} - "${this.musicas[i].nome}" - ${this.musicas[i].artista} | Reproduções: ${this.musicas[i].reproducoes}`);
      }
    }
  },

  // Ordena as músicas pelo nome (Bubble Sort)
  ordenarPorNome: function () {
    let n = this.musicas.length;
    let trocado;
    do {
      trocado = false;
      for (let i = 0; i < n - 1; i++) {
        if (this.musicas[i].nome > this.musicas[i + 1].nome) {
          let temp = this.musicas[i];
          this.musicas[i] = this.musicas[i + 1];
          this.musicas[i + 1] = temp;
          trocado = true;
        }
      }
    } while (trocado);
    console.log("🔤 Playlist ordenada por nome.");
  },

  // Ordena as músicas por número de reproduções (Selection Sort)
  ordenarPorReproducoes: function () {
    let n = this.musicas.length;
    for (let i = 0; i < n - 1; i++) {
      let maxIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (this.musicas[j].reproducoes > this.musicas[maxIndex].reproducoes) {
          maxIndex = j;
        }
      }
      let temp = this.musicas[i];
      this.musicas[i] = this.musicas[maxIndex];
      this.musicas[maxIndex] = temp;
    }
    console.log("📈 Playlist ordenada por reproduções.");
  },

  // Pausa a música atual
  pausarMusica: function () {
    let n = this.musicas.length;
    if (n === 0) {
      console.log("🚫 Não há músicas para pausar.");
      return;
    }
    const musica = this.musicas[musicaAtual];
    console.log(`⏸️ Música "${musica.nome}" de ${musica.artista} pausada.`);
  },

  // Pula para a próxima música
  pularMusica: function () {
    let n = this.musicas.length;
    if (n === 0) {
      console.log("🚫 Playlist vazia. Não há músicas para pular.");
      return;
    }
    musicaAtual++;  // Avança para a próxima música
    if (musicaAtual >= n) {
      console.log("🔁 Fim da playlist. Voltando ao início.");
      musicaAtual = 0;  // Volta ao começo da lista
    }
    const musica = this.musicas[musicaAtual];
    console.log(`⏭️ Pulando para: "${musica.nome}" - ${musica.artista} (${musica.tempo})`);
  },

  // Embaralha a ordem das músicas na playlist
  embaralhar: function () {
    let n = this.musicas.length;  // Corrigido: nome certo da propriedade
    // Percorre a lista de trás para frente
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));  // Gera índice aleatório entre 0 e i
      // Troca as posições
      let temp = this.musicas[i];
      this.musicas[i] = this.musicas[j];
      this.musicas[j] = temp;
    }
    console.log("🔀 Playlist embaralhada.");
    musicaAtual = 0;  // Reinicia a reprodução para a primeira posição
  }

};

// Exemplo de uso - Teste das funções
playlist.adicionarMusica("Free", "Natalia", "5:55");
playlist.adicionarMusica("Touch me", "Angelina", "4:55");
playlist.adicionarMusica("Because", "Double You", "3:55");
playlist.adicionarMusica("For You", "Ultranate", "4:35");
playlist.adicionarMusica("Breach", "Nirvana", "3:25");
playlist.adicionarMusica("Zoio de lula", "Charlie Brown Jr", "3:10");

playlist.mostrarPlaylist();
playlist.tocarMusica("Because");
playlist.tocarMusica("Zoio de lula");
playlist.tocarMusica("Zoio de lula");
playlist.tocarMusica("Zoio de lula");
playlist.tocarPlaylist();
playlist.moverMusica("Breach", 2);
playlist.tocarMusica("Breach");
playlist.mostrarPlaylist();
playlist.removerMusica("Because");
playlist.mostrarPlaylist();
playlist.ordenarPorNome();
playlist.mostrarPlaylist();
playlist.ordenarPorReproducoes();
playlist.mostrarPlaylist();
playlist.tocarMusica("For You");
playlist.pausarMusica();
playlist.pularMusica();
playlist.embaralhar();
playlist.mostrarPlaylist();
