import { useState, useRef, useCallback } from "react";
 
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');
 
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
 
  :root {
    --bg: #0f0f0f;
    --surface: #191919;
    --surface2: #222222;
    --accent: #ff4d1c;
    --accent-soft: rgba(255, 77, 28, 0.1);
    --accent-glow: rgba(255, 77, 28, 0.25);
    --text: #f0ede8;
    --muted: #777;
    --muted2: #555;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --green: #22c55e;
    --green-soft: rgba(34,197,94,0.1);
  }
 
  body { background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text); min-height: 100vh; overflow-x: hidden; }
 
  /* NAV */
  nav { position: sticky; top: 0; z-index: 100; background: rgba(15,15,15,0.88); backdrop-filter: blur(24px); border-bottom: 1px solid var(--border); padding: 0 2rem; height: 64px; display: flex; align-items: center; justify-content: space-between; }
  .logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.35rem; letter-spacing: -0.02em; color: var(--text); display: flex; align-items: center; gap: 0.3rem; cursor: pointer; user-select: none; }
  .logo em { color: var(--accent); font-style: normal; }
  .logo-icon { width: 28px; height: 28px; background: var(--accent); border-radius: 7px; display: flex; align-items: center; justify-content: center; margin-right: 0.35rem; flex-shrink: 0; }
  .nav-links { display: flex; align-items: center; gap: 0.2rem; list-style: none; }
  .nav-links li a { font-size: 0.88rem; font-weight: 500; color: var(--muted); text-decoration: none; padding: 0.42rem 0.85rem; border-radius: 8px; transition: color 0.18s, background 0.18s; display: block; }
  .nav-links li a:hover { color: var(--text); background: rgba(255,255,255,0.05); }
  .nav-cta { font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 600; color: #fff; background: var(--accent); border: none; cursor: pointer; padding: 0.42rem 1.1rem; border-radius: 8px; transition: opacity 0.18s, transform 0.15s; }
  .nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
  .hamburger span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 2px; transition: transform 0.28s, opacity 0.28s; }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .mobile-menu { display: none; position: absolute; top: 64px; left: 0; right: 0; background: rgba(12,12,12,0.97); border-bottom: 1px solid var(--border); padding: 1rem 2rem 1.5rem; flex-direction: column; gap: 0.4rem; backdrop-filter: blur(20px); }
  .mobile-menu.open { display: flex; }
  .mobile-menu a { font-size: 0.95rem; font-weight: 500; color: var(--muted); text-decoration: none; padding: 0.55rem 0.7rem; border-radius: 8px; transition: color 0.18s, background 0.18s; }
  .mobile-menu a:hover { color: var(--text); background: rgba(255,255,255,0.05); }
  .mobile-menu .nav-cta { margin-top: 0.5rem; text-align: center; border-radius: 10px; padding: 0.6rem 1.1rem; }
  @media (max-width: 600px) { .nav-links { display: none; } .hamburger { display: flex; } }
 
  /* HERO */
  .hero { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 4.5rem 1.5rem 1rem; gap: 0.8rem; }
  .hero h1 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(2.1rem, 5.5vw, 3.8rem); letter-spacing: -0.04em; line-height: 1.07; animation: fadeSlideDown 0.55s ease both; }
  .hero h1 em { color: var(--accent); font-style: normal; }
  .hero-sub { color: var(--muted); font-size: 1rem; max-width: 500px; line-height: 1.7; animation: fadeSlideDown 0.55s 0.1s ease both; }
  @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:none} }
 
  .standards-strip { display: flex; align-items: center; justify-content: center; gap: 0.45rem; flex-wrap: wrap; padding: 0.7rem 1.5rem 0; animation: fadeSlideDown 0.55s 0.18s ease both; }
  .std-label { font-size: 0.72rem; color: var(--muted2); font-weight: 500; margin-right: 0.2rem; }
  .std-chip { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.04em; padding: 0.18rem 0.55rem; border-radius: 6px; border: 1px solid rgba(255,77,28,0.22); color: var(--accent); background: var(--accent-soft); text-transform: uppercase; white-space: nowrap; }
 
  /* UPLOAD */
  .upload-section { display: flex; flex-direction: column; align-items: center; padding: 2rem 1.5rem 4rem; gap: 1.2rem; animation: fadeUp 0.6s 0.22s ease both; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
 
  .upload-card { width: 100%; max-width: 580px; background: var(--surface); border: 1.5px dashed var(--border2); border-radius: 20px; padding: 2.5rem 2rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; text-align: center; cursor: pointer; transition: border-color 0.22s, background 0.22s, box-shadow 0.22s; }
  .upload-card:hover, .upload-card.drag-over { border-color: var(--accent); background: #1c1c1c; box-shadow: 0 0 0 4px var(--accent-glow), 0 20px 60px rgba(0,0,0,0.4); }
  .upload-card.has-file { border-style: solid; border-color: var(--accent); background: linear-gradient(135deg,#1c1c1c,#181410); box-shadow: 0 0 0 3px var(--accent-glow); }
  .upload-icon-wrap { width: 64px; height: 64px; background: var(--accent-soft); border-radius: 16px; display: flex; align-items: center; justify-content: center; transition: transform 0.22s, background 0.22s; }
  .upload-card:hover .upload-icon-wrap, .upload-card.drag-over .upload-icon-wrap { transform: scale(1.08); background: rgba(255,77,28,0.18); }
  .upload-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.1rem; color: var(--text); }
  .upload-sub { font-size: 0.83rem; color: var(--muted); line-height: 1.55; }
  .upload-types { display: flex; gap: 0.5rem; align-items: center; }
  .type-chip { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.04em; padding: 0.22rem 0.65rem; border-radius: 6px; border: 1px solid var(--border2); color: var(--muted); background: var(--surface2); text-transform: uppercase; }
  .type-dot { color: var(--muted2); font-size: 0.75rem; }
  .upload-btn { font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 600; color: var(--accent); background: var(--accent-soft); border: 1px solid rgba(255,77,28,0.25); border-radius: 9px; padding: 0.5rem 1.2rem; cursor: pointer; transition: background 0.18s, border-color 0.18s; }
  .upload-btn:hover { background: rgba(255,77,28,0.2); border-color: rgba(255,77,28,0.4); }
 
  .file-info { display: flex; align-items: center; gap: 0.75rem; background: var(--surface2); border-radius: 12px; padding: 0.75rem 1rem; width: 100%; border: 1px solid var(--border2); }
  .file-icon { width: 38px; height: 38px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.03em; }
  .file-icon.pdf { background: rgba(239,68,68,0.15); color: #ef4444; }
  .file-icon.doc { background: rgba(59,130,246,0.15); color: #3b82f6; }
  .file-meta { flex: 1; text-align: left; min-width: 0; }
  .file-name { font-size: 0.85rem; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .file-size { font-size: 0.75rem; color: var(--muted); margin-top: 1px; }
  .file-remove { background: none; border: none; cursor: pointer; color: var(--muted2); padding: 4px; border-radius: 6px; transition: color 0.18s, background 0.18s; display: flex; align-items: center; }
  .file-remove:hover { color: #ef4444; background: rgba(239,68,68,0.1); }
 
  /* OPTIONS */
  .options-card { width: 100%; max-width: 580px; background: var(--surface); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; }
  .options-header { padding: 1rem 1.25rem 0.8rem; border-bottom: 1px solid var(--border); }
  .options-title { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
  .options-subtitle { font-size: 0.77rem; color: var(--muted2); margin-top: 0.2rem; }
  .option-row { display: flex; align-items: flex-start; gap: 1rem; padding: 1.1rem 1.25rem; cursor: pointer; transition: background 0.16s; border-bottom: 1px solid var(--border); }
  .option-row:last-child { border-bottom: none; }
  .option-row:hover { background: rgba(255,255,255,0.025); }
  .option-row.selected { background: var(--accent-soft); }
  .option-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; transition: background 0.18s; }
  .option-row.selected .option-icon { background: var(--accent) !important; }
  .option-text { flex: 1; }
  .option-label { font-size: 0.9rem; font-weight: 700; color: var(--text); margin-bottom: 0.2rem; }
  .option-desc { font-size: 0.78rem; color: var(--muted); line-height: 1.5; }
  .option-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.55rem; }
  .option-tag { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.03em; padding: 0.15rem 0.5rem; border-radius: 5px; border: 1px solid var(--border2); color: var(--muted2); background: var(--surface2); }
  .option-row.selected .option-tag { border-color: rgba(255,77,28,0.2); color: var(--accent); background: rgba(255,77,28,0.07); }
  .option-radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--border2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 3px; transition: border-color 0.18s; }
  .option-row.selected .option-radio { border-color: var(--accent); }
  .option-radio-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); transform: scale(0); transition: transform 0.18s; }
  .option-row.selected .option-radio-dot { transform: scale(1); }
 
  /* STANDARDS CARD */
  .standards-card { width: 100%; max-width: 580px; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
  .standards-card-header { display: flex; align-items: center; gap: 0.6rem; padding: 0.85rem 1.2rem; border-bottom: 1px solid transparent; cursor: pointer; transition: background 0.16s; }
  .standards-card-header.open { border-bottom-color: var(--border); }
  .standards-card-header:hover { background: rgba(255,255,255,0.02); }
  .standards-card-header-text { flex: 1; }
  .standards-card-title { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: var(--muted); }
  .standards-card-subtitle { font-size: 0.74rem; color: var(--muted2); margin-top: 1px; }
  .std-chevron { color: var(--muted2); transition: transform 0.22s; flex-shrink: 0; }
  .std-chevron.open { transform: rotate(180deg); }
  .std-item { display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.9rem 1.2rem; border-bottom: 1px solid var(--border); }
  .std-item:last-child { border-bottom: none; }
  .std-badge { font-size: 0.61rem; font-weight: 800; letter-spacing: 0.04em; padding: 0.2rem 0.55rem; border-radius: 5px; background: var(--accent-soft); color: var(--accent); border: 1px solid rgba(255,77,28,0.2); flex-shrink: 0; margin-top: 1px; white-space: nowrap; }
  .std-info-title { font-size: 0.8rem; font-weight: 600; color: var(--text); line-height: 1.3; }
  .std-info-desc { font-size: 0.73rem; color: var(--muted); margin-top: 0.2rem; line-height: 1.45; }
 
  /* PROGRESS */
  .progress-wrap { width: 100%; max-width: 580px; }
  .progress-bar-bg { height: 4px; background: var(--surface2); border-radius: 99px; overflow: hidden; }
  .progress-bar-fill { height: 100%; background: linear-gradient(90deg, var(--accent), #ff8c5a); border-radius: 99px; transition: width 0.28s ease; }
  .progress-label { font-size: 0.78rem; color: var(--muted); margin-top: 0.5rem; text-align: center; }
 
  /* RESULT */
  .result-card { width: 100%; max-width: 580px; background: var(--green-soft); border: 1px solid rgba(34,197,94,0.22); border-radius: 16px; padding: 1.1rem 1.2rem; display: flex; align-items: flex-start; gap: 0.9rem; animation: fadeUp 0.4s ease both; }
  .result-icon { width: 34px; height: 34px; background: var(--green); border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .result-text h4 { font-size: 0.88rem; font-weight: 700; color: var(--green); margin-bottom: 0.2rem; }
  .result-text p { font-size: 0.8rem; color: var(--muted); line-height: 1.55; }
 
  /* SUBMIT */
  .submit-btn { width: 100%; max-width: 580px; font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #fff; background: var(--accent); border: none; cursor: pointer; padding: 0.9rem 1.5rem; border-radius: 14px; display: flex; align-items: center; justify-content: center; gap: 0.6rem; transition: opacity 0.2s, transform 0.18s, box-shadow 0.2s; box-shadow: 0 8px 28px rgba(255,77,28,0.28); }
  .submit-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 14px 36px rgba(255,77,28,0.38); }
  .submit-btn:disabled { opacity: 0.3; cursor: not-allowed; box-shadow: none; transform: none; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;
 
const navItems = [
  { label: "Serviços", href: "#services" },
  { label: "Sobre", href: "#about" },
];
 
const STANDARDS = [
  {
    code: "GOST R 7.0.97-2016",
    title: "Documentação organizacional e administrativa",
    desc: "Define os requisitos de formatação para documentos oficiais: margens, fontes, espaçamento, numeração de páginas, cabeçalhos e rodapés.",
  },
  {
    code: "GOST 7.32-2017",
    title: "Relatório de trabalho de investigação científica",
    desc: "Estabelece a estrutura, conteúdo e regras de apresentação de relatórios académicos, laboratoriais e científicos.",
  },
  {
    code: "GOST 7.1-2003",
    title: "Referências bibliográficas",
    desc: "Regulamenta o formato correcto de citações e referências bibliográficas em trabalhos académicos e científicos.",
  },
];
 
const OPTIONS = [
  {
    id: "analyze",
    label: "Analisar Relatório",
    desc: "Verifica a conformidade do teu trabalho académico, laboratorial ou prático com as normas GOST. Identifica secções em falta, erros de estrutura e desvios de formatação.",
    tags: ["Estrutura GOST", "Formatação", "Conformidade", "Referências", "Paginação"],
    iconColor: "#a78bfa",
    iconBg: "rgba(167,139,250,0.12)",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    resultMsg: "Análise concluída! Foram identificados os desvios em relação às normas GOST R 7.0.97-2016 e GOST 7.32-2017. O relatório inclui problemas de estrutura, formatação e referências bibliográficas.",
  },
  {
    id: "correct",
    label: "Correção Automática",
    desc: "Corrige automaticamente erros ortográficos, gramaticais e de formatação, ajustando o documento para cumprir integralmente os requisitos das normas GOST aplicáveis.",
    tags: ["Ortografia", "Gramática", "Margens & Fontes", "Espaçamento", "Estrutura GOST"],
    iconColor: "#fb923c",
    iconBg: "rgba(251,146,60,0.12)",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    resultMsg: "Correção concluída! O documento foi ajustado para cumprir as normas GOST. Foram corrigidos erros ortográficos, formatação de margens, fontes, espaçamento e estrutura de secções.",
  },
];
 
function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
 
export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stdOpen, setStdOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef();
 
  const ACCEPTED = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
 
  const handleFile = useCallback((f) => {
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) { alert("Apenas ficheiros PDF ou DOC/DOCX são aceites."); return; }
    setFile(f); setDone(false); setProgress(0);
  }, []);
 
  const onDrop = (e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); };
  const ext = file ? (file.name.toLowerCase().endsWith(".pdf") ? "PDF" : "DOC") : null;
 
  const handleSubmit = () => {
    if (!file || !selectedOption) return;
    setProcessing(true); setDone(false); setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 16 + 5;
      if (p >= 100) { p = 100; clearInterval(iv); setProcessing(false); setDone(true); }
      setProgress(Math.min(p, 100));
    }, 220);
  };
 
  const currentOption = OPTIONS.find((o) => o.id === selectedOption);
  const btnLabel = selectedOption === "analyze" ? "Analisar Relatório" : selectedOption === "correct" ? "Corrigir Relatório" : "Processar Relatório";
 
  return (
    <>
      <style>{styles}</style>
 
      {/* NAV */}
      <nav>
        <div className="logo">
          <div className="logo-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 1h7l3 3v10a1 1 0 01-1 1H3a1 1 0 01-1-1V2a1 1 0 011-1z"/>
              <path d="M10 1v3h3M5 8h6M5 11h4"/>
            </svg>
          </div>
          Camba<em>PDF</em>
        </div>
        <ul className="nav-links">
          {navItems.map(({ label, href }) => (
            <li key={label}><a href={href}>{label}</a></li>
          ))}
          <li><button className="nav-cta">Começar</button></li>
        </ul>
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span/><span/><span/>
        </button>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {navItems.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <button className="nav-cta">Começar</button>
        </div>
      </nav>
 
      {/* HERO */}
      <div className="hero">
        <h1>Verifica e corrige<br />os teus <em>trabalhos académicos</em></h1>
        <p className="hero-sub">
          Análise e correção automática de relatórios académicos, laboratoriais e práticos segundo as normas oficiais GOST da Federação Russa.
        </p>
      </div>
 
      {/* STANDARDS STRIP */}
      <div className="standards-strip">
        <span className="std-label">Normas:</span>
        {STANDARDS.map((s) => <span key={s.code} className="std-chip">{s.code}</span>)}
      </div>
 
      {/* MAIN */}
      <div className="upload-section">
 
        {/* Drop Zone */}
        <div
          className={`upload-card ${dragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => !file && inputRef.current.click()}
          style={file ? { cursor: "default" } : {}}
        >
          <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
 
          {!file ? (
            <>
              <div className="upload-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <div className="upload-title">Carrega o teu relatório</div>
              <div className="upload-sub">Arrasta o ficheiro aqui ou clica para selecionar.<br/>Trabalhos académicos, laboratoriais ou práticos.</div>
              <div className="upload-types">
                <span className="type-chip">PDF</span>
                <span className="type-dot">·</span>
                <span className="type-chip">DOC</span>
                <span className="type-dot">·</span>
                <span className="type-chip">DOCX</span>
              </div>
              <button className="upload-btn" onClick={(e) => { e.stopPropagation(); inputRef.current.click(); }}>Escolher ficheiro</button>
            </>
          ) : (
            <>
              <div className="upload-icon-wrap" style={{ background: ext === "PDF" ? "rgba(239,68,68,0.12)" : "rgba(59,130,246,0.12)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ext === "PDF" ? "#ef4444" : "#3b82f6"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div className="file-info">
                <div className={`file-icon ${ext === "PDF" ? "pdf" : "doc"}`}>{ext}</div>
                <div className="file-meta">
                  <div className="file-name">{file.name}</div>
                  <div className="file-size">{formatSize(file.size)}</div>
                </div>
                <button className="file-remove" onClick={(e) => { e.stopPropagation(); setFile(null); setDone(false); setProgress(0); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>Relatório pronto — seleciona uma ação abaixo</div>
            </>
          )}
        </div>
 
        {/* Options */}
        <div className="options-card">
          <div className="options-header">
            <div className="options-title">O que queres fazer?</div>
            <div className="options-subtitle">Seleciona a operação a realizar sobre o teu trabalho</div>
          </div>
          {OPTIONS.map((opt) => (
            <div key={opt.id} className={`option-row ${selectedOption === opt.id ? "selected" : ""}`} onClick={() => setSelectedOption(opt.id)}>
              <div className="option-icon" style={selectedOption === opt.id ? {} : { background: opt.iconBg }}>
                <span style={{ color: selectedOption === opt.id ? "#fff" : opt.iconColor }}>{opt.icon}</span>
              </div>
              <div className="option-text">
                <div className="option-label">{opt.label}</div>
                <div className="option-desc">{opt.desc}</div>
                <div className="option-tags">{opt.tags.map((t) => <span key={t} className="option-tag">{t}</span>)}</div>
              </div>
              <div className="option-radio"><div className="option-radio-dot"/></div>
            </div>
          ))}
        </div>
 
        {/* Standards collapsible */}
        <div className="standards-card">
          <div className={`standards-card-header ${stdOpen ? "open" : ""}`} onClick={() => setStdOpen(!stdOpen)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div className="standards-card-header-text">
              <div className="standards-card-title">Normas aplicadas</div>
              <div className="standards-card-subtitle">Ver os padrões GOST utilizados na verificação</div>
            </div>
            <svg className={`std-chevron ${stdOpen ? "open" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
          {stdOpen && STANDARDS.map((s) => (
            <div key={s.code} className="std-item">
              <span className="std-badge">{s.code}</span>
              <div>
                <div className="std-info-title">{s.title}</div>
                <div className="std-info-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
 
        {/* Progress */}
        {processing && (
          <div className="progress-wrap">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: progress + "%" }}/>
            </div>
            <div className="progress-label">A processar o relatório… {Math.round(progress)}%</div>
          </div>
        )}
 
        {/* Result */}
        {done && currentOption && (
          <div className="result-card">
            <div className="result-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div className="result-text">
              <h4>Concluído com sucesso!</h4>
              <p>{currentOption.resultMsg}</p>
            </div>
          </div>
        )}
 
        {/* Submit */}
        <button className="submit-btn" disabled={!file || !selectedOption || processing} onClick={handleSubmit}>
          {processing ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              A processar…
            </>
          ) : (
            <>
              {btnLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </>
          )}
        </button>
      </div>
    </>
  );
}



export const NavBar = ()=>{
    return (
            <div>
                <Menu></Menu>
                 
            </div>
    )
}