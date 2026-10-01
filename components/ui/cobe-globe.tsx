// @ts-nocheck
"use client"

import React, { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

export interface Marker {
  id: string
  location: [number, number]
  label: string
}

export interface Arc {
  id: string
  from: [number, number]
  to: [number, number]
  label?: string
}

export interface GlobeProps {
  markers?: Marker[]
  arcs?: Arc[]
  className?: string
  markerColor?: [number, number, number]
  baseColor?: [number, number, number]
  arcColor?: [number, number, number]
  glowColor?: [number, number, number]
  dark?: number
  mapBrightness?: number
  markerSize?: number
  markerElevation?: number
  arcWidth?: number
  arcHeight?: number
  speed?: number
  theta?: number
  diffuse?: number
  mapSamples?: number
}

export function Globe({
  markers = [],
  arcs = [],
  className = "",
  markerColor = [0.22, 0.66, 0.31],
  baseColor = [1, 1, 1],
  arcColor = [0.22, 0.66, 0.31],
  glowColor = [0.94, 0.93, 0.91],
  dark = 0,
  mapBrightness = 8,
  markerSize = 0.03,
  markerElevation = 0.01,
  arcWidth = 0.6,
  arcHeight = 0.25,
  speed = 0.003,
  theta = 0.2,
  diffuse = 1.5,
  mapSamples = 16000,
}: GlobeProps): React.ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const velocity = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  const isIntersectingRef = useRef(false)

  // Keep latest props in refs to avoid tearing down WebGL context on prop changes
  const propsRef = useRef({
    markers,
    arcs,
    markerColor,
    baseColor,
    arcColor,
    glowColor,
    dark,
    mapBrightness,
    markerSize,
    markerElevation,
    arcWidth,
    arcHeight,
    speed,
    theta,
    diffuse,
    mapSamples,
  })

  useEffect(() => {
    propsRef.current = {
      markers,
      arcs,
      markerColor,
      baseColor,
      arcColor,
      glowColor,
      dark,
      mapBrightness,
      markerSize,
      markerElevation,
      arcWidth,
      arcHeight,
      speed,
      theta,
      diffuse,
      mapSamples,
    }
  }, [
    markers,
    arcs,
    markerColor,
    baseColor,
    arcColor,
    glowColor,
    dark,
    mapBrightness,
    markerSize,
    markerElevation,
    arcWidth,
    arcHeight,
    speed,
    theta,
    diffuse,
    mapSamples,
  ])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const deltaX = e.clientX - pointerInteracting.current.x
      const deltaY = e.clientY - pointerInteracting.current.y
      dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 }
      const now = Date.now()
      if (lastPointer.current) {
        const dt = Math.max(now - lastPointer.current.t, 1)
        const maxVelocity = 0.15
        velocity.current = {
          phi: Math.max(
            -maxVelocity,
            Math.min(maxVelocity, ((e.clientX - lastPointer.current.x) / dt) * 0.3)
          ),
          theta: Math.max(
            -maxVelocity,
            Math.min(maxVelocity, ((e.clientY - lastPointer.current.y) / dt) * 0.08)
          ),
        }
      }
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now }
    }
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
      lastPointer.current = null
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number = 0
    let isDestroyed = false
    let phi = 0

    function init() {
      if (isDestroyed || !canvas || canvas.offsetWidth === 0 || globe) return

      const width = canvas.offsetWidth
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const currentProps = propsRef.current

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width,
        height: width,
        phi: 0,
        theta: currentProps.theta,
        dark: currentProps.dark,
        diffuse: currentProps.diffuse,
        mapSamples: currentProps.mapSamples,
        mapBrightness: currentProps.mapBrightness,
        baseColor: currentProps.baseColor,
        markerColor: currentProps.markerColor,
        glowColor: currentProps.glowColor,
        markerElevation: currentProps.markerElevation,
        markers: currentProps.markers.map((m) => ({
          location: m.location,
          size: currentProps.markerSize,
          id: m.id,
        })),
        arcs: currentProps.arcs.map((a) => ({
          from: a.from,
          to: a.to,
          id: a.id,
        })),
        arcColor: currentProps.arcColor,
        arcWidth: currentProps.arcWidth,
        arcHeight: currentProps.arcHeight,
        opacity: 0.7,
      })

      function animate() {
        if (isDestroyed || !globe || !isIntersectingRef.current) return

        const p = propsRef.current
        if (!isPausedRef.current) {
          phi += p.speed
          if (
            Math.abs(velocity.current.phi) > 0.0001 ||
            Math.abs(velocity.current.theta) > 0.0001
          ) {
            phiOffsetRef.current += velocity.current.phi
            thetaOffsetRef.current += velocity.current.theta
            velocity.current.phi *= 0.95
            velocity.current.theta *= 0.95
          }
          const thetaMin = -0.4,
            thetaMax = 0.4
          if (thetaOffsetRef.current < thetaMin) {
            thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * 0.1
          } else if (thetaOffsetRef.current > thetaMax) {
            thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * 0.1
          }
        }

        if (isDestroyed || !globe || !isIntersectingRef.current) return

        globe.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: p.theta + thetaOffsetRef.current + dragOffset.current.theta,
          dark: p.dark,
          mapBrightness: p.mapBrightness,
          markerColor: p.markerColor,
          baseColor: p.baseColor,
          arcColor: p.arcColor,
          markerElevation: p.markerElevation,
          markers: p.markers.map((m) => ({
            location: m.location,
            size: p.markerSize,
            id: m.id,
          })),
          arcs: p.arcs.map((a) => ({
            from: a.from,
            to: a.to,
            id: a.id,
          })),
        })

        if (!isDestroyed && isIntersectingRef.current) {
          animationId = requestAnimationFrame(animate)
        }
      }

      if (isIntersectingRef.current) {
        animate()
      }
      setTimeout(() => {
        if (!isDestroyed && canvas) {
          canvas.style.opacity = "1"
        }
      }, 100)
    }

    let resizeObserver: ResizeObserver | null = null
    if (canvas.offsetWidth > 0) {
      init()
    } else {
      resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0 && !isDestroyed) {
          if (resizeObserver) {
            resizeObserver.disconnect()
            resizeObserver = null
          }
          init()
        }
      })
      resizeObserver.observe(canvas)
    }

    let intersectionObserver: IntersectionObserver | null = new IntersectionObserver(([entry]) => {
      isIntersectingRef.current = entry.isIntersecting;
      if (entry.isIntersecting && !isDestroyed && globe) {
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(animate);
      }
    }, { threshold: 0.05 });
    intersectionObserver.observe(canvas);

    return () => {
      isDestroyed = true
      if (intersectionObserver) {
        intersectionObserver.disconnect()
        intersectionObserver = null
      }
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (globe) {
        globe.destroy()
        globe = null
      }
    }
  }, [])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
      {markers.map((m) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            marginBottom: 8,
            padding: "2px 6px",
            background: "#1a1a2e",
            color: "#fff",
            fontFamily: "monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
            transition: "opacity 0.8s, filter 0.8s",
          } as any}
        >
          {m.label}
          <span
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translate3d(-50%, -1px, 0)",
              border: "5px solid transparent",
              borderTopColor: "#1a1a2e",
            }}
          />
        </div>
      ))}
      {arcs
        .filter((a) => a.label)
        .map((a) => (
          <div
            key={a.id}
            style={{
              position: "absolute",
              positionAnchor: `--cobe-arc-${a.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              translate: "-50% 0",
              marginBottom: 8,
              padding: "2px 6px",
              background: "#fff",
              color: "#1a1a2e",
              fontFamily: "monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              opacity: `var(--cobe-visible-arc-${a.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-arc-${a.id}, 0)) * 8px))`,
              transition: "opacity 0.8s, filter 0.8s",
            } as any}
          >
            {a.label}
            <span
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translate3d(-50%, -1px, 0)",
                border: "5px solid transparent",
                borderTopColor: "#fff",
              }}
            />
          </div>
        ))}
    </div>
  )
}
