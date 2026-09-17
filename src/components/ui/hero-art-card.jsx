import React, { useRef, useEffect, useCallback } from 'react'
import whiteLogo from '../../../White logo.svg'

export default function HeroArtCard() {
  const cardRef = useRef(null)
  const innerRef = useRef(null)
  const glareRef = useRef(null)

  const isHoveredRef = useRef(false)
  const isReducedMotionRef = useRef(false)

  // Continuous animation state (Euler degrees & pixels)
  const currentRef = useRef({
    rx: 0,
    ry: 0,
    y: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  })

  const hoverBlendRef = useRef(0)

  // Mouse tilt target (updated only by cursor position)
  const mouseTiltRef = useRef({
    rx: 0,
    ry: 0,
    glareX: 50,
    glareY: 50,
  })

  const updateCoordinates = useCallback((clientX, clientY) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const px = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
    const py = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1)

    const dx = px - 0.5
    const dy = py - 0.5
    // Sophisticated, controlled max tilt angle (11deg)
    const maxTilt = 11

    mouseTiltRef.current.rx = -dy * maxTilt
    mouseTiltRef.current.ry = dx * maxTilt
    mouseTiltRef.current.glareX = px * 100
    mouseTiltRef.current.glareY = py * 100
  }, [])

  const handleMouseEnter = useCallback((e) => {
    isHoveredRef.current = true
    updateCoordinates(e.clientX, e.clientY)
    if (innerRef.current) {
      innerRef.current.classList.add('is-tracking')
      innerRef.current.classList.remove('is-idle')
    }
  }, [updateCoordinates])

  const handleMouseMove = useCallback((e) => {
    isHoveredRef.current = true
    updateCoordinates(e.clientX, e.clientY)
  }, [updateCoordinates])

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false
    if (innerRef.current) {
      innerRef.current.classList.remove('is-tracking')
      innerRef.current.classList.add('is-idle')
    }
  }, [])

  useEffect(() => {
    isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animId
    let lastTime = performance.now()

    const animate = (now) => {
      animId = requestAnimationFrame(animate)

      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      if (isReducedMotionRef.current) {
        if (innerRef.current) {
          innerRef.current.style.transform = 'none'
        }
        return
      }

      // Smoothly blend hover influence: soft ease-in into cursor tracking, gentle ease-out to idle
      const blendSpeed = isHoveredRef.current ? 3.5 : 2.5
      const blendFactor = 1 - Math.exp(-blendSpeed * dt)
      const targetBlend = isHoveredRef.current ? 1 : 0
      hoverBlendRef.current += (targetBlend - hoverBlendRef.current) * blendFactor
      const blend = hoverBlendRef.current

      // Continuous ambient floating oscillation
      const t = now * 0.001
      const idlePeriod = 7.5
      const angle = ((t % idlePeriod) / idlePeriod) * Math.PI * 2

      const ambientRx = Math.sin(angle) * 3.0 + Math.sin(angle * 2) * -0.4
      const ambientRy = Math.sin(angle + Math.PI * 0.7) * 3.5
      const ambientY = (Math.sin(angle * 1.5) - 1) * 2.5

      // Target seamlessly interpolates from the floating wave to mouse tilt
      const targetRx = ambientRx * (1 - blend) + mouseTiltRef.current.rx * blend
      const targetRy = ambientRy * (1 - blend) + mouseTiltRef.current.ry * blend
      const targetY = ambientY * (1 - blend)
      const targetGlareOpacity = 0.4 * blend

      // Weighted physical damping (decay speed ~4.8 for smooth, luxury inertia)
      const lerpSpeed = isHoveredRef.current ? 4.8 : 3.2
      const factor = 1 - Math.exp(-lerpSpeed * dt)

      const curr = currentRef.current
      curr.rx += (targetRx - curr.rx) * factor
      curr.ry += (targetRy - curr.ry) * factor
      curr.y += (targetY - curr.y) * factor
      curr.glareX += (mouseTiltRef.current.glareX - curr.glareX) * factor
      curr.glareY += (mouseTiltRef.current.glareY - curr.glareY) * factor
      curr.glareOpacity += (targetGlareOpacity - curr.glareOpacity) * factor

      if (innerRef.current) {
        innerRef.current.style.transform = `rotateX(${curr.rx.toFixed(3)}deg) rotateY(${curr.ry.toFixed(3)}deg) translateY(${curr.y.toFixed(2)}px)`
      }

      if (glareRef.current) {
        if (curr.glareOpacity > 0.001) {
          glareRef.current.style.background = `radial-gradient(circle at ${curr.glareX.toFixed(1)}% ${curr.glareY.toFixed(1)}%, rgba(255, 255, 255, ${curr.glareOpacity.toFixed(3)}) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 68%)`
          glareRef.current.style.opacity = '1'
        } else {
          glareRef.current.style.opacity = '0'
        }
      }
    }

    animId = requestAnimationFrame(animate)

    const handleWindowBlur = () => {
      handleMouseLeave()
    }
    window.addEventListener('blur', handleWindowBlur)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('blur', handleWindowBlur)
    }
  }, [handleMouseLeave])

  return (
    <div
      ref={cardRef}
      className="hero-art-perspective-wrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Alpha and Omega 3D brand card"
    >
      <div
        ref={innerRef}
        className="hero-art-inner is-idle"
      >
        <div className="hero-art hero-art-face hero-art-front">
          <div className="art-grid" />
          <div className="hero-disc disc-one" />
          <div className="hero-disc disc-two" />
          <div className="art-ambient-glow" />

          {/* Logo with 3D Z-elevation */}
          <div className="art-logo-wrap">
            <img src={whiteLogo} alt="Alpha and Omega" className="art-logo-img" />
          </div>

          <div className="art-badge-tl">ALPHA / OMEGA</div>
          <div className="art-badge-br">A / O — 2026</div>

          <div className="art-stamp">
            <span>Design with</span>
            <span>staying power.</span>
          </div>

          <div className="art-label">
            A / O<br />
            <span>01—∞</span>
          </div>

          {/* Dynamic Glare Specular Sheen */}
          <div
            ref={glareRef}
            className="art-glare"
            style={{ opacity: 0 }}
          />
        </div>
      </div>
    </div>
  )
}
