// Firebase App ve Auth modüllerini içe aktar
import { initializeApp, getApps } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdEyLQDPYQqTZv8dpr-cBB3_xp8ii6PSo",
  authDomain: "zamradar-82be6.firebaseapp.com",
  projectId: "zamradar-82be6",
  storageBucket: "zamradar-82be6.firebasestorage.app",
  messagingSenderId: "1049046937186",
  appId: "1:1049046937186:web:ae8b53a882e3cf12416b3b",
  measurementId: "G-74DRG8XYHY",
};
// ✅ Firebase App başlatılıyor
console.log("🔄 Firebase App başlatılıyor...");
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
console.log(
  "✅ Firebase App durumu:",
  getApps().length === 0 ? "Yeni başlatıldı" : "Zaten başlatılmış"
);
console.log("📦 Firebase App adı:", app.name);
console.log("📁 Firebase App options:", app.options);

// ✅ Firebase Auth başlatılıyor
let auth;

try {
  console.log("🧪 initializeAuth başlatılıyor...");
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  console.log("✅ Firebase Auth initializeAuth ile başlatıldı.");
} catch (error) {
  console.warn(
    "⚠️ initializeAuth başarısız oldu, getAuth() ile devam ediliyor..."
  );
  console.error("🚨 Hata detayı:", error);
  auth = getAuth(app);
  console.log("✅ getAuth ile mevcut Firebase Auth  alındı.");
}

// 🧪 Auth kontrolü
if (auth) {
  console.log("🔐 Firebase Auth başarıyla ayarlandı.");
  console.log(
    "ℹ️ Kullanıcı oturum kalıcılığı:",
    auth.persistenceManager ? "AsyncStorage" : "Bellek"
  );
} else {
  console.error("❌ Firebase Auth başlatılamadı!");
}

// 📤 App ve Auth dışa aktarılıyor
export { app, auth };
