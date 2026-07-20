/* Shared helper for talking to the Railway PHP backend.
   IMPORTANT: set API_BASE to your Railway deployment URL before going live,
   e.g. "https://tcmmc-backend-production.up.railway.app/api/" */
var TCM_API_BASE = "https://tcm-mc-backend-production.up.railway.app/api/";

function tcmGetToken(){ return localStorage.getItem("tcm_token") || ""; }
function tcmSetToken(token){ localStorage.setItem("tcm_token", token); }
function tcmClearToken(){ localStorage.removeItem("tcm_token"); }

/**
 * Calls an endpoint under TCM_API_BASE with a JSON body (or no body for GET-style reads).
 * Always sends the auth token (if present) as a Bearer header.
 * Resolves to { ok, status, data } — never rejects on a normal API error response,
 * only rejects on a network-level failure (server unreachable, CORS blocked, etc.).
 */
function tcmApi(path, body){
  var headers = { "Content-Type": "application/json" };
  var token = tcmGetToken();
  if(token) headers["Authorization"] = "Bearer " + token;

  return fetch(TCM_API_BASE + path, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body || {})
  }).then(function(res){
    return res.json().then(function(data){
      return { ok: res.ok, status: res.status, data: data };
    });
  });
}

/** Redirects guests to login.html; call at the top of any page that requires login. */
function tcmRequireLogin(){
  if(!tcmGetToken()){
    window.location.href = "login.html";
  }
}
