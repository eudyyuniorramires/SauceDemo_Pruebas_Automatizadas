import {Page,Locator,expect} from '@playwright/test';
import {BasePage} from './BasePage';


export class InvetoryPage extends BasePage{
   
    readonly item:Locator;

    readonly btnAddToCart:Locator;

    readonly btnCart:Locator;

    readonly CountItemPage:Locator;

    readonly CountCartIcon:Locator;

    constructor(page:Page){
        super(page);
       

        this.item = page.locator('[data-test="inventory-item"]');

        this.btnAddToCart = page.locator('.btn_inventory ');

        this.btnCart = page.locator('.shopping_cart_link');

        this.CountItemPage = page.locator('.cart_item');

        this.CountCartIcon = page.locator('.shopping_cart_badge');
    
    
    }



    async addProductsToCart():Promise<string[]>{
          
        const itemCount = await this.item.count();

        const ProductsAdded: string[] = [];
        

        for(let i = 0; i < itemCount; i++){
              
            const currentItem = this.item.nth(i);

            const nameItem = currentItem.locator('.inventory_item_name');

            const productName = await nameItem.textContent();

            if(productName){
                
                ProductsAdded.push(productName.trim());
            }
            
            const addCartButton = currentItem.locator('.btn_inventory');

           

            await addCartButton.click();

            await expect(addCartButton).toContainText('Remove');
        }

        await this.btnCart.click();

        // const countItemCart = await this.CountItemPage.count();

        // await expect(countItemCart == itemCount).toBeTruthy();


        return ProductsAdded;

    }

    // async getCartItemCount():Promise<void>{

    //       const countItemCart = await this.CountItemPage.count();
          

    // }




}