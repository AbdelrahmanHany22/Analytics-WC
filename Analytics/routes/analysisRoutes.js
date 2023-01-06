const express = require('express')

const analysisController = require('../Controllers/analysisControllers')
const router = express.Router()

// get all 
router.route('/').get(analysisController.allTickets)

// add new
router.route('/').post(analysisController.addTickets)

// returns percentages
router.route('/percentages').get(analysisController.percentages)

// returns top 3 teams
router.route('/rank').get(analysisController.topTeams)

//get asingle match
router.route('/types').post(analysisController.countingTypes)

//add new team
router.route('/team/').post(analysisController.newTeam)

router.route('/teamsAnalysis/').post(analysisController.reservedAnalysis)
// update match details in the db
//router.route('/').patch(analysisController.updateTickets)

module.exports = router;