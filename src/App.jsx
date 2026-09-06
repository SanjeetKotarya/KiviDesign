import { useState } from 'react'
import './App.css'

const navItems = [
  { id: 'record', label: 'Record', icon: '◌' },
  { id: 'history', label: 'History', icon: '◷' },
  { id: 'dictionary', label: 'Dictionary', icon: '✦' },
  { id: 'shortcuts', label: 'Shortcuts', icon: 'ϟ' },
  { id: 'imprints', label: 'Imprints', icon: '✦' },
  { id: 'corrections', label: 'Corrections', icon: '↗' },
]

const imprints = {
  slack: { id: 'slack', app: 'Slack', context: 'team & friends', voice: 'yaar can you push this by today', count: 54, age: '3 weeks', state: 'settled', detail: 'Hindi-English blend, roman script', trend: [10, 16, 14, 9, 7, 4, 3, 2], raw: 'Could you please push this by today?', now: 'yaar can you push this by today', note: 'Shorter, more like your Slack messages.' },
  cursor: { id: 'cursor', app: 'Cursor', context: 'code workspace', voice: 'move this into the shared hook', count: 8, age: '4 days', state: 'forming', detail: 'Technical English, code terms intact', trend: [2, 3, 4, 3, 5, 6, 7], raw: 'Can you please move this into the shared hook?', now: 'move this into the shared hook', note: 'Still taking shape from recent corrections.' },
}

function App() {
  const [screen, setScreen] = useState('record')
  const [corrected, setCorrected] = useState(false)
  const [showOffer, setShowOffer] = useState(false)
  const [activeImprint, setActiveImprint] = useState(imprints.slack)
  const [offerState, setOfferState] = useState('open')

  const openDetail = (imprint) => { setActiveImprint(imprint); setScreen('detail') }
  const handleCorrection = () => setCorrected(true)

  return <div className="app-shell">
    <aside className="sidebar">
      <div>
        <div className="brand">kivi <span>the longer it listens, the more it sounds like you</span></div>
        <div className="side-rule" />
        <nav aria-label="Kivi navigation">{navItems.map((item) => <button key={item.id} className={`nav-item ${screen === item.id || (screen === 'detail' && item.id === 'imprints') ? 'active' : ''}`} onClick={() => setScreen(item.id)}><span>{item.icon}</span>{item.label}{item.id === 'imprints' && offerState === 'open' && <i />}</button>)}</nav>
      </div>
      <div className="account"><div className="account-avatar">S</div><div><strong>Sanjeet Kotarya</strong><small>sanjeetko...mail.com</small></div><span className="account-icons">◉　⚙</span></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="connection"><span /> listening locally <b>·</b> nothing leaves this Mac</div><div className="top-actions"><span>⌥ Space</span><button aria-label="Account menu">•••</button></div></header>
      <div className="content">
        {screen === 'record' && <Record corrected={corrected} onCorrect={handleCorrection} onOffer={() => setShowOffer(true)} showOffer={showOffer} onDismissOffer={() => setShowOffer(false)} onForm={() => { setShowOffer(false); setScreen('imprints') }} />}
        {screen === 'imprints' && <ImprintsHome onOpen={openDetail} onFirstRun={() => setScreen('empty')} />}
        {screen === 'empty' && <EmptyImprints onBack={() => setScreen('imprints')} />}
        {screen === 'detail' && <ImprintDetail imprint={activeImprint} onBack={() => setScreen('imprints')} onMature={() => setScreen('mature')} />}
        {screen === 'mature' && <Mature onBack={() => setScreen('record')} />}
        {screen === 'corrections' && <Corrections onBack={() => setScreen('record')} />}
        {screen === 'history' && <History />}
        {screen === 'dictionary' && <Dictionary />}
        {screen === 'shortcuts' && <Shortcuts />}
      </div>
    </main>
  </div>
}

