/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Heart, 
  Sun, 
  Moon, 
  ChevronDown, 
  PhoneCall, 
  AlertTriangle, 
  Thermometer, 
  Zap, 
  Activity, 
  Backpack,
  MoveRight,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types ---
type Language = "es" | "en" | "pt" | "de" | "fr";

interface TranslationSet {
  header: string;
  darkMode: string;
  protocolTitle: string;
  stop: { title: string; desc: string };
  evaluate: { title: string; desc: string };
  act: { title: string; desc: string };
  stepByStep: string;
  footerText: string;
  footerSub: string;
  sections: {
    [key: string]: {
      title: string;
      protocol: string[];
    };
  };
}

// --- Content Data (Multi-Language) ---
const TRANSLATIONS: Record<Language, TranslationSet> = {
  es: {
    header: "Guía SOS",
    darkMode: "Cambiar modo",
    protocolTitle: "PROTOCOLO CRÍTICO",
    stop: { title: "Detener", desc: "No actúes por impulso. Asegura tu propia seguridad primero." },
    evaluate: { title: "Evaluar", desc: "Analiza el entorno y el estado de la víctima. ¿Hay riesgos inmediatos?" },
    act: { title: "Actuar", desc: "Socorre siguiendo los pasos específicos. Llama a emergencias (112) si hay cobertura." },
    stepByStep: "Paso a paso",
    footerText: "Diseño Offline-First • Guía SOS Montaña",
    footerSub: "Código optimizado para entornos agrestes",
    sections: {
      bites: {
        title: "Mordeduras y Picaduras",
        protocol: [
          "VÍBORAS: No succionar ni cortar. Inmovilizar por debajo del corazón y evacuar.",
          "ARAÑAS: Limpiar con agua y jabón. Aplicar frío local para reducir inflamación.",
          "AVISPAS: Retirar el aguijón si es visible por raspado (no pinzas). Vigilar alergias.",
          "GARRAPATAS: Extraer con pinzas desde la cabeza, sin retorcer. Desinfectar zona.",
          "GENERAL: Identificar animal si es seguro. Evitar remedios caseros como barro o alcohol."
        ]
      },
      fractures: {
        title: "Fracturas y Esguinces",
        protocol: [
          "Inmovilizar la zona en la posición original. No intentar recolocar huesos.",
          "Usa ramas o partes rígidas de la mochila para crear una férula.",
          "Asegura la férula con vendas o ropa, firme pero sin cortar la circulación.",
          "Controla la temperatura y color de los dedos distalmente.",
          "Eleva la zona si no causa dolor excesivo para reducir el edema."
        ]
      },
      thermal: {
        title: "Hipotermia y Calor",
        protocol: [
          "HIPOTERMIA: Retirar ropa húmeda. Envolver en manta térmica y capas secas.",
          "HIPOTERMIA: Dar líquidos calientes y azucarados si está consciente.",
          "GOLPE CALOR: Llevar a la sombra. Aflojar ropa y refrescar con agua.",
          "GOLPE CALOR: Hidratar con sorbos pequeños (agua con sal/electrolitos).",
          "VIGILAR: Nunca dejar sola a una persona con alteración térmica."
        ]
      },
      wounds: {
        title: "Heridas y Hemorragias",
        protocol: [
          "Presionar DIRECTAMENTE sobre la fuente del sangrado con tela limpia.",
          "No retirar apósitos empapados; colocar nuevos encima para mantener el coágulo.",
          "Limpiar la herida con agua potable desde el centro hacia los bordes.",
          "Cerrar con tiras de aproximación si hay separación de bordes.",
          "Torniquete: SOLO en hemorragias incontrolables en extremidades."
        ]
      },
      kit: {
        title: "Kit de Supervivencia (15)",
        protocol: [
          "1. Manta térmica (aluminio)",
          "2. Silbato de alta frecuencia",
          "3. Mechero y cerillas estancas",
          "4. Botiquín (vendas, gasas, antiséptico)",
          "5. Navaja multiusos",
          "6. Linterna frontal + pilas",
          "7. Espejo de señales",
          "8. Pastillas potabilizadoras",
          "9. Brújula y plano físico",
          "10. Cordino/Paracord (5m)",
          "11. Cinta americana (reparaciones)",
          "12. Filtro de agua personal",
          "13. Ración de emergencia (alta caloría)",
          "14. Batería externa (Powerbank)",
          "15. Poncho o funda de vivac"
        ]
      }
    }
  },
  en: {
    header: "SOS Guide",
    darkMode: "Toggle mode",
    protocolTitle: "CRITICAL PROTOCOL",
    stop: { title: "Stop", desc: "Don't act on impulse. Ensure your own safety first." },
    evaluate: { title: "Evaluate", desc: "Analyze the environment and victim status. Are there immediate risks?" },
    act: { title: "Act", desc: "Help following specific steps. Call emergency services (911/112) if covered." },
    stepByStep: "Step by step",
    footerText: "Offline-First Design • Mountain SOS Guide",
    footerSub: "Code optimized for wilderness environments",
    sections: {
      bites: {
        title: "Bites and Stings",
        protocol: [
          "VIPERS: Do not suck or cut. Immobilize below heart level and evacuate.",
          "SPIDERS: Clean with soap and water. Apply local cold to reduce swelling.",
          "WASPS: Remove stinger if visible by scraping (not tweezers). Watch for allergies.",
          "TICKS: Extract with tweezers from the head, without twisting. Disinfect area.",
          "GENERAL: Identify animal if safe. Avoid home remedies like mud or alcohol."
        ]
      },
      fractures: {
        title: "Fractures and Sprains",
        protocol: [
          "Immobilize the area in the original position. Do not try to reset bones.",
          "Use branches or rigid parts of the backpack to create a splint.",
          "Secure the splint with bandages or clothing, firm but not cutting circulation.",
          "Check temperature and color of distal fingers.",
          "Elevate the area if it doesn't cause excessive pain to reduce edema."
        ]
      },
      thermal: {
        title: "Hypothermia and Heat",
        protocol: [
          "HYPOTHERMIA: Remove wet clothes. Wrap in thermal blanket and dry layers.",
          "HYPOTHERMIA: Give warm, sugary liquids if conscious.",
          "HEATSTROKE: Move to shade. Loosen clothes and cool with water.",
          "HEATSTROKE: Hydrate with small sips (water with salt/electrolytes).",
          "WATCH: Never leave a person with thermal alteration alone."
        ]
      },
      wounds: {
        title: "Wounds and Bleeding",
        protocol: [
          "Press DIRECTLY on the source of bleeding with clean cloth.",
          "Do not remove soaked dressings; place new ones on top to keep the clot.",
          "Clean the wound with drinking water from the center towards the edges.",
          "Close with steri-strips if there is edge separation.",
          "Tourniquet: ONLY for uncontrollable bleeding in limbs."
        ]
      },
      kit: {
        title: "Survival Kit (15 items)",
        protocol: [
          "1. Thermal space blanket",
          "2. High-frequency whistle",
          "3. Lighter and waterproof matches",
          "4. First aid kit (bandages, gauze, antiseptic)",
          "5. Multi-tool knife",
          "6. Headlamp + spare batteries",
          "7. Signal mirror",
          "8. Water purification tablets",
          "9. Compass and physical map",
          "10. Paracord (5m)",
          "11. Duct tape (repairs)",
          "12. Personal water filter",
          "13. Emergency ration (high calorie)",
          "14. Powerbank",
          "15. Poncho or bivy sack"
        ]
      }
    }
  },
  pt: {
    header: "Guia SOS",
    darkMode: "Alternar modo",
    protocolTitle: "PROTOCOLO CRÍTICO",
    stop: { title: "Parar", desc: "Não aja por impulso. Garanta sua própria segurança primeiro." },
    evaluate: { title: "Avaliar", desc: "Analise o ambiente e o estado da vítima. Há riscos imediatos?" },
    act: { title: "Agir", desc: "Socorra seguindo os passos específicos. Ligue para emergências (112) se houver cobertura." },
    stepByStep: "Passo a passo",
    footerText: "Design Offline-First • Guia SOS Montanha",
    footerSub: "Código otimizado para ambientes selvagens",
    sections: {
      bites: {
        title: "Mordidas e Picadas",
        protocol: [
          "VÍBORAS: Não sugue nem corte. Imobilize abaixo do coração e evacue.",
          "ARANHAS: Limpe com água e sabão. Aplique frio local para reduzir inflamação.",
          "VESPAS: Remova o ferrão se visível raspando (não use pinças). Vigie alergias.",
          "CARRAPATOS: Extraia com pinça pela cabeça, sem torcer. Desinfete a zona.",
          "GERAL: Identifique o animal se for seguro. Evite remédios caseiros como lama."
        ]
      },
      fractures: {
        title: "Fraturas e Entorses",
        protocol: [
          "Imobilize a zona na posição original. Não tente colocar ossos no lugar.",
          "Use galhos ou partes rígidas da mochila para criar uma tala.",
          "Prenda a tala com ligaduras ou roupa, firme sem cortar a circulação.",
          "Controle a temperatura e cor dos dedos distalmente.",
          "Eleve a zona se não causar dor excessiva para reduzir o edema."
        ]
      },
      thermal: {
        title: "Hipotermia e Calor",
        protocol: [
          "HIPOTERMIA: Retire roupa húmida. Envolva em manta térmica e camadas secas.",
          "HIPOTERMIA: Dê líquidos quentes e açucarados se estiver consciente.",
          "GOLPE DE CALOR: Leve para a sombra. Desaperte a roupa e refresque com água.",
          "GOLPE DE CALOR: Hidrate com pequenos goles (água com sal/eletrólitos).",
          "VIGIAR: Nunca deixe sozinha uma pessoa com alteração térmica."
        ]
      },
      wounds: {
        title: "Feridas e Hemorragias",
        protocol: [
          "Pressione DIRETAMENTE a fonte do sangramento com pano limpo.",
          "Não retire curativos encharcados; coloque novos por cima.",
          "Limpe a ferida com água potável do centro para as bordas.",
          "Feche com tiras de aproximação se as bordas estiverem separadas.",
          "Torniquete: APENAS em hemorragias incontroláveis nos membros."
        ]
      },
      kit: {
        title: "Kit de Sobrevivência (15)",
        protocol: [
          "1. Manta térmica de alumínio",
          "2. Apito de alta frequência",
          "3. Isqueiro e fósforos impermeáveis",
          "4. Kit primeiro socorros (gazes, antisséptico)",
          "5. Canivete multiusos",
          "6. Lanterna frontal + pilhas",
          "7. Espelho de sinalização",
          "8. Pastilhas purificadoras de água",
          "9. Bússola e mapa físico",
          "10. Paracord (5m)",
          "11. Fita adesiva (reparações)",
          "12. Filtro de água pessoal",
          "13. Ração de emergência",
          "14. Powerbank",
          "15. Poncho ou saco de vivac"
        ]
      }
    }
  },
  de: {
    header: "Notfall-Guide",
    darkMode: "Modus wechseln",
    protocolTitle: "KRITISCHES PROTOKOLL",
    stop: { title: "Stopp", desc: "Handeln Sie nicht impulsiv. Sorgen Sie zuerst für Ihre Sicherheit." },
    evaluate: { title: "Bewerten", desc: "Analysieren Sie die Umgebung und den Zustand des Opfers." },
    act: { title: "Handeln", desc: "Helfen Sie nach Plan. Rufen Sie den Notruf (112) an." },
    stepByStep: "Schritt für Schritt",
    footerText: "Offline-First Design • Bergnotfall-Guide",
    footerSub: "Code optimiert für Wildnisumgebungen",
    sections: {
      bites: {
        title: "Bisse und Stiche",
        protocol: [
          "OTTERN: Nicht aussaugen oder schneiden. Unter Herzmonat ruhigstellen.",
          "SPINNEN: Mit Wasser und Seife reinigen. Kälte anwenden gegen Schwellung.",
          "WESPEN: Stachel durch Schaben entfernen. Auf Allergien achten.",
          "ZECKEN: Mit Pinzette am Kopf ohne Drehen herausziehen. Desinfizieren.",
          "ALLGEMEIN: Tier identifizieren, falls sicher. Keine Hausmittel (Schlamm)."
        ]
      },
      fractures: {
        title: "Brüche und Verstauchungen",
        protocol: [
          "In Originalposition ruhigstellen. Knochen nicht einrenken.",
          "Zweige oder Rucksackteile als Schiene verwenden.",
          "Schiene fest fixieren, ohne den Blutfluss zu unterbrechen.",
          "Temperatur und Farbe der Finger kontrollieren.",
          "Bereich hochlagern, falls schmerzfrei möglich (Ödemreduktion)."
        ]
      },
      thermal: {
        title: "Unterkühlung und Hitze",
        protocol: [
          "UNTERKÜHLUNG: Nasse Kleidung ausziehen. In Rettungsdecke wickeln.",
          "UNTERKÜHLUNG: Warme, zuckerhaltige Getränke geben (falls wach).",
          "HITZESCHLAG: In den Schatten bringen. Kleidung lockern, kühlen.",
          "HITZESCHLAG: In kleinen Schlucken hydrieren (Elektrolyte).",
          "ACHTUNG: Person mit Temperaturschock nie allein lassen."
        ]
      },
      wounds: {
        title: "Wunden und Blutungen",
        protocol: [
          "DIREKT mit sauberem Tuch auf die Blutung drücken.",
          "Eingeweichte Verbände nicht entfernen; neue darüber legen.",
          "Wunde mit Trinkwasser von innen nach außen reinigen.",
          "Bei klaffenden Wunden mit Klebestreifen verschließen.",
          "Abbinden: NUR bei lebensbedrohlichen Blutungen an Extremitäten."
        ]
      },
      kit: {
        title: "Überlebenskit (15)",
        protocol: [
          "1. Rettungsdecke",
          "2. Hochfrequenz-Pfeife",
          "3. Feuerzeug / Sturmstreichhölzer",
          "4. Erste-Hilfe-Set (Mull, Desinfektion)",
          "5. Mehrzweckmesser",
          "6. Stirnlampe + Ersatzbatterien",
          "7. Signalspiegel",
          "8. Wasserreinigungstabletten",
          "9. Kompass und physische Karte",
          "10. Paracord (5m)",
          "11. Panzertape (Reparaturen)",
          "12. Wasserfilter",
          "13. Notration (kalorienreich)",
          "14. Powerbank",
          "15. Poncho / Biwaksack"
        ]
      }
    }
  },
  fr: {
    header: "Guide SOS",
    darkMode: "Changer mode",
    protocolTitle: "PROTOCOLE CRITIQUE",
    stop: { title: "Arrêter", desc: "N'agissez pas par impulsion. Assurez d'abord votre sécurité." },
    evaluate: { title: "Évaluer", desc: "Analysez l'environnement et l'état de la victime." },
    act: { title: "Agir", desc: "Secourez selon les étapes. Appelez les secours (112)." },
    stepByStep: "Étape par étape",
    footerText: "Design Offline-First • Guide SOS Montagne",
    footerSub: "Code optimisé pour les milieux sauvages",
    sections: {
      bites: {
        title: "Morsures et Piqûres",
        protocol: [
          "VIPÈRES: Ne pas aspirer ni couper. Immobiliser sous le cœur et évacuer.",
          "ARAIGNÉES: Nettoyer à l'eau et au savon. Appliquer du froid local.",
          "GUÊPES: Retirer le dard par grattage (pas de pince). Surveiller les allergies.",
          "TIQUES: Extraire avec une pince par la tête, sans tordre. Désinfecter.",
          "GÉNÉRAL: Identifier l'animal si possible. Éviter les remèdes maison (boue)."
        ]
      },
      fractures: {
        title: "Fractures et Entorses",
        protocol: [
          "Immobiliser dans la position d'origine. Ne pas réduire les fractures.",
          "Utiliser des branches ou des parties du sac pour créer une attelle.",
          "Fixer l'attelle fermement sans couper la circulation.",
          "Vérifier la chaleur et la couleur des doigts.",
          "Surélever si possible sans douleur excessive pour réduire l'œdème."
        ]
      },
      thermal: {
        title: "Hypothermie et Chaleur",
        protocol: [
          "HYPOTHERMIE: Retirer habits mouillés. Envelopper dans couverture survie.",
          "HYPOTHERMIA: Boissons chaudes et sucrées si conscient.",
          "COUP DE CHALEUR: Mettre à l'ombre. Desserrer habits et rafraîchir.",
          "COUP DE CHALEUR: Hydrater par petites gorgées (eau + sel).",
          "SURVEILLER: Ne jamais laisser seule une personne en choc thermique."
        ]
      },
      wounds: {
        title: "Plaies et Hémorragies",
        protocol: [
          "Appuyer DIRECTEMENT sur le saignement avec un linge propre.",
          "Ne pas retirer les pansements imbibés; en ajouter dessus.",
          "Nettoyer la plaie à l'eau potable du centre vers les bords.",
          "Fermer avec des bandelettes si les bords sont écartés.",
          "Garrot: UNIQUEMENT pour hémorragies massives aux membres."
        ]
      },
      kit: {
        title: "Kit Survie (15 items)",
        protocol: [
          "1. Couverture de survie",
          "2. Sifflet haute fréquence",
          "3. Briquet et allumettes étanches",
          "4. Trousse soins (bandes, désinfectant)",
          "5. Couteau multifonctions",
          "6. Lampe frontale + piles",
          "7. Miroir de signalisation",
          "8. Pastilles purification d'eau",
          "9. Boussole et carte physique",
          "10. Paracorde (5m)",
          "11. Ruban adhésif (réparations)",
          "12. Filtre à eau personnel",
          "13. Ration d'urgence (calorique)",
          "14. Batterie externe",
          "15. Poncho ou sac de bivouac"
        ]
      }
    }
  }
};

