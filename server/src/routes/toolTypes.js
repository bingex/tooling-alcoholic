import express from 'express';
import ToolType from './../models/toolType';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();

router.get('/', (req, res) => {
  ToolType.query({
    select: ['id', 'name', 'picture']
  })
    .fetchAll()
    .then(tool_types => res.json({ tool_types }));
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
        .catch(error => res.status(500).json({ error }));
    } else {
      res.status(400).json(errors);
    }
  });
});

router.delete('/:id', (req, res) => {
  // TODO: CHECK IF THERE IS SOME TOOL WITH SOME TYPE THAT WE WANT TO DELETE
  // https://arjunphp.com/bookshelf-js-deleting-row-related-rows-many-many-relationship/
  if (!req.params.id) {
    res.status(400).json({ id: 'id field is required' });
  }

  ToolType.query({
    where: { id: req.params.id }
  })
    .destroy()
    .then(response => res.json({ success: true }))
    .catch(error =>
      res.status(500).json({ error: error.message ? error.message : error })
    );
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
