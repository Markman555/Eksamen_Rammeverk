import '@testing-library/jest-dom'; // Legger til matcher som `toBeInTheDocument`
import { vi } from 'vitest';

// Mocking av `window.fetch` for tester
global.fetch = vi.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

// Mock implementasjon for spesifikke moduler hvis nødvendig
vi.mock('module-to-mock', () => ({
  // Mock-implementasjon
}));

// Andre globale oppsett
console.log('Global test setup complete!');
