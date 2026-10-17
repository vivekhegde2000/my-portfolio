import { describe, expect, it } from 'vitest';
import {
  awards,
  careerPath,
  caseStudies,
  contributionCategories,
  contributions,
  education,
  moreProjects,
  navItems,
  profile,
  sideProjects,
  skillGroups,
  socials,
} from './portfolio';

const unique = (ids: string[]) => new Set(ids).size === ids.length;

describe('portfolio content', () => {
  it('uses unique ids within each collection', () => {
    for (const list of [awards, careerPath, caseStudies, contributions, education, moreProjects, sideProjects, skillGroups]) {
      expect(unique(list.map((item) => item.id))).toBe(true);
    }
  });

  it('shows every resume highlight with a known category', () => {
    expect(contributions).toHaveLength(9);
    for (const item of contributions) {
      expect(contributionCategories[item.category]).toBeDefined();
      expect(item.text.length).toBeGreaterThan(20);
      // Every **emphasis** marker is closed.
      expect((item.text.match(/\*\*/g) ?? []).length % 2).toBe(0);
    }
  });

  it('only links to secure external URLs', () => {
    const urls = [...sideProjects.flatMap((p) => [p.liveUrl, p.repoUrl]), ...socials.map((s) => s.href)];
    for (const url of urls) {
      expect(url.startsWith('https://') || url.startsWith('mailto:')).toBe(true);
    }
  });

  it('references assets served from /public', () => {
    expect(profile.resumeUrl).toMatch(/^\/.+\.pdf$/);
    expect(profile.photo.src).toMatch(/^\/images\//);
    sideProjects.forEach((p) => expect(p.image).toMatch(/^\/images\/projects\/.+\.jpg$/));
  });

  it('has a nav entry for each main section', () => {
    expect(navItems.map((n) => n.id)).toEqual(['about', 'experience', 'work', 'stack', 'contact']);
  });

  it('does not publish phone numbers', () => {
    expect(JSON.stringify(profile)).not.toMatch(/\+91/);
  });
});
