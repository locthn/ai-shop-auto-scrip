import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) =>{
    await page.goto('https://locthn-ai-shop.vercel.app/')
    test.setTimeout(120000)
})

test('buy 1 product samsung case',
async ({page}) => {
    await page.getByRole('link', {name: 'Cases for Samsung'}).first().click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds

    await page.locator('li').filter({ hasText: 'Samsung orange book12.00 $' }).click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds

    await page.getByText('Galaxy S8+').click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds

    await page.getByRole('spinbutton').type('5')
    await page.getByRole('button', { name: 'Buy' }).click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds

    await page.getByRole('link', {name: ' Place an order '}).click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds

    await page.getByRole('button', {name: 'Proceed to checkout '}).click()
    await page.waitForTimeout(500); // waits for 0.5 seconds

    //step 1
    await page.getByLabel('Email *').type('abc@gmail.com')
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Continue to shipping' }).click()
    await page.waitForTimeout(500)
    //step 2
    await page.getByLabel('Self-pickup from the storeFree').click()
    await page.locator('div').filter({ hasText: /^Continue to payment$/ }).click()

    await page.waitForTimeout(500)

    //step 3
    await page.getByLabel('First name').type('test')
    await page.waitForTimeout(500)

    await page.locator('form div').filter({ hasText: 'Last name *' }).nth(3).type('katalon')
    await page.waitForTimeout(500)

    await page.getByLabel('Address *').type('285 viettel')
    await page.waitForTimeout(500)

    await page.locator('form div').filter({ hasText: 'ZIP code *' }).nth(3).type('90000')
    await page.waitForTimeout(500)

    await page.getByLabel('City *').type('ho chi minh')
    await page.waitForTimeout(500)

    await page.getByLabel('Country *').selectOption('Viet Nam')
    await page.waitForTimeout(500)

    await page.getByRole('button', { name: 'Continue to payment' }).click()

    await page.waitForTimeout(500)

    await page.getByText('Cash on delivery').click()
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Complete order' }).click()
});

test('buy 2 samsung case at the same time', async ({ page }) => {
    await page.getByRole('link', {name: 'Cases for Samsung'}).first().click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds

    await buyGalaxyOrangeCase({ page })

    await clickHomeLogo({ page })
    await page.waitForTimeout(1000)

    await page.getByRole('link', {name: 'Cases for Samsung'}).first().click()
    await page.waitForTimeout(1000)
    await buyGalaxyPinkCase({ page })
    await seftPickupCheckout({ page })
});

test('buy 3 items at home page', async ({page})=> {
    await page.waitForTimeout(5000)
    await page.locator('li').filter({ hasText: 'Best choiceCase Explorer wanted12.00 $8.99 $' }).getByRole('button').click()
    await page.waitForTimeout(5000)
    await page.getByRole('dialog').getByText('iPhone 7', { exact: true }).click()
    await page.waitForTimeout(5000)
    await page.getByRole('button', { name: 'Buy' }).click()

    await page.locator('li').filter({ hasText: 'Hot! New!Case The Amity Affliction15.00 $12.99 $' }).getByRole('button').click()
    await page.waitForTimeout(5000)
    await page.getByRole('dialog').getByText('iPhone 7', { exact: true }).click()
    await page.getByRole('button', { name: 'Buy' }).click()

    await page.getByRole('link', {name: ' Place an order '}).click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds
    await seftPickupCheckout( { page })
})

test ( 'buy one product checkout by ', async ({page}) => {
    await page.getByRole('link', {name: 'Cases for Samsung'}).first().click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds
    // Log and continue all network requests
    await page.route('**/KA-73-64', (route, request) => {
        console.log(request.url());
        route.continue();
    });
    await buyGalaxyOrangeCase({page})
    await usShipping({page})
})

const buyGalaxyOrangeCase = async ({page}) => {
    await page.locator('li').filter({ hasText: 'Samsung orange book12.00 $' }).click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds
    await page.getByText('Galaxy S8+').click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds
    await page.getByRole('spinbutton').type('5')
    await page.getByRole('button', { name: 'Buy' }).click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds
    await page.getByRole('link', {name: ' Place an order '}).click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds
}

const buyGalaxyPinkCase = async ({ page }) => {
    await page.getByRole('link', { name: 'Samsung pink cover New!' }).click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds
    await page.getByText('Galaxy S7').click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds
    await page.getByRole('spinbutton').type('5')
    await page.getByRole('button', { name: 'Buy' }).click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds
    await page.getByRole('link', {name: ' Place an order '}).click()
    await page.waitForTimeout(1000); // waits for 0.5 seconds
}

const clickHomeLogo = async ( { page }) => {
    await page.getByRole('link', { name: 'Brand Shop' }).click()
}

const seftPickupCheckout = async ( { page }) => {

    await page.getByRole('button', {name: 'Proceed to checkout '}).click()
    await page.waitForTimeout(5000); // waits for 0.5 seconds

    //step 1
    let email = await page.getByLabel('Email *')
    await email.clear()
    await email.type('abc@gmail.com')
    await page.waitForTimeout(5000)
    await page.getByRole('button', { name: 'Continue to shipping' }).click()
    await page.waitForTimeout(5000)
    //step 2
    await page.getByLabel('Self-pickup from the storeFree').click()
    await page.waitForTimeout(5000)
    await page.locator('div').filter({ hasText: /^Continue to payment$/ }).click()

    await page.waitForTimeout(5000)

    //step 3
    let firstName = await page.getByLabel('First name')
    await firstName.clear()
    await firstName.type('test')
    await page.waitForTimeout(500)

    let address =  await page.getByLabel('Address *')
    await address.clear()
    await address.type('285 viettel')
    await page.waitForTimeout(500)

    let city = await page.getByLabel('City *')
    await city.clear()
    await city.type('ho chi minh')
    await page.waitForTimeout(500)

    await page.getByLabel('Country *').selectOption('Viet Nam')
    await page.waitForTimeout(500)

    await page.getByRole('button', { name: 'Continue to payment' }).click()

    await page.waitForTimeout(500)

    await page.getByText('Cash on delivery').click()
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Complete order' }).click()
}

const usShipping = async ({page}) => {
    await page.getByRole('button', {name: 'Proceed to checkout '}).click()
    await page.waitForTimeout(5000); // waits for 0.5 seconds

    //step 1
    let email = await page.getByLabel('Email *')
    await email.clear()
    await email.type('abc@gmail.com')
    await page.waitForTimeout(5000)
    await page.getByRole('button', { name: 'Continue to shipping' }).click()
    await page.waitForTimeout(5000)
    //step 2
    await page.getByLabel('US Shipping$4.90').click()
    await page.waitForTimeout(5000)
    await page.locator('div').filter({ hasText: /^Continue to payment$/ }).click()

    await page.waitForTimeout(5000)

    //step 3
    let firstName = await page.locator('input[name="billing_address\\.first_name"]')
    await firstName.clear()
    await firstName.type('test')
    await page.waitForTimeout(500)

    let address =  await page.locator('input[name="billing_address\\.address_line_1"]')
    await address.clear()
    await address.type('285 viettel')
    await page.waitForTimeout(500)

    let city = await page.locator('input[name="billing_address\\.city"]')
    await city.clear()
    await city.type('ho chi minh')
    await page.waitForTimeout(500)

    await page.locator('select[name="billing_address\\.country_id"]').selectOption('Viet Nam')
    await page.waitForTimeout(500)

    await page.getByRole('button', { name: 'Continue to payment' }).click()

    await page.waitForTimeout(500)

    await page.getByText('Cash on delivery').click()
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Complete order' }).click()
}
