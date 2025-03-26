import { test, expect } from '@playwright/test';

test('should load RelocationRequestForm and validate field types', async ({ page }) => {
    await page.goto('http://localhost:4200');

    const datetimeInput = page.locator('input#datetime');
    await expect(datetimeInput).toHaveAttribute('type', 'datetime-local');

    const floorInput = page.locator('input#floor');
    await expect(floorInput).toHaveAttribute('type', 'number');

    const elevatorInput = page.locator('input#elevator');
    await expect(elevatorInput).toHaveAttribute('type', 'checkbox');

    const packagingServiceInput = page.locator('input#packagingService');
    await expect(packagingServiceInput).toHaveAttribute('type', 'checkbox');
});

test('should display a success message and clear fields on successful submission', async ({ page }) => {
    await page.route('/relocationSupportForm', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({}) });
    });

    await page.goto('http://localhost:4200');

    await page.fill('input#name', 'Max Mustermann');
    await page.fill('input#datetime', '2025-04-01T08:00');
    await page.fill('input#fromLocation', 'Wien');
    await page.fill('input#toLocation', 'Graz');
    await page.fill('input#floor', '3');
    await page.check('input#elevator');
    await page.check('input#packagingService');

    const requestPromise = page.waitForRequest('http://localhost:8080/requestForRelocationSupport');

    await page.click('button[type="submit"]');

    const request = await requestPromise;
    expect(request.method()).toBe('POST');
    expect(request.postDataJSON()).toEqual({
        name: 'Max Mustermann',
        datetime: '2025-04-01T08:00',
        fromLocation: 'Wien',
        toLocation: 'Graz',
        floor: 3,
        elevator: true,
        packagingService: true,
    });

    const message = page.locator('.message');
    await expect(message).toHaveText('Request for relocation support successfully created!');

    await expect(page.locator('input#name')).toHaveValue('');
    await expect(page.locator('input#datetime')).toHaveValue('');
    await expect(page.locator('input#fromLocation')).toHaveValue('');
    await expect(page.locator('input#toLocation')).toHaveValue('');
    await expect(page.locator('input#floor')).toHaveValue('');
    await expect(page.locator('input#elevator')).not.toBeChecked();
    await expect(page.locator('input#packagingService')).not.toBeChecked();
});
