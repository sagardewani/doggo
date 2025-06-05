const fs = require('fs');
const { spawn } = require('child_process');
const wav = require('node-wav');
const Meyda = require('meyda');
const path = require('path');
const ffmpegPath = require('ffmpeg-static');

async function convertToWav(inputBuffer, outputPath) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn(ffmpegPath, [
      '-i', 'pipe:0',
      '-f', 'wav',
      '-ac', '1', // mono
      '-ar', '44100',
      outputPath
    ]);

    ffmpeg.stdin.write(inputBuffer);
    ffmpeg.stdin.end();

    ffmpeg.on('close', (code) => {
      if (code === 0) resolve(outputPath);
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });
}

function getBarkBands(sampleRate, fftSize) {
  //  Bark scale ranges, simplified for demo (24 bands)
  const bands = [];
  for (let i = 0; i < 24; i++) {
    bands.push(i * 100); // rough approximation
  }
  return bands;
}

function computeBarkFingerprint(pcmData, sampleRate) {
  const frameSize = 512;
  const hopSize = 256;
  const barkBands = getBarkBands(sampleRate, frameSize);

  const fingerprints = [];

  for (let i = 0; i < pcmData.length - frameSize; i += hopSize) {
    const frame = pcmData.slice(i, i + frameSize);

    const features = Meyda.extract('powerSpectrum', frame, {
      sampleRate,
      bufferSize: frameSize
    });

    // Map power spectrum to Bark bands (simplified)
    const barkVector = new Array(barkBands.length).fill(0);
    const hzPerBin = sampleRate / frameSize;

    for (let j = 0; j < features.length; j++) {
      const freq = j * hzPerBin;
      const barkIndex = Math.floor(freq / 100); // very rough binning
      if (barkIndex < barkVector.length) {
        barkVector[barkIndex] += features[j];
      }
    }

    fingerprints.push(barkVector.map(Math.log1p)); // log scale
  }

  return fingerprints;
}

async function extractFingerprint(audioBinaryBuffer) {
  const tmpWavPath = path.join(__dirname, `temp_bark_audio_${Date.now()}.wav`);

  await convertToWav(audioBinaryBuffer, tmpWavPath);
  const wavBuffer = fs.readFileSync(tmpWavPath);
  const { sampleRate, channelData } = wav.decode(wavBuffer);

  const pcmData = channelData[0]; // mono channel
  const fingerprint = computeBarkFingerprint(pcmData, sampleRate);

  fs.unlinkSync(tmpWavPath); // cleanup
  return processExtractedFingerprint(fingerprint);
}

const processExtractedFingerprint = (fingerprint) => {
  // Process the extracted fingerprint (e.g., normalize, convert to desired format)
  // help me to normalize the fingerprint data
  // then sum each band to get a single value per band
  // then sum the values of each band to get a single value for the entire fingerprint
  if (!Array.isArray(fingerprint) || fingerprint.length === 0) {
    throw new Error('Invalid fingerprint data');
  }
  const bandSums = fingerprint.map(band => band.reduce((sum, value) => sum + value, 0));
  const totalSum = bandSums.reduce((sum, value) => sum + value, 0);
  return totalSum; // Return a single value representing the fingerprint
}


module.exports = { extractFingerprint };
