import { Link } from "@tanstack/react-router";

export default function EmailConfirmation({email}: {email: string}) {
  return (
    <div className="flex flex-col items-center justify-center mt-5 p-5">
      <div className="text-center w-full md:w-1/2">
        <p className="bg-emerald-900 text-4xl rounded-xs mb-5 py-1">Finance</p>
        <div className="px-1 text-left">
          <p>
            ¡Bienvenido, <span className="text-emerald-500">{email}</span>! 🎉
          </p>
          <br />
          <p>
            Te hemos enviado un enlace de verificación a tu correo. <br />
            Por favor, revisa tu bandeja de entrada (y la carpeta de spam) para
            confirmar que este correo electrónico es tuyo.
          </p>
        </div>
        <div className="mt-10">
          <Link to="/" className="text-emerald-500">
            Regresar al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