function Record({ corrected, onCorrect, onOffer, showOffer, onDismissOffer, onForm }) {
  return <div className="record-page page-enter">
    <div className="record-heading"><div><p className="overline">RECORD · SLACK / #ANDROID-TEAM</p><h1>say it once.</h1></div><div className="record-status"><span className="pulse" /> ready when you are</div></div>
    <section className="transcript-card"><div className="transcript-meta"><span>heard just now</span><span>Slack imprint · forming</span></div><p className="transcript">{corrected ? 'yaar can you push this by today' : 'Could you please push this by today?'}</p>{!corrected ? <><button className="word-edit" onClick={onCorrect}>please</button><div className="correction-hint">tap a word to correct what Kivi heard</div></> : <div className="absorbed"><span className="absorb-dot" /> absorbed into Slack <span>·</span> 12 corrections toward this voice <button onClick={onOffer}>see what is forming →</button></div>}</section>
    <div className="code-switch"><span className="mini-label">ONE LINE, AS YOU SAID IT</span><p>yaar <em>can you push this by today</em></p><small>Hindi and English, inline. Nothing to choose.</small></div>
    {showOffer && <FormationOffer onDismiss={onDismissOffer} onForm={onForm} />}
    <div className="record-footer"><span>hold to dictate</span><kbd>⌥</kbd><kbd>Space</kbd><span className="footer-note">corrections are the only way to teach Kivi</span></div>
  </div>
}

function FormationOffer({ onDismiss, onForm }) { return <section className="formation-offer"><div className="offer-copy"><p className="overline">A QUIET QUESTION</p><h2>Slack is starting to sound like you.</h2><p>You have corrected 12 things toward casual Hinglish here. Form an Imprint so those corrections can happen automatically. You can change your mind later.</p><div className="offer-examples"><span>“Could you please...” <b>→</b> “yaar can you...”</span><span>“I will check it” <b>→</b> “dekh leta hoon”</span></div></div><div className="offer-actions"><button className="green-button" onClick={onForm}>Form Slack Imprint</button><button onClick={onDismiss}>Not now</button><button onClick={onDismiss}>Never for Slack</button></div></section> }

function ImprintsHome({ onOpen, onFirstRun }) { return <div className="imprints-page page-enter"><div className="page-heading"><div><p className="overline">YOUR SPACE · ACCUMULATED, NOT CONFIGURED</p><h1>Where Kivi knows you</h1><p className="subtitle">Each Imprint is a small history of corrections that became instinct.</p></div><span className="settled-mark">✦ 2 contexts, still learning</span></div><div className="journal-rule" /><div className="imprint-grid"><ImprintCard imprint={imprints.slack} onClick={() => onOpen(imprints.slack)} /><ImprintCard imprint={imprints.cursor} onClick={() => onOpen(imprints.cursor)} /></div><div className="thin-context"><div className="thin-mark">o</div><div><p className="overline">GMAIL · JUST BEGINNING</p><h3>Not enough history to call it an Imprint yet.</h3><p>3 corrections so far. Kivi is listening, not guessing.</p></div><span>3 corrections</span></div><p className="no-controls">There is nothing here to configure. Keep dictating; the next correction is the lever.</p><button className="first-run-link" onClick={onFirstRun}>see Kivi before it knows you →</button></div> }

function EmptyImprints({ onBack }) { return <div className="empty-page page-enter"><button className="back-link" onClick={onBack}>← back to Imprints</button><div className="empty-center"><p className="overline">FIRST USE · NOTHING FORMED YET</p><h1>Kivi doesn't know<br />how you sound yet.</h1><p>It won't ask you to fill out a form. Keep dictating and correcting what you meant; an Imprint will form from the patterns that are actually yours.</p><div className="ghost-card"><span>ILLUSTRATIVE, NOT YOURS YET</span><strong>Slack Imprint</strong><p>“yaar can you push this by today”</p><small>this shape arrives through corrections, over time</small></div><p className="empty-foot">No presets. No language control. Just the next thing you say.</p></div></div> }

function ImprintCard({ imprint, onClick }) { return <button className="imprint-card" onClick={onClick}><div className="card-header"><span className={`app-glyph ${imprint.id}`}>{imprint.id === 'slack' ? 'S' : '<>'}</span><div><strong>{imprint.app}</strong><small>{imprint.context}</small></div><span className={`state ${imprint.state}`}>{imprint.state}</span></div><p className="card-voice">“{imprint.voice}”</p><div className="maturity"><div><strong>shaped by {imprint.count} corrections</strong><small>over {imprint.age}</small></div><Sparkline points={imprint.trend} /></div><div className="card-example"><span>BEFORE</span><p>{imprint.raw}</p><b>→</b><span>NOW</span><p>{imprint.now}</p></div><div className="card-footer"><span>{imprint.detail}</span><span>open imprint →</span></div></button> }

function Sparkline({ points }) { return <div className="sparkline" aria-label="Correction frequency tapering over time">{points.map((point, index) => <i key={index} style={{ height: `${point * 5 + 5}px` }} />)}</div> }

