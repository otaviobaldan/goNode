const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const userAd = await User.findById(req.userId)

    Queue.create(PurchaseMail.key, { userAd, content, purchaseAd }).save()

    return res.status(200).json({ message: 'Email sended' })
  }
}

module.exports = new PurchaseController()
