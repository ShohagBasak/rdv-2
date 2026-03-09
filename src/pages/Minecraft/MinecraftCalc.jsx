import { useEffect, useState } from "react"
import { Search, X, Hammer, Package, ShoppingCart, Calculator, Plus, Minus, Trash2, BookMarked, FolderPlus, ChevronDown, ChevronRight, Send, Edit2, Check } from "lucide-react"

const API = "https://rimel-discord-server-v1-production.up.railway.app"

// LocalStorage helpers
const LS_KEY = "mc_build_plans"
const savePlans = (plans) => localStorage.setItem(LS_KEY, JSON.stringify(plans))
const loadPlans = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || [] } catch { return [] }
}

// Free-type quantity input — commits on blur or Enter
function QtyInput({ value, onChange, className = "" }) {
  const [local, setLocal] = useState(String(value))
  useEffect(() => { setLocal(String(value)) }, [value])

  const commit = () => {
    const n = parseInt(local)
    if (!isNaN(n) && n > 0) onChange(n)
    else setLocal(String(value)) // revert if invalid
  }

  return (
    <input
      type="text"
      inputMode="numeric"
      value={local}
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

  // Calculator
  const [cart, setCart] = useState([])
  const [showCalculator, setShowCalculator] = useState(false)
  const [ingredients, setIngredients] = useState([])
  const [calculating, setCalculating] = useState(false)

  // Build Planner
  const [showPlanner, setShowPlanner] = useState(false)
  const [plans, setPlans] = useState(loadPlans)
  const [activePlanId, setActivePlanId] = useState(null)
  const [newPlanName, setNewPlanName] = useState("")
  const [creatingPlan, setCreatingPlan] = useState(false)
  const [expandedPlans, setExpandedPlans] = useState({})
  const [editingPlanId, setEditingPlanId] = useState(null)
  const [editingName, setEditingName] = useState("")

  useEffect(() => { fetchItems() }, [])
  useEffect(() => { savePlans(plans) }, [plans])

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API}/items`)
      const data = await res.json()
      setItems(data)
    } catch (err) {
      setError("Failed to load items. Make sure backend is running on port 5000",err)
    }
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
    } catch {
      setError("Failed to load crafting recipes")
      setUses([])
    } finally { setLoading(false) }
  }

  // ── Cart ──────────────────────────────────────────
  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id)
    if (existing) setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c))
    else setCart([...cart, { ...item, quantity: 1 }])
  }
  const updateCartQty = (id, qty) => qty <= 0 ? setCart(cart.filter(c => c.id !== id)) : setCart(cart.map(c => c.id === id ? { ...c, quantity: qty } : c))
  const removeFromCart = (id) => setCart(cart.filter(c => c.id !== id))
  const clearCart = () => { setCart([]); setIngredients([]) }

  const calculateIngredients = async () => {
    setCalculating(true)
    setIngredients([])
    try {
      const map = {}
      for (const cartItem of cart) {
        const res = await fetch(`${API}/recipes/${cartItem.name}`)
        const recipes = await res.json()
        if (recipes.length > 0) {
          const recipe = recipes[0]
          let ings = recipe.ingredients || (recipe.inShape ? recipe.inShape.flat().filter(Boolean) : [])
          const resultCount = recipe.result?.count || 1
          const times = Math.ceil(cartItem.quantity / resultCount)
          ings.forEach(ing => {
            const ingId = ing.id ?? ing.itemId ?? ing
            const ingCount = (ing.count ?? 1) * times
            if (map[ingId]) map[ingId].count += ingCount
            else {
              const item = items.find(i => i.id === ingId)
              if (item) map[ingId] = { ...item, count: ingCount }
            }
          })
        }
      }
      setIngredients(Object.values(map))
    } catch { setError("Failed to calculate ingredients") }
    finally { setCalculating(false) }
  }

  // ── Build Planner ─────────────────────────────────
  const createPlan = () => {
    const name = newPlanName.trim() || `Build ${plans.length + 1}`
    const plan = { id: Date.now(), name, items: [] }
    setPlans([...plans, plan])
    setActivePlanId(plan.id)
    setNewPlanName("")
    setCreatingPlan(false)
    setExpandedPlans(prev => ({ ...prev, [plan.id]: true }))
  }

  const deletePlan = (id) => {
    setPlans(plans.filter(p => p.id !== id))
    if (activePlanId === id) setActivePlanId(null)
  }

  const addItemToPlan = (planId, item) => {
    setPlans(plans.map(p => {
      if (p.id !== planId) return p
      const existing = p.items.find(i => i.id === item.id)
      if (existing) return { ...p, items: p.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) }
      return { ...p, items: [...p.items, { ...item, quantity: 1 }] }
    }))
  }

  const updatePlanItemQty = (planId, itemId, qty) => {
    setPlans(plans.map(p => {
      if (p.id !== planId) return p
      if (qty <= 0) return { ...p, items: p.items.filter(i => i.id !== itemId) }
      return { ...p, items: p.items.map(i => i.id === itemId ? { ...i, quantity: qty } : i) }
    }))
  }

  const removePlanItem = (planId, itemId) => {
    setPlans(plans.map(p => p.id !== planId ? p : { ...p, items: p.items.filter(i => i.id !== itemId) }))
  }

  const sendPlanToCalculator = (plan) => {
    setCart(plan.items.map(i => ({ ...i, quantity: i.quantity })))
    setIngredients([])
    setShowPlanner(false)
    setShowCalculator(true)
  }

  const renamePlan = (id) => {
    const trimmed = editingName.trim()
    if (trimmed) setPlans(plans.map(p => p.id === id ? { ...p, name: trimmed } : p))
    setEditingPlanId(null)
  }

  const toggleExpand = (id) => setExpandedPlans(prev => ({ ...prev, [id]: !prev[id] }))

  const totalPlanItems = plans.reduce((sum, p) => sum + p.items.length, 0)

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 pt-20">

        {/* Header */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-emerald-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-400 flex items-center gap-2 sm:gap-3">
                <Hammer className="w-7 h-7 sm:w-10 sm:h-10" />
                <span className="leading-tight">Minecraft Craft Calculator</span>
              </h1>
              <p className="text-emerald-300/70 mt-2 text-sm sm:text-base">Click any item to see what you can craft with it</p>
            </div>

            <div className="flex gap-2 sm:gap-3">
              {/* Build Planner Button */}
              <button
                onClick={() => setShowPlanner(true)}
                className="relative bg-amber-600 hover:bg-amber-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
              >
                <BookMarked className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Build Planner</span>
                <span className="sm:hidden">Planner</span>
                {totalPlanItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {plans.length}
                  </span>
                )}
              </button>

              {/* Calculator Button */}
              <button
                onClick={() => setShowCalculator(true)}
                className="relative bg-emerald-600 hover:bg-emerald-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
              >
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Calculator</span>
                <span className="sm:hidden">Calc</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ═══ BUILD PLANNER MODAL ═══ */}
        {showPlanner && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6">
            <div className="bg-gradient-to-br from-amber-950 to-stone-900 rounded-xl border border-amber-500/30 max-w-xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">

              {/* Modal Header */}
              <div className="bg-black/40 p-4 sm:p-5 border-b border-amber-500/30 flex items-center justify-between">
                <h2 className="text-lg sm:text-2xl font-bold text-amber-400 flex items-center gap-2">
                  <BookMarked className="w-5 h-5 sm:w-6 sm:h-6" />
                  Build Planner
                  <span className="text-amber-400/50 text-sm font-normal ml-1">({plans.length} builds)</span>
                </h2>
                <button onClick={() => setShowPlanner(false)} className="p-2 hover:bg-red-500/20 rounded-lg transition">
                  <X className="w-5 h-5 text-red-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">

                {/* Create new plan */}
                <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-amber-500/20">
                  {!creatingPlan ? (
                    <button
                      onClick={() => setCreatingPlan(true)}
                      className="w-full flex items-center justify-center gap-2 text-amber-400 hover:text-amber-300 py-2 transition font-semibold text-sm sm:text-base"
                    >
                      <FolderPlus className="w-5 h-5" />
                      New Build Plan
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Build name (e.g. House, Farm, Castle...)"
                        value={newPlanName}
                        onChange={e => setNewPlanName(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") createPlan(); if (e.key === "Escape") setCreatingPlan(false) }}
                        className="flex-1 bg-black/40 text-white px-3 py-2 rounded-lg border border-amber-500/30 focus:border-amber-400 focus:outline-none text-sm placeholder-amber-300/30"
                      />
                      <button onClick={createPlan} className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold text-sm transition">
                        Create
                      </button>
                      <button onClick={() => setCreatingPlan(false)} className="text-red-400 hover:text-red-300 px-3 py-2">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Active Plan Selector */}
                {plans.length > 0 && (
                  <div className="bg-black/20 rounded-lg p-3 border border-amber-500/20">
                    <p className="text-amber-400/60 text-xs mb-2 uppercase tracking-wider">Add items to plan:</p>
                    <div className="flex flex-wrap gap-2">
                      {plans.map(p => (
                        <button
                          key={p.id}
                          onClick={() => setActivePlanId(activePlanId === p.id ? null : p.id)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition border ${
                            activePlanId === p.id
                              ? "bg-amber-500 text-white border-amber-400"
                              : "bg-black/30 text-amber-300/70 border-amber-500/20 hover:border-amber-400 hover:text-amber-300"
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                    {activePlanId && (
                      <p className="text-amber-300/50 text-xs mt-2">
                        ✓ Close this modal and click items — they'll be added to <span className="text-amber-400 font-semibold">{plans.find(p=>p.id===activePlanId)?.name}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Plans List */}
                {plans.length === 0 ? (
                  <div className="text-center py-10 sm:py-14">
                    <BookMarked className="w-12 h-12 text-amber-400/20 mx-auto mb-3" />
                    <p className="text-amber-300/40 text-sm">No build plans yet</p>
                    <p className="text-amber-300/25 text-xs mt-1">Create a plan and start adding items</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {plans.map(plan => (
                      <div key={plan.id} className="bg-black/30 rounded-lg border border-amber-500/20 overflow-hidden">

                        {/* Plan Header */}
                        <div
                          className="flex items-center gap-2 p-3 sm:p-4 cursor-pointer hover:bg-amber-500/5 transition"
                          onClick={() => toggleExpand(plan.id)}
                        >
                          {expandedPlans[plan.id]
                            ? <ChevronDown className="w-4 h-4 text-amber-400/60 flex-shrink-0" />
                            : <ChevronRight className="w-4 h-4 text-amber-400/60 flex-shrink-0" />
                          }

                          {editingPlanId === plan.id ? (
                            <input
                              autoFocus
                              value={editingName}
                              onChange={e => setEditingName(e.target.value)}
                              onKeyDown={e => { if (e.key === "Enter") renamePlan(plan.id); if (e.key === "Escape") setEditingPlanId(null) }}
                              onClick={e => e.stopPropagation()}
                              className="flex-1 bg-black/40 text-white px-2 py-0.5 rounded border border-amber-500/40 focus:outline-none text-sm"
                            />
                          ) : (
                            <span className="flex-1 font-semibold text-amber-300 text-sm sm:text-base truncate">{plan.name}</span>
                          )}

                          <span className="text-amber-400/50 text-xs flex-shrink-0 mr-2">{plan.items.length} items</span>

                          <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                            {editingPlanId === plan.id ? (
                              <button onClick={() => renamePlan(plan.id)} className="text-emerald-400 hover:text-emerald-300 p-1.5">
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button onClick={() => { setEditingPlanId(plan.id); setEditingName(plan.name) }} className="text-amber-400/50 hover:text-amber-300 p-1.5">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => sendPlanToCalculator(plan)}
                              disabled={plan.items.length === 0}
                              className="bg-emerald-600/80 hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                              title="Send to Calculator"
                            >
                              <Send className="w-3 h-3" />
                              <span className="hidden sm:inline">Calculate</span>
                            </button>
                            <button onClick={() => deletePlan(plan.id)} className="text-red-400/60 hover:text-red-400 p-1.5">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Plan Items */}
                        {expandedPlans[plan.id] && (
                          <div className="border-t border-amber-500/10 p-3 sm:p-4">
                            {plan.items.length === 0 ? (
                              <p className="text-amber-300/30 text-xs text-center py-3">
                                No items yet. Select this plan above and click items to add.
                              </p>
                            ) : (
                              <div className="space-y-2">
                                {plan.items.map(item => (
                                  <div key={item.id} className="flex items-center gap-2 sm:gap-3 bg-black/20 rounded-lg p-2">
                                    <img src={item.image} className="w-8 h-8 pixelated flex-shrink-0" alt={item.displayName} />
                                    <span className="flex-1 text-amber-200 text-sm truncate">{item.displayName}</span>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                      <button onClick={() => updatePlanItemQty(plan.id, item.id, item.quantity - 1)} className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-1 rounded">
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <QtyInput value={item.quantity} onChange={qty => updatePlanItemQty(plan.id, item.id, qty)} className="w-10 bg-black/40 text-white text-center px-1 py-0.5 rounded border border-amber-500/20 focus:outline-none text-xs" />
                                      <button onClick={() => updatePlanItemQty(plan.id, item.id, item.quantity + 1)} className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 p-1 rounded">
                                        <Plus className="w-3 h-3" />
                                      </button>
                                      <button onClick={() => removePlanItem(plan.id, item.id)} className="text-red-400/60 hover:text-red-400 p-1 ml-1">
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══ CALCULATOR MODAL ═══ */}
        {showCalculator && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6">
            <div className="bg-gradient-to-br from-emerald-900 to-teal-900 rounded-lg border border-emerald-500/30 max-w-4xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-hidden flex flex-col">
              <div className="bg-black/30 p-4 sm:p-6 border-b border-emerald-500/30 flex items-center justify-between">
                <h2 className="text-lg sm:text-2xl font-bold text-emerald-400 flex items-center gap-2">
                  <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
                  Material Calculator
                </h2>
                <button onClick={() => setShowCalculator(false)} className="p-2 hover:bg-red-500/20 rounded-lg transition">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-xl font-semibold text-emerald-400 flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                      Items to Craft ({cart.length})
                    </h3>
                    {cart.length > 0 && (
                      <button onClick={clearCart} className="text-red-400 hover:text-red-300 text-xs sm:text-sm flex items-center gap-1">
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" /> Clear All
                      </button>
                    )}
                  </div>

                  {cart.length === 0 ? (
                    <div className="bg-black/30 rounded-lg p-6 sm:p-8 text-center border border-emerald-500/20">
                      <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400/30 mx-auto mb-3" />
                      <p className="text-emerald-300/50 text-sm sm:text-base">No items added yet</p>
                      <p className="text-emerald-300/30 text-xs sm:text-sm mt-1">Close this and click items to add them</p>
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-3">
                      {cart.map(item => (
                        <div key={item.id} className="bg-black/30 rounded-lg p-3 sm:p-4 border border-emerald-500/20 flex items-center gap-2 sm:gap-4">
                          <img src={item.image} className="w-10 h-10 sm:w-12 sm:h-12 pixelated flex-shrink-0" alt={item.displayName} />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-emerald-400 font-semibold text-sm sm:text-base truncate">{item.displayName}</h4>
                            <p className="text-emerald-300/50 text-xs sm:text-sm truncate">{item.name}</p>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
                            <button onClick={() => updateCartQty(item.id, item.quantity - 1)} className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-1.5 sm:p-2 rounded">
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <QtyInput value={item.quantity} onChange={qty => updateCartQty(item.id, qty)} className="w-12 sm:w-16 bg-black/40 text-white text-center px-1 sm:px-2 py-1 rounded border border-emerald-500/30 focus:border-emerald-400 focus:outline-none text-sm" />
                            <button onClick={() => updateCartQty(item.id, item.quantity + 1)} className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 p-1.5 sm:p-2 rounded">
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 p-1.5 sm:p-2 flex-shrink-0">
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <button onClick={calculateIngredients} disabled={calculating} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                    {calculating ? (
                      <><div className="animate-spin w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"></div>Calculating...</>
                    ) : (
                      <><Calculator className="w-4 h-4 sm:w-5 sm:h-5" />Calculate Materials Needed</>
                    )}
                  </button>
                )}

                {ingredients.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-xl font-semibold text-emerald-400 mb-3 sm:mb-4 flex items-center gap-2">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                      Total Materials Needed
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                      {ingredients.map(ing => (
                        <div key={ing.id} className="bg-black/30 rounded-lg p-2 sm:p-3 border border-emerald-500/20 relative">
                          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold rounded-full px-2 py-1 shadow-lg border-2 border-emerald-900">
                            x{ing.count}
                          </div>
                          <img src={ing.image} className="w-full h-auto pixelated mb-1 sm:mb-2" alt={ing.displayName} />
                          <p className="text-emerald-300 text-xs sm:text-sm text-center font-semibold leading-tight line-clamp-2">{ing.displayName}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative max-w-md">
          <input
            className="w-full px-4 py-3 pl-12 bg-black/40 backdrop-blur-sm border border-emerald-500/30 rounded-lg text-white placeholder-emerald-300/50 focus:outline-none focus:border-emerald-400"
            placeholder="Search items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-emerald-400/50" />
        </div>

        {/* Active plan indicator */}
        {activePlanId && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2.5 flex items-center justify-between">
            <p className="text-amber-300 text-sm">
              <span className="text-amber-400/60">Adding to plan: </span>
              <span className="font-semibold">{plans.find(p => p.id === activePlanId)?.name}</span>
              <span className="text-amber-400/60 ml-2">— hover items and click <span className="text-amber-300">＋</span> to add</span>
            </p>
            <button onClick={() => setActivePlanId(null)} className="text-amber-400/50 hover:text-amber-300 text-xs">
              Stop
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_400px] gap-4 sm:gap-6">

          {/* Items Grid */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-emerald-500/30">
            <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-3 sm:mb-2 flex items-center gap-2">
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
              All Items ({filtered.length})
            </h2>

            <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-2 sm:gap-3 max-h-[400px] sm:max-h-[600px] overflow-y-auto py-5 pr-1 sm:pr-2">
              {filtered.map(item => (
                <div
                  key={item.id}
                  className={`
                    bg-black/40 hover:bg-emerald-500/20 border border-emerald-500/20 
                    hover:border-emerald-400 rounded-lg p-2 sm:p-3 cursor-pointer 
                    transition-all hover:scale-105 group relative
                    ${selected?.id === item.id ? 'ring-2 ring-emerald-400 bg-emerald-500/20' : ''}
                  `}
                  title={item.displayName}
                >
                  {/* Add buttons (on hover) */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-0.5 z-10">
                    {/* Add to calculator */}
                    <button
                      onClick={e => { e.stopPropagation(); addToCart(item) }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white p-1 sm:p-1.5 rounded-full shadow-lg"
                      title="Add to calculator"
                    >
                      <Calculator className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </button>
                    {/* Add to active plan */}
                    {activePlanId && (
                      <button
                        onClick={e => { e.stopPropagation(); addItemToPlan(activePlanId, item) }}
                        className="bg-amber-600 hover:bg-amber-500 text-white p-1 sm:p-1.5 rounded-full shadow-lg"
                        title={`Add to ${plans.find(p => p.id === activePlanId)?.name}`}
                      >
                        <BookMarked className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    )}
                  </div>

                  <div onClick={() => openItem(item)}>
                    <img src={item.image} alt={item.name} className="w-full h-auto pixelated" />
                    <p className="text-[9px] sm:text-[10px] text-center text-emerald-300/80 mt-1 leading-tight line-clamp-2">
                      {item.displayName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-emerald-500/30 h-fit lg:sticky lg:top-6">
            {!selected && (
              <div className="text-center py-8 sm:py-12">
                <Hammer className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-400/30 mx-auto mb-4" />
                <p className="text-emerald-300/50 text-sm sm:text-base">Select an item to see crafting recipes</p>
              </div>
            )}

            {selected && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <img src={selected.image} className="w-12 h-12 sm:w-16 sm:h-16 pixelated flex-shrink-0" alt={selected.displayName} />
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-xl font-bold text-emerald-400 truncate">{selected.displayName}</h2>
                      <p className="text-xs sm:text-sm text-emerald-300/50 truncate">{selected.name}</p>
                    </div>
                  </div>
                  <button onClick={() => { setSelected(null); setUses([]) }} className="p-1.5 sm:p-2 hover:bg-red-500/20 rounded-lg transition flex-shrink-0">
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  </button>
                </div>

                <div className="h-px bg-emerald-500/30 my-3 sm:my-4"></div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                    <Hammer className="w-4 h-4 sm:w-5 sm:h-5" />
                    Can Craft
                  </h3>

                  {loading && (
                    <div className="text-center py-6 sm:py-8">
                      <div className="animate-spin w-6 h-6 sm:w-8 sm:h-8 border-2 border-emerald-400 border-t-transparent rounded-full mx-auto"></div>
                      <p className="text-emerald-300/50 mt-2 text-sm">Loading recipes...</p>
                    </div>
                  )}
                  {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4 text-red-400 text-xs sm:text-sm">{error}</div>}
                  {!loading && !error && uses.length === 0 && (
                    <div className="text-center py-6 sm:py-8">
                      <p className="text-emerald-300/50 text-sm">No crafting recipes found</p>
                    </div>
                  )}
                  {!loading && !error && uses.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-h-[300px] sm:max-h-[400px] overflow-y-auto py-2 pr-1 sm:pr-2">
                      {uses.map((item, idx) => (
                        <div
                          key={`${item.id}-${idx}`}
                          className="bg-black/40 border border-emerald-500/20 hover:border-emerald-400 rounded-lg p-2 sm:p-3 cursor-pointer hover:scale-105 transition-all relative"
                          onClick={() => openItem(item)}
                        >
                          {item.count && item.count > 1 && (
                            <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-emerald-500 text-white text-[10px] sm:text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shadow-lg border-2 border-emerald-900">
                              {item.count}
                            </div>
                          )}
                          <img src={item.image} className="w-full h-auto pixelated" alt={item.displayName} />
                          <p className="text-[9px] sm:text-[10px] text-center text-emerald-300/80 mt-1 sm:mt-2 leading-tight line-clamp-2">{item.displayName}</p>
                          {item.count && <p className="text-[8px] sm:text-[9px] text-center text-emerald-400 font-semibold mt-0.5 sm:mt-1">x{item.count}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
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