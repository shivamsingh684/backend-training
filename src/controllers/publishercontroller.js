const publishModel=require("../models/publisherModel");

const createpublisher= async function (req, res) {
    let publisher = req.body
    let publisherCreated = await publishModel.create(publisher)
    res.send({data: publisherCreated})
}

const getpublisherdata= async function (req, res) {
    let publish = await publishModel.find()
    res.send({data:publish})
}

module.exports.createpublisher= createpublisher
module.exports.getpublisherdata= getpublisherdata