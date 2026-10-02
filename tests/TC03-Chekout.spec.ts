import {test} from '../fixtures/page';
import{validUser} from '../data/testData';
import {checkoutInfo} from '../data/testData';
import {expect} from '@playwright/test';



test.describe('TC03-Chekout',()=>{
   

    test('TC03-Chekout',async({loginPage,invetoryPage,cartPage})=>{
      
        await loginPage.navigate();

        await loginPage.Login(validUser.email,validUser.password);

        await invetoryPage.addProductsToCart();

        await expect(cartPage.btnRemoveItem).toHaveCount(6);
        
        await cartPage.buttonCheckout.click();

        await cartPage.fillCheckoutForm(checkoutInfo.firstName,checkoutInfo.lastName,checkoutInfo.postalCode);

        await cartPage.finishCheckout();

        await expect(cartPage.messageCheckoutComplete).toBeVisible();



    });
     

});