import express from 'express';
import Company from './../models/company';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();

router.get('/', (req, res) => {
  Company.query({
    select: ['id', 'name']
  })
    .fetchAll()
    .then(companies => res.json({ companies }));
});

router.post('/', (req, res) => {
  validateCompanyName(req.body).then(({ errors, isValid }) => {
    if (isValid) {
      const { name } = req.body;

      Company.forge(
        {
          name
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

router.put('/:id', (req, res) => {
  const { name } = req.body;

  Company.forge(
    {
      id: req.params.id
    },
    { hasTimestamps: true }
  )
    .save({ name }, { patch: true })
    .then(response => res.json({ success: true, id: response.id }))
    .catch(error => res.status(500).json({ error }));
});

router.delete('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ id: 'id field is required' });
  }

  Company.query({
    where: { id: req.params.id }
  })
    .destroy()
    .then(() => res.json({ success: true }))
    .catch(error =>
      res.status(500).json({ error: error.message ? error.message : error })
    );
});

function validateCompanyName(data) {
  let errors = {};

  return Company.query({
    where: { name: data.name }
  })
    .fetch()
    .then(company => {
      if (company) {
        errors.company = 'There is company with such name';
      }

      return {
        errors,
        isValid: isEmpty(errors)
      };
    });
}

export default router;
