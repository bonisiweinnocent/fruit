module.exports = function fruitBasket(pool) {



    // async function newFruitBasket(types,quantity,price){

    //     let newFruit = await pool.query('INSERT INTO fruit_basket (fruit_type,qty,price) VALUES ($1,$2,$3)'),[types,quantity,price];
    //     return newFruit.rows
    // }




    async function newFruitBasket(types, qtys, prices) {
        

                await pool.query('INSERT INTO fruit_basket(fruit_type,qty,price) VALUES ($1,$2,$3)', [types, qtys, prices]);

            
            return "pear inserted successfully"
    }


    async function findFruitBaskets(type) {


        let fruitBaskets = await pool.query('SELECT fruit_type,qty,price FROM fruit_basket  WHERE fruit_type = $1', [type]);
        return fruitBaskets.rows
    }


    async function updateBasket(fruit, qty) {


        pool.query('UPDATE fruit_basket SET qty = qty + $1 WHERE fruit_type = $2', [qty, fruit]);

    }


    async function showTotalPrice(fruit) {
        let total = await pool.query('SELECT price FROM fruit_basket WHERE fruit_type = $1', [fruit]);
        return total.rows

    }



    async function totalPrice(type) {
        let total = await pool.query('SELECT sum(price) from fruit_basket WHERE fruit_type = $1', [type]);
        return total.rows
    }

    return {
        newFruitBasket,
        findFruitBaskets,
        updateBasket,
        showTotalPrice,
        totalPrice,

        


    }
}