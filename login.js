import { auth, db, signInWithEmailAndPassword, doc, getDocs, collection, query, where } from "./firebase-config.js";

const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    errorMsg.style.display = 'none';

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        
        let role = "user";
        
        querySnapshot.forEach((doc) => {
            role = doc.data().role;
        });

        if (role === "admin") {
            window.location.href = "dashboard.html"; // سيوجهك إلى ملف dashboard المتاح عندك حالياً
        } else {
            window.location.href = "delegate-dashboard.html"; 
        }

    } catch (error) {
        console.error("خطأ أثناء تسجيل الدخول:", error);
        errorMsg.style.display = 'block';
    }
});
