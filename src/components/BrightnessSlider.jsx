import { BsSun, BsBrightnessHighFill } from "react-icons/bs"
import { useContext, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"
import IpContext from "../contexts/IpContext"
import TokenContext from "../contexts/TokenContext"
import useAxios from "../hooks/useAxios"
export default function BrightnessSlider() {
  const { bridgeIpContext } = useContext(IpContext)
  const { token } = useContext(TokenContext)
  const putUrl = `${bridgeIpContext}/api/${token}/lights/32/state`
  const fetchUrl = `${bridgeIpContext}/api/${token}/lights/32`
  const { put } = useAxios(putUrl)
  const { data, loading } = useAxios(fetchUrl)
  const [isOpen, setIsOpen] = useState(true)
  const [startOffset, setStartOffset] = useState(0)
  const [current, setCurrent] = useState(0)
  const keys = current === 0 ? 0 : current < 0.5 ? 1 : 2

  const [stretch, setStretch] = useState(1)

  useEffect(() => {
    // check if clicked outside component and close if so
    const handleClickOutside = (e) => {
      if (e.target.closest(".volume")) return
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!loading) {
      setCurrent(data?.state?.bri / 254)
    }
  }, [data])

  if (current > 1) {
    setCurrent(1)
  }
  if (current < 0) {
    setCurrent(0)
  }

  return (
    <motion.div
      animate={{
        width: isOpen ? 80 : 40,
        height: isOpen ? 280 : 40,
        borderRadius: 32,
        boxShadow: isOpen ? "0 8px 24px 0 rgba(0, 0, 0, 0.15)" : "0 8px 24px 0 rgba(0, 0, 0, 0.05)",
        transition: {
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 20,
        },
      }}
      className={`volume relative z-10`}>
      <motion.div
        animate={{
          width: isOpen ? 80 * (1 / stretch) : 40,
          height: isOpen ? 280 * stretch : 40,
          x: "-50%",
          y: "-50%",
          borderRadius: 32,
          boxShadow: isOpen ? "0 8px 24px 0 rgba(0, 0, 0, 0.15)" : "0 8px 24px 0 rgba(0, 0, 0, 0.05)",
          transition: {
            duration: 0.3,
          },
        }}
        className={`volume absolute top-1/2 left-1/2 z-50 flex flex-col items-center rounded-3xl bg-lighter backdrop-blur-md overflow-hidden justify-end`}
        onClick={() => setIsOpen(true)}>
        <AnimatePresence>
          <motion.button
            key={keys}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              width: isOpen ? 80 : 40,
              height: isOpen ? 80 : 40,
              transition: {
                width: {
                  delay: 0.2,
                },
              },
            }}
            exit={{ opacity: 0 }}
            className="absolute text-white flex justify-center items-center top-0">
            {current < 0.5 ? (
              <BsSun size={isOpen ? 32 : 24} className="transition-all" />
            ) : (
              <BsBrightnessHighFill size={isOpen ? 32 : 24} className="transition-all" />
            )}
          </motion.button>
        </AnimatePresence>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="absolute w-full h-full bg-transparent"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.1}
                dragMomentum={true}
                onDragStart={(e, info) => {
                  setStartOffset(current)
                }}
                onDrag={(e, info) => {
                  const maxStretch = 1.1
                  if (startOffset - info.offset.y / 280 < 0) {
                    setCurrent(0)

                    // calculate how much under 0 the volume is
                    const underZero = (startOffset - info.offset.y / 280) * -1
                    // calculate how much to stretch the volume bar
                    const stretch = 1 + underZero * maxStretch
                    setStretch(stretch < maxStretch ? stretch : maxStretch)
                  } else if (startOffset - info.offset.y / 280 > 1) {
                    setCurrent(1)
                    // calculate how much over 1 the volume is
                    const overOne = startOffset - info.offset.y / 280 - 1
                    // calculate how much to stretch the volume bar
                    const stretch = 1 + overOne * maxStretch
                    setStretch(stretch < maxStretch ? stretch : maxStretch)
                  } else {
                    setCurrent(startOffset - info.offset.y / 280)
                    setStretch(1)
                  }
                }}
                onDragEnd={(e, info) => {
                  setCurrent(startOffset - info.offset.y / 280)
                  setStretch(1)
                  put(putUrl, { bri: Math.round(current * 254) })
                }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  height: `${current * 100}%`,
                  opacity: 1,
                  transition: {
                    opacity: {
                      delay: 0.2,
                      ease: "easeOut",
                    },
                    height: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0,
                    },
                  },
                }}
                exit={{ opacity: 0, height: "0%" }}
                className="w-full bg-white/50 from-gradientColors-left to-gradientColors-right -z-10"
              />
            </>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  opacity: {
                    delay: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
              exit={{ opacity: 0 }}
              className="absolute w-16 h-16 bg-transparent flex justify-center items-center font-semibold text-white/75 text-lg pointer-events-none -rotate-90 mb-2">
              {parseInt(current * 100) + "%"}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
