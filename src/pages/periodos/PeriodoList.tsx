import Timeline from "@/components/timeline/Timeline";
import TimelineItem from "@/components/timeline/TimelineItem";
import { useRouter } from "@tanstack/react-router";

export default function PeriodoList() {

    const router = useRouter();

    return (
    <Timeline>
        <TimelineItem title="Mayo 2025">
            <div className="flex md:flex-row flex-col">
                <div>Fecha inicio: 01/abr/2025</div>
                <div>Corte: 01/abr/2025</div>
                <div>Saldo final: $1500</div>
                <div>Limite de pago: 01/abr/2025</div>
            </div>
        </TimelineItem>

        <TimelineItem title="Mayo 2025">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates veniam inventore alias placeat esse corporis et molestiae enim. Aut velit nesciunt nulla molestias saepe corrupti aperiam, incidunt rerum soluta amet!
        </TimelineItem>

        <TimelineItem title="Mayo 2025">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates veniam inventore alias placeat esse corporis et molestiae enim. Aut velit nesciunt nulla molestias saepe corrupti aperiam, incidunt rerum soluta amet!
        </TimelineItem>

        <TimelineItem title="Mayo 2025">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates veniam inventore alias placeat esse corporis et molestiae enim. Aut velit nesciunt nulla molestias saepe corrupti aperiam, incidunt rerum soluta amet!
        </TimelineItem>

        <div onClick={() => router.navigate({ to: "/periodos/add"})} className="hover:cursor-pointer">
            <TimelineItem title="Agregar periodo">
                Click para agregar un periodo
            </TimelineItem>
        </div>
    </Timeline>
    )
}
