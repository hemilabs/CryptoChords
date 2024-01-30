import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      // instanbul excludes interfaces from coverage
      provider: 'istanbul',
      include: ['src/**/*.ts'],
    },
  },
})