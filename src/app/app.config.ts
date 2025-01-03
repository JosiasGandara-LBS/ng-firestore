import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions()), provideFirebaseApp(() => initializeApp({"projectId":"testing-tres-islas","appId":"1:412195379396:web:400cf7c9d7bc131bfa9191","storageBucket":"testing-tres-islas.firebasestorage.app","apiKey":"AIzaSyBJP9cEDma41YiT53JJjsj8h8NLmqz_YMw","authDomain":"testing-tres-islas.firebaseapp.com","messagingSenderId":"412195379396"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"testing-tres-islas","appId":"1:412195379396:web:400cf7c9d7bc131bfa9191","storageBucket":"testing-tres-islas.firebasestorage.app","apiKey":"AIzaSyBJP9cEDma41YiT53JJjsj8h8NLmqz_YMw","authDomain":"testing-tres-islas.firebaseapp.com","messagingSenderId":"412195379396"})), provideStorage(() => getStorage())]
};
