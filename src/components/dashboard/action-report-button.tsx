"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Badge } from "@/src/components/ui/badge";
import {
  Camera,
  PlusCircle,
  Sparkles,
  CheckCircle2,
  MapPin,
  Tag,
  ThumbsUp,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Check,
  AlertCircle,
} from "lucide-react";
import { useDashboard } from "./dashboard-context";
import gsap from "gsap";

type FlowStep = "CAMERA" | "AI_ANALYSIS" | "AI_RESULT" | "FORM";

export const ActionReportButton: React.FC = () => {
  const { addReportWithImage } = useDashboard();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<FlowStep>("CAMERA");

  // Imagen retenida ÚNICAMENTE EN MEMORIA mediante File Object
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Estados progresivos del análisis visual de IA
  const [analysisProgress, setAnalysisProgress] = useState({
    imageReceived: false,
    qualityChecked: false,
    contentChecked: false,
    similarSearched: false,
    institutionVerified: false,
    completed: false,
  });

  // Datos sugeridos por IA
  const [suggestedLocation] = useState("Salón 204 (Bloque B)");
  const [suggestedCategory, setSuggestedCategory] = useState("Infraestructura");

  // Formulario manual reducido
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const analysisContainerRef = useRef<HTMLDivElement>(null);

  // Al seleccionar la fotografía (Cámara o Galería)
  const handleImageCaptured = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Avanzar automáticamente a la pantalla de Análisis de IA
    startAIAnalysis();
  };

  // Inicio de la secuencia de análisis visual de 2-3 segundos
  const startAIAnalysis = () => {
    setStep("AI_ANALYSIS");
    setAnalysisProgress({
      imageReceived: true,
      qualityChecked: false,
      contentChecked: false,
      similarSearched: false,
      institutionVerified: false,
      completed: false,
    });

    setTimeout(() => {
      setAnalysisProgress((p) => ({ ...p, qualityChecked: true }));
    }, 500);

    setTimeout(() => {
      setAnalysisProgress((p) => ({ ...p, contentChecked: true }));
    }, 1100);

    setTimeout(() => {
      setAnalysisProgress((p) => ({ ...p, similarSearched: true }));
    }, 1700);

    setTimeout(() => {
      setAnalysisProgress((p) => ({ ...p, institutionVerified: true, completed: true }));
      setStep("AI_RESULT");
    }, 2300);
  };

  // Animaciones GSAP al cambiar de paso
  useEffect(() => {
    if (step === "AI_ANALYSIS" && analysisContainerRef.current) {
      gsap.fromTo(
        analysisContainerRef.current,
        { opacity: 0, scale: 0.95, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [step]);

  const handleCreateNewReport = () => {
    setLocation(suggestedLocation);
    setTitle("Daño detectado en " + suggestedLocation);
    setStep("FORM");
  };

  const handleSubmitFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !description.trim()) return;

    setIsSubmitting(true);

    try {
      await addReportWithImage({
        title,
        category: suggestedCategory,
        location,
        description,
        imageFile: imageFile || undefined,
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
        resetFlow();
      }, 1200);
    } catch (error) {
      console.error("Error al publicar reporte:", error);
      setIsSubmitting(false);
    }
  };

  const resetFlow = () => {
    setStep("CAMERA");
    setImageFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setTitle("");
    setLocation("");
    setDescription("");
  };

  return (
    <>
      <div className="dash-fade">
        <Button
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => fileInputRef.current?.click(), 150);
          }}
          size="lg"
          className="w-full h-15 sm:h-16 rounded-2xl bg-primary text-primary-foreground font-black text-base sm:text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-primary/30"
          aria-label="Reportar problema en la Institución Educativa GABO"
        >
          <Camera className="size-6 sm:size-7 animate-pulse" />
          <span>Reportar problema</span>
          <Badge variant="secondary" className="ml-auto bg-primary-foreground/20 text-primary-foreground border-none text-xs gap-1 py-1 px-2.5 font-bold">
            <Sparkles className="size-3.5 text-yellow-300" />
            Cámara IA
          </Badge>
        </Button>
      </div>

      {/* Input de Cámara / Archivo oculto con disparo nativo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageCaptured}
        className="hidden"
      />

      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetFlow();
      }}>
        <DialogContent className="sm:max-w-md rounded-3xl border-border bg-card p-0 overflow-hidden shadow-2xl">
          
          {/* PASO 1: SELECCIÓN DE CÁMARA / GALERÍA */}
          {step === "CAMERA" && (
            <div className="p-6 flex flex-col items-center justify-center text-center gap-5 py-10">
              <div className="size-20 rounded-full bg-primary/10 text-primary flex items-center justify-center ring-8 ring-primary/5">
                <Camera className="size-10" />
              </div>
              <div className="space-y-1.5 max-w-xs">
                <h3 className="text-xl font-black text-foreground">
                  Capturar Fotografía
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Toma la foto del problema directamente con la cámara de tu dispositivo o selecciona desde tu galería.
                </p>
              </div>

              <div className="flex flex-col w-full gap-2.5 pt-2">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm gap-2"
                >
                  <Camera className="size-5" />
                  Abrir Cámara o Galería
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl text-xs text-muted-foreground"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {/* PASO 2: ANÁLISIS DE IA (2-3 SEGUNDOS) */}
          {step === "AI_ANALYSIS" && (
            <div ref={analysisContainerRef} className="p-6 flex flex-col gap-5">
              {/* Preview de la foto capturada en memoria ocupando gran parte */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-black/90">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Vista previa"
                    className="w-full h-full object-cover opacity-80"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                  <Sparkles className="size-3 animate-spin" />
                  <span>Escaneando Imagen...</span>
                </div>
              </div>

              {/* Tarjeta Premium de Análisis de IA */}
              <div className="p-4 rounded-2xl bg-muted/60 border border-border/80 space-y-3">
                <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                  <span className="text-lg">🤖</span>
                  <span>EduFix AI está analizando tu reporte...</span>
                </div>

                <div className="space-y-2 text-xs font-medium">
                  <div className={`flex items-center gap-2 transition-opacity ${analysisProgress.imageReceived ? "opacity-100 text-foreground" : "opacity-40"}`}>
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>Imagen recibida</span>
                  </div>

                  <div className={`flex items-center gap-2 transition-opacity ${analysisProgress.qualityChecked ? "opacity-100 text-foreground" : "opacity-40"}`}>
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>Analizando calidad e nitidez...</span>
                  </div>

                  <div className={`flex items-center gap-2 transition-opacity ${analysisProgress.contentChecked ? "opacity-100 text-foreground" : "opacity-40"}`}>
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>Analizando contenido visual...</span>
                  </div>

                  <div className={`flex items-center gap-2 transition-opacity ${analysisProgress.similarSearched ? "opacity-100 text-foreground" : "opacity-40"}`}>
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>Buscando reportes similares en la institución...</span>
                  </div>

                  <div className={`flex items-center gap-2 transition-opacity ${analysisProgress.institutionVerified ? "opacity-100 text-foreground" : "opacity-40"}`}>
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>Verificando que la imagen pertenezca a la IE GABO...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PASO 3: RESULTADOS SIMULADOS DE IA & REPORTE SIMILAR */}
          {step === "AI_RESULT" && (
            <div className="p-6 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <ShieldCheck className="size-4" />
                  <span>Resultados de Validación IA</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-semibold">
                  <span className="flex items-center gap-1">✅ Imagen válida</span>
                  <span className="flex items-center gap-1">✅ Calidad adecuada</span>
                </div>
              </div>

              {/* Sugerencias de IA */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-muted/60 border border-border/60">
                  <span className="text-muted-foreground text-[10px] block font-medium">📍 Posible ubicación</span>
                  <span className="font-bold text-foreground truncate block">{suggestedLocation}</span>
                </div>
                <div className="p-3 rounded-2xl bg-muted/60 border border-border/60">
                  <span className="text-muted-foreground text-[10px] block font-medium">🏷 Categoría sugerida</span>
                  <span className="font-bold text-foreground truncate block">{suggestedCategory}</span>
                </div>
              </div>

              {/* Tarjeta de Reporte Similar Encontrado */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center gap-1">
                    <Sparkles className="size-3.5" />
                    Reporte similar encontrado
                  </span>
                  <span className="text-[10px] text-muted-foreground">Hace 2 días</span>
                </div>
                <p className="text-xs font-bold text-foreground">
                  Fuga de agua en lavamanos del baño de niñas
                </p>
                <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-300 font-semibold">
                  <ThumbsUp className="size-3.5" />
                  <span>❤️ 31 estudiantes ya apoyan este reporte</span>
                </div>
              </div>

              {/* Acciones principales */}
              <div className="flex flex-col gap-2 pt-1">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="w-full h-11 rounded-2xl border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-500/10 font-bold text-xs gap-2"
                >
                  <ThumbsUp className="size-4" />
                  Apoyar reporte existente
                </Button>

                <Button
                  onClick={handleCreateNewReport}
                  className="w-full h-11 rounded-2xl bg-primary text-primary-foreground font-bold text-xs gap-2"
                >
                  <span>Crear un nuevo reporte</span>
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {/* PASO 4: FORMULARIO LIMPIO (FOTO PRINCIPAL EN MEMORIA + TÍTULO/UBICACIÓN/DESCRIPCIÓN) */}
          {step === "FORM" && (
            <div className="p-6 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
              {isSuccess ? (
                <div className="py-10 flex flex-col items-center justify-center gap-3 text-center">
                  <div className="size-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center ring-4 ring-emerald-500/20">
                    <Check className="size-9" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">¡Reporte Publicado!</h3>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    La imagen se subió a Supabase Storage y el reporte ingresó al sistema en tiempo real.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitFinal} className="space-y-3.5">
                  {/* Foto principal ocupando gran parte de la pantalla */}
                  <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-black">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Fotografía principal del problema"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 hover:bg-black/80 font-medium"
                    >
                      <RotateCcw className="size-3.5" />
                      Cambiar foto
                    </button>
                  </div>

                  {/* Categoría Sugerida por la IA (Modificable opcionalmente) */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/60 border border-border/60">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <Tag className="size-4 text-primary" />
                      <span>Categoría sugerida por IA:</span>
                    </div>
                    <select
                      value={suggestedCategory}
                      onChange={(e) => setSuggestedCategory(e.target.value)}
                      className="h-8 rounded-xl border border-input bg-background px-2.5 text-xs font-bold text-primary focus-visible:outline-none"
                    >
                      <option>Infraestructura</option>
                      <option>Tecnología</option>
                      <option>Mantenimiento</option>
                      <option>Electricidad</option>
                      <option>Climatización</option>
                      <option>Aseo e Higiene</option>
                    </select>
                  </div>

                  {/* Campos del formulario */}
                  <div className="space-y-1">
                    <label htmlFor="form-title" className="text-xs font-bold text-foreground">
                      Título del problema *
                    </label>
                    <Input
                      id="form-title"
                      placeholder="Ej: Fuga de agua en lavamanos"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="form-location" className="text-xs font-bold text-foreground">
                      Salón o Ubicación exacta *
                    </label>
                    <Input
                      id="form-location"
                      placeholder="Ej: Salón 204 (Bloque B)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      className="rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="form-desc" className="text-xs font-bold text-foreground">
                      Descripción del problema *
                    </label>
                    <Textarea
                      id="form-desc"
                      placeholder="Describe qué ocurrió..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      required
                      className="rounded-xl text-xs sm:text-sm resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsOpen(false)}
                      className="rounded-xl text-xs"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-2xl bg-primary text-primary-foreground text-xs font-extrabold px-5 h-11 gap-1.5"
                    >
                      {isSubmitting ? "Subiendo a Storage..." : "Publicar reporte"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}

        </DialogContent>
      </Dialog>
    </>
  );
};
