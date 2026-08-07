import { Clock, ExternalLink, MapPin } from "lucide-react";
import { mockLocation, mockSchedules } from "@/lib/mock-data";

export function ScheduleSection() {
  const { street, number, neighborhood, city, state, zipCode } = mockLocation;
  const fullAddress = `${street}, ${number}, ${neighborhood}, ${city} - ${state}, ${zipCode}`;
  const mapsQuery = encodeURIComponent(fullAddress);

  return (
    <section id="horarios" className="bg-primary-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-primary-900">
            Nossos Horários
          </h2>
          <p className="mt-2 text-primary-600">
            Participe de nossos cultos de celebração
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Horários + endereço */}
          <div className="flex flex-col gap-6">
            <ul className="flex flex-col gap-4">
              {mockSchedules.map((schedule) => (
                <li
                  key={schedule.id}
                  className="flex items-center justify-between rounded-lg border border-primary-100 bg-white px-5 py-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Clock
                      className="h-5 w-5 text-gold-500"
                      aria-hidden="true"
                    />
                    <span className="font-medium text-primary-900">
                      {schedule.label}
                    </span>
                  </div>
                  <span className="text-sm text-primary-600">
                    {schedule.weekday}, {schedule.time}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 rounded-lg border border-primary-100 bg-white px-5 py-4 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold-500"
                  aria-hidden="true"
                />
                <p className="text-primary-700">
                  {street}, {number} — {neighborhood}
                  <br />
                  {city} – {state}, {zipCode}
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-1.5 self-start text-sm font-medium text-primary-700 hover:text-primary-900"
              >
                Abrir no Google Maps
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Mapa incorporado — embed público do Google Maps, sem necessidade
              de chave de API (suficiente para esta fase do projeto) */}
          <div className="overflow-hidden rounded-lg border border-primary-100 shadow-sm">
            <iframe
              title="Mapa — Ministério Efraim"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              className="h-full min-h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
