'use strict';

module.exports = function(Client) {
  /**
   * [method for getting client bio data]
   * @param  {[object]}   ctx [current context object]
   * @param  {Function} cb  [callback]
   * @return {[object]}     [clientbio]
   */
  Client.getClientBio = function(ctx, cb){
    var clientid = ctx.args.id;
    Client.findById(clientid, function(err, client){
      client.clientHasData(function(err, clientdata){
        if (err) throw err;
        var clientdata = clientdata;
        client.medicalConditions(function(err, medicalConditions) {
          if (err) throw err;

          client.spouses(function(err, spouses){
            if (err) throw err;

            if (spouses == null){
              spouses = {}
            }
            var spouse = spouses;


            var clientbio = {
              clientData: clientdata,
              spouses: spouse,
              medicalConditions: medicalConditions
            }

            ctx.res.json(clientbio);
          });
        });
      });
    });

  }

  Client.remoteMethod('getClientBio', {
    description: 'get client bio data',
    accepts:  [
        { arg: 'ctx', type: 'object', http: { source:'context' } },
        { arg: 'id', type: 'number'}
    ],
    returns: [
      {arg: 'clientbio', type: 'string', root: true}
    ],
    http: {path: "/:id/bio", verb: 'get'}
  });

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
    var response = {
      client: {
        id: client.id,
        email: client.email
      }
    }
    ctx.res.json(response);
  });

  //send password reset link when requested
  Client.on('resetPasswordRequest', function(info) {

    //var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var url = Client.app.get('url').replace(/\/$/, '') + '/reset-password';
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
