
/**
 * Email History Utility Functions
 * 
 * Functions for retrieving and processing email history
 */

/**
 * Get previous email thread history between agent and customer
 *
 * @param {Object} supabase - Supabase client
 * @param {string} agentId - Agent ID
 * @param {string} fromAddress - Customer's email address
 * @returns {Promise<string>} Formatted thread history
 */
const getThreadHistory = async (supabase, agentId, fromAddress, companyName) => {
  // Get previous conversation history for this thread
  const { data: threadHistory, error: threadError } = await supabase
    .from('email_logs')
    .select('*')
    .eq('agent_id', agentId)
    .eq('from_address', fromAddress)
    .not('ai_reply', 'is', null)
    .order('created_at', { ascending: true })
    .limit(3);

  let pastAgentResponses = '';
  if (!threadError && threadHistory && threadHistory.length > 0) {
    pastAgentResponses = threadHistory
      .map(item => `${companyName}: ${item.ai_reply}`)
      .join('\n\n');
    console.log(`Found ${threadHistory.length} past responses for this thread`);
  } else {
    console.log('No past responses found for this thread');
  }
  
  return pastAgentResponses;
};

/**
 * Get agent's average rating from previous replies
 *
 * @param {Object} supabase - Supabase client
 * @param {string} agentId - Agent ID
 * @returns {Promise<Object>} Average rating and count
 */
const getAgentRatings = async (supabase, agentId) => {
  // Get agent's average rating from previous replies
  const { data: agentRatings, error: ratingsError } = await supabase
    .from('email_logs')
    .select('user_rating')
    .eq('agent_id', agentId)
    .not('user_rating', 'is', null);
    
  let avgRating = 0;
  let count = 0;
  
  if (!ratingsError && agentRatings && agentRatings.length > 0) {
    const totalRating = agentRatings.reduce((sum, item) => sum + item.user_rating, 0);
    avgRating = totalRating / agentRatings.length;
    count = agentRatings.length;
    console.log(`Agent average rating: ${avgRating.toFixed(1)} from ${count} ratings`);
  }
  
  return { avgRating, count };
};

module.exports = {
  getThreadHistory,
  getAgentRatings
};
