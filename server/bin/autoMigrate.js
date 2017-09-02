var app = require('../server');

var dataSource = app.dataSources.postgre;

var appModels = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];

dataSource.automigrate('client', function(err){
  if (err) throw err;
  dataSource.disconnect();
});

dataSource.automigrate('client-data', function(err){
  if (err) throw err;
  dataSource.disconnect();
});

dataSource.automigrate('dependant', function(err){
  if (err) throw err;
  dataSource.disconnect();
});

dataSource.automigrate('spouse', function(err){
  if (err) throw err;
  dataSource.disconnect();
});

dataSource.automigrate('medicalCondition', function(err){
  if (err) throw err;
  dataSource.disconnect();
});
/*
dataSource.automigrate('property', function(err){
if (err) throw err;
dataSource.disconnect();
});

dataSource.automigrate('post', function(err){
if (err) throw err;
dataSource.disconnect();
});

dataSource.automigrate('Image', function(err){
  if (err) throw err;
  dataSource.disconnect();
});

dataSource.automigrate('subscriber', function(err){
  if (err) throw err;
  dataSource.disconnect();
});
*/
dataSource.isActual(appModels, function(err, actual) {
  if (!actual) {
    dataSource.autoupdate(appModels, function(err) {
      if (err) throw (err);
    });
  }
});
