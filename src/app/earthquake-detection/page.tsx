"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Database,
  MapPin,
  Radio,
  Server,
  Zap,
} from "lucide-react"
import RealtimeChart from "@/components/ui/RealtimeChart"

type Prediction = {
  isEvent: number
  magnitude: number | null
  pArrival: number | null
}

type ConnectionState = "connecting" | "waiting" | "live"

const EVENTS_URL = `${(process.env.NEXT_PUBLIC_SEISMIC_API_URL ?? "https://rafamaritza-eews-creime-monitor.hf.space").replace(/\/$/, "")}/events`

const connectionCopy: Record<ConnectionState, { label: string; detail: string; tone: string }> = {
  connecting: {
    label: "Connecting",
    detail: "Waking the inference service",
    tone: "bg-[#ffd34e]",
  },
  waiting: {
    label: "Stream open",
    detail: "Waiting for the next data window",
    tone: "bg-[#8ed8f8]",
  },
  live: {
    label: "Receiving live data",
    detail: "SSE stream is active",
    tone: "bg-[#b8f34a]",
  },
}

export default function EarthquakeDetection() {
  const [ch1, setCh1] = useState<number[]>([])
  const [ch2, setCh2] = useState<number[]>([])
  const [ch3, setCh3] = useState<number[]>([])
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [connectionState, setConnectionState] = useState<ConnectionState>("connecting")
  const [stationId, setStationId] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    const source = new EventSource(EVENTS_URL)

    source.onopen = () => setConnectionState("waiting")
    source.onerror = () => setConnectionState("connecting")
    source.addEventListener("status", (event) => {
      const status = JSON.parse(event.data) as { receiving_data: boolean }
      setConnectionState(status.receiving_data ? "live" : "waiting")
    })
    source.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.type !== "new_data_window") return

      const data = message.data
      setConnectionState("live")
      setCh1(data.ch1)
      setCh2(data.ch2)
      setCh3(data.ch3)
      setStationId(data.station_id)
      setLastUpdate(new Date())
      setPrediction({
        isEvent: data.prediction[0],
        magnitude: data.prediction[1],
        pArrival: data.prediction[2],
      })
    }

    return () => source.close()
  }, [])

  const connection = connectionCopy[connectionState]
  const hasEvent = prediction?.isEvent === 1

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#181818] selection:bg-[#ff6846] selection:text-[#181818]">
      <nav className="sticky top-0 z-50 border-b-2 border-[#181818] bg-[#f3f0e8]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="group inline-flex items-center gap-3 font-mono text-xs font-black uppercase tracking-[0.16em] sm:text-sm">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Rafa Maritza
          </Link>
          <span className="hidden font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#5d5951] sm:block">
            Thesis project · 2025
          </span>
          <a
            href="https://github.com/monsieurafa"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 border-2 border-[#181818] bg-[#181818] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </nav>

      <section className="border-b-2 border-[#181818]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden border-[#181818] bg-[#ff6846] px-5 py-14 sm:px-8 sm:py-20 lg:border-r-2 lg:px-12 lg:py-24">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "linear-gradient(#181818 1px, transparent 1px), linear-gradient(90deg, #181818 1px, transparent 1px)",
                backgroundSize: "38px 38px",
              }}
            />
            <div className="relative">
              <div className="mb-10 flex flex-wrap gap-3 font-mono text-xs font-black uppercase tracking-[0.16em]">
                <span className="border-2 border-[#181818] bg-[#f3f0e8] px-3 py-2">CREIME neural network</span>
                <span className="inline-flex items-center gap-2 border-2 border-[#181818] bg-[#ffd34e] px-3 py-2">
                  <MapPin className="h-3.5 w-3.5" /> Sulawesi, Indonesia
                </span>
              </div>
              <p className="mb-5 font-mono text-sm font-black uppercase tracking-[0.18em]">Live research demonstration</p>
              <h1 className="max-w-5xl text-[clamp(4rem,9.5vw,8.5rem)] font-black leading-[0.82] tracking-[-0.075em]">
                Reading
                <span className="block">the earth.</span>
              </h1>
              <p className="mt-10 max-w-2xl text-lg font-medium leading-relaxed sm:text-xl">
                Live three-channel waveform data meets a neural network trained to identify earthquake events and estimate their timing.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-[#181818] p-5 text-white sm:p-8 lg:p-12">
            <div className="flex items-center justify-between border-b border-white/25 pb-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/65">
              <span>System monitor</span>
              <Radio className={`h-5 w-5 ${connectionState === "live" ? "animate-pulse text-[#b8f34a]" : "text-[#ffd34e]"}`} />
            </div>

            <div className="py-14 lg:py-20">
              <div className={`mb-8 inline-flex items-center gap-3 border-2 border-white px-4 py-3 text-[#181818] ${connection.tone}`}>
                <span className="relative flex h-3 w-3">
                  {connectionState === "live" && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#181818] opacity-50" />}
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#181818]" />
                </span>
                <span className="font-mono text-xs font-black uppercase tracking-[0.14em]">{connection.label}</span>
              </div>
              <p className="text-3xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">{connection.detail}</p>
              <p className="mt-5 max-w-md leading-relaxed text-white/65">
                The free backend can take about a minute to wake. This page reconnects automatically and begins drawing when the first window arrives.
              </p>
            </div>

            <dl className="grid grid-cols-2 border-l border-t border-white/25">
              <div className="border-b border-r border-white/25 p-4">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">Station</dt>
                <dd className="mt-2 font-mono text-sm font-black text-[#8ed8f8]">{stationId ?? "DISCOVERING"}</dd>
              </div>
              <div className="border-b border-r border-white/25 p-4">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">Transport</dt>
                <dd className="mt-2 font-mono text-sm font-black text-[#b8f34a]">SERVER-SENT EVENTS</dd>
              </div>
              <div className="col-span-2 border-b border-r border-white/25 p-4">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">Last data window</dt>
                <dd className="mt-2 font-mono text-sm font-black">
                  {lastUpdate ? lastUpdate.toLocaleTimeString() : "WAITING FOR FIRST WINDOW"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[#181818] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 font-mono text-xs font-black uppercase tracking-[0.2em] text-[#d9492f]">01 / Live waveform</p>
              <h2 className="text-5xl font-black tracking-[-0.055em] sm:text-7xl">Signal in motion.</h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-[#5d5951] sm:text-lg">
              East, north, and vertical components from station {stationId ?? "II.KAPI"}, rendered as each new analysis window arrives.
            </p>
          </div>

          <div className="border-2 border-[#181818] bg-white shadow-[10px_10px_0_#181818]">
            <div className="flex flex-col gap-4 border-b-2 border-[#181818] bg-[#8ed8f8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5" />
                <span className="font-mono text-xs font-black uppercase tracking-[0.14em]">Three-channel seismogram</span>
              </div>
              <div className="flex gap-4 font-mono text-[10px] font-black uppercase tracking-[0.12em] sm:text-xs">
                <span className="before:mr-2 before:inline-block before:h-2 before:w-2 before:bg-[#ff6846]">BHE</span>
                <span className="before:mr-2 before:inline-block before:h-2 before:w-2 before:bg-[#1685d1]">BHN</span>
                <span className="before:mr-2 before:inline-block before:h-2 before:w-2 before:bg-[#5c9414]">BHZ</span>
              </div>
            </div>
            <div className="p-3 sm:p-6 lg:p-8">
              {ch1.length > 0 ? (
                <RealtimeChart ch1={ch1} ch2={ch2} ch3={ch3} />
              ) : (
                <div className="relative grid min-h-[360px] place-items-center overflow-hidden border border-[#181818]/20 bg-[#f3f0e8] text-center sm:min-h-[430px]">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        "linear-gradient(#181818 1px, transparent 1px), linear-gradient(90deg, #181818 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div className="relative max-w-lg px-6">
                    <Activity className="mx-auto h-16 w-16 animate-pulse text-[#d9492f]" />
                    <h3 className="mt-6 text-3xl font-black tracking-[-0.035em]">Listening for the first window</h3>
                    <p className="mt-3 leading-relaxed text-[#5d5951]">Keep this page open while the seismic service starts. No refresh is needed.</p>
                    <div className="mx-auto mt-7 h-2 max-w-xs overflow-hidden border border-[#181818] bg-white">
                      <div className="h-full w-1/2 animate-pulse bg-[#ff6846]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[#181818] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10">
            <p className="mb-4 font-mono text-xs font-black uppercase tracking-[0.2em] text-[#d9492f]">02 / Model output</p>
            <h2 className="text-5xl font-black tracking-[-0.055em] sm:text-7xl">What the model sees.</h2>
          </div>

          <div className="grid border-l-2 border-t-2 border-[#181818] md:grid-cols-3">
            <article className={`${hasEvent ? "bg-[#ff6846]" : "bg-[#b8f34a]"} flex min-h-[330px] flex-col justify-between border-b-2 border-r-2 border-[#181818] p-6 sm:p-8`}>
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs font-black uppercase tracking-[0.15em]">Event status</p>
                {prediction ? (hasEvent ? <AlertTriangle className="h-7 w-7" /> : <CheckCircle2 className="h-7 w-7" />) : <Radio className="h-7 w-7" />}
              </div>
              <div>
                <p className="text-5xl font-black uppercase tracking-[-0.055em] sm:text-6xl">
                  {prediction ? (hasEvent ? "Event" : "Normal") : "—"}
                </p>
                <p className="mt-4 border-t-2 border-[#181818] pt-4 text-sm font-semibold">
                  {prediction ? (hasEvent ? "Experimental event detection" : "No event detected in this window") : "Awaiting model inference"}
                </p>
              </div>
            </article>

            <article className="flex min-h-[330px] flex-col justify-between border-b-2 border-r-2 border-[#181818] bg-[#ffd34e] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs font-black uppercase tracking-[0.15em]">Magnitude proxy</p>
                <Zap className="h-7 w-7" />
              </div>
              <div>
                <p className="text-7xl font-black tracking-[-0.065em] sm:text-8xl">
                  {prediction?.magnitude != null ? prediction.magnitude.toFixed(2) : "—"}
                </p>
                <p className="mt-4 border-t-2 border-[#181818] pt-4 text-sm font-semibold">Uncalibrated neural network output</p>
              </div>
            </article>

            <article className="flex min-h-[330px] flex-col justify-between border-b-2 border-r-2 border-[#181818] bg-[#8ed8f8] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs font-black uppercase tracking-[0.15em]">P-wave arrival</p>
                <Clock3 className="h-7 w-7" />
              </div>
              <div>
                <p className="break-all text-7xl font-black tracking-[-0.065em] sm:text-8xl">{prediction?.pArrival ?? "—"}</p>
                <p className="mt-4 border-t-2 border-[#181818] pt-4 text-sm font-semibold">Estimated sample index in the current window</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[#181818] bg-[#181818] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="mb-4 font-mono text-xs font-black uppercase tracking-[0.2em] text-[#ff6846]">03 / Under the hood</p>
              <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-7xl">From ground motion to inference.</h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/65">
                This thesis demo connects a live seismic feed to the CREIME model and streams each result to the browser. It presents research output and is not an operational early-warning service.
              </p>
            </div>

            <ol className="border-l border-t border-white/30">
              {[
                { number: "01", title: "Acquire", detail: "Read three-component waveform windows from the II.KAPI seismic station.", icon: Database, tone: "bg-[#8ed8f8]" },
                { number: "02", title: "Infer", detail: "Run the CREIME neural network to classify the window and estimate event properties.", icon: Server, tone: "bg-[#ffd34e]" },
                { number: "03", title: "Stream", detail: "Send results to this interface over a resilient server-sent event connection.", icon: Radio, tone: "bg-[#b8f34a]" },
              ].map((step) => {
                const Icon = step.icon
                return (
                  <li key={step.number} className="grid grid-cols-[auto_1fr] gap-5 border-b border-r border-white/30 p-5 sm:grid-cols-[72px_1fr_auto] sm:items-center sm:p-7">
                    <span className="font-mono text-xs font-black text-white/45">/{step.number}</span>
                    <div>
                      <h3 className="text-2xl font-black">{step.title}</h3>
                      <p className="mt-2 max-w-xl leading-relaxed text-white/60">{step.detail}</p>
                    </div>
                    <span className={`col-start-2 grid h-12 w-12 place-items-center border-2 border-white text-[#181818] sm:col-start-auto ${step.tone}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>

      <footer className="bg-[#f3f0e8] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="group inline-flex items-center gap-3 font-black uppercase tracking-[0.08em]">
            <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#181818] bg-[#ff6846] transition-transform group-hover:-translate-x-1">
              <ArrowLeft className="h-5 w-5" />
            </span>
            Back to selected work
          </Link>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#5d5951]">Research demo · Rafa Maritza</p>
        </div>
      </footer>
    </main>
  )
}
