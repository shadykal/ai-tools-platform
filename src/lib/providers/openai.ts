export async function generateImage(prompt: string, size = '1024x1024') {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY not set');

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ prompt, n: 1, size }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI image generation failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  // The API returns either a URL or base64 image depending on account; normalize result
  const obj = data?.data?.[0];
  if (!obj) throw new Error('No image returned from OpenAI');

  return obj;
}
