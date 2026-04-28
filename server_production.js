import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';

const app = express();

// CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://pureday-invitation.vercel.app','https://www.puredayinvitation.my.id', 'https://puredayinvitation.my.id', 'https://res.cloudinary.com','https://template-pureday-invitation.vercel.app']
}));

app.use(express.json());
app.get('/api/get-music', (req, res) => {
    // Gunakan __dirname agar path absolut ke folder music benar
    const directoryPath = path.join(__dirname, 'music');
    
    try {
        if (!fs.existsSync(directoryPath)) {
            return res.status(404).json({ error: "Folder music tidak ditemukan" });
        }

        const files = fs.readdirSync(directoryPath);
        const mp3Files = files.filter(file => file.endsWith('.mp3'));
        res.status(200).json(mp3Files);
    } catch (err) {
        res.status(500).json({ error: "Gagal membaca folder musik" });
    }
});

// __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static folder untuk templates
app.use(express.static(path.join(__dirname, 'templates')));

// Static folder untuk music
app.use('/music', express.static(path.join(__dirname, 'music')));

// Route index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Route untuk templates dinamis
app.get('/:name', (req, res) => {
  const { name } = req.params;

  res.sendFile(
    path.join(__dirname, 'templates',`${name}`, `${name}.html`),
    (err) => {
      if (err) {
        res.status(404).send('File tidak ditemukan!');
      }
    }
  );
});

// **Vercel hanya perlu export app, tidak listen port**
export default app;
