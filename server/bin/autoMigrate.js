var app = require('../server');

var dataSource = app.dataSources.postgre;

var appModels = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];

/*dataSource.automigrate('client', function(err){
  if (err) throw err;
  dataSource.disconnect();
});

dataSource.automigrate('clientData', function(err){
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

dataSource.automigrate('employer', function(err){
  if (err) throw err;
  dataSource.disconnect();
});

dataSource.automigrate('emailList', function(err){
  if (err) throw err;
  dataSource.disconnect();
});


dataSource.automigrate('PensionFund', function(err){
if (err) throw err;
dataSource.disconnect();
});

dataSource.automigrate('InsuranceCompany', function(err){
  if (err) throw err;
  dataSource.disconnect();
});
dataSource.automigrate('CashOutFlow', function(err){
if (err) throw err;
dataSource.disconnect();
});

dataSource.automigrate('CashInFlow', function(err){
  if (err) throw err;
  dataSource.disconnect();
});
dataSource.automigrate('asset', function(err){
if (err) throw err;
dataSource.disconnect();
});
*/
dataSource.automigrate('Liability', function(err){
  if (err) throw err;
  dataSource.disconnect();
});
dataSource.automigrate('creditor', function(err){
  if (err) throw err;
  dataSource.disconnect();
});
 /*
dataSource.automigrate('subscriber', function(err){
  if (err) throw err;
  dataSource.disconnect();
});

dataSource.isActual(appModels, function(err, actual) {
  if (!actual) {
    dataSource.autoupdate(appModels, function(err) {
      if (err) throw (err);
    });
  }
});
*/
