import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "framer-motion"
import { cn } from "../../lib/utils"


export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <div ref={sectionRef} className={cn("relative z-0 h-[60vh] md:h-[30vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-6 md:px-4 pt-20 pb-12 md:py-20">
        <span className="flex flex-wrap justify-center text-center px-2 py-3 md:p-5 font-normal text-black/20 dark:text-white/20 leading-relaxed text-lg md:text-2xl">
          {words.map((word, i) => {
            const start = (i / words.length) * 0.2
            const end = start + (1 / words.length) * 0.2
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </span>
      </div>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative inline-block mx-0.5 md:mx-1 lg:mx-1.5">
      <span className="opacity-30">{children}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 text-black dark:text-white">
        {children}
      </motion.span>
    </span>
  )
}
