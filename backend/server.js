
require('dotenv').config(); // .env dosyasını yükler

const express = require('express'); // express modülü dail ediliyor
const fs = require('fs'); // dosya sistemi modülü dail ediliyor
const cors = require('cors'); // CORS modülü dail ediliyor
const path = require('path');
const { error } = require('console');

const app = express();
app.use(cors()); // CORS ara katmanı ekleniyor
app.use(express.json()); // JSON verilerini işlemek için ara katman ekleniyor

const TARGET_PATH = `/home/bluetech/target.json`;
const RESPONSES_PATH = process.env.RESPONSES_PATH || `/home/bluetech/responses.json`;

function readJson(p) {
    return new Promise((resolve, reject) => {
        fs.readFile(p, `utf-8`, (err, data) => {
            if (err) return reject(err);
            try { resolve(JSON.parse(data)); }
            catch (e) { reject(e);}
        });
    });
}

function writeJson(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(data, null, 2), `utf-8`, (eErr) => {
            if (Err) return reject(Err);
            else resolve();
        });
    });
}

// mac format kontrolü
const MAC_REGEX = /^([0-9A-Fa-f]{2}:){2,5}[0-9A-Fa-f]{2}$/;

// değişken eşleştirme(set/read komutları için)
const VAR_MAP =  { tel_num: 9, comp_url: 10, app_url: 11, play_url: 12 };


app.get(`/`, (_, res) => {
  res.send('Sunucu çalışıyor');
});

// mac güncelleme
app.post('/api/update-target', async (req, res) => {
  const { newTarget } = req.body;
  if (!newTarget || !MAC_REGEX.test(newTarget)) {
    return res.status(400).json({ error: 'Geçersiz veya eksik MAC adresi' });
  }

  try {
    const data = await readJson(TARGET_PATH);
    data.target = newTarget;
    await writeJson(TARGET_PATH, data);
    console.log(`✅ target.json güncellendi → ${newTarget}`);
    res.json({ message: 'Başarılı', newTarget });
  } catch (e) {
    console.error('update-target hata:', e);
    res.status(500).json({ error: 'target.json yazılamadı' });
  }
});


// komut gönderme (esp ye teslimat)
app.post(`/api/send-command`, async (req, res) => {
    const { type, variable, value } = req.body;
    const varCode = typeof variable === `number` ? variable : VAR_MAP[variable];
    if (!type || (type !== `set` && type !== `read`)) {
        return res.status(400).json({ message: `Geçersiz komut tipi.` });
    }

    if (![9, 10, 11, 12].includes(varCode)) {
        return res.status(400).json({ message: `Geçersiz değişken.` });
    }

    let frame;
    if (type === `set`) {
        if (!value) return res.status(400).json({ message: `set için değer gerekli.` });
        const cleanValue = varCode === 9 ? value.replace(/[^0-9]/g, '') : value;
        frame = `frame 1 ${varCode} ${cleanValue}`;
    } else if (type === `read`) {
        frame = `frame 2 ${varCode}`;
    }

    try {
        const data = await readJson(TARGET_PATH);
        data.send_message = frame
        await writeJson(TARGET_PATH, data);
        console.log(`komut gönderildi  ${frame}`);
        res.json({message: `komut gönderildi`, frame});
    } catch (e) {
        console.error(`send-command hata:`, e);
        res.status(500).json({ error: `Komut gönderilemedi.` });
    } 
    });

// esp cevaplarını alma
app.get(`/api/get-status`, async(_, res) => {
    try{
        const data = await readJson(RESPONSES_PATH);
        const msg = data.message_response?.[data.message_response.length - 1] ?? null;
        const status = data.status_response ?? null;
        res.json({
            message_response: msg,
            status_response: status
        });
    } catch (e) {
       if (e.code === 'ENOENT') {
        return res.json({
            message_response: null,
            status_response: null
        });
       }
       console.error(`get-status hata:`, e);
       res.status(500).json({ error: `responses.json okunamadı`});
    }
});
        
const PORT = 8005;
app.listen(PORT, `0.0.0.0`, () => {
  console.log(`Server çalışıyor: http://192.168.1.45:${PORT}`);
});