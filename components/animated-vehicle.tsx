"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Car, Bike, Truck } from "lucide-react"

type VehicleType = "car" | "bike" | "truck"

interface AnimatedVehicleProps {
  type: VehicleType
  startPosition: number
  delay?: number
}

export function AnimatedVehicle({ type, startPosition, delay = 0 }: AnimatedVehicleProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Map vehicle type to icon component
  const VehicleIcon = {
    car: Car,
    bike: Bike,
    truck: Truck,
  }[type]

  return (
    <motion.div
      className="absolute bottom-0 z-10"
      initial={{ x: -100, opacity: 0 }}
      animate={{
        x: [startPosition - 100, startPosition + 500],
        opacity: 1,
      }}
      transition={{
        x: {
          delay,
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
        },
        opacity: {
          duration: 0.5,
          delay,
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={isHovered ? { y: [-5, 0, -5] } : {}}
        transition={isHovered ? { duration: 0.5, repeat: Number.POSITIVE_INFINITY } : {}}
        className="bg-gray-700/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg cursor-pointer"
      >
        <VehicleIcon className="text-green-400 w-8 h-8" />
      </motion.div>
    </motion.div>
  )
}
