import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════
   STYLES GLOBAUX — Thème sombre Bleu/Rouge SOBEBRA
══════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0e18;
  --surf:#111827;
  --card:#1a2236;
  --card2:#1f2a40;
  --border:#253047;
  --border2:#2e3d5c;
  --blue:#3b82f6;
  --blue-l:#60a5fa;
  --blue-d:rgba(59,130,246,.14);
  --red:#ef4444;
  --red-l:#f87171;
  --red-d:rgba(239,68,68,.14);
  --green:#22c55e;
  --amber:#f59e0b;
  --text:#e2e8f4;
  --muted:#6b7fa3;
  --font:'Nunito',sans-serif;
  --mono:'JetBrains Mono',monospace;
  --r:10px;
  --r2:16px;
}
body{background:var(--bg);font-family:var(--font);color:var(--text);min-height:100vh;-webkit-font-smoothing:antialiased}
input,select,button,textarea{font-family:var(--font)}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:99px}

/* LOGIN */
.login-wrap{min-height:100vh;display:grid;place-items:center;padding:16px;
  background:var(--bg);
  background-image:radial-gradient(ellipse at 15% 50%,rgba(59,130,246,.09),transparent 55%),
                   radial-gradient(ellipse at 85% 20%,rgba(239,68,68,.08),transparent 55%)}
.login-box{background:var(--surf);border:1px solid var(--border);border-radius:var(--r2);
  padding:36px 32px;width:100%;max-width:420px;
  box-shadow:0 24px 60px rgba(0,0,0,.5)}
.brand-badge{display:inline-block;background:var(--blue-d);border:1px solid rgba(59,130,246,.3);
  color:var(--blue-l);padding:4px 12px;border-radius:99px;font-size:11px;font-weight:700;
  font-family:var(--mono);letter-spacing:.8px;margin-bottom:12px}
.brand-name{font-size:22px;font-weight:900;line-height:1.2;margin-bottom:3px}
.brand-sub{font-size:12.5px;color:var(--muted);margin-bottom:28px;line-height:1.5}
.rtabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:22px}
.rtab{padding:13px;border-radius:var(--r);border:1.5px solid var(--border);background:var(--card);
  cursor:pointer;font-weight:700;font-size:13px;color:var(--muted);
  transition:all .15s;text-align:center}
.rtab:hover{border-color:var(--border2);color:var(--text)}
.rtab .ti{font-size:22px;display:block;margin-bottom:3px}
.rtab.rp{border-color:var(--red);background:var(--red-d);color:var(--red-l)}
.rtab.re{border-color:var(--blue);background:var(--blue-d);color:var(--blue-l)}
.lfield{margin-bottom:14px}
.llabel{display:block;font-size:10.5px;font-weight:700;color:var(--muted);
  letter-spacing:.8px;font-family:var(--mono);margin-bottom:6px}
.linp{width:100%;padding:11px 14px;border-radius:var(--r);border:1.5px solid var(--border);
  background:var(--bg);color:var(--text);font-size:14px;outline:none;transition:border .15s}
.linp:focus{border-color:var(--blue)}
.lhint{font-size:11px;color:var(--muted);font-family:var(--mono);margin-top:4px}
.lbtn{width:100%;padding:13px;border-radius:var(--r);border:none;
  font-size:14px;font-weight:800;cursor:pointer;transition:all .15s;letter-spacing:.2px;margin-top:6px}
