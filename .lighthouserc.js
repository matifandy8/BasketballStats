export default {
  ci: {
    collect: {
      staticDistDir: './apps/frontend/dist',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
      startServerCommand: 'concurrently "npm run dev:backend" "npm run dev:frontend"',
      startServerReadyPattern: 'ready',
      startServerReadyTimeout: 60000,
      disableStorageReset: true,
      settings: {
        skipAboutBlank: true,
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-results',
      reportFilename: 'lighthouse-results.json',
    },
  },
};
