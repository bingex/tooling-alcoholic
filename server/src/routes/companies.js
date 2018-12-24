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
