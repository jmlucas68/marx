export interface DetailedSummarySection {
  heading: string;
  text: string;
}

export interface DetailedSummary {
  title: string;
  intro: string;
  sections: DetailedSummarySection[];
}

export interface Work {
  title: string;
  year: string;
  description: string;
  link: string;
  isFree: boolean;
  hasSummary?: boolean;
  summaryData?: DetailedSummary; // Optional link to specific summary data
}

export interface KeyConcept {
  title: string;
  shortDescription: string;
  details: DetailedSummary;
}

export interface Quote {
  text: string;
  source: string;
}

export interface Influence {
  name: string;
  description: string;
  type: 'received' | 'exerted';
}

export interface VideoResource {
  title: string;
  url: string;
  channel: string;
  thumbnail?: string;
}

export interface ReferenceLink {
  name: string;
  url: string;
  description: string;
}

export enum SectionId {
  HOME = 'home',
  BIOGRAPHY = 'biografia',
  THOUGHT = 'pensamiento',
  INFLUENCES = 'influencias',
  WORKS = 'obras',
  VIDEOS = 'videos',
  REFERENCES = 'referencias',
}