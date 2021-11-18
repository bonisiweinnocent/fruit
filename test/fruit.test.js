const assert = require('assert')
const pg = require('pg');
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://bonisiwecukatha:pg123@localhost:5432/fruit_basket';

const fruitBasket = require('../fruit');

const pool = new Pool({
    connectionString
});


describe('The fruit Basket  app', function () {

    beforeEach(async function () {
        console.log("*****");
        await pool.query("delete from fruit_basket;");


    });

    var fruits = fruitBasket(pool);

    it('should be able to create a new fruit basket', async function () {
        await fruits.newFruitBasket('Pear', 3, 9)

        console.log( JSON.stringify(await fruits.getFruit())+'vvvvvvvvvvvv');

        assert.deepStrictEqual([{ fruit_type: 'Pear', qty: 3, price: '9.00' }], await fruits.getFruit())


    });

    it('should be able to find all the fruit baskets  for a given fruit type', async function () {
        await fruits.newFruitBasket("Apple", 5, 10)

        assert.deepStrictEqual([{ fruit_type: 'Apple', qty: 5, price: '10.00' }], await fruits.findFruitBaskets('Apple'));


    });


    it('should be able to update the number of fruits in a given basket ', async function () {

        await fruits.newFruitBasket("Strawberries", 15, 28)
        await fruits.updateBasket("Strawberries", 10)


        assert.deepStrictEqual([{ fruit_type: 'Strawberries', qty: 25, price: '28.00' }], await fruits.findFruitBaskets('Strawberries'));

    });

    it('should be able to show the total price for a given fruit basket', async function () {
        await fruits.newFruitBasket("Banana", 8, 16)

        assert.deepStrictEqual([{ "price": "16.00" }], await fruits.showTotalPrice('Banana'));

    });

    it('should be able show the sum of the total of the fruit baskets for a given fruit type', async function () {
        await fruits.newFruitBasket("Orange", 3, 9)

     



        assert.deepStrictEqual([{ "sum": "9.00" }], await fruits.totalPrice('Orange'));


    });


});
