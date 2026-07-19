var TCM_API_BASE = "https://YOUR-RAILWAY-APP.up.railway.app/api/";

function tcmAdminGetToken(){ return localStorage.getItem("tcm_admin_token") || ""; }
function tcmAdminClearToken(){ localStorage.removeItem("tcm_admin_token"); }

function tcmAdminApi(path, body){
  var headers = { "Content-Type": "application/json" };
  var token = tcmAdminGetToken();
  if(token) headers["Authorization"] = "Bearer " + token;
  return fetch(TCM_API_BASE + path, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body || {})
  }).then(function(res){
    return res.json().then(function(data){ return { ok: res.ok, status: res.status, data: data }; });
  });
}

function tcmAdminRequireLogin(){
  if(!tcmAdminGetToken()) window.location.href = "login.html";
}
