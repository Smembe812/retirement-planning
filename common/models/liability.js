'use strict';

module.exports = function(Liability) {
  Liability.afterRemote('find', function(ctx, liability, next){
    var Creditor = Liability.app.models.Creditor;
    var id = ctx.req.accessToken.userId;

    Creditor.find(
      {where:{clientId: id}},
      function(err, creditors){
        if (err) throw err;

        ctx.result = ctx.result.concat(creditors);
        
        next();
      }
    );
  });
};
