const
    productModel = require('../models/productModel');

    /**
     * 
     * @param {\:category} category  -> The category of the products required to be searched
     * 
     */
async function getProductsByCategory(category){
    let productSearchObject = {
        category : category
    }
    let responseObj =  await productModel.find(productSearchObject).catch(()=>{
        return {
            message : "No products found",
            error : true
        }
    });
    return responseObj;
}


/**
 * This function searches products based on text input
 */
async function getProductByText(textInput){
    let regexPattern = '.*' + textInput + '.*';
    let search = await productModel.find({name :  { 
    $regex : regexPattern

    }});
   return search;

}

/**
 * This function just add the hardcorded values to the  database.
 Only meant for testing purposes
 */
async function addSomeObjects(){
    let products = [{
        id : 003,
        name : 'Ashirwad Special att',
        quantity : 2,
        price : 100,
        category : 'wheat'
    
    },{
        id:004,
        name : 'Rajbhog special chakki aata',
        quantity : 4,
        price : 400,
        category : 'wheat'
    }]
    products.forEach(element => {
        var currentObj = new productModel(element);
        currentObj.save();
    });
}

async function getUniqueCategories(){
    let searchResult = await productModel.find().distinct('category');
    console.log(searchResult);
    return searchResult;
}
module.exports = {
    getProductsByCategory : getProductsByCategory,
    addSomeObjects : addSomeObjects,
    getProductByText : getProductByText,
    getUniqueCategories : getUniqueCategories
}