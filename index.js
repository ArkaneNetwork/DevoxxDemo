(function () {

  window.arkaneConnect = new ArkaneConnect('Devoxx', ['Ethereum'], 'staging');

  window.arkaneConnect
    .checkAuthenticated()
    .then((result) => result.authenticated((auth) => {
        initializeWallets();
        initializeProfile();
      })
        .notAuthenticated((auth) => {
          window.arkaneConnect.authenticate();
        })
    )
    .catch(reason => {
      console.log(reason);
    });

  function initializeProfile() {
    arkaneConnect.getProfile().then((profile) => {
      setUsername(profile.firstName + " " + profile.lastName);
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

    const signer = arkaneConnect.createSigner();
    arkaneConnect.buildTransactionRequest({
      walletId: walletId,
      secretType: secretType,
      to: to,
      value: 0.1
    }).then((transactionRequest) => {
      signer.executeTransaction(transactionRequest).then((response) => {
        swal({
          text: response.result.transactionHash,
          icon: 'success'
        });
      });
    });
  }
})();