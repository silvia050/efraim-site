import Image from "next/image";
import { PageHeader } from "@/components/sections/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { mockTeam } from "@/lib/mock-data";

export default function NossoTimePage() {
  return (
    <>
      <PageHeader
        title="Nosso Time"
        description="Conheça os pastores e líderes que, guiados pelo Espírito Santo, dedicam suas vidas ao serviço de Deus e ao cuidado de pessoas."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-2xl mx-auto">
          {mockTeam.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="relative h-48 w-full bg-gradient-to-br from-primary-700 to-primary-900">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-display text-5xl font-semibold text-white/80">
                      {member.name
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-5">
                <h3 className="font-display text-lg font-semibold text-primary-900">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-gold-600">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="mt-3 text-sm text-primary-600 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
