import { useRef, FC } from 'react';

const Waveform: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (onLoadEvent: ProgressEvent<FileReader>) => {
      if (!onLoadEvent.target?.result) return;

      const audioContext = new AudioContext();
      const audioData = onLoadEvent.target.result as ArrayBuffer;

      audioContext.decodeAudioData(audioData, (buffer) => {
        const rawData = buffer.getChannelData(0); // Get channel data from the first channel
        const samples = 1000; // Number of samples you want for the waveform
        const blockSize = Math.floor(rawData.length / samples); // Block size to average
        const waveform = [];

        for (let i = 0; i < samples; i++) {
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[i * blockSize + j]);
          }
          waveform.push(sum / blockSize);
        }

        drawWaveform(waveform);
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const drawWaveform = (waveform: number[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    waveform.forEach((value, index) => {
      const x = (width * index) / waveform.length;
      const y = (1 - value) * height;
      ctx.lineTo(x, y);
    });
    ctx.stroke();
  };

  return (
    <div>
      <input type='file' accept='audio/*' onChange={handleAudioUpload} />
      <canvas ref={canvasRef} width='1000' height='200' />
    </div>
  );
};

export default Waveform;
