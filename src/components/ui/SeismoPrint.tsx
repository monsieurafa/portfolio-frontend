"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Camera, Download, FileImage, RefreshCw, Sparkles } from "lucide-react"

type Prediction = {
  isEvent: number
  magnitude: number | null
  pArrival: number | null
}

type SeismoPrintProps = {
  ch1: number[]
  ch2: number[]
  ch3: number[]
  stationId: string | null
  prediction: Prediction | null
  capturedAt: Date | null
}

type PosterSnapshot = {
  channels: [number[], number[], number[]]
  stationId: string
  prediction: Prediction | null
  capturedAt: Date
}

const themes = {
  field: {
    name: "Field note",
    background: "#f3f0e8",
    foreground: "#181818",
    muted: "#6f6a60",
    accent: "#ff6846",
    signal: ["#dc4c32", "#1685d1", "#5c9414"],
  },
  night: {
    name: "Night signal",
    background: "#111111",
    foreground: "#f7f4eb",
    muted: "#aaa59a",
    accent: "#b8f34a",
    signal: ["#ff795b", "#8ed8f8", "#b8f34a"],
  },
  ocean: {
    name: "Ocean survey",
    background: "#dff3f9",
    foreground: "#102b3a",
    muted: "#526e7a",
    accent: "#176f91",
    signal: ["#e0523b", "#176f91", "#669b45"],
  },
} as const

type ThemeKey = keyof typeof themes

const gridLines = Array.from({ length: 12 }, (_, index) => index)
const channelLabels = ["BHE / EAST", "BHN / NORTH", "BHZ / VERTICAL"]

