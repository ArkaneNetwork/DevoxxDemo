(function () {

  window.arkaneConnect = new ArkaneConnect('Devoxx', ['Ethereum'], 'staging');

  window.arkaneConnect
    .checkAuthenticated()
    .then((result) => result.authenticated((auth) => {
        initializeWallets();
        initializeProfile();
      })
        .notAuthenticated((auth) => {
          console.log('not authenticated')
          window.arkaneConnect.authenticate();
        })
    )
    .catch(reason => {
      console.log(reason);
    });

  function initializeProfile() {
    arkaneConnect.getProfile().then((profile) => {
      setUsername(profile.userId);
    });
  }

  function initializeWallets() {
    arkaneConnect.getWallets()
      .then((wallets) => {
        for (const wallet of wallets) {
          addRow(wallet);
        }
        $('.btnSend').click(doTransaction);
      });
  }

  function doTransaction(caller) {
    let walletId = $(caller.target).data('wallet-id');
    let secretType = $(caller.target).data('secretType');
    let to = $('#btnSendFunds').val();

    window.arkaneConnect
      .buildTransactionRequest({
        walletId: walletId,
        to: to,
        value: 0.1,
        secretType: secretType
      })
      .then(transactionRequest => {
        window.arkaneConnect
          .executeTransaction(transactionRequest)
          .then(function (result) {
            console.log(result);
            swal({
              text: 'Successfully submitted transaction: ' + result.result.transactionHash,
              icon: 'success'
            })
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  };
})();