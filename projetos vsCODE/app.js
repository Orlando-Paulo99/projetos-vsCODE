/** importaçôes do Firebase */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  /** bibliotecas */
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import {
  /**auteticaçâo para criar novos usuário diretamento do site */
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Configuração Firebase
//codigo do console
const firebaseConfig = {
  apiKey: "AIzaSyAuYldNTogvCYSpiD38QgZcKr1GsNxNvJ0",
  authDomain: "newtest-32d92.firebaseapp.com",
  projectId: "newtest-32d92",
  storageBucket: "newtest-32d92.appspot.com",
  messagingSenderId: "130124189100",
  appId: "1:130124189100:web:bb93b6cdb324c3d3087e09",
  measurementId: "G-DSMT5WNWQN"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const usuariosRef = collection(db, "usuarios");

// DOM
const form = document.getElementById("formUsuario");
const primeiroNomeInput = document.getElementById("pNome");
const sobrenomeInput = document.getElementById("sNome");
const emailInput = document.getElementById("mail");
const senhaInput = document.getElementById("senha");
const confirmarSenhaInput = document.getElementById("confirmarSenha");
const botaoVer = document.getElementById("ver");

// Submeter cadastro
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (senhaInput.value !== confirmarSenhaInput.value) {
    alert("As senhas não coincidem.");
    return;
  }

  else{
        alert("Cadastro realizado");

  }

  try {
    // Cria usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      emailInput.value,
      senhaInput.value
    );

    const user = userCredential.user;

    // Salva dados complementares no Firestore
    await addDoc(usuariosRef, {
      uid: user.uid,
      nome: primeiroNomeInput.value,
      sobrenome: sobrenomeInput.value,
      email: emailInput.value
    });

    // Limpa o formulário
    primeiroNomeInput.value = "";
    sobrenomeInput.value = "";
    emailInput.value = "";
    senhaInput.value = "";
    confirmarSenhaInput.value = "";

    alert("Usuário registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    alert("Erro ao cadastrar: " + error.message);
  }
});

// Ver usuários cadastrados (opcional)
botaoVer.addEventListener("click", async (e) => {
  e.preventDefault();
  const snapshot = await getDocs(usuariosRef);
  console.clear();
  snapshot.forEach(doc => console.log(doc.id, doc.data()));
});
