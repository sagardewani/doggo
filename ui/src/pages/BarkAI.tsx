import React, { useState } from 'react';
import { analyzeBark } from '../api/barkai';

interface BarkAIResult {
  transcript: string;
  mood: string;
  recommendation: string;
}

const BarkAI: React.FC = () => {
  const [audioUrl, setAudioUrl] = useState('');
  const [result, setResult] = useState<BarkAIResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await analyzeBark(audioUrl);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze bark');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold text-pink-700 mb-6 text-center">🔊 Bark-to-Text AI</h1>
      <input className="border rounded px-3 py-2 w-full mb-4" placeholder="Audio URL (bark)" value={audioUrl} onChange={e => setAudioUrl(e.target.value)} />
      <button className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-4 py-2 rounded-xl shadow transition w-full" onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Bark'}
      </button>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {result && (
        <div className="mt-6 bg-pink-50 rounded-xl p-4 shadow">
          <div className="font-bold text-lg mb-2">Transcript: <span className="text-pink-700">{result.transcript}</span></div>
          <div className="mb-1">Mood: <span className="font-semibold text-pink-600">{result.mood}</span></div>
          <div className="mb-1">Recommendation: <span className="text-pink-600">{result.recommendation}</span></div>
        </div>
      )}
    </div>
  );
};

export default BarkAI;
