import { useEffect, useState, useRef } from "react"
import { Search, X, Hammer, Package, BookMarked, FolderPlus, ChevronDown, ChevronRight, Edit2, Check, Plus, Minus, Trash2, Share2, Link, FileDown, FileUp, Copy, ClipboardList } from "lucide-react"

const API = "https://rimel-discord-server-v1-production.up.railway.app"

const LS_KEY = "mc_build_plans"
const savePlans = (plans) => localStorage.setItem(LS_KEY, JSON.stringify(plans))
const loadPlans = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || [] } catch { return [] }
}

function QtyInput({ value, onChange, className = "" }) {
  const [local, setLocal] = useState(String(value))
  useEffect(() => { setLocal(String(value)) }, [value])
  const commit = () => {
    const n = parseInt(local)
    if (!isNaN(n) && n > 0) onChange(n)
    else setLocal(String(value))
  }
  return (
    <input
      type="text" inputMode="numeric" value={local}
      onChange={e => setLocal(e.target.value)}
      onBlur={commit}
      onKeyDown={e => { if (e.key === "Enter") { commit(); e.target.blur() } }}
      className={className}
    />
  )
}

export default function MinecraftCalc() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(null)
  const [uses, setUses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Build Planner
  const [plans, setPlans] = useState(loadPlans)
  const [expandedPlans, setExpandedPlans] = useState({})
  const [editingPlanId, setEditingPlanId] = useState(null)
  const [editingName, setEditingName] = useState("")

  // Add to Build dropdown (in right panel)
  const [showAddFlow, setShowAddFlow] = useState(false)
  const [newBuildName, setNewBuildName] = useState("")
  const [creatingNew, setCreatingNew] = useState(false)
  const [addedPlanId, setAddedPlanId] = useState(null)
  const [selectedDropdownPlan, setSelectedDropdownPlan] = useState(null)
  const [copiedPlanId, setCopiedPlanId] = useState(null)
  const [importToast, setImportToast] = useState(null)

  // Export / Import modal
  const [exportModal, setExportModal] = useState(null)   // plan object
  const [exportCopied, setExportCopied] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importText, setImportText] = useState("")
  const [importError, setImportError] = useState("")
  const newBuildInputRef = useRef(null)

  useEffect(() => { fetchItems() }, [])
  useEffect(() => { savePlans(plans) }, [plans])
  useEffect(() => {
    if (creatingNew && newBuildInputRef.current) newBuildInputRef.current.focus()
  }, [creatingNew])

  // reset add flow on item change
  useEffect(() => {
    setShowAddFlow(false)
    setCreatingNew(false)
    setNewBuildName("")
    setAddedPlanId(null)
    setSelectedDropdownPlan(null)
  }, [selected])

  // ── URL share import — runs once on mount ───────
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const encoded = params.get("build")
      if (!encoded) return
      const plan = JSON.parse(atob(encoded))
      if (!plan?.name || !Array.isArray(plan?.items)) return
      // avoid duplicate import
      setPlans(prev => {
        const alreadyExists = prev.some(p => p.name === plan.name && p.items.length === plan.items.length)
        if (alreadyExists) return prev
        const newPlan = { ...plan, id: Date.now() }
        setImportToast({ name: plan.name, count: plan.items.length })
        setTimeout(() => setImportToast(null), 4000)
        return [...prev, newPlan]
      })
      // clean URL
      window.history.replaceState({}, "", window.location.pathname)
    } catch { /* invalid URL param, ignore */ }
  }, [])

  const sharePlan = (plan) => {
    try {
      const data = { name: plan.name, items: plan.items }
      const encoded = btoa(JSON.stringify(data))
      const url = `${window.location.origin}${window.location.pathname}?build=${encoded}`
      navigator.clipboard.writeText(url)
      setCopiedPlanId(plan.id)
      setTimeout(() => setCopiedPlanId(null), 2500)
    } catch { alert("Failed to copy link") }
  }

  // Generate human-readable export text
  const getExportText = (plan) => {
    const lines = [
      `📦 Build Plan: ${plan.name}`,
      `Items: ${plan.items.length}`,
      `─────────────────────────`,
      ...plan.items.map(i => `• ${i.displayName} (${i.name}) × ${i.quantity}`),
      `─────────────────────────`,
      `[MC-BUILD-DATA]${btoa(JSON.stringify({ name: plan.name, items: plan.items }))}[/MC-BUILD-DATA]`
    ]
    return lines.join("\n")
  }

  const copyExportText = (plan) => {
    navigator.clipboard.writeText(getExportText(plan))
    setExportCopied(true)
    setTimeout(() => setExportCopied(false), 2000)
  }

  const handleImport = () => {
    setImportError("")
    try {
      const match = importText.match(/\[MC-BUILD-DATA\](.*?)\[\/MC-BUILD-DATA\]/)
      if (!match) { setImportError("Invalid format — paste the full exported text."); return }
      const plan = JSON.parse(atob(match[1]))
      if (!plan?.name || !Array.isArray(plan?.items)) { setImportError("Corrupted data."); return }
      const newPlan = { ...plan, id: Date.now() }
      setPlans(prev => [...prev, newPlan])
      setExpandedPlans(prev => ({ ...prev, [newPlan.id]: true }))
      setImportToast({ name: plan.name, count: plan.items.length })
      setTimeout(() => setImportToast(null), 4000)
      setImportText("")
      setShowImportModal(false)
    } catch { setImportError("Failed to parse — make sure you pasted the full text.") }
  }


  const fetchItems = async () => {
    try {
      const res = await fetch(`${API}/items`)
      const data = await res.json()
      setItems(data)
    } catch (err) { setError("Failed to load items.", err) }
  }

  const filtered = items.filter(item =>
    item.displayName.toLowerCase().includes(search.toLowerCase())
  )

  const openItem = async (item) => {
    setSelected(item)
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API}/uses/${item.name}`)
      const data = await res.json()
      if (data.error) { setError(data.error); setUses([]) }
      else setUses(data)
    } catch { setError("Failed to load crafting recipes"); setUses([]) }
    finally { setLoading(false) }
  }

  // ── Plans ────────────────────────────────────────
  const createPlanAndAdd = () => {
    const name = newBuildName.trim() || `Build ${plans.length + 1}`
    const newId = Date.now()
    const plan = {
      id: newId,
      name,
      items: selected ? [{ ...selected, quantity: 1 }] : []
    }
    setPlans(prev => [...prev, plan])
    setNewBuildName("")
    setCreatingNew(false)
    setShowAddFlow(false)
    setExpandedPlans(prev => ({ ...prev, [newId]: true }))
    flashFeedback(newId)
  }

  const deletePlan = (id) => setPlans(plans.filter(p => p.id !== id))

  const addItemToPlan = (planId) => {
    if (!selected) return
    setPlans(plans.map(p => {
      if (p.id !== planId) return p
      const existing = p.items.find(i => i.id === selected.id)
      if (existing) return { ...p, items: p.items.map(i => i.id === selected.id ? { ...i, quantity: i.quantity + 1 } : i) }
      return { ...p, items: [...p.items, { ...selected, quantity: 1 }] }
    }))
    setShowAddFlow(false)
    flashFeedback(planId)
  }

  const flashFeedback = (planId) => {
    setAddedPlanId(planId)
    setTimeout(() => setAddedPlanId(null), 2000)
  }

  const updatePlanItemQty = (planId, itemId, qty) => {
    setPlans(plans.map(p => {
      if (p.id !== planId) return p
      if (qty <= 0) return { ...p, items: p.items.filter(i => i.id !== itemId) }
      return { ...p, items: p.items.map(i => i.id === itemId ? { ...i, quantity: qty } : i) }
    }))
  }

  const removePlanItem = (planId, itemId) =>
    setPlans(plans.map(p => p.id !== planId ? p : { ...p, items: p.items.filter(i => i.id !== itemId) }))

  const renamePlan = (id) => {
    const trimmed = editingName.trim()
    if (trimmed) setPlans(plans.map(p => p.id === id ? { ...p, name: trimmed } : p))
    setEditingPlanId(null)
  }

  const toggleExpand = (id) => setExpandedPlans(prev => ({ ...prev, [id]: !prev[id] }))

  const handleAddToBuildClick = () => {
    if (plans.length === 0) {
      setShowAddFlow(true)
      setCreatingNew(true)
    } else {
      setShowAddFlow(prev => !prev)
      setCreatingNew(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 pt-20">

        {/* Header */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-emerald-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-400 flex items-center gap-2 sm:gap-3">
                <Hammer className="w-7 h-7 sm:w-10 sm:h-10" />
                <span className="leading-tight">Minecraft Build Planner</span>
              </h1>
              <p className="text-emerald-300/70 mt-2 text-sm sm:text-base">Click any item to see what you can build your plan.</p>
            </div>
          </div>
        </div>



        <div className="grid lg:grid-cols-[1fr_400px] gap-4 sm:gap-6">

          {/* Items Grid */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-emerald-500/30">
            {/* Search */}
            <div className="relative max-w-md mb-5">
              <input
                className="w-full px-4 py-3 pl-12 bg-black/40 backdrop-blur-sm border border-emerald-500/30 rounded-lg text-white placeholder-emerald-300/50 focus:outline-none focus:border-emerald-400"
                placeholder="Search items..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-emerald-400/50" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-3 sm:mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
              All Items ({filtered.length})
            </h2>

            <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-2 sm:gap-3 max-h-[400px] sm:max-h-[600px] overflow-y-auto py-2 pr-1 sm:pr-2">
              {filtered.map(item => (
                <div
                  key={item.id}
                  onClick={() => openItem(item)}
                  className={`
                    bg-black/40 hover:bg-emerald-500/20 border border-emerald-500/20
                    hover:border-emerald-400 rounded-lg p-2 sm:p-3 cursor-pointer
                    transition-all hover:scale-105
                    ${selected?.id === item.id ? 'ring-2 ring-emerald-400 bg-emerald-500/20' : ''}
                  `}
                  title={item.displayName}
                >
                  <img src={item.image} alt={item.name} className="w-full h-auto pixelated" />
                  <p className="text-[9px] sm:text-[10px] text-center text-emerald-300/80 mt-1 leading-tight line-clamp-2">
                    {item.displayName}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ RIGHT PANEL ═══ */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-emerald-500/30 h-fit lg:sticky lg:top-6">

            <div className="space-y-4">

              {/* ═══ BUILD PLANNER SECTION ═══ */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                    <BookMarked className="w-4 h-4" />
                    Build Planner
                    {plans.length > 0 && (
                      <span className="text-amber-400/50 text-sm font-normal">({plans.length})</span>
                    )}
                  </h2>
                  <button
                    onClick={() => { setShowImportModal(true); setImportText(""); setImportError("") }}
                    className="flex items-center gap-1 px-2 py-1 cursor-pointer rounded-lg text-[15px] font-semibold text-emerald-300/60 hover:text-emerald-200 border border-emerald-500/20 hover:border-emerald-400/40 hover:bg-emerald-500/10 transition-all"
                  >
                    <FileUp className="w-3 h-3" />
                    Import
                  </button>
                </div>

                {plans.length === 0 ? (
                  <div className="text-center py-4 bg-black/20 rounded-lg border border-amber-500/10">
                    <p className="text-amber-300/30 text-xs">No build plans yet.</p>
                    <p className="text-amber-300/20 text-[10px] mt-0.5">Select an item → Add to Build</p>
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-64 overflow-y-auto pr-0.5">
                    {plans.map(plan => (
                      <div key={plan.id} className="bg-black/30 rounded-lg border border-amber-500/20 overflow-hidden">
                        <div
                          className="flex items-center gap-2 px-2.5 py-2 cursor-pointer hover:bg-amber-500/5 transition"
                          onClick={() => toggleExpand(plan.id)}
                        >
                          {expandedPlans[plan.id]
                            ? <ChevronDown className="w-3 h-3 text-amber-400/60 flex-shrink-0" />
                            : <ChevronRight className="w-3 h-3 text-amber-400/60 flex-shrink-0" />}
                          {editingPlanId === plan.id ? (
                            <input
                              autoFocus value={editingName}
                              onChange={e => setEditingName(e.target.value)}
                              onKeyDown={e => { if (e.key === "Enter") renamePlan(plan.id); if (e.key === "Escape") setEditingPlanId(null) }}
                              onClick={e => e.stopPropagation()}
                              className="flex-1 bg-black/40 text-white px-1.5 py-0.5 rounded border border-amber-500/40 focus:outline-none text-xs"
                            />
                          ) : (
                            <span className="flex-1 font-semibold text-amber-300 text-sm truncate">{plan.name}</span>
                          )}
                          <span className="text-amber-400/40 text-[15px] flex-shrink-0 mr-1">{plan.items.length}</span>
                          <div className="flex items-center gap-0.5" onClick={e => e.stopPropagation()}>
                            {editingPlanId === plan.id ? (
                              <button onClick={() => renamePlan(plan.id)} className="text-emerald-400 hover:text-emerald-300 p-1">
                                <Check className="w-2.5 h-2.5" />
                              </button>
                            ) : (
                              <button onClick={() => { setEditingPlanId(plan.id); setEditingName(plan.name) }} className="text-amber-400/40 cursor-pointer  hover:text-amber-300 p-1">
                                <Edit2 size={15} />
                              </button>
                            )}
                            <button onClick={() => sharePlan(plan)} className={`p-1 transition-all ${copiedPlanId === plan.id ? "text-emerald-400" : "text-amber-400/40 hover:text-emerald-400"}`}>
                              {copiedPlanId === plan.id ? <Check size={15} /> : <Share2 size={15} />}
                            </button>
                            <button onClick={() => deletePlan(plan.id)} className="text-red-400/40 hover:text-red-400 p-1">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        <div className={`overflow-hidden transition-all duration-300 ease-out ${expandedPlans[plan.id] ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
                          <div className="border-t border-amber-500/10 p-2 space-y-1">
                            {plan.items.length === 0 ? (
                              <p className="text-amber-300/30 text-[10px] text-center py-1.5">No items yet.</p>
                            ) : (
                              <>
                                {plan.items.map(item => (
                                  <div key={item.id} className="flex items-center gap-1.5 bg-black/20 rounded-lg px-2 py-1">
                                    <img src={item.image} className="w-6 h-6 pixelated flex-shrink-0" alt={item.displayName} />
                                    <span className="flex-1 text-amber-200 text-[10px] truncate">{item.displayName}</span>
                                    <div className="flex items-center gap-0.5 flex-shrink-0">
                                      <button onClick={() => updatePlanItemQty(plan.id, item.id, item.quantity - 1)} className="bg-red-500/20 hover:bg-red-500/30 text-red-400  cursor-pointer p-0.5 rounded">
                                        <Minus size={15} />
                                      </button>
                                      <QtyInput value={item.quantity} onChange={qty => updatePlanItemQty(plan.id, item.id, qty)} className="w-8 bg-black/40 text-white text-center px-0.5 py-0.5 rounded border border-amber-500/20 focus:outline-none text-[10px]" />
                                      <button onClick={() => updatePlanItemQty(plan.id, item.id, item.quantity + 1)} className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 p-0.5  cursor-pointer rounded">
                                        <Plus size={15} />
                                      </button>
                                      <button onClick={() => removePlanItem(plan.id, item.id)} className="text-red-400/40 cursor-pointer hover:text-red-400 p-0.5 ml-0.5">
                                        <Trash2 size={15} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                <button
                                  onClick={() => { setExportModal(plan); setExportCopied(false) }}
                                  className="w-full flex items-center cursor-pointer justify-center gap-1 py-1 rounded text-[10px] font-semibold text-amber-300/50 hover:text-amber-200 border border-dashed border-amber-500/15 hover:border-amber-400/30 hover:bg-amber-500/5 transition-all"
                                >
                                  <FileDown size={15} />
                                  Export Data
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-emerald-500/20" />

              {/* ═══ ITEM SELECTION SECTION ═══ */}
              {!selected ? (
                <div className="text-center py-8">
                  <Hammer className="w-10 h-10 text-emerald-400/20 mx-auto mb-3" />
                  <p className="text-emerald-300/40 text-sm">Select an item to see crafting recipes</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Selected item header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={selected.image} className="w-10 h-10 pixelated flex-shrink-0" alt={selected.displayName} />
                      <div className="min-w-0">
                        <h2 className="text-sm font-bold text-emerald-400 truncate">{selected.displayName}</h2>
                        <p className="text-[10px] text-emerald-300/50 truncate">{selected.name}</p>
                      </div>
                    </div>
                    <button onClick={() => { setSelected(null); setUses([]) }} className="p-1.5 hover:bg-red-500/20 rounded-lg transition flex-shrink-0">
                      <X className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>

                  {/* Add to Build button + dropdown */}
                  <div className="space-y-1.5">
                    <button
                      onClick={handleAddToBuildClick}
                      className={`w-full flex items-center justify-center gap-2 py-2  cursor-pointer rounded-lg font-semibold text-xs transition-all border ${showAddFlow
                          ? "bg-amber-500 text-white border-amber-400"
                          : addedPlanId
                            ? "bg-emerald-600/80 text-white border-emerald-500/50"
                            : "bg-amber-600/80 hover:bg-amber-500 text-white border-amber-500/40 hover:border-amber-400"
                        }`}
                    >
                      {addedPlanId && !showAddFlow ? (
                        <><Check className="w-3.5 h-3.5" /> Added to {plans.find(p => p.id === addedPlanId)?.name}!</>
                      ) : (
                        <><FolderPlus className="w-3.5 h-3.5" /> Add to Build</>
                      )}
                    </button>

                    <div className={`bg-stone-900/95 backdrop-blur-sm border border-amber-500/40 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-out ${showAddFlow ? "max-h-80 opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-95 pointer-events-none"
                      }`} style={{ transformOrigin: "top" }}>
                      {plans.length > 0 && (
                        <div className="p-2">
                          <p className="text-amber-400/50 text-[10px] uppercase tracking-wider px-2 py-1">Choose a folder</p>
                          {plans.map(p => (
                            <button
                              key={p.id}
                              onClick={() => setSelectedDropdownPlan(prev => prev === p.id ? null : p.id)}
                              className={`w-full flex items-center gap-2 px-2.5 py-2  cursor-pointer rounded-lg text-xs font-medium transition-all text-left group ${selectedDropdownPlan === p.id
                                  ? "bg-amber-500/20 border border-amber-400/40 text-amber-200"
                                  : "hover:bg-amber-500/10 text-amber-200/70 hover:text-amber-100 border border-transparent"
                                }`}
                            >
                              <BookMarked className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${selectedDropdownPlan === p.id ? "text-amber-400" : "text-amber-500/50 group-hover:text-amber-400"}`} />
                              <span className="flex-1 truncate">{p.name}</span>
                              <span className="text-[9px] text-amber-400/50 bg-amber-500/10 px-1.5 py-0.5 rounded-full font-semibold">{p.items.length}</span>
                            </button>
                          ))}
                          <div className={`overflow-hidden transition-all duration-300 ${selectedDropdownPlan ? "max-h-16 opacity-100 mt-1.5" : "max-h-0 opacity-0"}`}>
                            <button
                              onClick={() => { addItemToPlan(selectedDropdownPlan); setSelectedDropdownPlan(null) }}
                              className="w-full flex items-center  cursor-pointer justify-center gap-2 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-white transition-all"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Add to {plans.find(p => p.id === selectedDropdownPlan)?.name}
                            </button>
                          </div>
                        </div>
                      )}
                      {plans.length > 0 && <div className="h-px bg-amber-500/15 mx-2" />}
                      <div className="p-2">
                        {!creatingNew ? (
                          <button
                            onClick={() => setCreatingNew(true)}
                            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg  cursor-pointer text-xs font-medium text-emerald-300/70 hover:text-emerald-200 hover:bg-emerald-500/10 transition-all border border-dashed border-emerald-500/20 hover:border-emerald-500/40"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            {plans.length === 0 ? "Create your first build folder" : "New folder"}
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-black/50 border border-amber-400/30 rounded-lg px-2.5 py-1.5">
                            <FolderPlus className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                            <input
                              ref={newBuildInputRef}
                              type="text"
                              placeholder="Folder name..."
                              value={newBuildName}
                              onChange={e => setNewBuildName(e.target.value)}
                              onKeyDown={e => { if (e.key === "Enter") createPlanAndAdd(); if (e.key === "Escape") { setCreatingNew(false); setNewBuildName("") } }}
                              className="flex-1 bg-transparent text-white text-xs placeholder-amber-300/30 focus:outline-none min-w-0"
                            />
                            <button onClick={createPlanAndAdd} className="bg-amber-500 hover:bg-amber-400 text-white px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap transition">Create & Add</button>
                            <button onClick={() => { setCreatingNew(false); setNewBuildName("") }} className="text-red-400/60 hover:text-red-400"><X className="w-3 h-3" /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-emerald-500/20" />

                  {/* Can Craft */}
                  <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                    <Hammer className="w-3.5 h-3.5" />
                    Can Craft
                  </h3>

                  {loading && (
                    <div className="text-center py-4">
                      <div className="animate-spin w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full mx-auto" />
                      <p className="text-emerald-300/50 mt-2 text-xs">Loading...</p>
                    </div>
                  )}
                  {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2.5 text-red-400 text-xs">{error}</div>}
                  {!loading && !error && uses.length === 0 && (
                    <p className="text-emerald-300/40 text-xs text-center py-4">No crafting recipes found</p>
                  )}
                  {!loading && !error && uses.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-0.5">
                      {uses.map((item, idx) => (
                        <div
                          key={`${item.id}-${idx}`}
                          className="bg-black/40 border border-emerald-500/20 hover:border-emerald-400 rounded-lg p-1.5 cursor-pointer hover:scale-105 transition-all relative"
                          onClick={() => openItem(item)}
                        >
                          {item.count && item.count > 1 && (
                            <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow border border-emerald-900">
                              {item.count}
                            </div>
                          )}
                          <img src={item.image} className="w-full h-auto pixelated" alt={item.displayName} />
                          <p className="text-[8px] text-center text-emerald-300/80 mt-1 leading-tight line-clamp-2">{item.displayName}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ EXPORT MODAL ═══ */}
      {exportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-stone-900 to-amber-950 border border-amber-500/30 rounded-xl max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-amber-500/20">
              <h3 className="text-amber-400 font-bold flex items-center gap-2">
                <FileDown className="w-5 h-5" />
                Export — {exportModal.name}
              </h3>
              <button onClick={() => setExportModal(null)} className="p-1.5 hover:bg-red-500/20 rounded-lg transition">
                <X className="w-4 h-4 text-red-400" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-amber-300/50 text-xs">Copy this text and share it. Others can paste it into the Import box to load your build.</p>
              <textarea
                readOnly
                value={getExportText(exportModal)}
                className="w-full h-52 bg-black/50 border border-amber-500/20 rounded-lg p-3 text-emerald-300/80 text-xs font-mono resize-none focus:outline-none"
              />
              <button
                onClick={() => copyExportText(exportModal)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all ${exportCopied
                    ? "bg-emerald-600 text-white border border-emerald-500"
                    : "bg-amber-500 hover:bg-amber-400 text-white"
                  }`}
              >
                {exportCopied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy to Clipboard</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ IMPORT MODAL ═══ */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-stone-900 to-emerald-950 border border-emerald-500/30 rounded-xl max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-emerald-500/20">
              <h3 className="text-emerald-400 font-bold flex items-center gap-2">
                <FileUp className="w-5 h-5" />
                Import Build
              </h3>
              <button onClick={() => setShowImportModal(false)} className="p-1.5 hover:bg-red-500/20 rounded-lg transition">
                <X className="w-4 h-4 text-red-400" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-emerald-300/50 text-xs">Paste the full exported text below to load a shared build into your planner.</p>
              <textarea
                value={importText}
                onChange={e => { setImportText(e.target.value); setImportError("") }}
                placeholder="Paste exported build text here..."
                className="w-full h-48 bg-black/50 border border-emerald-500/20 rounded-lg p-3 text-emerald-200 text-xs font-mono resize-none focus:outline-none focus:border-emerald-400 placeholder-emerald-300/20"
              />
              {importError && (
                <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{importError}</p>
              )}
              <button
                onClick={handleImport}
                disabled={!importText.trim()}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all"
              >
                <ClipboardList className="w-4 h-4" />
                Import Build
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOASTS ── */}
      {/* Copied link toast */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${copiedPlanId
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
        }`}>
        <div className="flex items-center gap-2.5 bg-emerald-900 border border-emerald-400/40 text-emerald-300 px-5 py-3 rounded-xl shadow-2xl shadow-black/50 text-sm font-semibold whitespace-nowrap">
          <Link className="w-4 h-4 text-emerald-400" />
          Share link copied to clipboard!
        </div>
      </div>

      {/* Imported plan toast */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${importToast
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
        }`}>
        <div className="flex items-center gap-2.5 bg-amber-900 border border-amber-400/40 text-amber-200 px-5 py-3 rounded-xl shadow-2xl shadow-black/50 text-sm font-semibold whitespace-nowrap">
          <BookMarked className="w-4 h-4 text-amber-400" />
          Build &quot;{importToast?.name}&quot; imported — {importToast?.count} items added!
        </div>
      </div>

      <style jsx>{`
        .pixelated {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
      `}</style>
    </div>
  )
}