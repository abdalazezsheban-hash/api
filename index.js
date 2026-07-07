export default async function handler(req, res) {
  // 1. استقبال الطلب من برنامجك
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. استخدام مكتبة node-fetch لجلب الرد من Hugging Face
  const fetch = (await import('node-fetch')).default;

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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', // مفتاحك
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    
    // 3. إرسال الرد إلى تطبيقك
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
