function addRow(wallet) {
  var template = $('#hidden-template').html();
  var item = $(template).clone();
  $(item).find('#description').html(wallet.description);
  $(item).find('#address').html(wallet.address);
  $(item).find('#balance').html(wallet.balance.balance);
  $(item).find('#type').html(wallet.type);
  $(item).find('.btnSend').data("wallet-id", wallet.id);
  $('#tblWallets').append(item);
}