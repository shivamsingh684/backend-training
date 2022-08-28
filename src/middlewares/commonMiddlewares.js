
const mid1= function ( req, res, next) {
    if(!req.headers.isfreeappuser){
        return res.send({msg:"request missing in header"})
    }
    else{
        if(req.headers.isfreeappuser=="false"){
            req.headers["freeapp"]=false
        }
        else if(req.headers.isfreeappuser=="true"){
            req.headers["freeapp"]=true
        }
    }
    next()
}

module.exports.mid1=mid1
