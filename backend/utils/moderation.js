// utils/moderation.js
// Dummy AI moderation utility for demo. Replace with real API call (e.g., Google Vision, OpenAI Vision)

async function moderateDogContent(video_url, caption) {
  // TODO: Call real AI service here
  // For now, approve if caption contains 'dog' (case-insensitive)
  const isDogContent = /dog/i.test(caption || '');
  return {
    isDogContent,
    reason: isDogContent ? '' : 'Content does not appear to be about dogs.'
  };
}

module.exports = { moderateDogContent };
