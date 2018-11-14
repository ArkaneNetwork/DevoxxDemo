(function () {

  window.arkaneConnect = new ArkaneConnect('Devoxx', ['Ethereum'], 'staging');

  window.arkaneConnect
    .checkAuthenticated()
    .then((result) => result.authenticated((auth) => {
        initializeWallets();
        arkaneConnect.getWallets().then(function (wallets) {
          console.log(wallets);
        });
      })
        .notAuthenticated((auth) => {
          console.log('not authenticated')
          window.arkaneConnect.authenticate();
        })
    )
    .catch(reason => {
      console.log(reason);
    });

  function initializeWallets() {
    const wallets = [
      {
        id: 100,
        description: 'Wallet 1',
        secretType: 'ETHEREUM',
        address: '0x4e632a4Ca7181DaB325e408054277F92BFEa3d33',
        balance: {
          balance: 1.00
        }
      },
      {
        id: 101,
        description: 'Wallet 2',
        secretType: 'ETHEREUM',
        address: "0x0d43d01038C4e97d4C369355f08b63A29e757f12",
        balance: {
          balance: 2.00
        }
      }
    ];

    for (const wallet of wallets) {
      addRow(wallet);
    }

    $('.btnSend').click(doTransaction);
  }

  function doTransaction(caller) {
    console.log($(caller.target).data('wallet-id'));
    window.arkaneConnect
      .buildTransactionRequest({
        walletId: '103',
        to: '0x4e632a4Ca7181DaB325e408054277F92BFEa3d33',
        value: 1,
        secretType: 'ETHEREUM'
      })
      .then(transactionRequest => {
        window.arkaneConnect
          .executeTransaction(transactionRequest)
          .then(function (result) {
            console.log(result);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  };
})();