function opcode(cmd, pin, value, cb) {
  var data = { cmd: cmd, pin: pin, value: value};
  $.ajax({
    type: "POST",
    url: '/board',
    data: data,
    success: function(data) {console.log(data)},
    dataType: 'json'
  });

}
