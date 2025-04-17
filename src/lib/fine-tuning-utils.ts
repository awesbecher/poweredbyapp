
import { EmailLog } from "./types";

/**
 * Converts email logs to the JSONL format required for OpenAI fine-tuning
 * @param emailLogs Array of email logs from the database
 * @param systemPrompt Optional custom system prompt
 * @returns String in JSONL format ready for fine-tuning
 */
export function convertEmailLogsToJSONL(
  emailLogs: EmailLog[],
  systemPrompt: string = "You are an AI email agent for a SaaS company."
): string {
  // Filter only the emails that have been replied to and rated
  const validLogs = emailLogs.filter(
    (log) => log.status === "replied" && log.user_rating && log.user_rating >= 4
  );

  // Convert each log to the required format
  const jsonlEntries = validLogs.map((log) => {
    const entry = {
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: log.raw_body
        },
        {
          role: "assistant",
          content: log.ai_reply || ""
        }
      ]
    };

    return JSON.stringify(entry);
  });

  // Join with newlines to create JSONL format
  return jsonlEntries.join("\n");
}

/**
 * Anonymizes personally identifiable information in the training data
 * @param text Text to anonymize
 * @returns Anonymized text
 */
export function anonymizeTrainingData(text: string): string {
  // Replace email addresses
  let anonymized = text.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    "email@example.com"
  );

  // Replace phone numbers (simple pattern)
  anonymized = anonymized.replace(
    /(\+\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}/g,
    "555-123-4567"
  );

  // Replace names (this is a simple approach - more sophisticated NER might be needed)
  // This would be expanded based on your specific needs
  
  return anonymized;
}

/**
 * Exports the JSONL file for download
 * @param jsonlData The JSONL data as a string
 * @param filename The name of the file to download
 */
export function downloadJSONL(jsonlData: string, filename: string = "fine-tuning-data.jsonl"): void {
  const blob = new Blob([jsonlData], { type: "application/jsonl" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
