    import React from "react";
    import { cn } from "@/lib/utils";
    import { motion } from "motion/react";
    import { BanknoteArrowUp, Bell, FileText, HandCoins, Monitor, Smartphone, TrendingUp, Wallet, Wifi } from "lucide-react";

    export function FeaturesSectionDemo() {
    const features = [
        {
        title: "Registros fáciles",
        description: "Controla tus ingresos y gastos de forma simple y ordenada.",
        skeleton: <SkeletonOne />,
        className: "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
        },
        {
        title: "Todo en un solo lugar",
        description: "Visualiza toda tu información financiera en un solo lugar.",
        skeleton: <SkeletonTwo />,
        className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
        },
        {
        title: "Información en tiempo real",
        description: "Accede a tu información en tiempo real, desde cualquier dispositivo.",
        skeleton: <SkeletonThree />,
        className: "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
        },
        {
        title: "Alertas importantes",
        description: "Mantente al tanto de fechas clave y movimientos importantes.",
        skeleton: <SkeletonFour />,
        className: "col-span-1 lg:col-span-3 border-b lg:border-none",
        },
    ];

    return (
        <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
        <div className="px-8">
            <h4 className="text-3xl lg:text-5xl max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
            Control financiero sin complicaciones
            </h4>
            <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center dark:text-neutral-300">
            Todo lo que necesitas para entender y mejorar tu dinero.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
            {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
                {feature.skeleton}
            </FeatureCard>
            ))}
        </div>
        </div>
    );
    }

    const FeatureCard = ({
    children,
    className,
    }: {
    children?: React.ReactNode;
    className?: string;
    }) => (
    <div className={cn("p-4 sm:p-8 relative overflow-hidden", className)}>
        {children}
    </div>
    );

    const FeatureTitle = ({ children }: { children?: React.ReactNode }) => (
    <p className="text-xl md:text-2xl tracking-tight text-black dark:text-white">
        {children}
    </p>
    );

    const FeatureDescription = ({ children }: { children?: React.ReactNode }) => (
    <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-300 my-2">
        {children}
    </p>
    );

    /* ---------------- Skeletons ---------------- */

    const SkeletonOne = () => (
    <img src="/images/feature1.png" alt="Dashboard" className="mt-6 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border dark:border-neutral-800" />
    );

    const SkeletonTwo = () => {
    const items = [
        {
            icon: BanknoteArrowUp,
            text: "Administra fácilmente tus cargos y abonos"
        },
        {
        icon: FileText,
        text: "Sube y gestiona tus estados de cuenta",
        },
        {
        icon: TrendingUp,
        text: "Visualiza tus rendimientos por mes",
        },
        {
        icon: HandCoins,
        text: "Registra el conteo fácil de tu efectivo",
        },
        {
        icon: Wallet,
        text: "Consulta el saldo total de tu cartera financiera",
        }
    ];

    return (
        <div className="mt-6 flex flex-col gap-3">
        {items.map((item, i) => {
            const Icon = item.icon;
            return (
            <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 rounded-lg border
                        border-neutral-200 dark:border-neutral-800
                        bg-white dark:bg-neutral-900 p-3"
            >
                <div
                className="flex h-9 w-9 items-center justify-center rounded-md
                            bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                >
                <Icon className="h-5 w-5" />
                </div>

                <span className="text-sm text-neutral-700 dark:text-neutral-200">
                {item.text}
                </span>
            </motion.div>
            );
        })}
        </div>
    );
    };

    const SkeletonThree = () => (
    <div className="mt-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
        <div className="flex items-center justify-center h-18 w-24 rounded-lg border
                        border-neutral-200 dark:border-neutral-800
                        bg-white dark:bg-neutral-900">
            <Monitor className="h-10 w-10 text-emerald-400" />
        </div>

        <div className="flex items-center justify-center h-18 w-24 rounded-lg border
                        border-neutral-200 dark:border-neutral-800
                        bg-white dark:bg-neutral-900">
            <Smartphone className="h-10 w-10 text-emerald-400" />
        </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
        <Wifi className="h-8 w-8 text-emerald-400" />
        Sincronización en tiempo real
        </div>
    </div>
    );

    const SkeletonFour = () => (
    <div className="mt-6 flex flex-col gap-3">
        {[
        "El día de ayer fue tu fecha de corte",
        "Faltan 5 días para tu fecha límite de pago",
        ].map((text, i) => (
        <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="flex items-center gap-3 rounded-lg border
                    border-neutral-200 dark:border-neutral-800
                    bg-white dark:bg-neutral-900 p-3"
        >
            <div className="h-9 w-9 flex items-center justify-center rounded-md
                            bg-emerald-500/10 text-emerald-400">
            <Bell className="h-5 w-5" />
            </div>

            <span className="text-sm text-neutral-700 dark:text-neutral-200">
            {text}
            </span>
        </motion.div>
        ))}
    </div>
    );
