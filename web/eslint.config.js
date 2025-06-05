import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules', 
      'dist', 
      '.next', 
      'build'
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*', './*'],
              message: 'use "@" alias instead',
            }
          ]
        }
      ],
      'import/order': ['error', {
        'newlines-between': 'ignore',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'vike-react/**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'flowbite-react/**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@/components/**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@/domains/**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@/hooks/**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin']
      }]
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-irregular-whitespace': 'error'
    }
  },
  {
    files: ['tailwind.config.js', 'vite.config.ts'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off'
    }
  }
);
