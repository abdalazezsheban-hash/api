const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// استخدام Middleware لتحليل طلبات JSON
app.use(express.json());

// مسار الـ API الذي سيتصل به تطبيقك
app.post('/api/chat', async (req, res) => {
  // استيراد node-fetch بطريقة متوافقة مع إصدارات Node الحديثة
  const fetch = (await import('node-fetch')).default;
  
  try {
    // التأكد من وجود المفتاح في إعدادات البيئة (Environment Variables)
    const apiKey = process.env.HUGGING_FACE_TOKEN;
    
    if (!apiKey) {
      return res.status(500).json({ error: "API Key is missing in server settings" });
    }

    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
      method: 'POST',
      headers: {
     'Authorization': Bearer ${`hf_kapWAYzktgNvoFEDqXlygPxOKKKoXqmbT`},
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    
    // إرسال رد Hugging Face إلى تطبيقك
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// بدء السيرفر
app.listen(port, () => {
  console.log(Server running on port ${port});
});