function ImprintDetail({ imprint, onBack, onMature }) { const isCursor = imprint.id === 'cursor'; return <div className="detail-page page-enter"><button className="back-link" onClick={onBack}>← all Imprints</button><div className="detail-title"><div><p className="overline">{imprint.app.toUpperCase()} · {imprint.context.toUpperCase()}</p><h1>{imprint.app} Imprint</h1><p>{imprint.detail}</p></div><span className={`state large ${imprint.state}`}>{imprint.state}</span></div><section className="detail-proof"><div className="proof-title"><p className="overline">PROVENANCE, NOT SETTINGS</p><h2>What changed because you corrected it</h2></div><div className="detail-pair"><div><span>BEFORE KIVI KNEW</span><p>{imprint.raw}</p><small>heard in {imprint.app} · {isCursor ? '4 days ago' : '3 weeks ago'}</small></div><b>→</b><div className="after"><span>NOW, IN YOUR VOICE</span><p>{imprint.now}</p><small>{imprint.detail}</small></div></div></section><div className="detail-columns"><section><p className="overline">CORRECTION LOG</p>{isCursor ? <><div className="log-entry"><time>MAR 08</time><p>“Please move this...” <b>→</b> “move this...”</p><small>removed padding, kept the instruction</small></div><div className="log-entry"><time>MAR 07</time><p>“use the helper” <b>→</b> “use <code>useSharedQuery</code>”</p><small>kept the exact function name</small></div><div className="log-entry"><time>MAR 05</time><p>“the data thing” <b>→</b> “the response mapper”</p><small>kept the technical term you chose</small></div></> : <><div className="log-entry"><time>MAR 06</time><p>“Could you please...” <b>→</b> “yaar can you...”</p><small>kept it short, kept your opening</small></div><div className="log-entry"><time>MAR 02</time><p>“I will check it” <b>→</b> “dekh leta hoon”</p><small>kept the Hindi phrase you typed</small></div><div className="log-entry"><time>FEB 24</time><p>“Would you mind...” <b>→</b> “can you...”</p><small>removed padding, not meaning</small></div></>}</section><section className="detail-side"><p className="overline">THE PATTERN</p><h3>{imprint.detail}</h3><p>Language resolves itself here from what you correct. No toggle, no preference to maintain.</p><div className="settled-chart"><span>corrections / week</span><Sparkline points={imprint.trend} /></div><button className="course-button" onClick={onMature}>This doesn't sound like me anymore →</button></section></div></div> }

function Mature({ onBack }) { return <div className="mature-page page-enter"><button className="back-link" onClick={onBack}>← back to dictation</button><div className="mature-center"><span className="quiet-star">✦</span><p className="overline">SLACK IMPRINT · 3 WEEKS IN</p><h1>It mostly just works now.</h1><p>54 corrections shaped this voice. Kivi rarely asks anymore; it waits for the next thing you actually say.</p><div className="mature-transcript"><small>last dictated in Slack</small><span>yaar ship kar de, I’ll check the logs</span><i>●</i></div><button className="subtle-button" onClick={onBack}>keep dictating</button></div></div> }
function Corrections({ onBack }) { return <div className="simple-page page-enter"><p className="overline">CORRECTIONS · THE ONLY LEVER</p><h1>Small edits become a voice.</h1><p>Every correction stays close to the context where you made it. There is no separate training task.</p><div className="correction-list"><div><time>today · Slack</time><strong>“Could you please...” → “yaar can you...”</strong></div><div><time>yesterday · Cursor</time><strong>“Please move this...” → “move this...”</strong></div><div><time>2 days ago · Gmail</time><strong>“I would like to request...” → “Need leave on Friday...”</strong></div></div><button className="subtle-button" onClick={onBack}>back to record</button></div> }
function History() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [timeFilter, setTimeFilter] = useState('all time')
  const [showClipboard, setShowClipboard] = useState(false)
  const chooseTime = (value) => { setTimeFilter(value); setFilterOpen(false) }
  return <div className="history-page page-enter"><div className="history-heading"><h1>history</h1><span className="heading-mark" /></div><div className="history-tools"><label className="history-search"><span>⌕</span><input aria-label="Search your words" placeholder="search your words — try: the offsite flights" /><small>return to ask</small></label><div className="filter-wrap"><button className={`filter-button ${filterOpen ? 'open' : ''}`} onClick={() => setFilterOpen((open) => !open)}><span>⚑</span> filter <b>⌄</b></button>{filterOpen && <div className="filter-menu"><p>apps</p><button>all apps</button><p>time</p>{['all time', 'today', 'this week', 'this month'].map((option) => <button key={option} className={timeFilter === option ? 'selected' : ''} onClick={() => chooseTime(option)}>{option}</button>)}<label className="clipboard-option"><input type="checkbox" checked={showClipboard} onChange={(event) => setShowClipboard(event.target.checked)} /> <span>show clipboard captures</span></label></div>}</div></div><div className="history-empty"><p>no takes yet <span>—</span> hold right ctrl and speak</p></div></div>
}