.lbtn.patron{background:linear-gradient(135deg,var(--red),#c53030);color:#fff}
.lbtn.patron:hover{filter:brightness(1.1);transform:translateY(-1px)}
.lbtn.employe{background:linear-gradient(135deg,var(--blue),#2563eb);color:#fff}
.lbtn.employe:hover{filter:brightness(1.1);transform:translateY(-1px)}
.lerr{background:var(--red-d);border:1px solid rgba(239,68,68,.4);border-radius:8px;
  padding:9px 13px;font-size:13px;color:var(--red-l);margin-top:10px;text-align:center}

/* SHELL */
.shell{display:flex;height:100vh;overflow:hidden}

/* SIDEBAR */
.sb{width:230px;min-width:230px;background:var(--surf);border-right:1px solid var(--border);
  display:flex;flex-direction:column}
.sb-top{padding:16px 14px 14px;border-bottom:1px solid var(--border)}
.sb-tag{font-size:10px;font-weight:700;color:var(--blue-l);font-family:var(--mono);
  letter-spacing:.8px;margin-bottom:3px}
.sb-cie{font-size:13px;font-weight:800;line-height:1.3}
.sb-sec{font-size:11px;color:var(--muted);margin-top:2px;margin-bottom:8px}
.sb-role{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;
  border-radius:99px;font-size:10.5px;font-weight:700;font-family:var(--mono)}
.sb-role.patron{background:var(--red-d);color:var(--red-l);border:1px solid rgba(239,68,68,.3)}
.sb-role.employe{background:var(--blue-d);color:var(--blue-l);border:1px solid rgba(59,130,246,.3)}
.sb-nav{flex:1;padding:10px 7px;overflow-y:auto;display:flex;flex-direction:column;gap:1px}
.sb-section{font-size:9.5px;font-weight:700;color:var(--muted);letter-spacing:1.5px;
  padding:10px 10px 3px;font-family:var(--mono)}
.sb-item{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:8px;
  cursor:pointer;font-size:13px;font-weight:600;color:var(--muted);transition:all .12s}
.sb-item:hover{background:var(--card);color:var(--text)}
.sb-item.on{background:var(--blue-d);color:var(--blue-l);font-weight:700;
  border-left:2.5px solid var(--blue)}
.sb-item .ico{font-size:15px;width:20px;text-align:center;flex-shrink:0}
.sb-item .nb{margin-left:auto;background:var(--red);color:#fff;border-radius:99px;
  font-size:10px;padding:1px 6px;font-family:var(--mono);min-width:18px;text-align:center}
.sb-foot{padding:10px 7px;border-top:1px solid var(--border)}
.sb-user{display:flex;align-items:center;gap:9px;padding:9px 11px;
  border-radius:9px;background:var(--card)}
.sb-av{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;
  justify-content:center;font-size:12px;font-weight:800;color:#fff;flex-shrink:0}
.sb-uname{font-size:12.5px;font-weight:700;line-height:1.2}
.sb-urole{font-size:10.5px;color:var(--muted)}
.sb-out{margin-left:auto;cursor:pointer;color:var(--muted);font-size:17px;
  transition:color .15s;padding:2px}
.sb-out:hover{color:var(--red-l)}

/* MAIN */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{height:54px;min-height:54px;background:var(--surf);border-bottom:1px solid var(--border);
  display:flex;align-items:center;padding:0 20px;gap:12px}
.tb-title{font-size:15px;font-weight:800;flex:1}
.tb-date{font-size:11px;color:var(--muted);font-family:var(--mono)}
.tb-av{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;
  justify-content:center;font-size:11px;font-weight:800;color:#fff}
.tb-name{font-size:12.5px;font-weight:700}
.content{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:15px}

/* BOUTONS */
.btn{display:inline-flex;align-items:center;gap:5px;padding:8px 14px;border-radius:var(--r);
  border:none;font-size:12.5px;font-weight:700;cursor:pointer;transition:all .13s;white-space:nowrap}
.btn:active{transform:scale(.97)}
.b-blue{background:var(--blue);color:#fff}
.b-blue:hover{background:var(--blue-l)}
.b-red{background:var(--red);color:#fff}
.b-red:hover{background:var(--red-l)}
.b-green{background:var(--green);color:#fff}
.b-green:hover{filter:brightness(1.1)}
.b-ghost{background:transparent;border:1.5px solid var(--border);color:var(--muted)}
.b-ghost:hover{border-color:var(--border2);color:var(--text)}
.b-sm{padding:5px 10px;font-size:11.5px}
.b-ico{padding:6px;width:30px;height:30px;justify-content:center}

/* KPI */
.kgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.kpi{background:var(--surf);border:1px solid var(--border);border-radius:var(--r);
  padding:16px;position:relative;overflow:hidden;transition:border .15s,transform .15s}
.kpi:hover{border-color:var(--border2);transform:translateY(-1px)}
.kpi-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.kpi-lbl{font-size:11px;color:var(--muted);font-family:var(--mono);letter-spacing:.4px}
.kpi-ico{font-size:20px}
.kpi-val{font-size:22px;font-weight:900;letter-spacing:-.5px;margin-bottom:3px}
.kpi-sub{font-size:11px;color:var(--muted);font-family:var(--mono)}
.kpi-bar{position:absolute;bottom:0;left:0;right:0;height:3px}

/* PANEL */
.panel{background:var(--surf);border:1px solid var(--border);border-radius:var(--r);overflow:hidden}
.ph{padding:12px 16px;border-bottom:1px solid var(--border);
  display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
.ph-t{font-size:13.5px;font-weight:800}
.ph-s{font-size:11px;color:var(--muted);font-family:var(--mono);margin-top:1px}
.ph-a{display:flex;gap:7px;align-items:center;flex-wrap:wrap}

/* TABLE */
.tw{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:12.5px}
thead th{text-align:left;padding:8px 14px;font-size:9.5px;letter-spacing:.8px;
  color:var(--muted);font-family:var(--mono);font-weight:600;
  border-bottom:1px solid var(--border);background:var(--card);white-space:nowrap}
tbody tr{border-bottom:1px solid rgba(255,255,255,.04);transition:background .1s;cursor:pointer}
tbody tr:last-child{border-bottom:none}
tbody tr:hover{background:rgba(59,130,246,.05)}
td{padding:9px 14px;vertical-align:middle}

/* BADGES */
.bd{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;
  border-radius:99px;font-size:10.5px;font-family:var(--mono);font-weight:600;white-space:nowrap}
.bd-ok{background:rgba(34,197,94,.15);color:#22c55e;border:1px solid rgba(34,197,94,.25)}
.bd-warn{background:rgba(245,158,11,.15);color:#f59e0b;border:1px solid rgba(245,158,11,.25)}
.bd-danger{background:rgba(239,68,68,.15);color:#ef4444;border:1px solid rgba(239,68,68,.25)}
.bd-blue{background:var(--blue-d);color:var(--blue-l);border:1px solid rgba(59,130,246,.25)}
.bd-gray{background:rgba(107,127,163,.12);color:var(--muted);border:1px solid var(--border)}

/* BARRE STOCK */
.sbar{display:flex;align-items:center;gap:7px}
.st{width:52px;height:5px;background:var(--border);border-radius:99px;overflow:hidden;flex-shrink:0}
.sf{height:100%;border-radius:99px;transition:width .6s}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;
  justify-content:center;z-index:400;padding:16px;backdrop-filter:blur(4px);animation:fi .15s}
.modal{background:var(--surf);border:1px solid var(--border);border-radius:var(--r2);
  padding:24px;width:100%;max-width:520px;box-shadow:0 24px 60px rgba(0,0,0,.6);
  max-height:92vh;overflow-y:auto;animation:su .18s cubic-bezier(.4,0,.2,1)}
.modal-lg{max-width:680px}
.mtitle{font-size:16px;font-weight:900;margin-bottom:18px;display:flex;align-items:center;gap:8px}
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.ffull{grid-column:1/-1}
.fg{display:flex;flex-direction:column;gap:4px}
.fl{font-size:10px;font-weight:700;color:var(--muted);letter-spacing:.8px;font-family:var(--mono)}
.fi{padding:10px 12px;border-radius:var(--r);border:1.5px solid var(--border);
  background:var(--bg);color:var(--text);font-size:13.5px;outline:none;
  transition:border .12s;width:100%}
.fi:focus{border-color:var(--blue)}
select.fi{cursor:pointer}
.mact{display:flex;justify-content:flex-end;gap:8px;margin-top:18px;
  padding-top:14px;border-top:1px solid var(--border)}

/* MOUVEMENTS */
.mvt{display:flex;align-items:center;gap:11px;padding:10px 16px;
  border-bottom:1px solid rgba(255,255,255,.04)}
.mvt:last-child{border-bottom:none}
.mvt:hover{background:rgba(59,130,246,.04)}
.mvt-ic{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;
  justify-content:center;font-size:15px;flex-shrink:0}
.m-in{background:rgba(34,197,94,.15)}
.m-out{background:rgba(239,68,68,.15)}
.mvt-body{flex:1;min-width:0}
.mvt-n{font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mvt-i{font-size:10.5px;color:var(--muted);font-family:var(--mono);margin-top:1px}
.mvt-q{font-family:var(--mono);font-weight:700;font-size:14px;white-space:nowrap}
.qin{color:var(--green)}
.qout{color:var(--red)}
.mvt-d{font-size:10px;color:var(--muted);font-family:var(--mono);white-space:nowrap}

/* FACTURE PRINT */
.fac-wrap{background:#fff;color:#111;border-radius:var(--r);padding:30px;
  max-width:720px;margin:0 auto;font-family:var(--font);box-shadow:0 8px 40px rgba(0,0,0,.4)}
.fac-top{display:flex;justify-content:space-between;align-items:flex-start;
  margin-bottom:20px;padding-bottom:18px;border-bottom:2px solid #e5e7eb}
.fac-cie-name{font-size:17px;font-weight:900;color:#111;margin-bottom:2px}
.fac-cie-sub{font-size:11.5px;color:#666;line-height:1.6}
.fac-num-box{text-align:right}
.fac-num{font-size:20px;font-weight:900;color:#111;font-family:var(--mono)}
.fac-date{font-size:12px;color:#888;margin-top:3px;font-family:var(--mono)}
.fac-type-tag{display:inline-block;margin-top:6px;padding:3px 10px;
  border-radius:99px;font-size:11px;font-weight:700}
.fac-parties{display:grid;grid-template-columns:1fr 1fr;gap:14px;
  margin-bottom:18px;padding:14px;background:#f8fafc;border-radius:var(--r)}
.fac-pl{font-size:9px;font-weight:700;letter-spacing:1px;color:#999;
  font-family:var(--mono);margin-bottom:5px;text-transform:uppercase}
.fac-pn{font-size:15px;font-weight:800;color:#111}
.fac-pi{font-size:11.5px;color:#666;margin-top:1px;line-height:1.5}
.fac-t table{font-size:12.5px}
.fac-t thead th{background:#f1f5f9;color:#555;font-size:10px;letter-spacing:.5px;
  padding:8px 12px;border-bottom:1px solid #e2e8f0;font-family:var(--mono)}
.fac-t tbody td{padding:8px 12px;border-bottom:1px solid #f1f5f9;color:#222}
.fac-totals{display:flex;flex-direction:column;align-items:flex-end;gap:5px;
  padding-top:12px;border-top:1px solid #e5e7eb}
.ftr{display:flex;gap:14px;font-size:12.5px}
.ftl{color:#888;width:130px;text-align:right;font-family:var(--mono)}
.ftv{width:120px;text-align:right;font-family:var(--mono);font-weight:600;color:#111}
.ftr.grand{margin-top:6px;padding-top:10px;border-top:2px solid #111}
.ftr.grand .ftl{color:#111;font-weight:800;font-size:14px}
.ftr.grand .ftv{color:#ef4444;font-size:17px;font-weight:900}
.fac-mecef{margin-top:16px;padding-top:12px;border-top:1px dashed #ccc;
  font-size:10.5px;color:#888;font-family:var(--mono);line-height:1.7}
.fac-footer{margin-top:14px;font-size:11px;color:#aaa;text-align:center;line-height:1.7}
.fac-paid{display:inline-block;padding:7px 18px;border:2px solid #22c55e;
  color:#22c55e;border-radius:8px;font-weight:800;font-size:12px;margin-top:8px;letter-spacing:.5px}

/* ALERT */
.alert-b{display:flex;align-items:flex-start;gap:10px;padding:11px 15px;
  border-radius:var(--r);font-size:13px;font-weight:600;line-height:1.5}
.al-d{background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);color:var(--red-l)}
.al-w{background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.3);color:var(--amber)}
.al-b{background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.3);color:var(--blue-l)}

/* DENIED */
.denied{display:flex;flex-direction:column;align-items:center;justify-content:center;
  height:100%;gap:10px;text-align:center;padding:40px}
.denied-ico{font-size:56px;margin-bottom:8px}
.denied-t{font-size:18px;font-weight:800;color:var(--text)}
.denied-s{font-size:13px;color:var(--muted);max-width:300px;line-height:1.7}

/* TOAST */
.toast{position:fixed;bottom:20px;right:20px;background:var(--card2);
  border:1px solid var(--green);border-radius:12px;padding:12px 18px;
  font-size:13px;font-weight:700;z-index:999;display:flex;align-items:center;gap:8px;
  box-shadow:0 8px 32px rgba(0,0,0,.5);animation:su .2s ease;max-width:360px;color:var(--text)}

/* INFO BOX */
.info-box{background:var(--card2);border:1px solid var(--border);border-radius:var(--r);
  padding:12px 14px;font-size:12px;font-family:var(--mono);color:var(--blue-l);
  border-left:3px solid var(--blue)}

/* GRILLES */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:13px}
.g3-1{display:grid;grid-template-columns:2fr 1fr;gap:13px}
.flex{display:flex;gap:7px;align-items:center;flex-wrap:wrap}
.mla{margin-left:auto}
.sep{width:1px;height:20px;background:var(--border)}

@media print{
  .shell,.sb,.topbar,.btn,.overlay,header{display:none!important}
  .fac-wrap{box-shadow:none;padding:0;max-width:100%;margin:0}
  body{background:#fff;padding:20px}
}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes su{from{transform:translateY(8px);opacity:0}to{transform:translateY(0);opacity:1}}
`;

/* ══════════════════════════════════════════════════════
   DONNÉES RÉELLES — extraites des photos
══════════════════════════════════════════════════════ */
const TVA_RATE = 0.18;
const DEVISE   = "FCFA";
const SOCIETE  = {
  nom:     "ETS PARFAIT Business Services",
  court:   "ETS PARFAIT",
  secteur: "Mini Dépôt Boissons SOBEBRA",
  adresse: "Cotonou, République du Bénin",
  tel:     "01 90 34 27 27",
  ifu:     "0202392307684",
};
const FOURNISSEURS = ["FAS & FILS — Distributeur SOBEBRA", "SOBEBRA — Livraison directe"];

/* ─── Produits réels (photo 2) ─── */
const INIT_PRODUITS = [
  /* id  nom                   catégorie   pa(achat)  pv_u(vente unit)  pv_g(vente gros)  stock  min */
  { id:1,  nom:"Flag 66cl",             cat:"Bières",        pa:4900, pv:5880, pvg:5850, stock:60,  min:12 },
  { id:2,  nom:"Béninoise 66cl",        cat:"Bières",        pa:4900, pv:5880, pvg:5850, stock:80,  min:15 },
  { id:3,  nom:"Beaufort 50cl",         cat:"Bières",        pa:4900, pv:5880, pvg:5850, stock:48,  min:10 },
  { id:4,  nom:"Doppel Munici 50cl",    cat:"Bières",        pa:4200, pv:5100, pvg:5050, stock:36,  min:8  },
  { id:5,  nom:"Castel 50cl",           cat:"Bières",        pa:4200, pv:5100, pvg:5050, stock:40,  min:8  },
  { id:6,  nom:"Chill Citron 50cl",     cat:"Bières",        pa:3400, pv:4200, pvg:4180, stock:30,  min:6  },
  { id:7,  nom:"Sucrerie Grand",        cat:"Boissons sucr.",pa:3400, pv:4200, pvg:4180, stock:24,  min:6  },
  { id:8,  nom:"Hagbé 50cl",           cat:"Bières",        pa:6700, pv:8200, pvg:8180, stock:20,  min:5  },
  { id:9,  nom:"Pils Togo 60cl",        cat:"Bières",        pa:7100, pv:8800, pvg:8780, stock:18,  min:4  },
  { id:10, nom:"Awoyo 66cl",            cat:"Bières",        pa:5300, pv:6600, pvg:6580, stock:30,  min:6  },
  { id:11, nom:"Béninoise Petit 33cl",  cat:"Bières",        pa:7000, pv:8600, pvg:8580, stock:72,  min:15 },
  { id:12, nom:"Beaufort 33cl",         cat:"Bières",        pa:5300, pv:6600, pvg:6580, stock:60,  min:12 },
  { id:13, nom:"Chill 33cl",            cat:"Bières",        pa:5300, pv:6600, pvg:9600, stock:48,  min:10 },
  { id:14, nom:"Doppel Energie",        cat:"Boissons énerg.",pa:7800,pv:9600, pvg:11280,stock:24,  min:5  },
  { id:15, nom:"Eku 33cl",             cat:"Bières",        pa:9200, pv:11300,pvg:12300,stock:15,  min:4  },
  { id:16, nom:"Guinness 33cl",         cat:"Bières",        pa:10100,pv:12350,pvg:6580, stock:20,  min:4  },
  { id:17, nom:"Malta Café",            cat:"Malts",         pa:5300, pv:6600, pvg:6580, stock:36,  min:8  },
  { id:18, nom:"Pils Bénin",            cat:"Bières",        pa:5300, pv:6600, pvg:9450, stock:30,  min:6  },
  { id:19, nom:"Whisky Gold",           cat:"Spiritueux",    pa:7800, pv:9500, pvg:9580, stock:12,  min:3  },
  { id:20, nom:"XXL 33cl",             cat:"Bières",        pa:3700, pv:4600, pvg:4580, stock:36,  min:8  },
  { id:21, nom:"Sucrerie Petit",        cat:"Boissons sucr.",pa:7800, pv:9600, pvg:6580, stock:24,  min:6  },
  { id:22, nom:"Valmont",              cat:"Boissons sucr.",pa:5300, pv:6600, pvg:6580, stock:20,  min:5  },
  { id:23, nom:"Kankpé Petit",         cat:"Boissons loc.", pa:5300, pv:6600, pvg:5850, stock:30,  min:6  },
  { id:24, nom:"Kankpé Grand",         cat:"Boissons loc.", pa:4900, pv:5880, pvg:5850, stock:24,  min:6  },
  { id:25, nom:"Sombreros / Tequila",  cat:"Spiritueux",    pa:6200, pv:7500, pvg:7500, stock:10,  min:3  },
];

const INIT_MOUVEMENTS = [
  { id:1, produitId:2, type:"in",  qte:24, raison:"Livraison FAS & FILS", user:"Patron", date:"10/05/2025 09:46" },
  { id:2, produitId:1, type:"in",  qte:12, raison:"Livraison FAS & FILS", user:"Patron", date:"10/05/2025 09:46" },
  { id:3, produitId:7, type:"out", qte:5,  raison:"Vente client",          user:"Employé 1",date:"22/05/2026 11:00" },
  { id:4, produitId:16,type:"out", qte:3,  raison:"Vente client",          user:"Employé 2",date:"22/05/2026 14:30" },
];

const INIT_FACTURES = [
  {
    id:"FAC-2026-001", type:"vente",
    client:"Bar Chez Tonton", fournisseur:"",
    date:"22/05/2026", heure:"10:30",
    vendeur:"Employé 1",
    lignes:[
      { nom:"Béninoise 66cl",  qte:24, pu:5880 },
      { nom:"Chill Citron 50cl",qte:5, pu:4200 },
    ], statut:"payee",
  },
  {
    id:"ACH-2026-001", type:"achat",
    client:"", fournisseur:"FAS & FILS — Distributeur SOBEBRA",
    date:"10/05/2025", heure:"09:46",
    vendeur:"Patron",
    lignes:[
      { nom:"World Cola 30 SOB 24T",   qte:2, pu:4075 },
      { nom:"Youki Cocktail 33 SOB",   qte:5, pu:4075 },
      { nom:"Youki Moka 33 SOB",       qte:2, pu:4075 },
      { nom:"Youki Pamplemousse 33",   qte:5, pu:4075 },
      { nom:"Youzou 30 SOB 24T",       qte:1, pu:4075 },
    ], statut:"payee",
  },
];

/* ══════════════════════════════════════════════════════
   USERS — Patron + 10 slots employés
══════════════════════════════════════════════════════ */
const INIT_USERS = [
  { id:0, nom:"Patron PARFAIT", prenom:"Patron", role:"patron", pass:"parfait2026", couleur:"#ef4444", ini:"PP" },
  { id:1, nom:"Employé 1",  prenom:"Employé 1",  role:"employe", pass:"emp12026",  couleur:"#3b82f6", ini:"E1", placeholder:true },
  { id:2, nom:"Employé 2",  prenom:"Employé 2",  role:"employe", pass:"emp22026",  couleur:"#3b82f6", ini:"E2", placeholder:true },
  { id:3, nom:"Employé 3",  prenom:"Employé 3",  role:"employe", pass:"emp32026",  couleur:"#3b82f6", ini:"E3", placeholder:true },
  { id:4, nom:"Employé 4",  prenom:"Employé 4",  role:"employe", pass:"emp42026",  couleur:"#3b82f6", ini:"E4", placeholder:true },
  { id:5, nom:"Employé 5",  prenom:"Employé 5",  role:"employe", pass:"emp52026",  couleur:"#3b82f6", ini:"E5", placeholder:true },
  { id:6, nom:"Employé 6",  prenom:"Employé 6",  role:"employe", pass:"emp62026",  couleur:"#3b82f6", ini:"E6", placeholder:true },
  { id:7, nom:"Employé 7",  prenom:"Employé 7",  role:"employe", pass:"emp72026",  couleur:"#3b82f6", ini:"E7", placeholder:true },
  { id:8, nom:"Employé 8",  prenom:"Employé 8",  role:"employe", pass:"emp82026",  couleur:"#3b82f6", ini:"E8", placeholder:true },
  { id:9, nom:"Employé 9",  prenom:"Employé 9",  role:"employe", pass:"emp92026",  couleur:"#3b82f6", ini:"E9", placeholder:true },
  { id:10,nom:"Employé 10", prenom:"Employé 10", role:"employe", pass:"emp102026", couleur:"#3b82f6", ini:"E0", placeholder:true },
];

/* ══════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════ */
const fmt = n => new Intl.NumberFormat("fr-BJ",{minimumFractionDigits:0,maximumFractionDigits:0}).format(Math.round(n))+" "+DEVISE;
const today = () => new Date().toLocaleDateString("fr-FR");
const now   = () => new Date().toLocaleString("fr-FR");
const nowH  = () => new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"});

let _seq = {FAC:1, ACH:1};
const genId = type => {
  const p = type==="vente"?"FAC":"ACH";
  _seq[p]++;
  return `${p}-2026-${String(_seq[p]).padStart(3,"0")}`;
};

const tHT  = lig => lig.reduce((s,l)=>s+l.qte*l.pu,0);
const sc   = (s,m) => s<=m?"#ef4444":s<=m*2?"#f59e0b":"#22c55e";
const slbl = (s,m) => s<=m?"Rupture":s<=m*2?"Stock bas":"OK";
const scls = (s,m) => s<=m?"bd-danger":s<=m*2?"bd-warn":"bd-ok";
const pct  = (s,m) => Math.min(100,Math.round(s/(m*4)*100));

/* ══════════════════════════════════════════════════════
   LOGIN
══════════════════════════════════════════════════════ */
function Login({onLogin}){
  const [role,setRole] = useState("employe");
  const [pass,setPass] = useState("");
  const [err,setErr]   = useState("");

  const go = () => {
    const u = INIT_USERS.find(u=>u.role===role && u.pass===pass);
    if(u){setErr("");onLogin(u);}
    else setErr("❌ Mot de passe incorrect. Réessaie !");
  };

  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="brand-badge">🍺 SOBEBRA · BÉNIN</div>
        <div className="brand-name">ETS PARFAIT<br/>Business Services</div>
        <div className="brand-sub">Mini Dépôt Boissons · Cotonou, Bénin<br/>Application de gestion commerciale</div>

        <div className="rtabs">
          {[{id:"patron",ico:"👑",lbl:"Patron"},{id:"employe",ico:"👤",lbl:"Employé"}].map(r=>(
            <div key={r.id} className={`rtab ${role===r.id?`r${r.id}`:""}`}
              onClick={()=>{setRole(r.id);setPass("");setErr("")}}>
              <span className="ti">{r.ico}</span>{r.lbl}
            </div>
          ))}
        </div>

        <div className="lfield">
          <label className="llabel">MOT DE PASSE</label>
          <input className="linp" type="password" placeholder="Entre ton mot de passe…"
            value={pass} onChange={e=>setPass(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&go()} autoFocus />
          <div className="lhint">
            {role==="patron"?"💡 Indice : parfait2026":"💡 Indice : emp1 → emp12026 / emp2 → emp22026…"}
          </div>
        </div>

        <button className={`lbtn ${role}`} onClick={go}>
          {role==="patron"?"👑 Connexion Patron":"👤 Connexion Employé"}
        </button>
        {err && <div className="lerr">{err}</div>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════ */
const NAV_PATRON = [
  {section:"TABLEAU DE BORD",items:[{id:"dashboard",ico:"📊",lbl:"Vue générale"}]},
  {section:"GESTION STOCK",items:[
    {id:"produits",  ico:"🍺",lbl:"Produits & Stock"},
    {id:"mvt",       ico:"↕️", lbl:"Entrées / Sorties"},
  ]},
  {section:"FACTURATION",items:[
    {id:"factures",  ico:"🧾",lbl:"Toutes les factures"},
    {id:"nouv-fac",  ico:"➕",lbl:"Nouvelle facture"},
  ]},
  {section:"DIRECTION",items:[
    {id:"rapports",  ico:"📈",lbl:"Rapports & CA"},
    {id:"equipe",    ico:"👥",lbl:"Équipe"},
  ]},
];
const NAV_EMPLOYE = [
  {section:"MON ESPACE",items:[
    {id:"produits",  ico:"🍺",lbl:"Produits & Stock"},
    {id:"mvt",       ico:"↕️", lbl:"Entrées / Sorties"},
    {id:"factures",  ico:"🧾",lbl:"Mes factures vente"},
    {id:"nouv-fac",  ico:"➕",lbl:"Nouvelle vente"},
  ]},
];

function Sidebar({user,page,setPage,ruptures,onLogout}){
  const nav = user.role==="patron"?NAV_PATRON:NAV_EMPLOYE;
  return (
    <aside className="sb">
      <div className="sb-top">
        <div className="sb-tag">ETS PARFAIT</div>
        <div className="sb-cie">Business Services</div>
        <div className="sb-sec">🍺 Mini Dépôt SOBEBRA</div>
        <div className={`sb-role ${user.role}`}>
          {user.role==="patron"?"👑 Patron":"👤 Employé"}
        </div>
      </div>
      <nav className="sb-nav">
        {nav.map(sec=>(
          <div key={sec.section}>
            <div className="sb-section">{sec.section}</div>
            {sec.items.map(item=>(
              <div key={item.id} className={`sb-item ${page===item.id?"on":""}`}
                onClick={()=>setPage(item.id)}>
                <span className="ico">{item.ico}</span>
                {item.lbl}
                {item.id==="dashboard"&&ruptures>0&&<span className="nb">{ruptures}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <div className="sb-foot">
        <div className="sb-user">
          <div className="sb-av" style={{background:user.couleur}}>{user.ini}</div>
          <div>
            <div className="sb-uname">{user.prenom}</div>
            <div className="sb-urole">{user.role==="patron"?"Patron":"Employé"}</div>
          </div>
          <div className="sb-out" onClick={onLogout} title="Déconnexion">⏻</div>
        </div>
      </div>
    </aside>
  );
}

/* ══════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════ */
function Toast({msg,onEnd}){
  useEffect(()=>{const t=setTimeout(onEnd,3500);return()=>clearTimeout(t);},[]);
  return <div className="toast">✅ {msg}</div>;
}

/* ══════════════════════════════════════════════════════
   PAGE DASHBOARD
══════════════════════════════════════════════════════ */
function Dashboard({produits,mouvements,factures}){
  const ventes  = factures.filter(f=>f.type==="vente");
  const achats  = factures.filter(f=>f.type==="achat");
  const ca      = ventes.reduce((s,f)=>s+tHT(f.lignes),0);
  const charges = achats.reduce((s,f)=>s+tHT(f.lignes),0);
  const marge   = ca-charges;
  const rupt    = produits.filter(p=>p.stock<=p.min);
  const stockV  = produits.reduce((s,p)=>s+p.stock*p.pa,0);

  return (
    <>
      {rupt.length>0&&(
        <div className="alert-b al-d">
          <span style={{fontSize:18}}>⚠️</span>
          <div>
            <strong>{rupt.length} produit(s) en rupture / stock critique !</strong><br/>
            <span style={{fontSize:12,fontWeight:400}}>{rupt.map(p=>p.nom).join(" · ")}</span>
          </div>
        </div>
      )}

      <div className="kgrid">
        {[
          {lbl:"Chiffre d'affaires HT",val:fmt(ca),     ico:"💰",c:"#22c55e",sub:`${ventes.length} vente(s)`},
          {lbl:"Total achats HT",       val:fmt(charges),ico:"🛒",c:"#ef4444",sub:`${achats.length} achat(s)`},
          {lbl:"Marge brute",           val:fmt(marge),  ico:"📈",c:marge>=0?"#22c55e":"#ef4444",sub:ca>0?Math.round(marge/ca*100)+"%":"—"},
          {lbl:"Valeur du stock",       val:fmt(stockV), ico:"📦",c:"#3b82f6",sub:`${produits.length} références`},
        ].map(k=>(
          <div key={k.lbl} className="kpi">
            <div className="kpi-row">
              <div className="kpi-lbl">{k.lbl}</div>
              <div className="kpi-ico">{k.ico}</div>
            </div>
            <div className="kpi-val">{k.val}</div>
            <div className="kpi-sub">{k.sub}</div>
            <div className="kpi-bar" style={{background:k.c}}/>
          </div>
        ))}
      </div>

      <div className="g3-1">
        <div className="panel">
          <div className="ph"><div className="ph-t">Derniers mouvements de stock</div></div>
          {mouvements.slice().reverse().slice(0,8).map((m,i)=>{
            const p=produits.find(pr=>pr.id===m.produitId);
            return (
              <div key={i} className="mvt">
                <div className={`mvt-ic ${m.type==="in"?"m-in":"m-out"}`}>
                  {m.type==="in"?"📥":"📤"}
                </div>
                <div className="mvt-body">
                  <div className="mvt-n">🍺 {p?.nom}</div>
                  <div className="mvt-i">{m.raison} · {m.user}</div>
                </div>
                <div>
                  <div className={`mvt-q ${m.type==="in"?"qin":"qout"}`}>
                    {m.type==="in"?"+":"-"}{m.qte}
                  </div>
                  <div className="mvt-d">{m.date?.split(" ")[0]}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="panel">
          <div className="ph"><div className="ph-t">⚠️ Alertes stock</div></div>
          {produits.filter(p=>p.stock<=p.min*2).slice(0,10).map(p=>(
            <div key={p.id} style={{padding:"8px 14px",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
              <div style={{fontSize:12,fontWeight:700,marginBottom:4}}>🍺 {p.nom}</div>
              <div className="sbar">
                <div className="st">
                  <div className="sf" style={{width:`${pct(p.stock,p.min)}%`,background:sc(p.stock,p.min)}}/>
                </div>
                <span style={{fontSize:10.5,fontFamily:"var(--mono)",color:sc(p.stock,p.min),fontWeight:700}}>
                  {p.stock} / min {p.min}
                </span>
              </div>
            </div>
          ))}
          {produits.filter(p=>p.stock<=p.min*2).length===0&&(
            <div style={{padding:20,textAlign:"center",color:"var(--muted)",fontSize:13}}>
              ✅ Tous les stocks sont OK !
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE PRODUITS
══════════════════════════════════════════════════════ */
function PageProduits({produits,setProduits,user,toast}){
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const [filtre,setFiltre]=useState("Tous");
  const [search,setSearch]=useState("");

  const cats=["Tous",...[...new Set(INIT_PRODUITS.map(p=>p.cat))]];
  const liste=produits.filter(p=>{
    const okCat=filtre==="Tous"||p.cat===filtre;
    const okSrch=p.nom.toLowerCase().includes(search.toLowerCase());
    return okCat&&okSrch;
  });

  const vide={nom:"",cat:"Bières",pa:"",pv:"",pvg:"",stock:"",min:""};
  const ouvrir=(p=null)=>{setForm(p?{...p}:{...vide,id:Date.now()});setModal(p?"edit":"add");};
  const sauver=()=>{
    if(!form.nom)return;
    const p={...form,pa:+form.pa,pv:+form.pv,pvg:+form.pvg,stock:+form.stock,min:+form.min};
    if(modal==="add")setProduits(prev=>[...prev,p]);
    else setProduits(prev=>prev.map(x=>x.id===form.id?p:x));
    toast(modal==="add"?"Produit ajouté !":"Produit modifié !");
    setModal(null);
  };
  const suppr=id=>{
    if(!window.confirm("Supprimer ce produit ?"))return;
    setProduits(prev=>prev.filter(p=>p.id!==id));
    toast("Produit supprimé.");
  };
  const F=k=>({value:form[k]??"",onChange:e=>setForm(f=>({...f,[k]:e.target.value}))});

  return (
    <>
      <div className="panel">
        <div className="ph">
          <div>
            <div className="ph-t">🍺 Produits SOBEBRA</div>
            <div className="ph-s">{liste.length} sur {produits.length} référence(s)</div>
          </div>
          <div className="ph-a">
            <input style={{background:"var(--bg)",border:"1.5px solid var(--border)",borderRadius:"var(--r)",
              padding:"7px 12px",color:"var(--text)",fontSize:13,outline:"none",width:180}}
              placeholder="🔍 Chercher…" value={search} onChange={e=>setSearch(e.target.value)}/>
            <div className="sep"/>
            {cats.map(c=>(
              <button key={c} className={`btn b-sm ${filtre===c?"b-blue":"b-ghost"}`}
                onClick={()=>setFiltre(c)}>{c}</button>
            ))}
            {user.role==="patron"&&(
              <button className="btn b-blue" onClick={()=>ouvrir()}>+ Ajouter</button>
            )}
          </div>
        </div>
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>PRODUIT</th>
                <th>CATÉGORIE</th>
                {user.role==="patron"&&<th>PRIX ACHAT</th>}
                <th>P.V. UNITAIRE</th>
                <th>P.V. GROS</th>
                <th>STOCK</th>
                <th>ÉTAT</th>
                {user.role==="patron"&&<th>ACTIONS</th>}
              </tr>
            </thead>
            <tbody>
              {liste.map(p=>(
                <tr key={p.id}>
                  <td style={{fontWeight:700}}>🍺 {p.nom}</td>
                  <td><span className="bd bd-blue">{p.cat}</span></td>
                  {user.role==="patron"&&(
                    <td><span style={{fontFamily:"var(--mono)",fontSize:12}}>{fmt(p.pa)}</span></td>
                  )}
                  <td><span style={{fontFamily:"var(--mono)",fontWeight:700}}>{fmt(p.pv)}</span></td>
                  <td><span style={{fontFamily:"var(--mono)",color:"var(--amber)"}}>{fmt(p.pvg)}</span></td>
                  <td>
                    <div className="sbar">
                      <div className="st">
                        <div className="sf" style={{width:`${pct(p.stock,p.min)}%`,background:sc(p.stock,p.min)}}/>
                      </div>
                      <span style={{fontFamily:"var(--mono)",fontSize:12,color:sc(p.stock,p.min),fontWeight:700}}>{p.stock}</span>
                      <span style={{fontSize:10,color:"var(--muted)",fontFamily:"var(--mono)"}}>/ min {p.min}</span>
                    </div>
                  </td>
                  <td><span className={`bd ${scls(p.stock,p.min)}`}>{slbl(p.stock,p.min)}</span></td>
                  {user.role==="patron"&&(
                    <td>
                      <div className="flex">
                        <button className="btn b-ghost b-sm" onClick={()=>ouvrir(p)}>✏️</button>
                        <button className="btn b-red b-sm" onClick={()=>suppr(p.id)}>🗑️</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal&&(
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setModal(null)}>
          <div className="modal">
            <div className="mtitle">{modal==="add"?"➕ Nouveau produit":"✏️ Modifier le produit"}</div>
            <div className="fgrid">
              <div className="fg ffull">
                <label className="fl">NOM DU PRODUIT / BOISSON</label>
                <input className="fi" placeholder="Ex: Flag 66cl" {...F("nom")}/>
              </div>
              <div className="fg">
                <label className="fl">CATÉGORIE</label>
                <select className="fi" {...F("cat")}>
                  {["Bières","Boissons sucr.","Boissons loc.","Malts","Spiritueux","Boissons énerg."].map(c=>(
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="fg">
                <label className="fl">STOCK ACTUEL</label>
                <input className="fi" type="number" min="0" placeholder="0" {...F("stock")}/>
              </div>
              <div className="fg">
                <label className="fl">STOCK MINIMUM (alerte)</label>
                <input className="fi" type="number" min="0" placeholder="5" {...F("min")}/>
              </div>
              <div className="fg">
                <label className="fl">PRIX ACHAT (FCFA)</label>
                <input className="fi" type="number" min="0" placeholder="0" {...F("pa")}/>
              </div>
              <div className="fg">
                <label className="fl">PRIX VENTE UNITAIRE (FCFA)</label>
                <input className="fi" type="number" min="0" placeholder="0" {...F("pv")}/>
              </div>
              <div className="fg ffull">
                <label className="fl">PRIX VENTE EN GROS (FCFA)</label>
                <input className="fi" type="number" min="0" placeholder="0" {...F("pvg")}/>
              </div>
              {form.pa&&form.pv&&(
                <div className="ffull info-box">
                  💡 Marge unitaire : {fmt(+form.pv - +form.pa)} ({form.pa>0?Math.round((+form.pv-+form.pa)/+form.pa*100):0}%) · Gros : {fmt(+form.pvg - +form.pa)}
                </div>
              )}
            </div>
            <div className="mact">
              <button className="btn b-ghost" onClick={()=>setModal(null)}>Annuler</button>
              <button className="btn b-blue" onClick={sauver}>💾 Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE MOUVEMENTS
══════════════════════════════════════════════════════ */
function PageMvt({produits,setProduits,mouvements,addMvt,user,toast}){
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({produitId:"",type:"in",qte:"",raison:"",fourn:FOURNISSEURS[0]});

  const valider=()=>{
    if(!form.produitId||!form.qte||+form.qte<=0){alert("⚠️ Choisis un produit et une quantité.");return;}
    const prod=produits.find(p=>p.id===+form.produitId);
    if(form.type==="out"&&+form.qte>prod.stock){
      alert(`⚠️ Stock insuffisant ! Disponible : ${prod.stock} unités.`);return;
    }
    setProduits(prev=>prev.map(p=>p.id===+form.produitId
      ?{...p,stock:form.type==="in"?p.stock+(+form.qte):p.stock-(+form.qte)}:p
    ));
    addMvt({
      produitId:+form.produitId,type:form.type,qte:+form.qte,
      raison:form.raison||(form.type==="in"?"Entrée stock":"Sortie stock"),
      user:user.nom,date:now(),
    });
    toast(`${form.type==="in"?"+":"-"}${form.qte} · ${prod.nom}`);
    setModal(false);
    setForm({produitId:"",type:"in",qte:"",raison:"",fourn:FOURNISSEURS[0]});
  };

  return (
    <>
      <div className="panel">
        <div className="ph">
          <div>
            <div className="ph-t">↕️ Entrées & Sorties de stock</div>
            <div className="ph-s">{mouvements.length} mouvement(s)</div>
          </div>
          <button className="btn b-blue" onClick={()=>setModal(true)}>+ Nouveau mouvement</button>
        </div>

        {mouvements.length===0&&(
          <div style={{padding:32,textAlign:"center",color:"var(--muted)",fontSize:13}}>
            Aucun mouvement enregistré pour l'instant.
          </div>
        )}

        {mouvements.slice().reverse().map((m,i)=>{
          const p=produits.find(pr=>pr.id===m.produitId);
          return (
            <div key={i} className="mvt">
              <div className={`mvt-ic ${m.type==="in"?"m-in":"m-out"}`}>
                {m.type==="in"?"📥":"📤"}
              </div>
              <div className="mvt-body">
                <div className="mvt-n">🍺 {p?.nom}</div>
                <div className="mvt-i">{m.raison} · {m.user}</div>
              </div>
              <div className={`mvt-q ${m.type==="in"?"qin":"qout"}`}>
                {m.type==="in"?"+":"-"}{m.qte}
              </div>
              <div className="mvt-d">{m.date}</div>
            </div>
          );
        })}
      </div>

      {modal&&(
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setModal(false)}>
          <div className="modal">
            <div className="mtitle">↕️ Enregistrer un mouvement</div>
            <div className="fgrid">
              <div className="fg ffull">
                <label className="fl">TYPE</label>
                <div className="flex">
                  {[{v:"in",lbl:"📥 Entrée (livraison)"},{v:"out",lbl:"📤 Sortie (vente/casse)"}].map(t=>(
                    <button key={t.v}
                      className={`btn b-sm ${form.type===t.v?(t.v==="in"?"b-green":"b-red"):"b-ghost"}`}
                      onClick={()=>setForm(f=>({...f,type:t.v}))}>
                      {t.lbl}
                    </button>
                  ))}
                </div>
              </div>
              <div className="fg ffull">
                <label className="fl">PRODUIT</label>
                <select className="fi" value={form.produitId}
                  onChange={e=>setForm(f=>({...f,produitId:e.target.value}))}>
                  <option value="">— Choisir un produit —</option>
                  {produits.map(p=>(
                    <option key={p.id} value={p.id}>🍺 {p.nom} (stock: {p.stock})</option>
                  ))}
                </select>
              </div>
              <div className="fg">
                <label className="fl">QUANTITÉ</label>
                <input className="fi" type="number" min="1" placeholder="0"
                  value={form.qte} onChange={e=>setForm(f=>({...f,qte:e.target.value}))}/>
              </div>
              {form.type==="in"&&(
                <div className="fg">
                  <label className="fl">FOURNISSEUR</label>
                  <select className="fi" value={form.fourn}
                    onChange={e=>setForm(f=>({...f,fourn:e.target.value}))}>
                    {FOURNISSEURS.map(f=><option key={f}>{f}</option>)}
                  </select>
                </div>
              )}
              <div className="fg ffull">
                <label className="fl">NOTE / RAISON</label>
                <input className="fi" placeholder="Ex: Livraison FAS & FILS, Vente client, Casse…"
                  value={form.raison} onChange={e=>setForm(f=>({...f,raison:e.target.value}))}/>
              </div>
            </div>
            <div className="mact">
              <button className="btn b-ghost" onClick={()=>setModal(false)}>Annuler</button>
              <button className="btn b-blue" onClick={valider}>✅ Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════
   VUE FACTURE IMPRIMABLE (modèle FAS & FILS adapté)
══════════════════════════════════════════════════════ */
function VueFac({fac,onBack}){
  const ht   = tHT(fac.lignes);
  const tva  = ht*TVA_RATE;
  const ttc  = ht+tva;
  const isV  = fac.type==="vente";

  return (
    <div>
      <div className="flex" style={{marginBottom:14}}>
        <button className="btn b-ghost" onClick={onBack}>← Retour à la liste</button>
        <button className="btn b-blue" onClick={()=>window.print()}>🖨️ Imprimer</button>
      </div>
      <div className="fac-wrap">
        {/* EN-TÊTE */}
        <div className="fac-top">
          <div>
            <div className="fac-cie-name">ETS PARFAIT Business Services</div>
            <div className="fac-cie-sub">
              Mini Dépôt — Distributeur Boissons SOBEBRA<br/>
              Cotonou, République du Bénin<br/>
              Tél : {SOCIETE.tel} · IFU : {SOCIETE.ifu}
            </div>
          </div>
          <div className="fac-num-box">
            <div className="fac-num">FACTURE N° {fac.id}</div>
            <div className="fac-date">Date : {fac.date} à {fac.heure}</div>
            <div className="fac-date">Vendeur : {fac.vendeur}</div>
            <div className="fac-type-tag" style={{
              background:isV?"#dcfce7":"#dbeafe",
              color:isV?"#166534":"#1e40af",
              border:`1px solid ${isV?"#86efac":"#93c5fd"}`
            }}>
              {isV?"🛍️ Facture de vente":"🛒 Facture d'achat"}
            </div>
          </div>
        </div>

        {/* PARTIES */}
        <div className="fac-parties">
          <div>
            <div className="fac-pl">Vendeur / Émetteur</div>
            <div className="fac-pn">ETS PARFAIT Business Services</div>
            <div className="fac-pi">Cotonou, Bénin<br/>Tél : {SOCIETE.tel}<br/>IFU : {SOCIETE.ifu}</div>
          </div>
          <div>
            <div className="fac-pl">{isV?"Client":"Fournisseur"}</div>
            <div className="fac-pn">{isV?fac.client:fac.fournisseur}</div>
            {isV&&<div className="fac-pi">Mode de paiement : Comptant</div>}
          </div>
        </div>

        {/* LIGNES */}
        <div className="fac-t" style={{marginBottom:14}}>
          <table>
            <thead>
              <tr>
                <th style={{textAlign:"left"}}>DÉSIGNATION</th>
                <th style={{textAlign:"center"}}>QTÉ</th>
                <th style={{textAlign:"right"}}>P.V.U. (FCFA)</th>
                <th style={{textAlign:"right"}}>MONTANT (FCFA)</th>
              </tr>
            </thead>
            <tbody>
              {fac.lignes.map((l,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:600}}>🍺 {l.nom}</td>
                  <td style={{textAlign:"center",fontFamily:"var(--mono)"}}>{l.qte}</td>
                  <td style={{textAlign:"right",fontFamily:"var(--mono)"}}>{fmt(l.pu)}</td>
                  <td style={{textAlign:"right",fontFamily:"var(--mono)",fontWeight:700}}>{fmt(l.qte*l.pu)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTAUX */}
        <div className="fac-totals">
          <div className="ftr">
            <span className="ftl">Groupe</span>
            <span className="ftl">Taux</span>
            <span className="ftl" style={{width:130}}>Montant H.T.</span>
            <span className="ftl">T.V.A.</span>
          </div>
          <div className="ftr">
            <span className="ftl">B</span>
            <span className="ftl">18</span>
            <span className="ftv" style={{color:"#111",fontWeight:800}}>{fmt(ht)}</span>
            <span className="ftv" style={{color:"#555"}}>{fmt(tva)}</span>
          </div>
          <div className="ftr" style={{marginTop:6,paddingTop:8,borderTop:"1px solid #e5e7eb"}}>
            <span className="ftl">TOTAL HT</span>
            <span className="ftv">{fmt(ht)}</span>
          </div>
          <div className="ftr">
            <span className="ftl">TVA 18%</span>
            <span className="ftv">{fmt(tva)}</span>
          </div>
          <div className="ftr">
            <span className="ftl">AIB 0%</span>
            <span className="ftv">0</span>
          </div>
          <div className="ftr grand">
            <span className="ftl">NET À PAYER :</span>
            <span className="ftv">{fmt(ttc)}</span>
          </div>
        </div>

        {/* MECEF */}
        <div className="fac-mecef">
          <strong>Code MECeF/DGI</strong><br/>
          MECeF NIM : ETS-PARFAIT-{fac.id}<br/>
          MECeF compteurs : {Math.floor(Math.random()*99999)+10000}/{Math.floor(Math.random()*99999)+10000} FV<br/>
          MECeF heure : {fac.date} {fac.heure}<br/>
          Montant perçu : {fmt(ttc)} — Reliquat : 0
        </div>

        <div className="fac-footer">
          Merci pour votre confiance — ETS PARFAIT Business Services · Cotonou, Bénin<br/>
          <span className="fac-paid">{fac.statut==="payee"?"✅ PAYÉE — COMPTANT":"⏳ EN ATTENTE"}</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE FACTURES
══════════════════════════════════════════════════════ */
function PageFactures({factures,user}){
  const [vue,setVue]=useState(null);
  const liste=user.role==="patron"?factures:factures.filter(f=>f.type==="vente");
  if(vue)return <VueFac fac={vue} onBack={()=>setVue(null)}/>;

  const total_ttc = f => tHT(f.lignes)*1.18;

  return (
    <div className="panel">
      <div className="ph">
        <div>
          <div className="ph-t">🧾 {user.role==="patron"?"Toutes les factures":"Factures de vente"}</div>
          <div className="ph-s">{liste.length} document(s)</div>
        </div>
      </div>
      <div className="tw">
        <table>
          <thead>
            <tr>
              <th>N° FACTURE</th>
              <th>TYPE</th>
              <th>{user.role==="patron"?"CLIENT / FOURNISSEUR":"CLIENT"}</th>
              <th>DATE</th>
              <th>VENDEUR</th>
              <th>TOTAL HT</th>
              <th>TVA 18%</th>
              <th>NET À PAYER</th>
              <th>STATUT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {liste.map(f=>{
              const ht=tHT(f.lignes);
              return (
                <tr key={f.id}>
                  <td style={{fontFamily:"var(--mono)",fontWeight:700}}>{f.id}</td>
                  <td><span className={`bd ${f.type==="vente"?"bd-ok":"bd-blue"}`}>
                    {f.type==="vente"?"🛍️ Vente":"🛒 Achat"}
                  </span></td>
                  <td style={{fontWeight:700}}>{f.type==="vente"?f.client:f.fournisseur}</td>
                  <td><span style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--muted)"}}>{f.date}</span></td>
                  <td><span style={{fontSize:12,color:"var(--muted)"}}>{f.vendeur}</span></td>
                  <td><span style={{fontFamily:"var(--mono)"}}>{fmt(ht)}</span></td>
                  <td><span style={{fontFamily:"var(--mono)",color:"var(--muted)"}}>{fmt(ht*TVA_RATE)}</span></td>
                  <td><span style={{fontFamily:"var(--mono)",fontWeight:800}}>{fmt(ht*1.18)}</span></td>
                  <td><span className={`bd ${f.statut==="payee"?"bd-ok":"bd-warn"}`}>
                    {f.statut==="payee"?"✅ Payée":"⏳ Attente"}
                  </span></td>
                  <td><button className="btn b-ghost b-sm" onClick={()=>setVue(f)}>👁️ Voir</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {liste.length===0&&(
          <div style={{padding:32,textAlign:"center",color:"var(--muted)",fontSize:13}}>
            Aucune facture pour l'instant.
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   NOUVELLE FACTURE
══════════════════════════════════════════════════════ */
function PageNouvFac({produits,setProduits,setFactures,addMvt,user,toast}){
  const defType=user.role==="employe"?"vente":"vente";
  const [type,setType]=useState(defType);
  const [tiers,setTiers]=useState("");
  const [fourn,setFourn]=useState(FOURNISSEURS[0]);
  const [typeVente,setTypeVente]=useState("unitaire"); // unitaire ou gros
  const [lignes,setLignes]=useState([{produitId:"",qte:1}]);

  const ajLigne=()=>setLignes(l=>[...l,{produitId:"",qte:1}]);
  const supLigne=i=>setLignes(l=>l.filter((_,idx)=>idx!==i));
  const majLigne=(i,k,v)=>setLignes(l=>l.map((x,idx)=>idx===i?{...x,[k]:v}:x));

  const getPrix=p=>{
    if(type==="achat")return p.pa;
    return typeVente==="gros"?p.pvg:p.pv;
  };

  const getTotal=()=>lignes.reduce((s,l)=>{
    const p=produits.find(pr=>pr.id===+l.produitId);
    return p?s+l.qte*getPrix(p):s;
  },0);

  const creer=()=>{
    if(type==="vente"&&!tiers){alert("⚠️ Indique le nom du client.");return;}
    if(lignes.some(l=>!l.produitId||+l.qte<1)){alert("⚠️ Remplis toutes les lignes.");return;}

    const lignesFac=lignes.map(l=>{
      const p=produits.find(pr=>pr.id===+l.produitId);
      return {nom:p.nom,qte:+l.qte,pu:getPrix(p)};
    });

    for(const l of lignes){
      const p=produits.find(pr=>pr.id===+l.produitId);
      if(type==="vente"&&+l.qte>p.stock){
        alert(`⚠️ Stock insuffisant pour "${p.nom}" ! Dispo : ${p.stock}`);return;
      }
    }

    setProduits(prev=>prev.map(p=>{
      const l=lignes.find(x=>+x.produitId===p.id);
      if(!l)return p;
      return{...p,stock:type==="vente"?p.stock-(+l.qte):p.stock+(+l.qte)};
    }));

    lignes.forEach(l=>{
      const p=produits.find(pr=>pr.id===+l.produitId);
      addMvt({
        produitId:+l.produitId,
        type:type==="vente"?"out":"in",
        qte:+l.qte,
        raison:type==="vente"?`Vente → ${tiers}`:`Achat ← ${fourn}`,
        user:user.nom,date:now(),
      });
    });

    const fac={
      id:genId(type),type,
      client:type==="vente"?tiers:"",
      fournisseur:type==="achat"?fourn:"",
      date:today(),heure:nowH(),
      vendeur:user.nom,
      lignes:lignesFac,statut:"payee",
    };
    setFactures(prev=>[...prev,fac]);
    toast(`Facture ${fac.id} créée !`);
    setTiers("");setLignes([{produitId:"",qte:1}]);
  };

  const ht=getTotal();
  const tva=ht*TVA_RATE;
  const ttc=ht+tva;

  return (
    <div style={{maxWidth:720,margin:"0 auto"}}>
      <div className="panel">
        <div className="ph"><div className="ph-t">➕ Nouvelle facture</div></div>
        <div style={{padding:20,display:"flex",flexDirection:"column",gap:18}}>

          {/* Type (patron seul voit achat) */}
          {user.role==="patron"&&(
            <div>
              <div className="fl" style={{marginBottom:8}}>TYPE DE FACTURE</div>
              <div className="flex">
                {[
                  {v:"vente",lbl:"🛍️ Facture de vente (client)"},
                  {v:"achat",lbl:"🛒 Facture d'achat (fournisseur)"},
                ].map(t=>(
                  <button key={t.v} className={`btn ${type===t.v?"b-blue":"b-ghost"}`}
                    onClick={()=>setType(t.v)}>{t.lbl}</button>
                ))}
              </div>
            </div>
          )}

          {/* Vente : choix unitaire / gros */}
          {type==="vente"&&(
            <div>
              <div className="fl" style={{marginBottom:8}}>TYPE DE VENTE</div>
              <div className="flex">
                {[
                  {v:"unitaire",lbl:"🔹 Vente unitaire"},
                  {v:"gros",    lbl:"📦 Vente en gros"},
                ].map(t=>(
                  <button key={t.v} className={`btn ${typeVente===t.v?"b-blue":"b-ghost"}`}
                    onClick={()=>setTypeVente(t.v)}>{t.lbl}</button>
                ))}
              </div>
            </div>
          )}

          {/* Tiers */}
          {type==="vente"?(
            <div className="fg">
              <label className="fl">NOM DU CLIENT</label>
              <input className="fi" placeholder="Ex: Bar Chez Tonton, Épicerie Ahouansori…"
                value={tiers} onChange={e=>setTiers(e.target.value)}/>
            </div>
          ):(
            <div className="fg">
              <label className="fl">FOURNISSEUR</label>
              <select className="fi" value={fourn} onChange={e=>setFourn(e.target.value)}>
                {FOURNISSEURS.map(f=><option key={f}>{f}</option>)}
              </select>
            </div>
          )}

          {/* Lignes produits */}
          <div>
            <div className="fl" style={{marginBottom:10}}>PRODUITS</div>
            {lignes.map((lg,i)=>{
              const prod=produits.find(p=>p.id===+lg.produitId);
              const pu=prod?getPrix(prod):0;
              return (
                <div key={i} style={{
                  display:"flex",gap:9,alignItems:"center",
                  background:"var(--card)",borderRadius:"var(--r)",
                  padding:"9px 11px",marginBottom:8
                }}>
                  <select className="fi" style={{flex:2}} value={lg.produitId}
                    onChange={e=>majLigne(i,"produitId",e.target.value)}>
                    <option value="">— Choisir un produit —</option>
                    {produits.map(p=>(
                      <option key={p.id} value={p.id}>
                        🍺 {p.nom} · {fmt(getPrix(p))}{type==="vente"?` (stock: ${p.stock})`:""}
                      </option>
                    ))}
                  </select>
                  <input className="fi" type="number" min="1" style={{width:80}}
                    value={lg.qte} onChange={e=>majLigne(i,"qte",+e.target.value)}/>
                  <span style={{fontFamily:"var(--mono)",fontWeight:800,fontSize:13,
                    whiteSpace:"nowrap",minWidth:130,textAlign:"right",color:"var(--blue-l)"}}>
                    {prod?fmt(pu*lg.qte):"—"}
                  </span>
                  {lignes.length>1&&(
                    <button className="btn b-red b-sm b-ico" onClick={()=>supLigne(i)}>✕</button>
                  )}
                </div>
              );
            })}
            <button className="btn b-ghost b-sm" onClick={ajLigne}>+ Ajouter une ligne</button>
          </div>

          {/* Récapitulatif */}
          <div style={{background:"var(--card2)",borderRadius:"var(--r)",padding:16,
            border:"1px solid var(--border)"}}>
            {[
              {lbl:"Montant H.T.",val:fmt(ht)},
              {lbl:"TVA 18%",    val:fmt(tva)},
            ].map(r=>(
              <div key={r.lbl} className="flex" style={{justifyContent:"space-between",marginBottom:8}}>
                <span style={{color:"var(--muted)",fontSize:13}}>{r.lbl}</span>
                <span style={{fontFamily:"var(--mono)"}}>{r.val}</span>
              </div>
            ))}
            <div className="flex" style={{justifyContent:"space-between",
              paddingTop:10,borderTop:"2px solid var(--border2)",marginTop:4}}>
              <span style={{fontWeight:800,fontSize:15}}>NET À PAYER (TTC)</span>
              <span style={{fontFamily:"var(--mono)",fontWeight:900,fontSize:20,color:"var(--blue-l)"}}>
                {fmt(ttc)}
              </span>
            </div>
          </div>

          <button className="btn b-blue" style={{width:"100%",justifyContent:"center",padding:14,fontSize:15}}
            onClick={creer}>
            🧾 Créer la facture {type==="vente"?"de vente":"d'achat"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE RAPPORTS (patron seul)
══════════════════════════════════════════════════════ */
function PageRapports({produits,factures}){
  const ventes  = factures.filter(f=>f.type==="vente");
  const achats  = factures.filter(f=>f.type==="achat");
  const ca      = ventes.reduce((s,f)=>s+tHT(f.lignes),0);
  const charges = achats.reduce((s,f)=>s+tHT(f.lignes),0);
  const marge   = ca-charges;
  const stockV  = produits.reduce((s,p)=>s+p.stock*p.pa,0);

  return (
    <>
      <div className="kgrid">
        {[
          {lbl:"CA total HT",          val:fmt(ca),      ico:"💰",c:"#22c55e"},
          {lbl:"CA total TTC (18%)",   val:fmt(ca*1.18), ico:"💳",c:"#3b82f6"},
          {lbl:"Total achats HT",       val:fmt(charges), ico:"🛒",c:"#ef4444"},
          {lbl:"Marge brute",           val:fmt(marge),   ico:"📈",c:marge>=0?"#22c55e":"#ef4444"},
        ].map(k=>(
          <div key={k.lbl} className="kpi">
            <div className="kpi-row">
              <div className="kpi-lbl">{k.lbl}</div>
              <div className="kpi-ico">{k.ico}</div>
            </div>
            <div className="kpi-val">{k.val}</div>
            <div className="kpi-bar" style={{background:k.c}}/>
          </div>
        ))}
      </div>

      <div className="g2">
        <div className="panel">
          <div className="ph"><div className="ph-t">📊 Taux de marge par produit</div></div>
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>PRODUIT</th>
                  <th>P. ACHAT</th>
                  <th>P. VENTE U.</th>
                  <th>P. VENTE GROS</th>
                  <th>MARGE U.</th>
                  <th>%</th>
                  <th>STOCK × PA</th>
                </tr>
              </thead>
              <tbody>
                {produits.map(p=>(
                  <tr key={p.id}>
                    <td style={{fontWeight:700,fontSize:12}}>🍺 {p.nom}</td>
                    <td style={{fontFamily:"var(--mono)",fontSize:11}}>{fmt(p.pa)}</td>
                    <td style={{fontFamily:"var(--mono)",fontSize:11}}>{fmt(p.pv)}</td>
                    <td style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--amber)"}}>{fmt(p.pvg)}</td>
                    <td style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--green)",fontWeight:700}}>
                      +{fmt(p.pv-p.pa)}
                    </td>
                    <td>
                      <span className="bd bd-ok" style={{fontSize:10}}>
                        {p.pa>0?Math.round((p.pv-p.pa)/p.pa*100):0}%
                      </span>
                    </td>
                    <td style={{fontFamily:"var(--mono)",fontSize:11}}>{fmt(p.stock*p.pa)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="ph"><div className="ph-t">📋 Résumé financier</div></div>
          <div style={{padding:16,display:"flex",flexDirection:"column",gap:10}}>
            {[
              {lbl:"Nb factures vente",  val:ventes.length},
              {lbl:"Nb factures achat",  val:achats.length},
              {lbl:"CA total HT",        val:fmt(ca),      c:"var(--green)"},
              {lbl:"TVA collectée 18%",  val:fmt(ca*TVA_RATE)},
              {lbl:"CA total TTC",       val:fmt(ca*1.18), c:"var(--blue-l)"},
              {lbl:"Total achats",       val:fmt(charges), c:"var(--red-l)"},
              {lbl:"Marge brute",        val:fmt(marge),   c:marge>=0?"var(--green)":"var(--red-l)"},
              {lbl:"Valeur du stock",    val:fmt(stockV)},
            ].map((r,i)=>(
              <div key={i} className="flex" style={{justifyContent:"space-between",
                padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
                <span style={{fontSize:12.5,color:"var(--muted)"}}>{r.lbl}</span>
                <span style={{fontFamily:"var(--mono)",fontWeight:800,fontSize:13,color:r.c||"var(--text)"}}>
                  {r.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE ÉQUIPE (patron seul)
══════════════════════════════════════════════════════ */
function PageEquipe(){
  const patron=INIT_USERS[0];
  const employes=INIT_USERS.filter(u=>u.role==="employe");
  return (
    <>
      <div className="alert-b al-b" style={{marginBottom:4}}>
        💡 <strong>Astuce :</strong> Pour personnaliser un employé, remplace son nom, prénom et mot de passe dans le tableau <code style={{fontFamily:"var(--mono)"}}>INIT_USERS</code> dans le code source. Contacte ton développeur pour ça.
      </div>
      <div className="panel">
        <div className="ph">
          <div className="ph-t">👥 Équipe — ETS PARFAIT Business Services</div>
          <div className="ph-s">1 patron · {employes.length} poste(s) employé configurables</div>
        </div>
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>NOM</th>
                <th>RÔLE</th>
                <th>MOT DE PASSE</th>
                <th>ACCÈS</th>
              </tr>
            </thead>
            <tbody>
              {/* Patron */}
              <tr style={{background:"rgba(239,68,68,.06)"}}>
                <td><div className="sb-av" style={{background:patron.couleur,width:30,height:30,fontSize:11}}>{patron.ini}</div></td>
                <td style={{fontWeight:800}}>{patron.nom}</td>
                <td><span className="bd bd-danger">👑 Patron</span></td>
                <td><code style={{fontFamily:"var(--mono)",fontSize:12,background:"var(--card)",padding:"2px 8px",borderRadius:5}}>{patron.pass}</code></td>
                <td style={{fontSize:12,color:"var(--muted)"}}>Accès complet — tout voir et tout faire</td>
              </tr>
              {/* Employés */}
              {employes.map((u,i)=>(
                <tr key={u.id}>
                  <td><div style={{width:28,height:28,borderRadius:"50%",background:"#1e3a5f",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"var(--blue-l)"}}>{i+1}</div></td>
                  <td style={{color:u.placeholder?"var(--muted)":"var(--text)",fontStyle:u.placeholder?"italic":"normal",fontWeight:600}}>
                    {u.placeholder?"— À compléter —":u.nom}
                  </td>
                  <td><span className="bd bd-blue">👤 Employé</span></td>
                  <td><code style={{fontFamily:"var(--mono)",fontSize:12,background:"var(--card)",padding:"2px 8px",borderRadius:5,color:"var(--blue-l)"}}>{u.pass}</code></td>
                  <td style={{fontSize:12,color:"var(--muted)"}}>Stock + Ventes uniquement</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   APP PRINCIPALE
══════════════════════════════════════════════════════ */
const PATRON_ONLY=["dashboard","rapports","equipe"];

const TITRES={
  dashboard:"Tableau de bord",produits:"Produits & Stock SOBEBRA",
  mvt:"Entrées & Sorties",factures:"Factures",
  "nouv-fac":"Nouvelle facture",rapports:"Rapports & CA",equipe:"Équipe"
};

export default function App(){
  const [user,setUser]        = useState(null);
  const [page,setPage]        = useState("dashboard");
  const [produits,setProduits]= useState(INIT_PRODUITS);
  const [mvts,setMvts]        = useState(INIT_MOUVEMENTS);
  const [factures,setFactures]= useState(INIT_FACTURES);
  const [toastMsg,setToast]   = useState(null);

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(null),3500);};
  const addMvt=m=>setMvts(prev=>[...prev,{...m,id:Date.now()}]);

  const login=u=>{setUser(u);setPage(u.role==="patron"?"dashboard":"produits");};
  const logout=()=>{setUser(null);setPage("dashboard");};

  const ruptures=produits.filter(p=>p.stock<=p.min).length;

  if(!user)return <><style>{CSS}</style><Login onLogin={login}/></>;

  const refuse=PATRON_ONLY.includes(page)&&user.role!=="patron";
  const props={produits,setProduits,mouvements:mvts,addMvt,factures,setFactures,user,toast:showToast};

  const renderPage=()=>{
    if(refuse)return (
      <div className="denied">
        <div className="denied-ico">🔒</div>
        <div className="denied-t">Accès réservé au Patron</div>
        <div className="denied-s">Tu n'as pas la permission d'accéder à cette section.<br/>Contacte ton responsable si tu en as besoin.</div>
      </div>
    );
    switch(page){
      case "dashboard":  return <Dashboard {...props}/>;
      case "produits":   return <PageProduits {...props}/>;
      case "mvt":        return <PageMvt {...props}/>;
      case "factures":   return <PageFactures {...props}/>;
      case "nouv-fac":   return <PageNouvFac {...props}/>;
      case "rapports":   return <PageRapports {...props}/>;
      case "equipe":     return <PageEquipe/>;
      default:           return null;
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        <Sidebar user={user} page={page} setPage={setPage} ruptures={ruptures} onLogout={logout}/>
        <div className="main">
          <header className="topbar">
            <div className="tb-title">{TITRES[page]||page}</div>
            <div className="tb-date">📅 {today()}</div>
            <div style={{width:1,height:22,background:"var(--border)",margin:"0 4px"}}/>
            <div className="tb-av" style={{background:user.couleur}}>{user.ini}</div>
            <div className="tb-name">{user.prenom}</div>
          </header>
          <main className="content">{renderPage()}</main>
        </div>
      </div>
      {toastMsg&&<Toast msg={toastMsg} onEnd={()=>setToast(null)}/>}
    </>
  );
}
