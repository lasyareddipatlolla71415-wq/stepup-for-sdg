"use client"

import { memo, useCallback, useEffect, useRef, useState, type MouseEvent } from "react"
// @ts-ignore
import { IndiaMap } from "@vishalvoid/react-india-map"
import { Reveal } from "@/app/components/reveal"
import { useTheme } from "@/app/components/ThemeProvider"
import { stateImpactData, type Impact } from "@/app/data/stateData"

type TooltipInfo = { name: string; impact: Impact | null }

const impactFields = [
  { key: "schools", label: "Partner Schools", icon: "🏫" },
  { key: "students", label: "Impacted Students", icon: "👨‍🎓" },
  { key: "ngos", label: "NGO Network", icon: "🤝" },
  { key: "projects", label: "Active Projects", icon: "📋" },
] as const

function formatImpactValue(value: string | number) {
  return typeof value === "number" ? value.toLocaleString("en-IN") : value
}

const normalizeStateName = (name: string): string => {
  const customMap: Record<string, string> = {
    "in-ap": "Andhra Pradesh", "in-ar": "Arunachal Pradesh", "in-as": "Assam",
    "in-br": "Bihar", "in-ct": "Chhattisgarh", "in-ga": "Goa", "in-gj": "Gujarat",
    "in-hr": "Haryana", "in-hp": "Himachal Pradesh", "in-jk": "Jammu & Kashmir",
    "in-jh": "Jharkhand", "in-ka": "Karnataka", "in-kl": "Kerala", "in-mp": "Madhya Pradesh",
    "in-mh": "Maharashtra", "in-mn": "Manipur", "in-ml": "Meghalaya", "in-mz": "Mizoram",
    "in-nl": "Nagaland", "in-or": "Odisha", "in-pb": "Punjab", "in-rj": "Rajasthan",
    "in-sk": "Sikkim", "in-tn": "Tamil Nadu", "in-tg": "Telangana", "in-tr": "Tripura",
    "in-up": "Uttar Pradesh", "in-ut": "Uttarakhand", "in-wb": "West Bengal",
    "in-an": "Andaman & Nicobar", "in-ch": "Chandigarh", "in-dn": "Dadra & Nagar Haveli",
    "in-dd": "Daman & Diu", "in-dl": "Delhi", "in-ld": "Lakshadweep",
    "in-py": "Puducherry", "in-la": "Ladakh"
  }
  const cleanKey = name.toLowerCase().trim()
  return customMap[cleanKey] || name
}

