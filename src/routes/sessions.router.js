import {Router} from 'express';
import passport from 'passport';

const router = Router();

// Middleware para validar rutas privadas
const privateRoute = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};
// Middleware para validar rutas públicas
const publicRoute = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        res.redirect('/products');
    }
};

router.get('/github',passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{})

router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}),async(req,res)=>{
    req.session.user = req.user;
    res.redirect('/');
})

router.get('/current', privateRoute, async (req,res)=>{
    try {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
    console.log (req.session.user);
    }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal server error.');
    }
})
export default router;