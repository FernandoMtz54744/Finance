import { FeaturesSectionDemo } from "@/components/ui/features-section";
import { LampContainer } from "@/components/ui/lamp";
import { Button } from "@/components/ui/moving-border";
import { useNavigate } from "@tanstack/react-router"
import { motion } from "motion/react";

export default function Landing() {
  const navigate = useNavigate(); 

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      <LampContainer className="snap-center min-h-screen">
        <motion.h1 initial={{ opacity: 0.5, y: 100 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
          Finance <br/>
          claridad financiera
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="mt-4 max-w-xl text-center text-slate-400">
          Registra ingresos, gastos y rendimientos en un solo lugar
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.6 }}
        className="mt-10 flex justify-center"
        >
        <button onClick={() => navigate({ to: "/login" })} className="rounded-lg bg-emerald-700 px-6 py-3
        text-white font-medium shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition hover:cursor-pointer">
          Empieza a registrar
        </button>
        </motion.div>
      </LampContainer>

      <motion.section initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-10 bg-white dark:bg-black snap-center min-h-screen">
        <FeaturesSectionDemo />
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-10 bg-white dark:bg-black py-32 snap-center min-h-screen">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-medium text-black dark:text-white">
            Acerca de Finance
          </h3>

          <p className="mt-6 text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed">
            Finance está diseñado para ayudarte a controlar tu dinero sin complicaciones. 
            Centraliza ingresos, gastos y demás en un solo lugar con información clara y ordenada.
          </p>

          <div className="mt-10">
            <Button onClick={() => navigate({ to: "/about" })} className="inline-flex items-center gap-2 rounded-lg border-3
            border-emerald-600 px-6 py-3 text-emerald-600hover:bg-emerald-600 hover:text-white transition hover:cursor-pointer bg-transparent">
            Conoce más
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
