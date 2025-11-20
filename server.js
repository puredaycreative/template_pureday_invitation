import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const port = 3003;

// CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://pureday-invitation.vercel.app']
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

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
