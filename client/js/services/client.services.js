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
    function(Client, ClientData, Spouse, MedicalCondition, $rootScope, $q){
      return {
         /**
          * '[gets client's bio]'
          * @return {[object]} [clientbio object]
          */
        getClientBio: function(){
          return Client.getClientBio(
             {id:$rootScope.$id}
          ).$promise;
        },

        updateDob: function(id, dob){
           return ClientData.prototype$patchAttributes(
             {id: id},
             {dob: dob}
          ).$promise
         },

         updateName: function(id, firstname, lastname){
            return ClientData.prototype$patchAttributes(
               {id: id},
               {
                  firstName: firstname,
                  lastName: lastname
               }
            ).$promise
         },

        /**
         * [patch marital status]
         * @param  {[integer]} id     [id of client data]
         * @param  {[string]} status [married or not married]
         * @return {[promise]}      [description]
         */
        updateMaritalStatus: function(id, status){
           return ClientData.prototype$patchAttributes(
            {id: id},
            {maritalStatus: status}
         ).$promise
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
            return Client.medicalConditions({id:$rootScope.$id}).$promise;
         },

         /**
          * [delete a medical condition]
          * @param  {[integer]} id [integer id of medical condition]
          * @return {[promise]}    [handle success or error]
          */
         destroyMedicalCondition: function(id){
           return MedicalCondition.deleteById(
             {id: id}
          ).$promise
         },

         /**
          * [creates client's data]
          * @param  {[string]} firstName     [client's first name]
          * @param  {[string]} lastName      [client's last name]
          * @param  {[string]} sex           [client's sex]
          * @param  {[string]} maritalStatus [cliet's marital status]
          * @return {[promise]}              [for processing success and failiures]
          */
         createClientdata: function(firstname, lastname, maritalStatus, dob, sex, clientId){
             return ClientData.create({
               firstName: firstname,
               lastName: lastname,
               maritalStatus: maritalStatus,
               sex: sex,
               dob: dob,
               clientId: clientId
             }).$promise
          },

          updateClientData: function(){
            return ClientData.update({

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
             return Client.spouses({id:$rootScope.$id}).$promise;
          },

          /**
           * [update spouse name]
           * @return {[promise]} [handle erros and success]
           */
          updateSpouseName: function(id, name){
             return Spouse.prototype$patchAttributes(
                {id: id},
                {name: name}
             ).$promise
          },

          /**
           * [update spouse occupation]
           * @param  {[integer]} id       [id of spouse]
           * @param  {[String]} occupation [occupation of spouse]
           * @return {[promise]}            [handle errors and successes]
           */
          updateSpouseOccupation: function(id, occupation){
             return Spouse.prototype$patchAttributes(
                {id: id},
                {occupation: occupation}
             ).$promise

          },

          /**
           * [update spouse date of birth]
           * @param  {[integer]} id  [id of spouse]
           * @param  {[string]} dob [date of birth]
           * @return {[$promise]}     [for handling successes and errors]
           */
          updateSpouseDoB: function(id, dob){
             return Spouse.prototype$patchAttributes(
                {id: id},
                {dob: dob}
             ).$promise
          }
       }
      }
   ]
);
