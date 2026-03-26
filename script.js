let game = {
  money: 0,
  perClick: 1,
  auto: 0,
  clicks: 0,
  lastSave: Date.now(),
  admins: []
};

const ADMIN_HASHES = [
  "8f0e2f6b9f6a2d3a3c6f0b4d9a2c1e7f6b0f5e8d9c7a1b2c3d4e5f6a7b8c9d0"
];

async function hash(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// ADMIN LOGIN
document.addEventListener("keydown", async (e) => {
  if (e.key === "º") {
    let code = prompt("Admin:");
    let h = await hash(code);

    if (ADMIN_HASHES.includes(h)) {
      game.admins.push("admin");
      alert("👑 Admin activado");
    }
  }
});

// CLICK
document.getElementById("clickBtn").onclick = () => {
  game.money += game.perClick;
  game.clicks++;
  update();
};

// COFRE PRO
function abrirCofre() {
  if (game.money < 100) return;

  game.money -= 100;

  let box = document.getElementById("lootBox");
  let anim = document.getElementById("lootAnim");
  let result = document.getElementById("loot");

  box.classList.remove("hidden");

  let icons = ["⚪","🟣","🟡","🌈"];
  let i = 0;

  let spin = setInterval(()=>{
    anim.innerText = icons[i++ % icons.length];
  },100);

  setTimeout(()=>{
    clearInterval(spin);
    box.classList.add("hidden");

    let r = Math.random();

    document.body.classList.remove("shake");

    if (r < 0.6) {
      game.perClick += 2;
      result.innerHTML = "⚪ Común +2 click";
      result.className = "comun";

    } else if (r < 0.9) {
      game.auto += 3;
      result.innerHTML = "🟣 Épico +3 auto";
      result.className = "epico";

    } else if (r < 0.995) {
      game.perClick *= 2;
      result.innerHTML = "🟡 LEGENDARIO x2";
      result.className = "legendario";
      document.body.classList.add("shake");

    } else {
      game.perClick *= 5;
      game.auto *= 5;
      result.innerHTML = "🌈 MÍTICO x5 TODO";
      result.className = "mitico";
      document.body.classList.add("shake");
    }

    update();

  },2000);
}

// HABILIDADES
function toggleSkills() {
  document.getElementById("skills").classList.toggle("hidden");
}

function skill(tipo) {
  if (game.money < 500) return;

  game.money -= 500;

  if (tipo === "click") game.perClick *= 2;
  else game.auto *= 2;

  update();
}

// PROBABILIDADES
function toggleRates() {
  document.getElementById("rates").classList.toggle("hidden");
}

// AUTO
setInterval(()=>{
  game.money += game.auto;
  update();
},1000);

// GUARDADO
function guardar() {
  game.lastSave = Date.now();
  localStorage.setItem("ultimateClicker", JSON.stringify(game));
}

function cargar() {
  let save = JSON.parse(localStorage.getItem("ultimateClicker"));
  if (save) {
    let diff = (Date.now() - save.lastSave)/1000;
    save.money += save.auto * diff;
    game = save;
  }
}

// UPDATE
function update() {
  document.getElementById("money").innerText = Math.floor(game.money);
  document.getElementById("perClick").innerText = game.perClick;
  document.getElementById("auto").innerText = game.auto;
  document.getElementById("clicks").innerText = game.clicks;

  guardar();
}

// INIT
cargar();
update();
