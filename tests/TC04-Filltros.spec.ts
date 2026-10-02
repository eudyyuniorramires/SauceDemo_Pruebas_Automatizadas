import {expect} from '@playwright/test';
import {test} from '../fixtures/page';


test.describe('TC04-Filltros',()=>{
   

    const filterOptions = ['az','za','lohi','hilo'];


    test.beforeEach(async({loginPage})=>{

        await loginPage.navigate();
        await loginPage.Login('standard_user','secret_sauce');
    });

    test('TC04-Filtros z-a', async({invetoryPage})=>{


       const initialNames =  await invetoryPage.getProductsNames();


       const sortedNamesZA = [...initialNames].sort().reverse();
       
       await invetoryPage.filterProductsBy('za');

       const namesAfterFilter = await invetoryPage.getProductsNames();


       expect(namesAfterFilter).toEqual(sortedNamesZA);

        
    });

   
    test('TC05-Filter low to high', async({invetoryPage})=>{

        const initialPrices = await invetoryPage.getProductsPrices();

        const sortedPricesLowToHigh = [...initialPrices].sort((a,b)=> a-b);

        await invetoryPage.filterProductsBy('lohi');

        const pricesAfterFilter = await invetoryPage.getProductsPrices();

        expect(pricesAfterFilter).toEqual(sortedPricesLowToHigh);

    })

    test('TC06-Filter high to low', async({invetoryPage})=>{

     const initialPrices = await invetoryPage.getProductsPrices();
      
     const sortedPricesHighToLow = [...initialPrices].sort((a,b) => b-a);

     await invetoryPage.filterProductsBy('hilo')

     const pricesAfterFilter = await invetoryPage.getProductsPrices();

     expect(pricesAfterFilter).toEqual(sortedPricesHighToLow);

    });

    test('TC07-Filter a-z', async({invetoryPage})=>{

         const initialNames = await invetoryPage.getProductsNames();

         const sortedNamesAZ = [...initialNames].sort();

         const namesAfterFilter = await invetoryPage.getProductsNames();

         expect(namesAfterFilter).toEqual(sortedNamesAZ);

    });


});
