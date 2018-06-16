window["g_sm"].get(`except_all`,function(a){
  if(a.except_all) return;
  var is_color = true;

  window["g_sm"].get("except_url",function(u){
    window["g_sm"].get("except_page",function(p){
      window["g_sm"].get("except_domain",function(d){
        var url_obj = new URL(location.href);
        var u_ary = u.except_url || []
        var p_ary = p.except_page || []
        var d_ary = d.except_domain || []
        if(u_ary.includes(url_obj.href)) return;
        if(p_ary.includes(url_obj.origin+url_obj.pathname)) return;
        if(d_ary.includes(url_obj.origin)) return;
        //これでブラウザの画面の色変え
        document.body.style.backgroundColor = 'orange';
      });
    });
  });

});
