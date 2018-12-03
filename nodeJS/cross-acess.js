let opt= {
  url: 'https://localhost:8080',
  type: 'get',
  dataType: 'json',
  data: "id=1",
  complete: function (jqXHR, textStatus) {
    // callback
  },
  success: function (data, textStatus, jqXHR) {
    console.log("success");
  },
  error: function (jqXHR, textStatus, errorThrown) {
    console.log("fail");
  }
};

function ajax(){
  console.log("begin");
  //create ajax obj
  let xhr = new XMLHttpRequest();

  let options = opt | {};

  //send ajax request 
  if(options.type ==="get"){
    xhr.open("get",options.url+":"+options.data);
    xhr.send(null);
  }
  else{
    xhr.open("get",options.url+":"+options.data);
    xhr.send();
  }

  //watch the status
  xhr.onreadystatechange = function(){
    if(xhr.readystate === 4){
      let status = xhr.status;
      if(status >= 200 && status < 300){
        options.success && options.success(xhr.responseText, xhr.responseXML);
      }
      else{
        options.fail && options.fail(status);
      }
    }
  }
}
