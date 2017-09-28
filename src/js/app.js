App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      document.body.innerHTML = "No web3 provider.";
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
      web3.eth.getAccounts(function(err, accounts) {
        var account = accounts[0];
        var AdoptionContract = web3.eth.contract(data['abi']);
        var AdoptionContractInstance = AdoptionContract.at(data['address']);
        App.contracts.Adoption = AdoptionContractInstance;
        App.markAdopted(account);
      });
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  handleAdopt: function() {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(err, accounts) {
      if (err) {
        console.log(err);
      }

      var account = accounts[0];

      var AdoptionContractInstance = App.contracts.Adoption;
      AdoptionContractInstance.adopt(petId, { from: account }, function(err, res){
        if (err) {
          console.log(err);
          return;
        }
        App.markAdopted(account);
      });
    });
  },

  markAdopted: function(account) {
    var AdoptionContractInstance = App.contracts.Adoption;
    AdoptionContractInstance.getAdopters.call(function(err, adopters) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(adopters);
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Pending...').attr('disabled', true);
        }
      }
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
