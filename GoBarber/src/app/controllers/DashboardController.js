const moment = require('moment')
const { Op } = require('sequelize')

const { User, Appointment } = require('../models')

class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({
      where: { provider: true }
    })

    let appointments = null
    if (req.session.user.provider) {
      appointments = await Appointment.findAll({
        include: [{ model: User, as: 'user' }],
        where: {
          provider_id: req.session.user.id,
          date: {
            [Op.between]: [
              moment()
                .startOf('day')
                .format(),
              moment()
                .endOf('day')
                .format()
            ]
          }
        }
      })
    }

    return res.render('dashboard', { providers, appointments })
  }
}

module.exports = new DashboardController()
