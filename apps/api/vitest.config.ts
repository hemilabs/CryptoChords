import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      // instanbul excludes interfaces from coverage
      include: ['src/**/*.ts'],
      provider: 'istanbul',
    },
  },
});
