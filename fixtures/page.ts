import {test as base} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {InvetoryPage} from '../pages/InvetoryPage';
import {CartPage} from '../pages/CartPage';

type PageObject = {

  loginPage: LoginPage;
  invetoryPage: InvetoryPage;
  cartPage: CartPage;

}

export const test = base.extend<PageObject>({
 
   loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

    invetoryPage: async({page}, use)=>{
    await use(new InvetoryPage(page));
  },

   cartPage: async({page},use)=>{
   
    await use(new CartPage(page));
  },

});
