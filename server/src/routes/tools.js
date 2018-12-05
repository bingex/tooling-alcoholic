import express from 'express';
import Tool from './../models/tool';

let router = express.Router();

router.get('/', (req, res) => {
  Tool.query({
    select: ['name', 'user_id']
  })
    .fetchAll()
    .then(tools => {
      res.json({ tools });
    });
});

router.post('/', (req, res) => {});

export default router;