const makeSignalPath = (values: number[], baseline: number) => {
  if (!values.length) return ""

  const stride = Math.max(1, Math.floor(values.length / 260))
  const samples = values.filter((_, index) => index % stride === 0)
  const mean = samples.reduce((sum, value) => sum + value, 0) / samples.length
  const maximumDelta = Math.max(...samples.map((value) => Math.abs(value - mean)), 1)

  return samples
    .map((value, index) => {
      const x = 88 + (index / Math.max(samples.length - 1, 1)) * 904
      const y = baseline - ((value - mean) / maximumDelta) * 92
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
}

const safeFilePart = (value: string) => value.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase()

export default function SeismoPrint({ ch1, ch2, ch3, stationId, prediction, capturedAt }: SeismoPrintProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [themeKey, setThemeKey] = useState<ThemeKey>("field")
  const [snapshot, setSnapshot] = useState<PosterSnapshot | null>(null)
  const theme = themes[themeKey]

  useEffect(() => {
    if (snapshot || ch1.length === 0) return

    setSnapshot({
      channels: [[...ch1], [...ch2], [...ch3]],
      stationId: stationId ?? "II.KAPI",
      prediction,
      capturedAt: capturedAt ?? new Date(),
    })
  }, [capturedAt, ch1, ch2, ch3, prediction, snapshot, stationId])

  const captureLatest = () => {
    if (!ch1.length) return

    setSnapshot({
      channels: [[...ch1], [...ch2], [...ch3]],
      stationId: stationId ?? "II.KAPI",
      prediction,
      capturedAt: capturedAt ?? new Date(),
    })
  }

  const paths = useMemo(
    () => snapshot?.channels.map((channel, index) => makeSignalPath(channel, 540 + index * 245)) ?? ["", "", ""],
    [snapshot],
  )

  const posterDate = snapshot?.capturedAt.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).toUpperCase() ?? "AWAITING SIGNAL"
  const posterTime = snapshot?.capturedAt.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }) ?? "--:--:--"
  const eventLabel = snapshot?.prediction
    ? snapshot.prediction.isEvent === 1
      ? "EVENT DETECTED"
      : "NO EVENT DETECTED"
    : "AWAITING INFERENCE"
  const magnitudeLabel = snapshot?.prediction?.magnitude != null
    ? snapshot.prediction.magnitude.toFixed(2)
    : "—"
  const arrivalLabel = snapshot?.prediction?.pArrival != null
    ? String(snapshot.prediction.pArrival)
    : "—"

  const serializePoster = () => {
    if (!svgRef.current || !snapshot) return null

    const clone = svgRef.current.cloneNode(true) as SVGSVGElement
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    clone.setAttribute("width", "1080")
    clone.setAttribute("height", "1350")
    return new XMLSerializer().serializeToString(clone)
  }

  const fileName = () => {
    const station = safeFilePart(snapshot?.stationId ?? "seismic-signal")
    const date = snapshot?.capturedAt.toISOString().slice(0, 10) ?? "live"
    return `seismoprint-${station}-${date}`
  }

  const downloadSvg = () => {
    const markup = serializePoster()
    if (!markup) return

    const blob = new Blob([markup], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `${fileName()}.svg`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const downloadPng = () => {
    const markup = serializePoster()
    if (!markup) return

    const svgBlob = new Blob([markup], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)
    const image = new Image()

    image.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = 1080
      canvas.height = 1350
      const context = canvas.getContext("2d")
      if (!context) return

      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => {
        if (!blob) return
        const pngUrl = URL.createObjectURL(blob)
        const anchor = document.createElement("a")
        anchor.href = pngUrl
        anchor.download = `${fileName()}.png`
        anchor.click()
        URL.revokeObjectURL(pngUrl)
      }, "image/png")
      URL.revokeObjectURL(url)
    }

    image.src = url
  }

  const hasSignal = ch1.length > 0

  return (
    <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
      <div className="border-2 border-[#181818] bg-[#ffd34e] p-5 shadow-[8px_8px_0_#181818] sm:p-7 lg:sticky lg:top-24">
        <div className="flex items-center gap-3 border-b-2 border-[#181818] pb-5">
          <Sparkles className="h-6 w-6" />
          <h3 className="text-2xl font-black tracking-[-0.035em]">Poster controls</h3>
        </div>

        <div className="py-6">
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.16em]">Color system</p>
          <div className="mt-4 grid gap-3">
            {(Object.keys(themes) as ThemeKey[]).map((key) => {
              const option = themes[key]
              const active = themeKey === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setThemeKey(key)}
                  className={`flex items-center justify-between border-2 border-[#181818] px-4 py-3 text-left font-bold transition-transform hover:-translate-y-0.5 ${active ? "bg-[#181818] text-white" : "bg-[#f3f0e8]"}`}
                  aria-pressed={active}
                >
                  <span>{option.name}</span>
                  <span className="flex gap-1.5">
                    {option.signal.map((color) => (
                      <span key={color} className="h-3 w-3 rounded-full border border-current" style={{ backgroundColor: color }} />
                    ))}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="border-t-2 border-[#181818] py-6">
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.16em]">Captured window</p>
          <dl className="mt-4 grid grid-cols-2 gap-px border border-[#181818] bg-[#181818] font-mono text-[10px] uppercase tracking-[0.12em]">
            <div className="bg-[#f3f0e8] p-3">
              <dt className="text-[#6f6a60]">Station</dt>
              <dd className="mt-1 font-black text-[#181818]">{snapshot?.stationId ?? "—"}</dd>
            </div>
            <div className="bg-[#f3f0e8] p-3">
              <dt className="text-[#6f6a60]">Samples</dt>
              <dd className="mt-1 font-black text-[#181818]">{snapshot?.channels[0].length ?? 0}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={captureLatest}
            disabled={!hasSignal}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 border-2 border-[#181818] bg-[#ff6846] px-4 py-3 font-mono text-xs font-black uppercase tracking-[0.12em] transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {snapshot ? <RefreshCw className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
            {snapshot ? "Capture latest window" : "Waiting for live signal"}
          </button>
        </div>

        <div className="grid gap-3 border-t-2 border-[#181818] pt-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <button
            type="button"
            onClick={downloadSvg}
            disabled={!snapshot}
            className="inline-flex items-center justify-center gap-2 border-2 border-[#181818] bg-[#f3f0e8] px-4 py-3 font-mono text-xs font-black uppercase tracking-[0.1em] transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Download className="h-4 w-4" /> SVG
          </button>
          <button
            type="button"
            onClick={downloadPng}
            disabled={!snapshot}
            className="inline-flex items-center justify-center gap-2 border-2 border-[#181818] bg-[#181818] px-4 py-3 font-mono text-xs font-black uppercase tracking-[0.1em] text-white transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <FileImage className="h-4 w-4" /> PNG
          </button>
        </div>
      </div>

      <div className="border-2 border-[#181818] bg-[#181818] p-3 shadow-[10px_10px_0_#181818] sm:p-5">
        <div className="mb-3 flex items-center justify-between px-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/65 sm:text-xs">
          <span>Live poster preview</span>
          <span>1080 × 1350</span>
        </div>
        <svg
          ref={svgRef}
          viewBox="0 0 1080 1350"
          role="img"
          aria-label="Generated poster from a captured seismic waveform"
          className="block h-auto w-full"
          style={{ backgroundColor: theme.background }}
        >
          <rect width="1080" height="1350" fill={theme.background} />

          <g opacity="0.13" stroke={theme.foreground} strokeWidth="1">
            {gridLines.map((line) => (
              <line key={`vertical-${line}`} x1={line * 90} x2={line * 90} y1="0" y2="1350" />
            ))}
            {Array.from({ length: 15 }, (_, line) => (
              <line key={`horizontal-${line}`} x1="0" x2="1080" y1={line * 90} y2={line * 90} />
            ))}
          </g>

          <rect x="48" y="48" width="984" height="1254" fill="none" stroke={theme.foreground} strokeWidth="3" />
          <rect x="48" y="48" width="984" height="58" fill={theme.foreground} />
          <text x="76" y="86" fill={theme.background} fontFamily="monospace" fontSize="18" fontWeight="700" letterSpacing="4">
            SEISMOPRINT / LIVE EARTH DATA
          </text>
          <text x="1004" y="86" textAnchor="end" fill={theme.background} fontFamily="monospace" fontSize="18" fontWeight="700">
            001
          </text>

          <text x="76" y="176" fill={theme.muted} fontFamily="monospace" fontSize="18" fontWeight="700" letterSpacing="4">
            STATION {snapshot?.stationId ?? "AWAITING SIGNAL"}
          </text>
          <text x="76" y="273" fill={theme.foreground} fontFamily="Arial, sans-serif" fontSize="104" fontWeight="900" letterSpacing="-7">
            EARTH
          </text>
          <text x="76" y="361" fill={theme.accent} fontFamily="Arial, sans-serif" fontSize="104" fontWeight="900" letterSpacing="-7">
            IN MOTION.
          </text>
          <text x="1004" y="273" textAnchor="end" fill={theme.foreground} fontFamily="monospace" fontSize="18" fontWeight="700">
            {posterDate}
          </text>
          <text x="1004" y="304" textAnchor="end" fill={theme.foreground} fontFamily="monospace" fontSize="18" fontWeight="700">
            {posterTime} WIB
          </text>

          <line x1="76" x2="1004" y1="410" y2="410" stroke={theme.foreground} strokeWidth="3" />

          <g clipPath="url(#signal-area)">
            {paths.map((path, index) => (
              <g key={channelLabels[index]}>
                <line x1="76" x2="1004" y1={540 + index * 245} y2={540 + index * 245} stroke={theme.foreground} strokeOpacity="0.18" strokeDasharray="8 12" />
                <path d={path} fill="none" stroke={theme.signal[index]} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ))}
          </g>
          <defs>
            <clipPath id="signal-area">
              <rect x="76" y="425" width="928" height="820" />
            </clipPath>
          </defs>

          {channelLabels.map((label, index) => (
            <g key={label}>
              <rect x="76" y={438 + index * 245} width="168" height="38" fill={theme.signal[index]} />
              <text x="91" y={464 + index * 245} fill={theme.background} fontFamily="monospace" fontSize="16" fontWeight="700" letterSpacing="2">
                {label}
              </text>
            </g>
          ))}

          {!snapshot && (
            <g>
              <rect x="76" y="505" width="928" height="610" fill={theme.background} stroke={theme.foreground} strokeWidth="3" />
              <text x="540" y="790" textAnchor="middle" fill={theme.foreground} fontFamily="Arial, sans-serif" fontSize="50" fontWeight="900">
                LISTENING FOR DATA
              </text>
              <text x="540" y="840" textAnchor="middle" fill={theme.muted} fontFamily="monospace" fontSize="18" letterSpacing="3">
                THE POSTER WILL CAPTURE THE FIRST LIVE WINDOW
              </text>
            </g>
          )}

          <rect x="48" y="1168" width="984" height="134" fill={theme.foreground} />
          <text x="76" y="1211" fill={theme.background} fontFamily="monospace" fontSize="14" fontWeight="700" letterSpacing="2">
            MODEL STATUS
          </text>
          <text x="76" y="1258" fill={theme.accent} fontFamily="Arial, sans-serif" fontSize="31" fontWeight="900">
            {eventLabel}
          </text>
          <text x="620" y="1211" fill={theme.background} fontFamily="monospace" fontSize="14" fontWeight="700" letterSpacing="2">
            MAGNITUDE PROXY
          </text>
          <text x="620" y="1260" fill={theme.background} fontFamily="Arial, sans-serif" fontSize="42" fontWeight="900">
            {magnitudeLabel}
          </text>
          <text x="820" y="1211" fill={theme.background} fontFamily="monospace" fontSize="14" fontWeight="700" letterSpacing="2">
            P ARRIVAL
          </text>
          <text x="820" y="1260" fill={theme.background} fontFamily="Arial, sans-serif" fontSize="42" fontWeight="900">
            {arrivalLabel}
          </text>
        </svg>
      </div>
    </div>
  )
}
