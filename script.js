
const jogadores = [
  { nome: "BATATA", estrela: 3, goleiro: true, foto: "BATATA.jpg" },
  { nome: "Klaison", estrela: 4, goleiro: true, foto: "default.jpg" },
  { nome: "Ruan", estrela: 5, goleiro: false, foto: "default.jpg" },
  { nome: "Senegal", estrela: 4, goleiro: false, foto: "default.jpg" }
];

function sortear() {
  const qtdTimes = parseInt(document.getElementById("qtdTimes").value);
  const embaralhados = jogadores.sort(() => Math.random() - 0.5);
  const times = Array.from({ length: qtdTimes }, () => []);
  embaralhados.forEach((jogador, i) => {
    times[i % qtdTimes].push(jogador);
  });

  const container = document.getElementById("times");
  container.innerHTML = "";
  times.forEach((time, idx) => {
    const bloco = document.createElement("div");
    bloco.innerHTML = `<h3>Time ${idx + 1}</h3>`;
    time.forEach(j => {
      const card = `
        <div class="card">
          <img src="${j.foto}" alt="foto" />
          <div>${j.nome}</div>
          <div>★ ${j.estrela}</div>
        </div>`;
      bloco.innerHTML += card;
    });
    container.appendChild(bloco);
  });
}

function alternarTema() {
  document.body.classList.toggle("dark");
}
