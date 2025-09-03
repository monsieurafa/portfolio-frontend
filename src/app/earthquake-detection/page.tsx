"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Activity, Zap, Clock, AlertTriangle, CheckCircle, Moon, Sun, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from '@/contexts/ThemeContext';
// Import the existing components from read-only files
import RealtimeChart from "@/components/ui/RealtimeChart"

// A type for our structured prediction data
type Prediction = {
  isEvent: number
  magnitude: number | null
  pArrival: number | null
}

export default function EarthquakeDetection() {
  const router = useRouter()
  const { isDarkMode, toggleDarkMode } = useTheme();

  // State for waveform data
  const [ch1, setCh1] = useState<number[]>([])
  const [ch2, setCh2] = useState<number[]>([])
  const [ch3, setCh3] = useState<number[]>([])

  // New structured state for the prediction
  const [prediction, setPrediction] = useState<Prediction | null>(null)

  // State for connection status and station name
  const [isConnected, setIsConnected] = useState(false)
  const [stationId, setStationId] = useState<string | null>(null)

  const websocket = useRef<WebSocket | null>(null)

  const connectWebSocket = () => {
    const ws = new WebSocket("wss://rafamaritza-eews-creime-monitor.hf.space/ws/123");
    ws.onopen = () => setIsConnected(true)
    ws.onclose = () => {
      setIsConnected(false)
      setTimeout(() => connectWebSocket(), 3000)
    }
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.type === "new_data_window") {
        const data = message.data
        // Update waveform states
        setCh1(data.ch1)
        setCh2(data.ch2)
        setCh3(data.ch3)

        // Update station ID state
        setStationId(data.station_id)

        // Update structured prediction state
        setPrediction({
          isEvent: data.prediction[0],
          magnitude: data.prediction[1],
          pArrival: data.prediction[2],
        })
      }
    }
    websocket.current = ws
  }

  useEffect(() => {
    connectWebSocket()
    return () => websocket.current?.close()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none" />

      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:bg-muted hover:scale-105 transition-all duration-300 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>

          <button
            onClick={toggleDarkMode}
            className="px-4 py-3 bg-card border border-border rounded-lg hover:bg-muted hover:scale-105 transition-all duration-300 shadow-md"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6 p-4 bg-card rounded-2xl shadow-lg border border-border">
            <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-xl">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Earthquake Detection System
            </h1>
          </div>

          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Advanced neural network-based earthquake detection system analyzing real-time seismograph data from
            Indonesian monitoring stations for early warning and magnitude prediction.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="bg-card p-4 rounded-xl shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  CREIME Model
                </span>
                <span className="text-muted-foreground font-medium">Indonesia Network</span>
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-secondary" />
                <span className="font-semibold text-card-foreground">Station:</span>
                <span className="text-secondary font-mono font-bold">{stationId || "Connecting..."}</span>
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  {isConnected && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      isConnected ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </div>
                <span className="font-semibold text-card-foreground">
                  {isConnected ? "Live Connection" : "Disconnected"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-xl border border-border mb-12 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-8 py-6 border-b border-border">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Activity className="w-6 h-6 text-primary" />
              Real-Time Seismic Waveform Data
            </h2>
            <p className="text-muted-foreground mt-2">Three-channel seismometer readings (BHE, BHN, BHZ)</p>
          </div>
          <div className="p-8">
            {ch1.length > 0 ? (
              <div className="bg-muted/50 rounded-xl p-6 border border-border">
                <RealtimeChart ch1={ch1} ch2={ch2} ch3={ch3} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-muted-foreground">
                <div className="p-6 bg-muted rounded-full mb-6">
                  <Activity className="w-16 h-16 animate-pulse text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Waiting for Seismometer Data</h3>
                <p className="text-lg">Establishing connection to monitoring station...</p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card rounded-2xl shadow-xl border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {prediction && prediction.isEvent === 1 ? (
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                ) : (
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                )}
                <h3 className="text-xl font-bold">Event Status</h3>
              </div>
              <div className="text-center">
                <div
                  className={`text-4xl font-bold mb-4 ${
                    prediction && prediction.isEvent === 1 ? "text-red-500 animate-pulse" : "text-green-500"
                  }`}
                >
                  {prediction ? (prediction.isEvent === 1 ? "EVENT" : "Normal") : "-"}
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    prediction && prediction.isEvent === 1
                      ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                      : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  }`}
                >
                  {prediction && prediction.isEvent === 1 ? "Alert Active" : "Monitoring"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-xl border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold">Magnitude</h3>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-4 text-orange-500">
                  {prediction && prediction.magnitude !== null ? prediction.magnitude.toFixed(2) : "-"}
                </div>
                <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-semibold">
                  Body-Wave Magnitude
                </span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-xl border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">P-Wave Arrival</h3>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-4 text-blue-500">
                  {prediction && prediction.pArrival !== null ? prediction.pArrival : "-"}
                </div>
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                  Sample Index
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 shadow-xl border border-border">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">About This Project</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              This earthquake detection system represents the culmination of my thesis research, utilizing
              state-of-the-art neural networks to analyze real-time seismograph data from Indonesian earthquake
              monitoring stations. The system provides critical early warning capabilities through advanced magnitude
              prediction and precise P-wave arrival detection.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Neural Networks</div>
                <p className="text-muted-foreground">Advanced ML algorithms for pattern recognition</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">Real-Time</div>
                <p className="text-muted-foreground">Live data processing and analysis</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Early Warning</div>
                <p className="text-muted-foreground">Rapid earthquake detection and alerts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
