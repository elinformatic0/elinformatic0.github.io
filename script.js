let game = {
  money: 0,
  perClick: 1,
  auto: 0,
  rebirths: 0
};

// mejoras (se pueden ampliar fácil)
let mejoras = [
  { nombre: "Cursor", coste: 10, tipo: "auto", valor: 1 },
  { nombre: "Fábrica", coste: 100, tipo: "auto", valor: 5 },
  { nombre: "Click Pro", coste: 50, tipo: "click", valor: 2 },
];

const moneyEl = document.getElementById("money");
const perClickEl = document.getElementById("perClick");
const autoEl = document.getElementById("auto");
const rebirthEl = document.getElementById("rebirths");
const shopEl = document.getElementById("shop");

// click manual
document.getElementById("clickBtn").onclick = () => {
  game.money += game.perClick * (1 + game.rebirths * 0.5);
  update();
};

// auto generación
setInterval(() => {
  game.money += game.auto;
  update();
}, 1000);

// tienda
function renderShop() {
  shopEl.innerHTML = "";

  mejoras.forEach((m, i) => {
    let btn = document.createElement("button");
    btn.textContent = `${m.nombre} (+${m.valor}) - ${m.coste}`;
    
    btn.onclick = () => comprar(i);

    shopEl.appendChild(btn);
  });
}

function comprar(i) {
  let m = mejoras[i];

  if (game.money >= m.coste) {
    game.money -= m.coste;

    if (m.tipo === "auto") game.auto += m.valor;
    if (m.tipo === "click") game.perClick += m.valor;

    // sube el precio (esto engancha bastante)
    m.coste = Math.floor(m.coste * 1.5);

    update();
    renderShop();
  }
}

// rebirth
function rebirth() {
  if (game.money >= 1000) {
    game.money = 0;
    game.perClick = 1;
    game.auto = 0;
    game.rebirths++;

    mejoras.forEach(m => m.coste = Math.floor(m.coste / 2));

    update();
  }
}

// UI
function update() {
  moneyEl.textContent = Math.floor(game.money);
  perClickEl.textContent = game.perClick;
  autoEl.textContent = game.auto;
  rebirthEl.textContent = game.rebirths;

  guardar();
}

// guardado (clave para enganchar)
function guardar() {
  localStorage.setItem("clickerSave", JSON.stringify(game));
}

// cargar partida
function cargar() {
  let save = JSON.parse(localStorage.getItem("clickerSave"));
  if (save) game = save;
}

cargar();
renderShop();
update();
