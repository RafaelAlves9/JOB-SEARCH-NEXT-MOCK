import { test, expect } from '@playwright/test';

test.describe('Search Module E2E Tests', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('/');
   });

   test('should load the page and display the header', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Encontre a Vaga dos Seus Sonhos' })).toBeVisible();
      await expect(page.getByPlaceholder('Cargo, empresa ou tecnologia...')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Buscar' })).toBeVisible();
   });

   test('should show an error message when searching with empty keywords', async ({ page }) => {
      await page.getByRole('button', { name: 'Buscar' }).click();
      await expect(page.getByText('Keywords are required')).toBeVisible();
   });

   test('should perform a search and display job results', async ({ page }) => {
      await page.route('**/api/job-search', async (route) => {
         await route.fulfill({
            status: 200,
            json: {
               jobs: [
                  {
                     position: 'Software Engineer',
                     company: 'Tech Solutions Inc.',
                     companyLogo: '',
                     location: 'Remote',
                     date: '2 hours ago',
                     jobUrl: 'https://example.com/job1',
                  },
                  {
                     position: 'Frontend Developer',
                     company: 'Creative Minds LLC',
                     companyLogo: '',
                     location: 'Sao Paulo, Brazil',
                     date: '1 day ago',
                     jobUrl: 'https://example.com/job2',
                  },
               ],
               total: 2,
               hasMore: false,
            },
         });
      });

      await page.getByPlaceholder('Cargo, empresa ou tecnologia...').fill('React Developer');
      await page.getByRole('button', { name: 'Buscar' }).click();

      await expect(page.getByText('2 vagas encontradas')).toBeVisible();
      await expect(page.getByText('Software Engineer')).toBeVisible();
      await expect(page.getByText('Frontend Developer')).toBeVisible();
   });

   test('should display a "no results" message when the search returns no jobs', async ({ page }) => {
      await page.route('**/api/job-search', async (route) => {
         await route.fulfill({
            status: 200,
            json: {
               jobs: [],
               total: 0,
               hasMore: false,
            },
         });
      });

      await page.getByPlaceholder('Cargo, empresa ou tecnologia...').fill('Obscure-Tech-12345');
      await page.getByRole('button', { name: 'Buscar' }).click();

      await expect(page.getByText('Nenhuma vaga encontrada')).toBeVisible();
   });
}); 