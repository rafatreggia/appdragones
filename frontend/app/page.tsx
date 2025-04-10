"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Crown,
  Divide,
  BirdIcon as Dragon,
  Flame,
  Shield,
  Sparkles,
  Star,
  Swords,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import clsx from "clsx";

interface Dragon {
  nombre: string;
  poder: any;
  img: string;
}
interface Entrenador {
  nombre: string;
  dragones: Dragon[];
}

type Nivel = "Todos" | "Novato" | "Intermedio" | "Avanzado" | "Legendario";

export default function Home() {
  const [filtro, setFiltro] = useState<Nivel>("Todos");
  const [entrenadores, setEntrenadores] = useState<Entrenador[]>([]);
  const [nuevoEntrenador, setNuevoEntrenador] = useState<Entrenador>({
    nombre: "",
    dragones: [],
  });
  const [nuevoDragon, setNuevoDragon] = useState<Dragon>({
    nombre: "",
    poder: "",
    img: "",
  });
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(nuevoEntrenador);
    const entrenadorDuplicado = entrenadores.find(
      (entrenador) => entrenador.nombre === nuevoEntrenador.nombre
    );
    console.log(entrenadorDuplicado);
    if (entrenadorDuplicado) {
      toast("ESTE ENTRENADOR YA EXISTE");
      return;
    }
    setEntrenadores([...entrenadores, nuevoEntrenador]);
    setNuevoEntrenador({ nombre: "", dragones: [] });
    toast("El Entrenador fue agregado correctamente");
    setDialogOpen(false);
  };
  const handleSubmitDragon = (
    e: React.FormEvent<HTMLFormElement>,
    nombre: string
  ) => {
    e.preventDefault();
    console.log(nuevoDragon);
    console.log(nombre);
    const entrenadorActualizado = entrenadores.map((entrenador, index) => {
      console.log(entrenador);
      if (entrenador.nombre === nombre) {
        return {
          ...entrenador,
          dragones: [
            ...entrenador.dragones,
            { ...nuevoDragon, poder: Number.parseInt(nuevoDragon.poder) },
          ],
        };
      } else {
        return entrenador;
      }
    });
    console.log(entrenadorActualizado);
    setEntrenadores(entrenadorActualizado);
    setNuevoDragon({
      nombre: "",
      poder: "",
      img: "",
    });
    toast("Ya tienes un Nuevo Dragon", { description: "Entrenalo" });
  };
  const getPowerLevelInfo = (power: number) => {
    if (power <= 10) {
      return {
        label: "Novato",
        color: "bg-emerald-500",
        textColor: "text-emerald-700",
        borderColor: "border-emerald-300",
        bgColor: "bg-emerald-50",
        icon: <Sparkles className="h-4 w-4" />,
      };
    } else if (power <= 20) {
      return {
        label: "Intermedio",
        color: "bg-amber-500",
        textColor: "text-amber-700",
        borderColor: "border-amber-300",
        bgColor: "bg-amber-50",
        icon: <Zap className="h-4 w-4" />,
      };
    } else if (power <= 30) {
      return {
        label: "Avanzado",
        color: "bg-orange-500",
        textColor: "text-orange-700",
        borderColor: "border-orange-300",
        bgColor: "bg-orange-50",
        icon: <Flame className="h-4 w-4" />,
      };
    } else {
      return {
        label: "Legendario",
        color: "bg-purple-500",
        textColor: "text-purple-700",
        borderColor: "border-purple-300",
        bgColor: "bg-purple-50",
        icon: <Crown className="h-4 w-4" />,
      };
    }
  };
  const buscarDragones = () => {
    let todosLosDragones: Dragon[] = [];
    entrenadores.map((entrenador, index) => {
      if (entrenador.dragones.length > 0) {
        todosLosDragones = [...todosLosDragones, ...entrenador.dragones];
      }
    });
    console.log(todosLosDragones);
    todosLosDragones = todosLosDragones.filter((dragon) => {
      if (filtro === "Todos") {
        return true;
      }
      if (filtro === "Novato") {
        return dragon.poder <= 10;
      }
      if (filtro === "Intermedio") {
        return dragon.poder > 11 && dragon.poder <= 20;
      }
      if (filtro === "Avanzado") {
        return dragon.poder > 21 && dragon.poder <= 30;
      }
      if (filtro === "Legendario") {
        return dragon.poder > 31;
      }
      return false;
    });
    console.log(todosLosDragones);
    return todosLosDragones;
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Dragon className="h-10 w-10 text-amber-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-amber-800">
              Club de Entrenadores de Dragones
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-amber-600 text-amber-800"
            >
              <Shield className="mr-2 h-4 w-4" /> Miembros
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Flame className="mr-2 h-4 w-4" /> Dragones
            </Button>
          </div>
        </header>
        <Card className="border-amber-200 shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Swords className="h-5 w-5" />
              Registro de Nuevo Entrenador
            </CardTitle>
            <CardDescription className="text-amber-100">
              Complete el formulario para unirse a nuestro club de entrenadores
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Label>Nuevo Entrenador</Label>
              <Input
                required
                value={nuevoEntrenador.nombre}
                placeholder="Ingrese su Nombre"
                onChange={(e) => {
                  let entrenadoreModificado = {
                    ...nuevoEntrenador,
                    nombre: e.target.value,
                  };
                  setNuevoEntrenador(entrenadoreModificado);
                }}
              ></Input>
              <Button
                type="submit"
                variant="outline"
                className="border-amber-600 text-amber-800"
              >
                <Shield className="mr-2 h-4 w-4" />
                Agregar Entrenador
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="w-full grid grid-cols-2 gap-10">
          {entrenadores.map((entrenador, index) => {
            return (
              <Card key={index} className="border-amber-200 shadow-lg mb-8">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Swords className="h-5 w-5" />
                    {entrenador.nombre}
                  </CardTitle>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/40 mt-2"
                      >
                        Agregue un Dragon a {entrenador.nombre}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Agregar Dragon</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          handleSubmitDragon(e, entrenador.nombre);
                        }}
                      >
                        <Label> Nombre de Dragon</Label>
                        <Input
                          required
                          className="mb-5"
                          value={nuevoDragon.nombre}
                          onChange={(e) => {
                            let dragonAgregado = {
                              ...nuevoDragon,
                              nombre: e.target.value,
                            };
                            setNuevoDragon(dragonAgregado);
                          }}
                        ></Input>
                        <Label>Defina un poder</Label>
                        <Input
                          required
                          className="mb-5"
                          type="number"
                          value={nuevoDragon.poder}
                          onChange={(e) => {
                            let dragonAgregado = {
                              ...nuevoDragon,
                              poder: e.target.value,
                            };
                            setNuevoDragon(dragonAgregado);
                          }}
                        ></Input>
                        <Label>Seleccione una Imagen</Label>
                        <Select
                          required
                          value={nuevoDragon.img}
                          onValueChange={(e) => {
                            let dragonAgregado = {
                              ...nuevoDragon,
                              img: e,
                            };
                            setNuevoDragon(dragonAgregado);
                          }}
                        >
                          <SelectTrigger className="mt-4">
                            <SelectValue placeholder="Seleccione un dragon"></SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="/img/dragon1.webp">
                              Dragon 1
                            </SelectItem>
                            <SelectItem value="/img/dragon2.jpeg">
                              Dragon 2
                            </SelectItem>
                            <SelectItem value="/img/dragon3.jpeg">
                              Dragon 3
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            className="mt-5 bg-amber-600 hover:bg-amber-700"
                            onClick={() => setDialogOpen(true)}
                          >
                            <Flame className="mr-2 h-4 w-4" />
                            Agregar
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="pt-6">
                  {entrenador.dragones.length === 0 ? (
                    <div className="text-center py-8 text-amber-600">
                      <Flame className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-amber-800">
                        No hay dragones aún. ¡Agrega uno!
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {entrenador.dragones.map((dragon, index2) => {
                        const power = dragon.poder;
                        const powerInfo = getPowerLevelInfo(power);
                        console.log(dragon.img);

                        return (
                          <div
                            key={index2}
                            className={`rounded-lg p-4 border ${powerInfo.borderColor} ${powerInfo.bgColor} transition-all hover:shadow-md`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-300 flex items-center justify-center bg-amber-100">
                                {dragon.img ? (
                                  <img
                                    src={dragon.img || "/placeholder.svg"}
                                    alt={dragon.nombre}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Flame className="h-8 w-8 text-amber-500" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-amber-800">
                                  {dragon.nombre}
                                </h3>
                                <div className="flex items-center gap-1">
                                  <Badge
                                    className={`${powerInfo.color} text-white`}
                                  >
                                    {powerInfo.icon}
                                    <span className="ml-1">
                                      {powerInfo.label}
                                    </span>
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3">
                              <div className="flex justify-between mb-1">
                                <span
                                  className={`text-sm font-medium ${powerInfo.textColor}`}
                                >
                                  Poder: {power}
                                </span>
                                <span
                                  className={`text-xs ${powerInfo.textColor}`}
                                >
                                  {power}%
                                </span>
                              </div>
                              <Progress
                                value={power}
                                className={`${powerInfo.color} h-2`}
                              />
                            </div>

                            <div className="mt-3 flex justify-end">
                              <div className="flex gap-1">
                                {[
                                  ...Array(Math.min(5, Math.ceil(power / 8))),
                                ].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="h-4 w-4 text-amber-500 fill-amber-500"
                                  />
                                ))}
                              </div>
                            </div>
                            <Button
                              className="mt-5 bg-amber-600 hover:bg-amber-700"
                              onClick={() => {
                                let listaActuelizada = entrenadores.map(
                                  (trainer, index3) => {
                                    if (trainer.nombre === entrenador.nombre) {
                                      let dragonesModificados = [
                                        ...trainer.dragones,
                                      ];
                                      dragonesModificados[index2].poder =
                                        dragonesModificados[index2].poder + 1;
                                      return {
                                        ...entrenador,
                                        dragones: dragonesModificados,
                                      };
                                    } else {
                                      return trainer;
                                    }
                                  }
                                );
                                setEntrenadores(listaActuelizada);
                              }}
                            >
                              Entrenar
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Card className="border-amber-200 shadow-lg mt-8">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Dragon className="h-5 w-5" />
              Listado de Dragones
            </CardTitle>
            <CardDescription className="text-amber-100">
              Filtra los dragones por nivel de poder
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <Button
                onClick={() => setFiltro("Todos")}
                variant={filtro === "Todos" ? "default" : "outline"}
                className={
                  filtro === "Todos"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "border-amber-600 text-amber-800 hover:bg-amber-100"
                }
              >
                <Star className="mr-2 h-4 w-4" />
                Todos
              </Button>
              <Button
                onClick={() => setFiltro("Novato")}
                variant={filtro === "Novato" ? "default" : "outline"}
                className={
                  filtro === "Novato"
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "border-emerald-500 text-emerald-700 hover:bg-emerald-50"
                }
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Novato
              </Button>
              <Button
                onClick={() => setFiltro("Intermedio")}
                variant={filtro === "Intermedio" ? "default" : "outline"}
                className={
                  filtro === "Intermedio"
                    ? "bg-amber-500 hover:bg-amber-600"
                    : "border-amber-500 text-amber-700 hover:bg-amber-50"
                }
              >
                <Zap className="mr-2 h-4 w-4" />
                Intermedio
              </Button>
              <Button
                onClick={() => setFiltro("Avanzado")}
                variant={filtro === "Avanzado" ? "default" : "outline"}
                className={
                  filtro === "Avanzado"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "border-orange-500 text-orange-700 hover:bg-orange-50"
                }
              >
                <Flame className="mr-2 h-4 w-4" />
                Avanzado
              </Button>
              <Button
                onClick={() => setFiltro("Legendario")}
                variant={filtro === "Legendario" ? "default" : "outline"}
                className={
                  filtro === "Legendario"
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "border-purple-500 text-purple-700 hover:bg-purple-50"
                }
              >
                <Crown className="mr-2 h-4 w-4" />
                Legendario
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {buscarDragones().length === 0 ? (
                <div className="col-span-full text-center py-8 text-amber-600">
                  <Dragon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-amber-800">
                    No hay dragones con este nivel de poder
                  </p>
                </div>
              ) : (
                buscarDragones().map((dragon, index) => {
                  const powerInfo = getPowerLevelInfo(dragon.poder);
                  return (
                    <div
                      key={index}
                      className={`rounded-lg p-4 border ${powerInfo.borderColor} ${powerInfo.bgColor} transition-all hover:shadow-md`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-300 flex items-center justify-center bg-amber-100">
                          {dragon.img ? (
                            <img
                              src={dragon.img || "/placeholder.svg"}
                              alt={dragon.nombre}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Flame className="h-8 w-8 text-amber-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-amber-800">
                            {dragon.nombre}
                          </h3>
                          <div className="flex items-center gap-1">
                            <Badge className={`${powerInfo.color} text-white`}>
                              {powerInfo.icon}
                              <span className="ml-1">{powerInfo.label}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between mb-1">
                          <span
                            className={`text-sm font-medium ${powerInfo.textColor}`}
                          >
                            Poder: {dragon.poder}
                          </span>
                          <span className={`text-xs ${powerInfo.textColor}`}>
                            {dragon.poder}%
                          </span>
                        </div>
                        <Progress
                          value={dragon.poder}
                          className={`${powerInfo.color} h-2`}
                        />
                      </div>

                      <div className="mt-3 flex justify-end">
                        <div className="flex gap-1">
                          {[
                            ...Array(Math.min(5, Math.ceil(dragon.poder / 8))),
                          ].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-amber-500 fill-amber-500"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
