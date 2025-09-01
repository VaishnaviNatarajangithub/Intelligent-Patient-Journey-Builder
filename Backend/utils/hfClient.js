// utils/hfClient.js
import fetch from "node-fetch";

const HF_API = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

export async function hfSummarize(text, params = { max_length: 120, min_length: 30 }) {
  if (!process.env.HF_API_KEY) throw new Error("HF_API_KEY missing in env");

  try {
    const res = await fetch(HF_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text, parameters: params }),
    });

    const json = await res.json();

    if (Array.isArray(json) && json[0]?.summary_text) return json[0].summary_text;
    if (json.summary_text) return json.summary_text;
    if (json.error) throw new Error(json.error);

    return null;
  } catch (err) {
    console.error("HF summarize error:", err.message || err);
    throw err;
  }
}
