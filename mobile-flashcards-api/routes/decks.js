var express = require('express');
var router = express.Router();
const connection = require('../config/config')

router.get('/', function(req, res, next) {
	connection.query(`SELECT d.ID_DECK as 'key', d.NM_DECK as title, count(q.ID_DECK) as questions, f.ID_FAVORITE, s.VL_SCORE as score, s.PC_SCORE as perc 
		FROM TB_DECK as d left join TB_QUESTION as q ON d.ID_DECK = q.ID_DECK
		left join TB_FAVORITE as f on d.ID_DECK = f.ID_DECK
		left join TB_SCORE as s on s.ID_DECK = d.ID_DECK
		GROUP BY d.ID_DECK`, function (error, results, fields) {
	  if (error) {
	  	res.status(500).send(error);
	  	return;
	  }

	  res.send(results)
	});
});

router.get('/:id', function(req, res, next) {
	connection.query(`SELECT * FROM TB_QUESTION as q
		left join TB_FAVORITE as f on q.ID_DECK = f.ID_DECK
		WHERE q.ID_DECK = ?`, req.params.id, function (error, results, fields) {
	  if (error) {
	  	res.status(500).send(error);
	  	return;
	  }
	  // connected!
	  res.send(results)
	});
});

router.post('/', function(req, res, next) {
	connection.query("INSERT INTO TB_DECK (NM_DECK) VALUES (?)", req.body.deck, function (error, results, fields) {
	  if (error) {
	  	console.log(error)
	  	res.status(500).send(error);
	  	return;
	  }
	  // connected
	  res.send({id: results.insertId})
	});
});

router.delete('/', function(req, res, next) {
	connection.query("DELETE FROM TB_DECK WHERE ID_DECK = ?", req.body.id, function (error, results, fields) {
	  if (error) {
	  	console.log(error)
	  	res.status(500).send(error);
	  	return;
	  }
	  // connected
	  res.send({id: req.body.id})
	});
});

router.post('/:id/question', function(req, res, next) {
	const question = { DS_QUESTION: req.body.description, IC_QUESTION: req.body.value, ID_DECK: req.body.id }
	connection.query("INSERT INTO TB_QUESTION SET ?", question, function (error, results, fields) {
	  if (error) {
	  	res.status(500).send(error);
	  	return;
	  }
	  question.ID_QUESTION = results.insertId;
	  res.send(question);
	});
});

module.exports = router;