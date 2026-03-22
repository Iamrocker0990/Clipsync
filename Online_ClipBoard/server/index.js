import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';

const app = express();
const PORT = process.env.PORT || 5000;

// Content storage: Map<code, { content, expiry }>
const store = new Map();

// Expiry time: 10 minutes by default
const DEFAULT_EXPIRY = 10 * 60 * 1000; 

app.use(cors());
app.use(express.json());

// Root route/Health check
app.get('/', (req, res) => {
  res.send('🚀 ClipSync API is live and running.');
});

// Content cleanup function
const scheduleCleanup = (code, delay) => {
  setTimeout(() => {
    if (store.has(code)) {
      console.log(`[Expiry] Removing expired clip: ${code}`);
      store.delete(code);
    }
  }, delay);
};

// POST: Send content
app.post('/api/send', (req, res) => {
  const { content, expiry = DEFAULT_EXPIRY } = req.body;

  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Content is required and must be a string.' });
  }

  // Generate a unique 6-character code
  const code = nanoid(6).toUpperCase();
  
  // Store the clip
  store.set(code, {
    content,
    createdAt: Date.now(),
    expiresAt: Date.now() + expiry
  });

  // Schedule deletion
  scheduleCleanup(code, expiry);

  console.log(`[Send] New clip created: ${code}`);
  return res.json({ code, expiresAt: Date.now() + expiry });
});

// GET: Receive content
app.get('/api/receive/:code', (req, res) => {
  const { code } = req.params;
  const uppercaseCode = code.toUpperCase();

  const clip = store.get(uppercaseCode);

  if (!clip) {
    return res.status(404).json({ error: 'Clip not found or already expired.' });
  }

  // Content found
  console.log(`[Receive] Clip retrieved: ${uppercaseCode}`);
  
  return res.json({ 
    content: clip.content,
    expiresAt: clip.expiresAt
  });
});

// Clean up expired entries every 5 minutes as a fallback
setInterval(() => {
  const now = Date.now();
  for (const [code, clip] of store.entries()) {
    if (clip.expiresAt < now) {
      store.delete(code);
      console.log(`[Cleanup] Background removal: ${code}`);
    }
  }
}, 5 * 60 * 1000);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 ClipSync Backend running at http://0.0.0.0:${PORT}`);
});
