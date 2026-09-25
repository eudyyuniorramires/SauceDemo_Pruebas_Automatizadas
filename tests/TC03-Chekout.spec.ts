import {test} from '../fixtures/page';
import{validUser} from '../data/testData';
import {checkoutInfo} from '../data/testData';



test.describe('TC03-Chekout',()=>{
   

    test('TC03-Chekout',async({loginPage,invetoryPage,cartPage})=>{
      
        await loginPage.navigate();

        await loginPage.Login(validUser.email,validUser.password);

        await invetoryPage.addProductsToCart();

        await cartPage.buttonCheckout.click();

        await cartPage.fillCheckoutForm(checkoutInfo.firstName,checkoutInfo.lastName,checkoutInfo.postalCode);

        await cartPage.finishCheckout();

    });
     

});