export function LiveImpactMap() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const tooltipFrameRef = useRef<number | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null)
  const [pinned, setPinned] = useState<{ name: string; info: TooltipInfo } | null>(null)

  const moveTooltipToPointer = useCallback(() => {
    const tooltipEl = tooltipRef.current
    if (!tooltipEl) return

    const offset = 22 
    const gap = 12
    const width = tooltipEl.offsetWidth || 260
    const height = tooltipEl.offsetHeight || 190
    const { x, y } = pointerRef.current
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const left = x + offset + width > viewportWidth - gap ? x - width - offset : x + offset
    const top = y + offset + height > viewportHeight - gap ? y - height - offset : y + offset

    tooltipEl.style.left = `${Math.max(gap, Math.min(left, viewportWidth - width - gap))}px`
    tooltipEl.style.top = `${Math.max(gap, Math.min(top, viewportHeight - height - gap))}px`
  }, [])

  const scheduleTooltipMove = useCallback(
    (clientX: number, clientY: number) => {
      pointerRef.current = { x: clientX, y: clientY }
      if (tooltipFrameRef.current !== null) return
      tooltipFrameRef.current = window.requestAnimationFrame(() => {
        tooltipFrameRef.current = null
        moveTooltipToPointer()
      })
    },
    [moveTooltipToPointer]
  )

  useEffect(() => {
    const clearOnScroll = () => {
      setTooltipInfo(null)
    }
    window.addEventListener("scroll", clearOnScroll, { passive: true })
    return () => window.removeEventListener("scroll", clearOnScroll)
  }, [])
  useEffect(() => {
    const container = mapContainerRef.current
    if (!container) return

    let currentScale = 1.0
    let targetScale = 1.0
    let activePath: SVGPathElement | null = null
    let animationFrameId: number | null = null
    let cX = 0
    let cY = 0

    const animatePopOut = () => {
      if (!activePath) return

      currentScale += (targetScale - currentScale) * 0.22

      if (Math.abs(targetScale - currentScale) > 0.001) {
        activePath.setAttribute("transform", `matrix(${currentScale} 0 0 ${currentScale} ${-(currentScale - 1) * cX} ${-(currentScale - 1) * cY})`)
        activePath.style.filter = `drop-shadow(0px ${6 + (currentScale - 1) * 120}px ${12 + (currentScale - 1) * 180}px ${isDark ? "rgba(59,130,246,0.5)" : "rgba(15,23,42,0.15)"})`
        animationFrameId = window.requestAnimationFrame(animatePopOut)
      } else {
        currentScale = targetScale
        if (currentScale === 1.0) {
          activePath.removeAttribute("transform")
          activePath.style.filter = "none"
          activePath = null
        } else {
          activePath.setAttribute("transform", `matrix(${currentScale} 0 0 ${currentScale} ${-(currentScale - 1) * cX} ${-(currentScale - 1) * cY})`)
        }
        animationFrameId = null
      }
    }

    const STATE_COLORS = [
      "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
      "#06b6d4", "#f97316", "#ec4899", "#14b8a6", "#84cc16"
    ]

    const handleMouseOver = (e: globalThis.MouseEvent) => {
      const target = e.target as SVGPathElement
      if (target && target.tagName === "path") {
        if (animationFrameId) window.cancelAnimationFrame(animationFrameId)

        if (activePath && activePath !== target) {
          activePath.removeAttribute("transform")
          activePath.style.filter = "none"
          activePath.style.fill = ""
        }

        activePath = target
        targetScale = 1.08

        // pick a color based on the element's index among siblings
        const siblings = Array.from(target.parentNode?.children || [])
        const idx = siblings.indexOf(target)
        const color = STATE_COLORS[idx % STATE_COLORS.length]
        target.style.fill = color
        target.style.stroke = "#ffffff"
        target.style.strokeWidth = "2px"

        const parent = target.parentNode
        if (parent) parent.appendChild(target)

        const bbox = target.getBBox()
        cX = bbox.x + bbox.width / 2
        cY = bbox.y + bbox.height / 2

        animationFrameId = window.requestAnimationFrame(animatePopOut)

        const rawName = target.getAttribute("id") || target.getAttribute("data-name") || target.className?.baseVal || ""
        if (rawName) {
          const stateName = normalizeStateName(rawName)
          const impact = stateImpactData[stateName] || null
          if (impact) {
            setTooltipInfo({ name: stateName, impact })
            scheduleTooltipMove(e.clientX, e.clientY)
          } else {
            setTooltipInfo(null)
          }
        }
      }
    }

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const target = e.target as SVGPathElement
      if (target && target.tagName === "path") {
        scheduleTooltipMove(e.clientX, e.clientY)
      }
    }

    const handleMouseOut = (e: globalThis.MouseEvent) => {
      const target = e.target as SVGPathElement
      if (target && target.tagName === "path") {
        if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
        
        targetScale = 1.0
        target.style.fill = ""
        target.style.stroke = ""
        target.style.strokeWidth = ""
        animationFrameId = window.requestAnimationFrame(animatePopOut)

        if (tooltipFrameRef.current !== null) {
          window.cancelAnimationFrame(tooltipFrameRef.current)
          tooltipFrameRef.current = null
        }
        setTooltipInfo(null)
      }
    }

    const handleElementClick = (e: globalThis.MouseEvent) => {
      const target = e.target as SVGPathElement
      if (target && target.tagName === "path") {
        const rawName = target.getAttribute("id") || target.getAttribute("data-name") || target.className?.baseVal || ""
        if (rawName) {
          const stateName = normalizeStateName(rawName)
          const impact = stateImpactData[stateName] || null
          const info = { name: stateName, impact }
          setPinned((current) => (current?.name === stateName ? null : { name: stateName, info }))
        }
      }
    }

    const handleMouseLeave = () => {
      setTooltipInfo(null)
      if (tooltipFrameRef.current !== null) {
        window.cancelAnimationFrame(tooltipFrameRef.current)
        tooltipFrameRef.current = null
      }
    }

    container.addEventListener("mouseover", handleMouseOver)
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseout", handleMouseOut)
    container.addEventListener("mouseleave", handleMouseLeave)
    container.addEventListener("click", handleElementClick)

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
      container.removeEventListener("mouseover", handleMouseOver)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseout", handleMouseOut)
      container.removeEventListener("mouseleave", handleMouseLeave)
      container.removeEventListener("click", handleElementClick)
    }
  }, [scheduleTooltipMove, isDark])

  const activeInfo = tooltipInfo

  return (
    <div className="relative w-full max-w-6xl mx-auto p-4">
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-india-map {
          width: 100% !important;
          max-width: 460px !important; 
          margin: 0 auto !important;
          display: block !important;
        }
        .custom-india-map svg {
          overflow: visible !important;
        }
        .custom-india-map svg path {
          fill: ${isDark ? "#1e293b" : "#f8fafc"};
          stroke: #475569;
          stroke-width: 1.5px !important;
          cursor: pointer !important;
          pointer-events: auto !important;
          paint-order: stroke fill !important;
          transition: fill 0.25s ease, stroke 0.25s ease, stroke-width 0.25s ease !important;
        }
      `}} />

      <Reveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Our Live Impact Map
          </h2>
        </div>
      </Reveal>

      <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 px-12 md:px-24 py-10 shadow-xl flex justify-center items-center min-h-[550px]">
        <div ref={mapContainerRef} className="w-full custom-india-map">
          <IndiaMap />
        </div>

        {activeInfo?.impact && (
          <div
            ref={tooltipRef}
            className="fixed pointer-events-none z-50 min-w-[240px] rounded-2xl bg-slate-950/95 p-5 text-white shadow-2xl backdrop-blur-md border border-slate-800 animate-fadeIn"
            style={{ position: "fixed", left: 0, top: 0 }}
          >
            {/* CLEAN CORPORATE TITLE BAR: Centered state indicator with no secondary labels */}
            <div className="text-center text-blue-400 font-bold tracking-wider text-xs uppercase mb-3.5 border-b border-slate-800 pb-2.5">
              {activeInfo.name}
            </div>

            {activeInfo.impact ? (
              <div className="space-y-3">
                {impactFields.map(({ key, label, icon }) => (
                  <div key={key} className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2.5">
                      <span className="text-base select-none">{icon}</span> 
                      <span className="text-slate-400 font-medium">{label}</span>
                    </span>
                    <span className="font-bold text-white tracking-wide text-sm font-mono">
                      {formatImpactValue(activeInfo.impact![key as keyof Impact])}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic py-1 text-center">No operational metrics recorded</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default LiveImpactMap;