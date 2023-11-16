function assetQuantity (amount, price) {
    const quantity = (amount / price).toFixed(4)
    return quantity
}

export { assetQuantity }