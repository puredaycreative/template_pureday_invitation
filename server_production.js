import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();

// CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://pureday-invitation.vercel.app','https://www.puredayinvitation.my.id', 'https://puredayinvitation.my.id']
}));

app.use(express.json());

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
