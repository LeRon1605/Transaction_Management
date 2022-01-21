class Authorization
{
    Admin(req, res, next){
        if (req.user.role == 'admin') next();
        else return res.status(200).json({
            message: 'You dont have permission to perfom this service'
        })
    }
};
module.exports = new Authorization();