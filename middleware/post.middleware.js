const checkpost=(req,res,next)=>{
    const {title, body, device}= req.body;
    if(device=="MOBILE" || device=="PC" || device=="TABLET")
    {
        next();
    }
    else{
          res.send("PLease LOGIN with Mobile, PC & Tablet only")
    }
}

module.export={
    checkpost
}