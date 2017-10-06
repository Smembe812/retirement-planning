      /**
 * @ngdoc client services
 * @description handles clients CRUD operations
 */

'use strict';

angular.module('app')
 .factory('ClientService', [
   'Creditor',
   'Liability',
   'CashOutFlow',
   'CashInFlow',
   'PensionFund',
   'Dependant',
   'Employer',
   'Client',
   'ClientData',
   'Spouse',
   'MedicalCondition',
   '$rootScope',
   '$q',
    function(
      Creditor,
      Liability,
      CashOutFlow,
      CashInFlow,
      PensionFund,
      Dependant,
      Employer,
      Client,
      ClientData,
      Spouse,
      MedicalCondition,
      $rootScope,
      $q){
      return {
         /**
          * '[gets client's bio]'
          * @return {[object]} [clientbio object]
          */
        getClientBio: function(){
           console.log($rootScope.currentUser.id);
          return Client.getClientBio(
             {id:$rootScope.currentUser.id}
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
            return Client.medicalConditions({id:$rootScope.currentUser.id}).$promise;
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
             return Client.spouses({id:$rootScope.currentUser.id}).$promise;
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
          },

          /**
           * [get client employment details]
           * @return {[$promise]} [handle success and errors]
           */
          getEmploymentDetails: function() {
            return Client.employers(
               {id: $rootScope.currentUser.id}
              ).$promise
          },

          /**
           * [create client employment details]
           * @param  {[string]} name               ``[name of employer]
           * @param  {[string]} employmentNumber   ``[employer number]
           * @param  {[integer]} dateFirstJoined      [date joined company]
           * @param  {[integer]} dateConfirmed        [description]
           * @param  {[type]} currentMonthlySalary [description]
           * @return {[type]}                      [description]
           */
          createEmploymentDetails: function(
             name,
             employmentNumber,
             dateFirstJoined,
             dateConfirmed,
             currentMonthlySalary
          ){
            return Employer.create(
              {
                name: name,
                employmentNumber: employmentNumber,
                dateFirstJoined: dateFirstJoined,
                dateConfirmed: dateConfirmed,
                currentMonthlySalary: currentMonthlySalary,
                clientId: $rootScope.currentUser.id
              }
            ).$promise
          },

          /**
           * [update client monthly salary]
           * @param  {[integer]} id     [id of employer]
           * @param  {[integer]} salary [the actual monnthly salatry]
           * @return {[promise]}        [hande success and rrrors]
           */
          updateMonthlySalary: function(id, salary){
            return Employer.prototype$patchAttributes(
                 {id: id},
                 {currentMonthlySalary: salary}
              ).$promise
          },

         /**
          * [delete client employmet details]
          * @param  {[integer]} id [id of employer]
          * @return {[promise]}    [handle success and errors]
          */
          deleteEmploymentDetails: function(id){
             return Employer.deleteById(
              {id: id}
           ).$promise
        },

        /**
        * [update client monthly salary]
        * @param  {[integer]} id     [id of employer]
        * @param  {[integer]} salary [the actual monnthly salatry]
        * @return {[promise]}        [hande success and rrrors]
        */
        updateEmployerName: function(id, name){
          return Employer.prototype$patchAttributes(
               {id: id},
               {name: name}
            ).$promise
        },

        /**
         * [update client employment number]
         * @param  {[integer]} id     [id of employer]
         * @param  {[string]} number [employyee number]
         * @return {[$promise]}        [handle success and failiure]
         */
        updateEmployementNumber: function(id, number){
          return Employer.prototype$patchAttributes(
               {id: id},
               {employmentNumber: number}
            ).$promise
        },

        /**
         * [update employyee joinn date]
         * @param  {[integer]} id     [id of employer]
         * @param  {[date]}   salary [the join date of organisation]
         * @return {[promise]}      [hande success and errors]
         */
        updateEmployerJoinDate: function(id, date){
          return Employer.prototype$patchAttributes(
               {id: id},
               {dateFirstJoined: date}
            ).$promise
        },

        /**
         * [update employyee joinn date]
         * @param  {[integer]} id     [id of employer]
         * @param  {[date]}   salary [the confirm date of organisation]
         * @return {[promise]}      [hande success and errors]
         */
        updateEmployerConfirmDate: function(id, date){
          return Employer.prototype$patchAttributes(
               {id: id},
               {dateConfirmed: date}
            ).$promise
        },

        createDependant: function(name){
           return Dependant.create(
             {
                name: name,
                clientId: $rootScope.currentUser.id
             }
          ).$promise
       },

       getDependants: function(){
          return Client.dependants({id: $rootScope.currentUser.id}).$promise
       },

       updateDependant: function(id, name){
          return Dependant.prototype$patchAttributes(
             {
                id: id,
                name: name
             }
          ).$promise
       },

       deleteDependant: function(id){
         return Dependant.deleteById({id:id}).$promise
       },

       createPensionFund: function(
         name,
         balance,
         earlyRetirementAge,
         lateRetirementAge,
         localCurrency
       ){
         return PensionFund.create(
           {
             name: name,
             balance: balance,
             earlyRetirementAge: earlyRetirementAge,
             lateRetirementAge: lateRetirementAge,
             localCurrency: localCurrency,
             clientId: $rootScope.currentUser.id
           }
        ).$promise
      },

      getPensionFund: function(){
         return Client.pensionFunds({id: $rootScope.currentUser.id}).$promise
      },

      editPensionFundName: function(id, name){
         return PensionFund.prototype$patchAttributes(
            {
               id: id,
               name: name
            }
         ).$promise
      },

      editPensionFundBalance: function(id, balance){
         return PensionFund.prototype$patchAttributes(
            {
               id: id,
               balance: balance
            }
         ).$promise
      },

      editEarlyRetirementAge: function(id, earlyRetirementAge){
         return PensionFund.prototype$patchAttributes(
            {
               id: id,
               earlyRetirementAge: earlyRetirementAge
            }
         ).$promise
      },

      editLateRetirementAge: function(id, lateRetirementAge){
         return PensionFund.prototype$patchAttributes(
            {
               id: id,
               lateRetirementAge: lateRetirementAge
            }
         ).$promise
      },

      editLocalCurrency: function(id, localCurrency){
         return PensionFund.prototype$patchAttributes(
            {
               id: id,
               localCurrency: localCurrency
            }
         ).$promise
      },

      createCashInFlow: function(
        pensionContributions,
        insurancepolicyPremiums,
        dividendsReInvested,
        investmentInterest,
        reInvestedBusinessesNetSurpluses,
        salaryMonthlyContributions,
        propertyRentals,
        partTimeWork,
        other
       ){
          return CashInFlow.create(
            {
               pensionContributions: pensionContributions,
               insurancepolicyPremiums: insurancepolicyPremiums,
               dividendsReInvested: dividendsReInvested,
               investmentInterest: investmentInterest,
               reInvestedBusinessesNetSurpluses: reInvestedBusinessesNetSurpluses,
               salaryMonthlyContributions: salaryMonthlyContributions,
               propertyRentals: propertyRentals,
               partTimeWork: partTimeWork,
               other: other,
               clientId: $rootScope.currentUser.id
            }
          ).$promise
       },

      getCashInFlow: function(){
         return Client.cashInFlows({id: $rootScope.currentUser.id}).$promise
      },

      editPensionContributions: function(id, pensionContributions){
         return CashInFlow.prototype$patchAttributes(
            {
               id: id,
               pensionContributions: pensionContributions
            }
         ).$promise
      },

      editInsurancepolicyPremiums: function(id, insurancepolicyPremiums){
         return CashInFlow.prototype$patchAttributes(
            {
               id: id,
               insurancepolicyPremiums: insurancepolicyPremiums
            }
         ).$promise
      },

      editDividendsReInvested: function(id, dividendsReInvested){
         return CashInFlow.prototype$patchAttributes(
            {
               id: id,
               dividendsReInvested: dividendsReInvested
            }
         ).$promise
      },

      editInvestmentInterest: function(id, investmentInterest){
         return CashInFlow.prototype$patchAttributes(
            {
               id: id,
               investmentInterest: investmentInterest
            }
         ).$promise
      },

      editReInvestedBusinessesNetSurpluses: function(id, reInvestedBusinessesNetSurpluses){
         return CashInFlow.prototype$patchAttributes(
            {
               id: id,
               reInvestedBusinessesNetSurpluses: reInvestedBusinessesNetSurpluses
            }
         ).$promise
      },

      editSalaryMonthlyContributions: function(id, salaryMonthlyContributions){
         return CashInFlow.prototype$patchAttributes(
            {
               id: id,
               salaryMonthlyContributions: salaryMonthlyContributions
            }
         ).$promise
      },

      editPropertyRentals: function(id, propertyRentals){
         return CashInFlow.prototype$patchAttributes(
            {
               id: id,
               propertyRentals: propertyRentals
            }
         ).$promise
      },

      editPartTimeWork: function(id, partTimeWork){
         return CashInFlow.prototype$patchAttributes(
            {
               id: id,
               partTimeWork: partTimeWork
            }
         ).$promise
      },

      editOther: function(id, other){
         return CashInFlow.prototype$patchAttributes(
            {
               id: id,
               other: other
            }
         ).$promise
      },

      createCashOutFlow: function(
         bills,
         lifeInsurancePolicyPremiums,
         medicalCover,
         propertyInsurance,
         vehicleInsurance,
         roadTaxes,
         vehicleMaintanance,
         rentalPayables,
         cityRates,
         groundRent,
         travelEntertainment,
         mortageRepayment,
         loanRepayments,
         gas,
         schoolFees,
         donations,
         groceries,
         food,
         clothing,
         telephone
      ){
         return CashOutFlow.create(
           {

             bills: bills,
             lifeInsurancePolicyPremiums: lifeInsurancePolicyPremiums,
             medicalCover: medicalCover,
             propertyInsurance: propertyInsurance,
             vehicleInsurance: vehicleInsurance,
             roadTaxes: roadTaxes,
             vehicleMaintanance: vehicleMaintanance,
             rentalPayables: rentalPayables,
             cityRates: cityRates,
             groundRent: groundRent,
             travelEntertainment: travelEntertainment,
             mortageRepayment: mortageRepayment,
             loanRepayments: loanRepayments,
             gas: gas,
             schoolFees: schoolFees,
             donations: donations,
             groceries: groceries,
             food: food,
             clothing: clothing,
             telephone: telephone,
             clientId: $rootScope.currentUser.id
           }
         ).$promise
      },

      getCashOutFlow: function(){
         return Client.cashOutFlows({id: $rootScope.currentUser.id}).$promise
      },

      editBills: function(id, bills){
         return CashOutFlow.prototype$patchAttributes(
            {
               id, id,
               bills: bills
            }
         ).$promise
      },

      editGroceries: function(id, groceries){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               groceries: groceries
            }
         ).$promise
      },

      editLifeInsurancePolicyPremiums: function(id, lifeInsurancePolicyPremiums){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               lifeInsurancePolicyPremiums: lifeInsurancePolicyPremiums
            }
         ).$promise
      },

      editMedicalCover: function(id, medicalCover){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               medicalCover: medicalCover
            }
         ).$promise
      },

      editPropertyInsurance: function(id, propertyInsurance){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               propertyInsurance: propertyInsurance
            }
         ).$promise
      },

      editVehicleInsurance: function(id, vehicleInsurance){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               vehicleInsurance: vehicleInsurance
            }
         ).$promise
      },

      editRoadTaxes: function(id, roadTaxes){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               roadTaxes: roadTaxes
            }
         ).$promise
      },

      editCityRates: function(id, cityRates){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               cityRates: cityRates
            }
         ).$promise
      },

      editCashOutFlow: function(id, rentalPayables){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               rentalPayables: rentalPayables
            }
         ).$promise
      },

      editGroundRent: function(id, groundRent){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               groundRent: groundRent
            }
         ).$promise
      },

      editMortageRepayment: function(id, mortageRepayment){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               mortageRepayment: mortageRepayment
            }
         ).$promise
      },

      editLoanRepayments: function(id, loanRepayments){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               loanRepayments: loanRepayments
            }
         ).$promise
      },

      editSchoolFees: function(id, schoolFees){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               schoolFees: schoolFees
            }
         ).$promise
      },

      editDonations: function(id, donations){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               donations: donations
            }
         ).$promise
      },

      editFood: function(id, food){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               food: food
            }
         ).$promise
      },

      editClothing: function(id, clothing){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               clothing: clothing
            }
         ).$promise
      },

      editGas: function(id, gas){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               gas: gas
            }
         ).$promise
      },

      editTelephone: function(id, telephone){
         return CashOutFlow.prototype$patchAttributes(
            {
               id: id,
               telephone: telephone
            }
         ).$promise
      },

      /**
       * [create a liability]
       * @param  {[string]} accountNumber    [client liability account number]
       * @param  {[integer]} outstandingValue [client liability outstanding Value]
       * @param  {[date]} endDate          [end date of liability]
       * @param  {[integer]} rate             [description]
       * @param  {[integer]} instalmentAmount [description]
       * @return {[$promise]}                  [description]
       */
      createLiability: function(
        accountNumber,
        outstandingValue,
        endDate,
        rate,
        instalmentAmount,
        type
      ){
        return Liability.create(
          {
            accountNumber: accountNumber,
            outstandingValue: outstandingValue,
            endDate: endDate,
            rate: rate,
            instalmentAmount: instalmentAmount,
            type: type,
            clientId: $rootScope.currentUser.id
          }
        ).$promise
      },

      /**
       * [deletes a liability]
       * @param  {[integer]} id [id of liability]
       * @return {[$promise]}    [handle success and errors]
       */
      deleteLiability: function(id){
        return Liability.deleteById({id:id}).$promise
      },

      /**
       * [update values of a liability]
       * @param  {[integer]} id               [id of liability]
       * @param  {[integer]} accountNumber    [liability account number]
       * @param  {[integer]} outstandingValue [description]
       * @param  {[date]} endDate             [description]
       * @param  {[number]} rate              [description]
       * @param  {[integer]} instalmentAmount [description]
       * @param  {[string]} type              [description]
       * @return {[$promise]}                 [hundle success and errors]
       */
      updateLiability: function(
        id,
        accountNumber,
        outstandingValue,
        endDate,
        rate,
        instalmentAmount
      ){
        return Liability.prototype$patchAttributes(
          {
            id: id,
            accountNumber: accountNumber,
            outstandingValue: outstandingValue,
            endDate: endDate,
            rate: rate,
            instalmentAmount: instalmentAmount
          }
        ).$promise
      },

      /**
       * [get all the reabilities]
       * @return {[$promise]} [handle Success and errors]
       */
      getliabilities: function(){
        return Client.liabilities({id: $rootScope.currentUser.id}).$promise;
      },

      /**
       * [create a creditor]
       * @param  {[string]} name                  [name of creditor]
       * @param  {[string]} address             [address of creditor]
       * @param  {[integer]} outstandingValue [value owing a creditor]
       * @return {[$promise]}               [handle success and failiure]
       */
      createCreditor: function(name, address, outstandingValue){
        return Creditor.create(
          {
            name: name,
            address: address,
            outstandingValue: outstandingValue,
            accountNumber: 0,
            description: null,
            endDate: 0,
            rate: 0,
            instalmentAmount: 0,
            type: "Creditors: money you owe other people",
            clientId: $rootScope.currentUser.id
          }
        ).$promise
      },

       /**
        * [update a creditor]
        * @param  {[integer]} id                     [id of creditor]
        * @param  {[string]} name                  [name of creditor]
        * @param  {[string]} address             [address of creditor]
        * @param  {[integer]} outstandingValue [value owing a creditor]
        * @return {[$promise]}               [handle success and failiure]
        */
      updateCreditor: function(id, name, address, outstandingValue){
        return Creditor.prototype$patchAttributes(
          {
            id: id,
            name: name,
            address: address,
            outstandingValue: outstandingValue
          }
        ).$promise
      },

      /**
       * [delete a creditor]
       * @param  {[integer]} id [id of creditor]
       * @return {[$promise]}    [handle success or failiure]
       */
      deleteCreditor: function(id){
        return Creditor.delete({id:id}).$promise
      },

      /**
       * [get all client creditors]
       * @return {[$promise]} [handle success or failiure]
       */
      getCreditors: function() {
        return Client.creditors({id: $rootScope.currentUser.id}).$promise
      }

      }
   }
]
);