export default function App() {
  const [showCover, setShowCover] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lang, setLang] = useState<Language>("es");
  const [openSection, setOpenSection] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];

  // Apply theme to body
  useEffect(() => {
    document.body.className = isDarkMode ? "bg-black" : "bg-neutral-100";
  }, [isDarkMode]);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const getIcon = (id: string) => {
    switch(id) {
      case "bites": return <Zap className="w-6 h-6" />;
      case "fractures": return <Activity className="w-6 h-6" />;
      case "thermal": return <Thermometer className="w-6 h-6" />;
      case "wounds": return <AlertTriangle className="w-6 h-6" />;
      case "kit": return <Backpack className="w-6 h-6" />;
      default: return <Activity className="w-6 h-6" />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
      <AnimatePresence>
        {showCover && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center select-none overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-neutral-100'}`}
          >
            {/* Atmospheric Background */}
            {isDarkMode && (
              <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-red-950/40 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-red-900/20 blur-[120px]" />
              </div>
            )}

            <div className="relative z-10 max-w-sm w-full">
              <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-12"
              >
                <div className="relative inline-block">
                  <Heart className="w-20 h-20 text-red-600 mx-auto drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]" fill="currentColor" />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-red-600 rounded-full blur-2xl -z-10"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                  <span className="block mb-2 text-sm font-bold tracking-[0.3em] opacity-40">Survival Manual</span>
                  Guía de campo <br />
                  <span className="text-red-600">de primeros auxilios</span> <br />
                  y supervivencia <br />
                  <span className="text-xl font-medium tracking-[0.4em] block mt-6 opacity-60">raulif</span>
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="w-12 h-[1px] bg-red-600 mx-auto mb-8"
              />
              
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xs opacity-50 mb-12 uppercase tracking-[0.25em] font-medium max-w-[280px] mx-auto leading-loose"
              >
                Protocolos tácticos para exploradores y aventureros
              </motion.p>
              
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCover(false)}
                className={`group flex items-center justify-center gap-3 w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl border-2 ${
                  isDarkMode 
                    ? 'bg-transparent border-red-600 text-red-500 hover:bg-red-600 hover:text-white shadow-red-900/20' 
                    : 'bg-black border-black text-white hover:bg-neutral-800'
                }`}
              >
                Acceder a la guía
                <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-10 text-[9px] uppercase tracking-[0.4em] font-bold"
            >
              Field Tested • Edition 2026
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className={`sticky top-0 z-20 px-6 py-4 border-b transition-colors ${isDarkMode ? "bg-black/80 border-neutral-800 backdrop-blur-md" : "bg-white/80 border-neutral-200 backdrop-blur-md"}`}>
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="text-red-500 w-6 h-6" fill="currentColor" />
            <h1 className="font-bold text-xl tracking-tight uppercase">{t.header}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className={`relative flex items-center gap-1 p-1 rounded-lg border ${isDarkMode ? "bg-neutral-900 border-neutral-800" : "bg-neutral-100 border-neutral-200"}`}>
              <Globe className="w-4 h-4 text-neutral-500 ml-1" />
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-transparent text-xs font-bold uppercase focus:outline-none pr-1 appearance-none cursor-pointer"
                style={{ paddingRight: '0' }}
              >
                <option value="es">ES</option>
                <option value="en">EN</option>
                <option value="pt">PT</option>
                <option value="de">DE</option>
                <option value="fr">FR</option>
              </select>
            </div>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all active:scale-95 ${isDarkMode ? "bg-neutral-800 text-yellow-400" : "bg-neutral-200 text-neutral-600"}`}
              aria-label={t.darkMode}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 py-8 max-w-md mx-auto">
        {/* Protocolo General */}
        <section className={`mb-10 p-6 rounded-2xl transition-all ${isDarkMode ? "bg-neutral-900 border border-neutral-800 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "bg-white border border-neutral-200 shadow-sm"}`}>
          <h2 className="flex items-center gap-2 text-red-500 font-bold mb-6 text-lg">
            <PhoneCall className="w-5 h-5" />
            {t.protocolTitle}
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold text-white">1</div>
              <div>
                <h3 className="font-bold uppercase text-sm mb-1">{t.stop.title}</h3>
                <p className="text-sm opacity-80">{t.stop.desc}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold text-white">2</div>
              <div>
                <h3 className="font-bold uppercase text-sm mb-1">{t.evaluate.title}</h3>
                <p className="text-sm opacity-80">{t.evaluate.desc}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold text-white">3</div>
              <div>
                <h3 className="font-bold uppercase text-sm mb-1">{t.act.title}</h3>
                <p className="text-sm opacity-80">{t.act.desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categorías (Acordeón) */}
        <div className="space-y-3">
          {Object.entries(t.sections).map(([id, section]) => (
            <div 
              key={id} 
              className={`rounded-2xl border transition-all ${
                isDarkMode 
                  ? "bg-neutral-900/50 border-neutral-800" 
                  : "bg-white border-neutral-200 shadow-sm hover:border-neutral-300"
              }`}
            >
              <button
                onClick={() => toggleSection(id)}
                className="w-full flex items-center justify-between p-5 min-h-[64px]"
                aria-expanded={openSection === id}
              >
                <div className="flex items-center gap-4">
                  <span className={`p-2 rounded-lg ${isDarkMode ? "bg-neutral-800 text-neutral-400" : "bg-neutral-100 text-neutral-600"}`}>
                    {getIcon(id)}
                  </span>
                  <span className="font-bold text-left leading-tight">{section.title}</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${openSection === id ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {openSection === id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={`px-5 pb-5 pt-0 text-sm space-y-4 border-t ${isDarkMode ? "border-neutral-800" : "border-neutral-100"}`}>
                      <h4 className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest text-red-500 mt-4">
                        {t.stepByStep} <MoveRight className="w-3 h-3" />
                      </h4>
                      <ul className="space-y-3">
                        {section.protocol.map((step, idx) => (
                          <li key={idx} className="flex gap-3 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                            <span className="opacity-90">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-12 px-6 py-10 text-center border-t ${isDarkMode ? "border-neutral-800 text-neutral-500" : "border-neutral-200 text-neutral-400"}`}>
        <p className="text-xs mb-2 font-medium">{t.footerText}</p>
        <p className="text-[10px] uppercase tracking-widest opacity-50">{t.footerSub}</p>
      </footer>
    </div>
  );
}
