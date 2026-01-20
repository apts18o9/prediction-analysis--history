declare module 'node-webvtt' {
  export interface Cue {
    start: number;
    end: number;
    payload: string | string[];
  }

  export interface ParsedVTT {
    cues: Cue[];
  }

  export function parse(vttText: string): ParsedVTT;

  const webvtt: {
    parse: typeof parse;
  };

  export default webvtt;
}
