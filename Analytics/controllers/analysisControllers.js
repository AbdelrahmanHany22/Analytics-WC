
const generalController = require('./generalControllers');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const axios = require('axios').default;

const Type = require("../models/analysisModel");
const teams = require("../models/teamsModel")
const { Model } = require('mongoose');

exports.updateTypeCount = generalController.updateOne(Type)

exports.ticketsData = generalController.getOne(Type)

exports.allTickets = generalController.getAll(Type)

exports.addTickets = generalController.createOne(Type)

exports.newTeam = generalController.createOne(teams)

exports.countingTypes = catchAsync( async (req, res, next) => {
  const type = req.body.meta.action;
  const shi = await Type.findOne({messagesType: type})
  
  if (!shi) {
    return next(new AppError('No document found with that ID', 404));
}

  const count = shi.Count + 1
  const doc = await Type.findOneAndUpdate({messagesType: type}, {$set:{Count:count}})

  res.status(200).json({
    status: 'success',
    data: {
        data: doc
    }
});
})
// fix ba3den
exports.reservedAnalysis = catchAsync( async (req, res, next) => {
  var matchNo = req.body.body.matchNumber;
  const doc = await axios.get(`https://shop-wc-pwiq-n5reuw2cl-abdooo.vercel.app/api/v1/shop/${matchNo}`)
  var homeTeam = doc.data.data.data.homeTeam;
  var awayTeam =  doc.data.data.data.awayTeam;

  const shi2 = await teams.findOne({Team: awayTeam})
  
  if (!shi2) {
    return next(new AppError('No document found with that ID', 404));
}


  const count2 = shi2.Count + 1
  const awayUp = await teams.findOneAndUpdate({Team: awayTeam}, {$set:{Count:count2}})

  
  const shi = await teams.findOne({Team: homeTeam})
  
  if (!shi) {
    return next(new AppError('No document found with that ID', 404));
}

  const count = shi.Count + 1
  const homeUp = await teams.findOneAndUpdate({Team: homeTeam}, {$set:{Count:count}})

  res.status(200).json({
    status: 'success',
    data: {
        awayUp,
        homeUp
    }
  });
});

  exports.percentages = catchAsync( async (req, res, next) => {
    const Pending = await Type.findOne({messagesType: "TICKET_PENDING"})
    const Reserved = await Type.findOne({messagesType: "TICKET_RESERVED"})
    const Cancelled = await Type.findOne({messagesType: "TICKET_CANCELLED"})

    var CountPend = Pending.Count
    var CountRes = Reserved.Count
    var CountCanc = Cancelled.Count
    const max = CountPend + CountRes + CountCanc

    CountPend = Math.round(CountPend /max *100);
    CountRes = Math.round(CountRes /max *100);
    CountCanc = Math.round(CountCanc /max *100);

    res.status(200).json({
      status: 'success',
      data: {
        PendingPercentage: CountPend,
        ReservedPercentage: CountRes,
        CancelledPercentage: CountCanc,
        Max: max
      }
  });
  })

  exports.topTeams = catchAsync(async (req, res, next)=>{
    var max1 =0;
    var fTeam ="";
    var max2 =0;
    var sTeam ="";
    var max3 =0;
    var tTeam ="";
    (await teams.find()).forEach(doc => {
      if(doc.Count> max1){
        max3 = max2;
        tTeam = sTeam;
        max2 = max1;
        sTeam = fTeam;
        max1 = doc.Count;
        fTeam = doc.Team;
    }else if(doc.Count> max2){
        max3 = max2;
        tTeam = sTeam;
        max2 = doc.Count;
        sTeam = doc.Team;
    }else if(doc.Count> max3){
      max3 = doc.Count;
      tTeam = doc.Team;
    }} )
    res.status(200).json({
      status: 'success',
      data: {
          FirstTeam: fTeam,
          SecondTeam: sTeam,
          ThirdTeam: tTeam
      }
    });
  })




