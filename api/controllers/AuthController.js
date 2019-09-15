/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login: (req, res) => {
    let body = req.body;
    //Return error if email or password are not passed
    if (!body.email || !body.password) {
        return res.badRequest({
          message: 'Email or password cannot be empty',
          code: 400
        });
    }
    //Find the user from email
    Users.findOne({
      where: { email: body.email }
    }).exec((err, user) => {
        if (err) {
            return res.status(500).json({
              message: error,
              code: 500
            });
        }
        if (!user) {
            return res.status(404).json({
              message: 'User not found.',
              code: 404
            });
        }
        //Compare the password
        bcrypt.compare(body.password, user.password, async (err, result) => {
            if(result) {
              user = await Users.updateOne({email: user.email})
                .set({logged: 1})
            	//password is a match
            	return res.status(200).json({
                    data: {
                      username: user.username,
                      email: user.email,
                      fullname: user.fullname,
                      logged: user.logged
                    },
                    token: jwToken.sign(user)
                });
            } else {
            	//password is not a match
            	return res.status(403).json({
                message: 'Email and password combination do not match',
                code: 403
              });
            }
        });
    });
  },
  logout: (req, res) => {
    let body = req.body;
    jwToken.verify(body.token, async (err, decoded) => {
      let user = decoded.data
  		if(err) {
  			return res.status(401).json({
          message: 'Invalid token',
          code: 401
        });
  		}
      await Users.updateOne({email: user.email})
        .set({logged: 0});
      return res.status(200).json({
        message: 'User successfully logged out',
        code: 200
      });
  	});
  }

};
