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
      <h1 className="text-2xl font-bold text-primary mb-6 text-center">🔊 Bark-to-Text AI</h1>
      <input className="border rounded px-3 py-2 w-full mb-4" placeholder="Audio URL (bark)" value={audioUrl} onChange={e => setAudioUrl(e.target.value)} />
      <button className="bg-primary hover:bg-secondary text-white font-bold px-4 py-2 rounded-xl shadow transition w-full" onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Bark'}
      </button>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {result && (
        <div className="mt-6 bg-highlight rounded-xl p-4 shadow">
          <div className="font-bold text-lg mb-2">Transcript: <span className="text-primary">{result.transcript}</span></div>
          <div className="mb-1">Mood: <span className="font-semibold text-secondary">{result.mood}</span></div>
          <div className="mb-1">Recommendation: <span className="text-secondary">{result.recommendation}</span></div>
        </div>
      )}
    </div>
  );
};

export default BarkAI;
