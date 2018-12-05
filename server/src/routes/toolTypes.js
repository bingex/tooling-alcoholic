import express from 'express';
import ToolType from './../models/toolType';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();

router.get('/', (req, res) => {
  ToolType.query({
    select: ['name']
  })
    .fetchAll()
    .then(tool_types => {
      res.json({ tool_types });
    });
});

router.post('/', (req, res) => {
  validateInput(req.body).then(({ errors, isValid }) => {
    if (isValid) {
      const { name } = req.body;

      ToolType.forge({
        name
      })
        .save()
        .then(() => res.json({ success: true }))
        .catch(() => res.status(500).json({ error: err }));
    } else {
      res.status(400).json(errors);
    }
  });
});

function validateInput(data) {
  let errors = {};

  return ToolType.query({
    where: { name: data.name }
  })
    .fetch()
    .then(toolType => {
      if (toolType) {
        errors.tool_type = 'There is tool type with such name';
      }

      return {
        errors,
        isValid: isEmpty(errors)
      };
    });
}

export default router;
