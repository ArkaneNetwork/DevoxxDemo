function addRow(wallet) {
  var template = $('#hidden-template').html();
  var item = $(template).clone();
  $(item).find('#description').html(wallet.description);
  $(item).find('#address').html(wallet.address);
  $(item).find('#balance').html(wallet.balance.balance);
  $(item).find('#secretType').html(wallet.secretType);
  $(item).find('.btnSend').data("wallet-id", wallet.id);
  $(item).find('.btnSend').data("secretType", wallet.secretType.toUpperCase());
  $('#tblWallets').append(item);
}

function setUsername(userName) {
  $('#username').html(userName);
}