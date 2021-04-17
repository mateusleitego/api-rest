const { Router } = require('express');
const mongoose = require('mongoose');
const router = Router();

const Produto = require('../models/produtos');

// listar todos os produtos
router.get('/', (req, res) => {
  Produto.find()
    .exec()
    .then((produtos) => {
      return res.status(200).json(produtos);
    })
    .catch((err) => {
      return res.status(400).json({ Error: err });
    });
});

// listar um unico produto
router.get('/:id', (req, res) => {
  Produto.findById(req.params.id)
    .exec()
    .then((produto) => {
      return res.status(200).json(produto);
    })
    .catch((err) => {
      return res.status(400).json({ Error: err });
    });
});

// criar um produto
router.post('/', (req, res) => {
  const produto = new Produto({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    preco: req.body.preco,
  });

  produto
    .save()
    .then(() => {
      res.status(201).json(produto);
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});

// alterar um produto
router.put('/:id', async (req, res) => {
  Produto.findById(req.params.id)
    .exec()
    .then((produto) => {
      produto.updateOne(req.body).then(() => {
        return res.status(200).json({ message: 'Produto Alterado' });
      });
    })
    .catch((err) => {
      return res.status(400).json({ Error: err });
    });
});

// deletar um produto
router.delete('/:id', (req, res) => {
  Produto.findById(req.params.id)
    .exec()
    .then((produto) => {
      produto.deleteOne();
      return res.status(200).json({ message: 'Produto Deletado' });
    })
    .catch((err) => {
      return res.status(400).json({ Error: err });
    });
});

module.exports = router;
