(function () {

  initializeWallets();
  initializeProfile();

  function initializeProfile() {
    setUsername('Quinten De Swaef');
  }

  function initializeWallets() {
    const wallets = [
      {
        id: '100',
        description: 'Devoxx Hardcoded Wallet 1',
        secretType: 'ETHEREUM',
        address: '0x742d35cc6634c0532925a3b844bc454e4438f44e',
        balance: {
          balance: 'poor'
        }
      },
      {
        id: '101',
        description: 'Devoxx Hardcoded Wallet 1',
        secretType: 'VECHAIN',
        address: '0x281055afc982d96fab65b3a49cac8b878184cb16',
        balance: {
          balance: 'very poor'
        }
      }
    ];

    for (const wallet of wallets) {
      addRow(wallet);
    }
    $('.btnSend').click(doTransaction);
  }

  function doTransaction(caller) {
    let walletId = $(caller.target).data('wallet-id');
    let secretType = $(caller.target).data('secretType');
    let to = $('#btnSendFunds').val();

    swal({
      text: `I'm not sure how to do this without Arkane...`,
      icon: 'error'
    });
  }
})();