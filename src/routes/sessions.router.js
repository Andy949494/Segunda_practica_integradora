import {Router} from 'express';
import passport from 'passport';
import {authorization, passportCall} from '../utils.js'


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

// Ruta protegida que devuelve los datos del usuario autenticado
router.get('/current', passportCall('jwt'), (req, res) => {
    res.json({ user: req.user });
  });
export default router;
