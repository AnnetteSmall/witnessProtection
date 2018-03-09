
var dbPromise = idb.open('lifecoach', 3, function(db) {

    if (!db.objectStoreNames.contains('users')) {
    db.createObjectStore('users', {keyPath: 'Rowid', autoIncrement: true});
  }

});



function writeData(st, data) {
  return dbPromise
    .then(function(db) {
      var tx = db.transaction(st, 'readwrite');
      var store = tx.objectStore(st);
      store.put(data);
      return tx.complete;
    });
}

function readAllData(st) {
  return dbPromise
    .then(function(db) {
      var tx = db.transaction(st, 'readonly');
      var store = tx.objectStore(st);
      return store.getAll();
    });
}

function dataURItoBlob(dataURI) {
    console.log('URI thingie');

    var arr = dataURI.split(','), mime = arr[0].match(/:(.*?);/)[1];
    return new Blob([atob(arr[1])], {type:mime});

  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], {type: mimeString});
  return blob;
}
