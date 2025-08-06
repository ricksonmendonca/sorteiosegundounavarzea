const jogadoresData = [
  { nome: "Klaison", estrela: 3, goleiro: true, foto: "assets/klaison.jpeg" },
  { nome: "Batata", estrela: 2, goleiro: true, foto: "assets/BATATA.jpg" },
  { nome: "Fiuza", estrela: 4, foto: "assets/fiuza.jpeg" },
  { nome: "Guerron", estrela: 3, foto: "assets/Guerron.jpeg" },
  { nome: "João Marcos", estrela: 2, foto: "assets/João Marcos.jpeg" },
  { nome: "Kevin", estrela: 4, foto: "assets/Kevin.jpeg" },
  { nome: "Léo", estrela: 2, foto: "assets/leo.jpeg" },
  { nome: "Marcelinho", estrela: 5, foto: "assets/Marcelinho.jpg" },
  { nome: "Muniz", estrela: 3, foto: "assets/Muniz.jpeg" },
  { nome: "Ney", estrela: 4, foto: "assets/Ney.jpeg" },
  { nome: "Nicolas", estrela: 2, foto: "assets/Nicolas.jpeg" },
  { nome: "Paulinho", estrela: 2, foto: "assets/Paulinho.jpeg" },
  { nome: "Pedro Queiroz", estrela: 3, foto: "assets/pedro queiroz.jpeg" },
  { nome: "Pelanca", estrela: 4, foto: "assets/Pelanca.jpeg" },
  { nome: "Rickson", estrela: 5, foto: "assets/RICKSON.png" },
  { nome: "Roninho", estrela: 3, foto: "assets/roninho.jpeg" },
  { nome: "Ruan", estrela: 2, foto: "assets/Ruan.jpeg" },
  { nome: "Senegal", estrela: 2, foto: "assets/Senegal.jpg" },
  { nome: "Thalles", estrela: 4, foto: "assets/Thales.jpeg" },
  { nome: "Yago", estrela: 3, foto: "assets/Yago.jpeg" }
];

let selecionados = [];

function renderJogadores(lista = jogadoresData) {
  const container = document.getElementById("jogadores");
  container.innerHTML = "";
  lista.forEach(j => {
    const div = document.createElement("div");
    div.className = "jogador";
    div.onclick = () => toggleJogador(j.nome);
    if (selecionados.includes(j.nome)) div.classList.add("selected");

    div.innerHTML = `
      <img src="\${j.foto}" alt="\${j.nome}" />
      <div>\${j.nome}</div>
      <div>★ \${j.estrela}</div>
    `;
    container.appendChild(div);
  });
}

function toggleJogador(nome) {
  if (selecionados.includes(nome)) {
    selecionados = selecionados.filter(n => n !== nome);
  } else {
    selecionados.push(nome);
  }
  renderJogadores();
}

function toggleAll(marcar) {
  selecionados = marcar ? jogadoresData.map(j => j.nome) : [];
  renderJogadores();
}

function filtrar(tipo) {
  if (tipo === "goleiro") {
    renderJogadores(jogadoresData.filter(j => j.goleiro));
  } else if (tipo === "estrela") {
    renderJogadores(jogadoresData.filter(j => j.estrela >= 4));
  }
}

document.getElementById("search").addEventListener("input", e => {
  const termo = e.target.value.toLowerCase();
  renderJogadores(jogadoresData.filter(j => j.nome.toLowerCase().includes(termo)));
});

document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("light");
};

function sortearTimes() {
  const n = parseInt(document.getElementById("numTeams").value);
  const selecionadosInfo = jogadoresData.filter(j => selecionados.includes(j.nome));
  const embaralhado = selecionadosInfo.sort(() => 0.5 - Math.random());

  const times = Array.from({ length: n }, () => []);
  let i = 0;

  const resultadoDiv = document.getElementById("resultados");
  resultadoDiv.innerHTML = "";

  function animar(index) {
    if (index >= embaralhado.length) return;

    const jogador = embaralhado[index];
    times[i % n].push(jogador);
    i++;

    resultadoDiv.innerHTML = "";
    times.forEach((time, idx) => {
      const div = document.createElement("div");
      div.className = "time";
      div.innerHTML = `<h2>Time ${idx + 1}</h2>` + time.map(j => `<div>⚽ ${j.nome} (${j.estrela})</div>`).join("");
      resultadoDiv.appendChild(div);
    });

    setTimeout(() => animar(index + 1), 300);
  }

  animar(0);
}

function exportarPDF() {
  alert("Função PDF em desenvolvimento.");
}

window.onload = () => renderJogadores();