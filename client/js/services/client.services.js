/**
 * @ngdoc client services
 * @description handles clients CRUD operations
 */

'use strict';

angular.module('app')
 .factory('ClientService', [
   'Client',
   'ClientData',
   'Spouse',
   'MedicalCondition',
   '$rootScope',
   '$q',
    function(Client, ClientData, Spouse, MedicalCondition, $rootScope){
      return {
         /**
          * '[gets client's bio]'
          * @return {[object]} [clientbio object]
          */
        getClientBio: function(){
          return Client.getClientBio(
             {id:1}
          ).$promise;
        },

         /**
          * [creates client medical Conditions]
          * @param  {[string]} name [name of medical condition]
          * @return {[promise]}      [for procesing erros and success]
          */
        createMedicalConditions: function(name){
            return MedicalCondition.create({
                name: name,
                clientId: $rootScope.currentUser.id
             })
             .$promise
         },

         /**
          * get client's medical conditions
          * @return {[array]} [medical conditions array]
          */
         getMedicalConditions: function() {
            return Client.medicalConditions().$promise;
         },

         /**
          * [creates client's data]
          * @param  {[string]} firstName     [client's first name]
          * @param  {[string]} lastName      [client's last name]
          * @param  {[string]} sex           [client's sex]
          * @param  {[string]} maritalStatus [cliet's marital status]
          * @return {[promise]}              [for processing success and failiures]
          */
         createClientdata: function(firstname, lastname, maritalStatus, dob){
             return ClientData.create({
               firstName: firstname,
               lastName: lastname,
               maritalStatus: maritalStatus,
               dob: dob,
               clientId: $rootScope.currentUser.id
             }).$promise
          },

          /**
           * [get client data]
           * @return {[object]} [client data]
           */
          getClientData: function(){
             return Client.hasClientData().$promise;
          },

          /**
           * [creates clients spouses]
           * @param  {[string]} name [name of spouse]
           * @return {[promise]}    [for handling success and failiure]
           */
          createSpouse: function(name, dob, occupation){
             return Spouse.create(
                {
                 name: name,
                 dob: dob,
                 occupation: occupation,
                 clientId: $rootScope.currentUser.id
               }
             ).$promise
          },

          /**
           * [get client spouses]
           * @return {[array]} [array of spouses]
           */
          getSpouse: function(){
             return Client.spouses().$promise;
          }

        }
      }
   ]
);
