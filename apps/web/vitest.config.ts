import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*.ts'],
      // instanbul excludes interfaces from coverage
      provider: 'istanbul',
    },
  },
});