function Dictionary() {
  const [teaching, setTeaching] = useState(false)
  const [term, setTerm] = useState('')
  const [note, setNote] = useState('')
  const [savedTerm, setSavedTerm] = useState('')
  const [savedNote, setSavedNote] = useState('')
  const saveTerm = () => { if (term.trim()) { setSavedTerm(term.trim()); setSavedNote(note.trim()); setTerm(''); setNote(''); setTeaching(false) } }
  return <div className="dictionary-page page-enter"><div className="utility-heading"><div><h1>dictionary</h1><span className="heading-mark" /></div><button className="import-button">↧ &nbsp; import</button></div><section className="dictionary-proof"><h2>words kivi never misspells.</h2><div className="dictionary-example"><div><span>you say</span><p>“aditya shatriya”</p></div><b>→</b><div><span>kivi writes</span><p>Aditya Kshatriya</p></div></div></section>{teaching ? <div className="dictionary-teach"><div className="teach-active-header"><span>+</span> teach Kivi a term</div><div className="teach-field"><label htmlFor="dictionary-term">the term</label><input id="dictionary-term" autoFocus value={term} onChange={(event) => setTerm(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && saveTerm()} aria-label="New dictionary term" /></div><div className="teach-field"><label htmlFor="dictionary-note">a note <span>(optional — how it's used, what to avoid)</span></label><input id="dictionary-note" value={note} onChange={(event) => setNote(event.target.value)} aria-label="Note about dictionary term" /></div><div className="dictionary-actions"><button className="teach-submit" onClick={saveTerm}>teach</button><button onClick={() => setTeaching(false)}>cancel</button><button onClick={saveTerm}>add to shortcuts</button></div></div> : <button className="teach-row" onClick={() => setTeaching(true)}><span>+</span> teach Kivi a term</button>}{savedTerm ? <div className="saved-term"><span>remembered</span><strong>{savedTerm}</strong><small>{savedNote || 'Kivi will keep this spelling'}</small></div> : <p className="utility-empty">no terms yet — teach Kivi a word</p>}</div>
}

function Shortcuts() {
  const [teaching, setTeaching] = useState(false)
  const [shortcut, setShortcut] = useState('')
  const [shortcutOutput, setShortcutOutput] = useState('')
  const [savedShortcut, setSavedShortcut] = useState('')
  const saveShortcut = () => { if (shortcut.trim() && shortcutOutput.trim()) { setSavedShortcut(shortcut.trim()); setShortcut(''); setShortcutOutput(''); setTeaching(false) } }
  return <div className="shortcuts-page page-enter"><div className="utility-heading"><div><h1>shortcuts</h1><span className="heading-mark" /></div></div><section className="shortcut-proof"><div><span>you say</span><p>“my sign-off”</p></div><b>→</b><div className="shortcut-output"><div className="window-dots">● ● ●　▣</div><p>Warm regards,<br />Pranav Sridhar<br />Sarvam AI</p></div></section>{teaching ? <div className="shortcut-teach"><div className="teach-active-header"><span>+</span> teach Kivi a shortcut</div><div className="shortcut-field"><label htmlFor="shortcut-trigger">you say</label><input id="shortcut-trigger" autoFocus value={shortcut} onChange={(event) => setShortcut(event.target.value)} aria-label="Shortcut phrase" /></div><div className="shortcut-field"><label htmlFor="shortcut-output">kivi writes</label><textarea id="shortcut-output" value={shortcutOutput} onChange={(event) => setShortcutOutput(event.target.value)} aria-label="Shortcut output" /></div><div className="shortcut-actions"><button className="teach-submit" onClick={saveShortcut}>teach</button><button onClick={() => setTeaching(false)}>cancel</button></div></div> : <button className="teach-row" onClick={() => setTeaching(true)}><span>+</span> teach Kivi a shortcut</button>}{savedShortcut ? <div className="saved-term"><span>remembered</span><strong>{savedShortcut}</strong><small>Kivi will expand this phrase when you say it</small></div> : <p className="shortcut-empty">0 of 500 active<br /><br />no shortcuts yet — teach Kivi a shortcut</p>}</div>
}

export default App
