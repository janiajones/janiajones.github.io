//required modules
const express = require('express'); // building web servers
const cors = require('cors'); // frontend to backend)

const { OpenAI } = require('openai'); // Imports OpenAI SDK to talk to GPT

const app = express(); 
const PORT = 3000; 

const openai = new OpenAI({ 
  apiKey: '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' 
}); 

app.use(cors()); // allow frontend to access this server
app.use(express.json()); // Parse incoming JSON in request bodies

// POST endpoint to get health article links from a user message
app.post('/api/keywords', async (req, res) => {
  const { text } = req.body; // user input from the frontend

  const prompt = `You are a helpful medical assistant. 
  Find 10 recent and reliable health-related articles based on the user's message below. 
  Only include articles from consumer-friendly sites like Healthline, WebMD, Medical News Today, Mayo Clinic, Cleveland Clinic, or similar trusted health blogs. 
  Respond with a valid JSON array of 10 objects. Each object should include: "id", "title", "description", and "url". Make sure the links are real and currently accessible.
User message: "${text}"
`;

  try {
    // Send the prompt to OpenAI GPT-4 model and wait for the response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7, // Controls randomness of GPT's response
    });
    console.log('✅ Received response from OpenAI');

    const responseText = completion.choices[0].message.content; //actual text from GPT's response

    // Try to locate the JSON array in the response 
    const jsonStart = responseText.indexOf('[');
    const jsonEnd = responseText.lastIndexOf(']');

    if (jsonStart === -1 || jsonEnd === -1) {  // If no JSON found, throw an error
      console.error('❌ No JSON array found in response');
      throw new Error('Invalid response format from OpenAI');
    }

    // Extract the JSON part from the full text
    const articlesRaw = responseText.substring(jsonStart, jsonEnd + 1);
    const parsedArticles = JSON.parse(articlesRaw); // Parse the JSON string into a JavaScript array
    
    console.log('Final processed articles:', articles);
    res.json({ articles }); // Send the articles back to the frontend
  } catch (error) {
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: 'Failed to fetch articles from GPT.' });
  }
});
app.listen(PORT, () => { // starting  server
  console.log(`Server running at http://localhost:${PORT}`);
});
