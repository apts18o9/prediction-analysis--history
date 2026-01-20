declare module 'youtube-captions-scraper' {
  export interface TranscriptEntry {
    text: string;
    start: number;
    duration: number;
  }

  export interface Transcript {
    entries: TranscriptEntry[];
    language: string;
  }

  export interface Transcriber {
    getTranscripts(): Promise<Transcript[]>;
  }

  export function getTranscriber(options: { videoID: string }): Promise<Transcriber>;
}
