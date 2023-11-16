
//Outputs the quantity of an assets and is rounded to the 4th decimal, 0.0001 BTC = 3$
function assetQuantity (amount, price) {
    const quantity = (amount / price).toFixed(4)
    return quantity
}

export { assetQuantity }