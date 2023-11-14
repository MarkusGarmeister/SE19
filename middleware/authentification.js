const isAuth = (req, res, next) => {
    if (req.isAuthenticated()){
        next()
    } else{
        res.redirect("/login")
    }
}

export { isAuth }