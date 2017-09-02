'use strict';

module.exports = function(Client) {
  //send verification email after registration
  Client.afterRemote('create', function(ctx, client, next) {
    //var Gallery = User.app.models.Gallery;

    var options = {
      type: 'email',
      to: client.email,
      from: 'noreply@loopback.com',
      subject: 'Thanks for registering.',
      client: client
    };

    /**
     * [verify sign up email]
     * @param  {[object]} err      [throw error]
     * @param  {[object]} response [response to user]
     * @return [type]            [description]
     */
    client.verify(options, function(err, response) {
      if (err) {
        Client.deleteById(client.id);

        return next(err);
      }

      console.log('> verification email sent:', response);
    });
    next();
  });

  //send password reset link when requested
  Client.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';

    Client.app.models.Email.send({
      to: info.email,
      from: info.email,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });
};
