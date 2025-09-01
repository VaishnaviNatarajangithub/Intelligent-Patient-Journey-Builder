import axios from "axios";

export const generateAIReport = async (diagnosis, prescriptions, labResults, notes) => {
  try {
    const prompt = `
    You are a medical assistant AI.
    Based on the following patient information, generate a descriptive summary:

    Diagnosis: ${diagnosis}
    Prescriptions: ${prescriptions.join(", ")}
    Lab Results: ${labResults.join(", ")}
    Doctor Notes: ${notes}

    Provide a clear, patient-friendly summary with insights.
    `;

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-large", 
      { inputs: prompt },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );

    return response.data[0]?.generated_text || "AI could not generate report.";
  } catch (error) {
    console.error("AI Error:", error.message);
    return "Error generating AI insights.";
  }
};
