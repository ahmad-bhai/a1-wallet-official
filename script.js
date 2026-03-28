import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, set, update, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD4PziIAJ-xFC1d708iIdqTof4F9nkLq3c",
    authDomain: "dollar-exchange-a5f4d.firebaseapp.com",
    projectId: "dollar-exchange-a5f4d",
    databaseURL: "https://dollar-exchange-a5f4d-default-rtdb.firebaseio.com",
    appId: "1:528463020935:web:b4e9f82da4a1eb822c0922"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user || { id: "777", first_name: "Demo", username: "user" };

// Global Toast Function
window.showUIFeedback = (msg) => {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.classList.add('show-toast');
    setTimeout(() => t.classList.remove('show-toast'), 3000);
};

// Sync Balance
if(document.getElementById('balance-display')) {
    onValue(ref(db, 'users/' + user.id), (snap) => {
        const data = snap.val();
        document.getElementById('balance-display').innerText = "$" + (data?.balance || 0).toFixed(2);
        document.getElementById('u_name').innerText = user.first_name;
        document.getElementById('u_user').innerText = "@" + user.username;
        document.getElementById('u_id').innerText = user.id;
    });
}

export { db, ref, get, set, update, user };
