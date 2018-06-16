$(function(){

  //ツールバーのアイコンをクリックしたら実行される。alertをするとポップアップが開かなくなる。
  chrome.tabs.getSelected(null, function(selectedTab){
    chrome.tabs.executeScript(
      selectedTab.id,
      {code:'document.body.style.backgroundColor="orange";'}
    )
  });

});
//{ code: 'document.body.style.backgroundColor="orange"'}
