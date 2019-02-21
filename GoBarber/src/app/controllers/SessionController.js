const { User } = require('../models')

class SessionController {
  create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('Usuário não encontrado')
      return res.redirect('/')
    }

    if (!(await user.comparePassword(password))) {
      console.log('Senha incorreta')
      return res.redirect('/')
    }

    return res.render('/app/dashboard')
  }
}

module.exports = new SessionController()
