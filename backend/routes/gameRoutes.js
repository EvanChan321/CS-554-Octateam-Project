// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();

router.route('/')
  .get(async (req, res) => {   
    try{
        const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`)
        const { results } = await response.json()

        return res.status(200).json(results); 
    }catch(e){
        return res.status(500).json({error: e})
    } 
  })

router.route('/:id')
  .get(async (req, res) => {
    try{
        const id = req.params.id;
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`)
        const game = await response.json()

        return res.status(200).json(game); 
    }catch(e){
        return res.status(500).json({error: e})
    } 
  })


router.route('/:id/comment')
    .post(async (req, res) => {
  
    })
    .delete(async (req, res) => {
  
    });

export default router;