"use client"

import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"

interface Driver {
  id: number
  name: string
  location: { lat: number; lng: number; address: string }
  status: string
}

interface LiveTrackingMapProps {
  drivers: Driver[]
  selectedDriver?: number | null
}

export function LiveTrackingMap({ drivers, selectedDriver }: LiveTrackingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real implementation, initialize Google Maps here
    // For now, we'll simulate with a styled div
    if (mapRef.current) {
      // Google Maps initialization would go here
      console.log("Map initialized with drivers:", drivers)
    }
  }, [drivers])

  return (
    <div ref={mapRef} className="h-full bg-gray-800 rounded-lg relative overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20"></div>

      {/* Simulated Driver Pins */}
      {drivers.map((driver, index) => (
        <div
          key={driver.id}
          className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
            selectedDriver === driver.id ? "bg-green-400 scale-125 z-10" : "bg-blue-400 hover:scale-110"
          }`}
          style={{
            top: `${20 + index * 25}%`,
            left: `${15 + index * 20}%`,
          }}
          title={`${driver.name} - ${driver.status}`}
        >
          <MapPin className="h-3 w-3 text-white" />
        </div>
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="bg-gray-900/80 p-2 rounded text-white text-xs">Live Tracking Active</div>
        <div className="bg-gray-900/80 p-2 rounded text-white text-xs">{drivers.length} Drivers Online</div>
      </div>

      {/* Center Message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white/60">
          <MapPin className="h-12 w-12 mx-auto mb-2" />
          <p className="text-sm">Google Maps Integration</p>
          <p className="text-xs">Real-time GPS tracking</p>
        </div>
      </div>
    </div>
  )
}
