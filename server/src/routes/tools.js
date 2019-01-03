import express from 'express';
import Tool from './../models/tool';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();

router.get('/:user', (req, res) => {
  Tool.query({
    select: ['name', 'tool_type_id', 'user_id'],
    where: { user_id: req.params.user }
  })
    .fetchAll()
    .then(tools => {
      res.json({ tools: tools ? tools : [] });
    });
});

router.post('/', (req, res) => {
  validateTool(req.body).then(({ errors, isValid }) => {
    if (isValid) {
      const { name, tool_type_id, user_id } = req.body;

      Tool.forge(
        {
          name,
          tool_type_id,
          user_id
        },
        { hasTimestamps: true }
      )
        .save()
        .then(response => res.json({ success: true, id: response.id }))
        .catch(error => res.status(500).json({ error }));
    } else {
      res.status(400).json(errors);
    }
  });
});

function validateTool(data) {
  let errors = {};

  return Tool.query({
    where: { name: data.name }
  })
    .fetch()
    .then(tool => {
      if (tool) {
        errors.tool = 'There is tool with such name';
      }

      if (!data.tool_type_id) {
        errors.tool_type_id = 'There is no tool type id in params';
      }

      if (!data.user_id) {
        errors.user_id = 'There is no user id in params';
      }

      return {
        errors,
        isValid: isEmpty(errors)
      };
    });
}

export default router;
