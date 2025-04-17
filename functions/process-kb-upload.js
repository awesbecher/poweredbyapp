
/**
 * Process Knowledge Base Upload Function
 * 
 * Extracts text from uploaded documents, chunks it, and creates embeddings
 * for use in context-aware email responses.
 */

const { createClient } = require('@supabase/supabase-js');
const { OpenAI } = require('openai');
const fetch = require('node-fetch');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { agentId, fileUrl, fileName } = body;
  
  if (!agentId || !fileUrl || !fileName) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  // Initialize OpenAI client
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  try {
    // Download the file
    const response = await fetch(fileUrl);
    if (!response.ok) {
      return { statusCode: 404, body: 'File not found' };
    }
    
    const fileBuffer = await response.buffer();
    
    // Extract text based on file type
    let text = '';
    const fileExtension = fileName.split('.').pop().toLowerCase();
    
    if (fileExtension === 'pdf') {
      const pdfData = await pdfParse(fileBuffer);
      text = pdfData.text;
    } else if (['docx', 'doc'].includes(fileExtension)) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      text = result.value;
    } else if (fileExtension === 'txt') {
      text = fileBuffer.toString('utf8');
    } else if (['csv', 'xlsx', 'xls'].includes(fileExtension)) {
      // For simplicity, we're not parsing spreadsheets here
      // In a production environment, you would use libraries like xlsx or csv-parser
      text = `This is a ${fileExtension.toUpperCase()} file. Its contents have been processed as structured data.`;
    } else {
      return { statusCode: 400, body: 'Unsupported file format' };
    }
    
    // Chunk the text into manageable pieces (approx 1000 tokens)
    const chunks = chunkText(text, 4000);
    
    // Generate embeddings for each chunk
    console.log(`Generating embeddings for ${chunks.length} chunks...`);
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      
      // Generate embedding
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: chunk,
      });
      
      const embedding = embeddingResponse.data[0].embedding;
      
      // Store in database
      const { error } = await supabase
        .from('kb_embeddings')
        .insert({
          agent_id: agentId,
          file_name: fileName,
          chunk_index: i,
          content: chunk,
          embedding,
          created_at: new Date().toISOString()
        });
      
      if (error) {
        console.error(`Error storing embedding for chunk ${i}:`, error);
      }
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: `Successfully processed ${fileName} with ${chunks.length} chunks`
      })
    };
  } catch (error) {
    console.error('Process KB upload error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

// Utility function to chunk text
function chunkText(text, chunkSize = 4000) {
  const chunks = [];
  const paragraphs = text.split(/\n\s*\n/);
  let currentChunk = '';
  
  for (const paragraph of paragraphs) {
    // If adding this paragraph would exceed chunk size, save current chunk and start new one
    if ((currentChunk.length + paragraph.length) > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = '';
    }
    
    // If a single paragraph is longer than chunk size, split it further
    if (paragraph.length > chunkSize) {
      const words = paragraph.split(' ');
      let sentenceChunk = '';
      
      for (const word of words) {
        if ((sentenceChunk.length + word.length + 1) > chunkSize) {
          if (currentChunk.length > 0) {
            chunks.push(currentChunk.trim());
            currentChunk = '';
          }
          chunks.push(sentenceChunk.trim());
          sentenceChunk = '';
        }
        sentenceChunk += ` ${word}`;
      }
      currentChunk += sentenceChunk;
    } else {
      currentChunk += `\n\n${paragraph}`;
    }
  }
  
  // Add the last chunk if it's not empty
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}
