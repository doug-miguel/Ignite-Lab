import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { NavLink, useParams } from "react-router-dom";

type ILesson = {
  title: string;
  slugProps: string;
  availableAt: Date;
  type: "live" | "class";
};

export const Lesson = ({ title, slugProps, availableAt, type }: ILesson) => {
  const { slug } = useParams<{ slug: string }>();
  const isLessonAvailabe = isPast(availableAt);
  const availabAtFormat = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBR,
    }
  );
  const isActiveLesson = slug === slugProps;
  return (
    <NavLink to={`/event/lesson/${slugProps}`} className="group">
      <span className="text-gray-300">{availabAtFormat}</span>
      <div
        className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${
          isActiveLesson && "bg-green-500"
        }`}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailabe ? (
            <span
              className={`text-sm text-blue-500 font-medium flex items-center gap-2 ${
                isActiveLesson && "text-white"
              }`}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            className={`text-xs rounded py-[2px] px-2 text-white border font-bold ${
              isActiveLesson ? "border-white" : "border-green-300"
            }`}
          >
            {type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>
        <strong
          className={`mt-5 block ${
            isActiveLesson ? "text-white" : "text-gray-200"
          }`}
        >
          {title}
        </strong>
      </div>
    </NavLink>
  );
};
