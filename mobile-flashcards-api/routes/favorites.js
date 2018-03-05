var express = require('express');
var router = express.Router();
const connection = require('../config/config')

router.get('/', function(req, res, next) {
	connection.query(`SELECT d.ID_DECK as 'key', d.NM_DECK as title, count(q.ID_DECK) as questions, s.VL_SCORE as score, s.PC_SCORE as perc  
		FROM TB_FAVORITE as f inner join TB_DECK as d on f.ID_DECK = d.ID_DECK 
		left join TB_QUESTION as q ON d.ID_DECK = q.ID_DECK
		left join TB_SCORE as s on s.ID_DECK = d.ID_DECK
		GROUP BY d.ID_DECK`, function (error, results, fields) {
	  if (error) res.status(500).send(error);
	  
	  res.send(results)
	});
});

router.post('/', function(req, res, next) {
	connection.query(`INSERT INTO TB_FAVORITE (ID_DECK) VALUES (?)`, req.body.id, function (error, results, fields) {
	  if (error) res.status(500).send(error);
	  
	  res.send(results)
	});
});

router.delete('/', function(req, res, next) {
	connection.query(`DELETE FROM TB_FAVORITE WHERE ID_FAVORITE = (?)`, req.body.deck.ID_FAVORITE, function (error, results, fields) {
	  if (error) {
	  	console.log(error)
	  	res.status(500).send(error);
	  }
		req.body.deck.ID_FAVORITE = null	  
	  res.send(req.body.deck)
	});
});

module.exports = router;