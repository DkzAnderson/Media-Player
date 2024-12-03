import { openDB } from 'idb';

// Configuración de la base de datos
export const initDB = async () => {
  return openDB('MusicPlayerDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('audioFiles')) {
        db.createObjectStore('audioFiles', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// Función para agregar archivos
export const addAudioFiles = async (files: File[]) => {
  const db = await initDB();
  const tx = db.transaction('audioFiles', 'readwrite');
  const store = tx.objectStore('audioFiles');

  // Guardamos cada archivo en IndexedDB
  for (const file of files) {
    await store.add({ name: file.name, file });
  }

  await tx.done;
};

// Función para obtener archivos
export const getAudioFiles = async () => {
  const db = await initDB();
  const tx = db.transaction('audioFiles', 'readonly');
  const store = tx.objectStore('audioFiles');
  return await store.getAll();
};
