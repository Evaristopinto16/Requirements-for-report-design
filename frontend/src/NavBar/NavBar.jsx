import { useState, useRef, useCallback } from "react";
 
const styles = `
  
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
    tags: ["Margens & Fontes", "Espaçamento", "Estrutura GOST"],
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