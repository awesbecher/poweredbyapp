
/**
 * Process Knowledge Base Upload Function
 * 
 * Extracts text from uploaded documents, chunks it, and creates embeddings
 * for use in context-aware email responses.
 */

const { createClient } = require('@supabase/supabase-js');
const { OpenAI } = require('openai');
const fetch = require('node-fetch');
// Explicitly require pdf-parse and mammoth as CommonJS modules
const pdfParse = require('pdf-parse/index.js');
const mammoth = require('mammoth/index.js');

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

  console.log(`Processing knowledge base file: ${fileName} for agent ${agentId}`);

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
    console.log(`Downloaded file, size: ${fileBuffer.length} bytes`);
    
    // Extract text based on file type
    let text = '';
    const fileExtension = fileName.split('.').pop().toLowerCase();
    
    if (fileExtension === 'pdf') {
      const pdfData = await pdfParse(fileBuffer);
      text = pdfData.text;
      console.log(`Extracted ${text.length} characters from PDF`);
    } else if (['docx', 'doc'].includes(fileExtension)) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      text = result.value;
      console.log(`Extracted ${text.length} characters from DOCX`);
    } else if (fileExtension === 'txt') {
      text = fileBuffer.toString('utf8');
      console.log(`Extracted ${text.length} characters from TXT`);
    } else if (['csv', 'xlsx', 'xls'].includes(fileExtension)) {
      // For simplicity, we're treating these as plain text
      // In a production environment, you'd use specific libraries
      text = fileBuffer.toString('utf8');
      console.log(`Extracted ${text.length} characters from ${fileExtension.toUpperCase()}`);
    } else {
      return { statusCode: 400, body: 'Unsupported file format' };
    }
    
    // Chunk the text into manageable pieces (approx 500 tokens)
    const chunks = chunkText(text);
    console.log(`Split text into ${chunks.length} chunks`);
    
    // Generate embeddings for each chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      
      console.log(`Processing chunk ${i+1}/${chunks.length}, length: ${chunk.length} chars`);
      
      // Generate embedding
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk,
      });
      
      const embedding = embeddingResponse.data[0].embedding;
      
      // Store in database
      const { error } = await supabase
        .from('kb_embeddings')
        .insert({
          agent_id: agentId,
          source_file: fileName,
          chunk_text: chunk,
          embedding,
          created_at: new Date().toISOString()
        });
      
      if (error) {
        console.error(`Error storing embedding for chunk ${i}:`, error);
      } else {
        console.log(`Stored embedding for chunk ${i+1}`);
      }
    }
    
    console.log('Knowledge base processing complete');
    
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
function chunkText(text, chunkSize = 2000) {
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
      const sentences = paragraph.split(/(?<=[.!?])\s+/);
      let sentenceChunk = '';
      
      for (const sentence of sentences) {
        if ((sentenceChunk.length + sentence.length + 1) > chunkSize) {
          if (currentChunk.length > 0) {
            chunks.push(currentChunk.trim());
            currentChunk = '';
          }
          chunks.push(sentenceChunk.trim());
          sentenceChunk = '';
        }
        sentenceChunk += ` ${sentence}`;
      }
      
      if (sentenceChunk.trim().length > 0) {
        currentChunk += sentenceChunk;
      }
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
