g_storage_methods = (function(){
  return {
    get:function(key,callback){
      chrome.storage.local.get(key,callback);
    },
    set:function(data,callback=function(){}){
      chrome.storage.local.set(data,callback);
    },
    remove:function(key,callback=function(){}){
      chrome.storage.local.remove(key,callback);
    }
  }
})();

g_sm = g_storage_methods;

/*  usage
非同期処理のため、getした値を入力するなどの処理はcallback内で行う
window['g_sm'].set({"hello":"miracle---"},function(){});
window['g_sm'].get("hello",function(d){
  alert(d.hello);
});

複数の値を同時に取り出すことも出来る
window['g_sm'].get(["id","name"],function(d){});
*/
