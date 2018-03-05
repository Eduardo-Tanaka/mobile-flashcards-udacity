var express = require('express');
var router = express.Router();
const connection = require('../config/config')

router.post('/', function(req, res, next) {
	connection.query(`SELECT COUNT(*) as qtd FROM TB_SCORE WHERE ID_DECK = ?`, req.body.id, function (error, results, fields) {
	  if (error) res.status(500).send(error);
	  
	  const score = { ID_DECK: req.body.id, VL_SCORE: req.body.score, PC_SCORE: req.body.perc }
	  if(results[0].qtd === 0) {
	  	connection.query(`INSERT INTO TB_SCORE SET ?`, score, function (error, results, fields) {
	  		if (error) res.status(500).send(error);

	  		res.send(score)
	  	})
	  } else {
	  	connection.query(`UPDATE TB_SCORE SET VL_SCORE = ?, PC_SCORE = ? WHERE ID_DECK = ?`, [req.body.score, req.body.perc, req.body.id], function (error, results, fields) {
	  		if (error) res.status(500).send(error);

	  		res.send(score)
	  	})
	  }  
	});
});

module.exports = router;