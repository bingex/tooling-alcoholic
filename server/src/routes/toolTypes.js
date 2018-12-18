import express from 'express';
import ToolType from './../models/toolType';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();

router.get('/', (req, res) => {
  ToolType.query({
    select: ['id', 'name', 'picture']
  })
    .fetchAll()
    .then(tool_types => {
      res.json({ tool_types });
    });
});

router.post('/', (req, res) => {
  validateToolTypeName(req.body).then(({ errors, isValid }) => {
    if (isValid) {
      const { name, picture } = req.body;

      ToolType.forge(
        {
          name,
          picture
        },
        { hasTimestamps: true }
      )
        .save()
        .then(response => res.json({ success: true, id: response.id }))
        .catch(err => {
          return res.status(500).json({ error: err });
        });
    } else {
      res.status(400).json(errors);
    }
  });
});

router.delete('/:id', (req, res) => {
  // IMPORTANT: LOOK HERE FOR REMOVING TOOL TYPE THAT IS USED IN TOOL:
  // https://arjunphp.com/bookshelf-js-deleting-row-related-rows-many-many-relationship/
  if (!req.params.id) {
    res.status(400).json({ id: 'id field is required' });
  }
});

function validateToolTypeName(data) {
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
