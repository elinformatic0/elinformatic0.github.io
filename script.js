body {
  margin: 0;
  background: linear-gradient(180deg, #0b0f1a, #020617);
  color: white;
  font-family: Arial;
}

.container {
  text-align: center;
  padding: 20px;
}

/* BOTONES PRO */
button {
  padding: 12px;
  margin: 8px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: #1e293b;
  color: white;
  transition: all 0.2s;
}

button:hover {
  transform: scale(1.1);
  background: #334155;
}

.btn-main {
  font-size: 30px;
  background: gold;
  color: black;
}

/* PANEL */
.panel {
  margin-top: 20px;
}

/* MODALES */
.modal {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #020617;
  padding: 30px;
  border: 2px solid #334155;
  border-radius: 10px;
}

/* RAREZAS */
.comun { color: gray; }
.epico { color: violet; }
.legendario { color: gold; }
.mitico { color: cyan; }

.hidden { display: none; }

/* ANIMACIÓN COFRE */
#lootAnim {
  font-size: 40px;
  animation: spin 0.5s infinite;
}

@keyframes spin {
  0% {transform: rotate(0);}
  100% {transform: rotate(360deg);}
}

/* SHAKE */
@keyframes shake {
  0% {transform: translate(0);}
  50% {transform: translate(10px);}
  100% {transform: translate(0);}
}

.shake {
  animation: shake 0.2s infinite;
}
