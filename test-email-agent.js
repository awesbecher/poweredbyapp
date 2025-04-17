
/**
 * Email Agent Test Automation Script
 * 
 * This script simulates the flow of:
 * 1. Receiving an inbound email
 * 2. Triggering the GPT reply generation
 * 3. (Optional) Automatically sending the reply
 */

import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables from .env file
dotenv.config();

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Customize these variables for your test
const agentId = process.env.AGENT_ID || 'your-agent-id';
const testEmail = {
  from: process.env.TEST_EMAIL_FROM || 'jenny@acme.com',
  subject: process.env.TEST_EMAIL_SUBJECT || 'Can I get a refund?',
  body: process.env.TEST_EMAIL_BODY || 'Hi, I\'m not happy with my purchase. I\'d like a refund please.'
};

// Create a log directory if it doesn't exist
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Helper function to write logs
const writeLog = (filename, data) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const logPath = path.join(logDir, `${filename}-${timestamp}.json`);
  fs.writeFileSync(logPath, JSON.stringify(data, null, 2));
  console.log(`📝 Log written to ${logPath}`);
};

async function testAgentFlow() {
  const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:8888/.netlify/functions';
  console.log(`🚀 Testing email agent with base URL: ${apiBaseUrl}`);
  console.log(`👤 Agent ID: ${agentId}`);
  
  try {
    // 1. Simulate incoming email
    console.log('\n📧 Step 1: Simulating inbound email...');
    console.log(`   From: ${testEmail.from}`);
    console.log(`   Subject: ${testEmail.subject}`);
    
    const inboundResponse = await axios.post(`${apiBaseUrl}/simulate-inbound`, {
      agentId,
      from_address: testEmail.from,
      subject: testEmail.subject,
      raw_body: testEmail.body
    });

    const messageId = inboundResponse.data.gmailMessageId;
    console.log(`✅ Email simulated. Message ID: ${messageId}`);
    writeLog('01-inbound', inboundResponse.data);

    // 2. Trigger GPT reply
    console.log('\n🧠 Step 2: Generating AI reply...');
    const replyResponse = await axios.post(`${apiBaseUrl}/generate-reply`, {
      agentId,
      messageId
    });

    const aiReply = replyResponse.data.reply;
    const replyStatus = replyResponse.data.status;
    console.log(`✅ Reply generated. Status: ${replyStatus}`);
    console.log(`📝 AI Reply:\n${'-'.repeat(50)}\n${aiReply}\n${'-'.repeat(50)}`);
    writeLog('02-reply', replyResponse.data);

    // 3. Auto-send reply (if desired)
    if (process.env.AUTO_SEND === 'true') {
      console.log('\n📤 Step 3: Sending reply via email API...');
      const sendResponse = await axios.post(`${apiBaseUrl}/send-reply`, {
        agentId,
        gmailMessageId: messageId,
        replyText: aiReply
      });
      
      console.log('✅ Reply sent successfully!');
      writeLog('03-send', sendResponse.data);
    } else {
      console.log('\n💡 To automatically send the reply, set AUTO_SEND=true in your .env file.');
    }

    console.log('\n🎉 Test completed successfully!');
  } catch (err) {
    console.error('\n❌ Test failed:');
    
    if (err.response) {
      console.error(`   Status: ${err.response.status}`);
      console.error(`   Message: ${JSON.stringify(err.response.data)}`);
      writeLog('error', {
        status: err.response.status,
        data: err.response.data
      });
    } else {
      console.error(`   Error: ${err.message}`);
      writeLog('error', { message: err.message });
    }
    process.exit(1);
  }
}

// Run the test
testAgentFlow();
