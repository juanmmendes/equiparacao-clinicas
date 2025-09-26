import React, { useMemo, useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  FileText,
  ClipboardList,
  ShieldCheck,
  BookOpen,
  Scale,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import logoImage from "./assets/Logo.png";
import hospitalImage from "./assets/hospital-optimized.jpg";
import officeImage from "./assets/escritorio.jpg";

// ---------- helpers (animation, layout, UI) ----------
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
  viewport: { once: true, amount: 0.25 },
};

const stagger = {
  initial: {},
  whileInView: {},
  viewport: { once: true, amount: 0.2 },
};

const containerCx = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

const GradientBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-600 to-sky-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md sm:text-sm">
    {children}
  </span>
);

const PrimaryButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}> = ({ children, href, onClick, ariaLabel, type }) => {
  const className =
    "inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:from-emerald-700 hover:to-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600";
  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className={className}>
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} aria-label={ariaLabel} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const SecondaryButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
}> = ({ children, href, onClick, ariaLabel }) => {
  const className =
    "inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600";
  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className={className}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" aria-label={ariaLabel} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

// ---------- logo ----------
const Logo: React.FC<{ src?: string; alt?: string; className?: string }> = ({ src, alt = "Marinho Mendes Advogados", className }) => {
  if (src && src.trim().length > 0) {
    return <img src={src} alt={alt} className={`${className ?? "h-8 w-auto"} object-contain`} />;
  }
  return <div className={`${className ?? "h-8 w-8"} rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500`} aria-hidden />;
};

// ---------- page ----------
export default function EquiparacaoClinicaHospital(): React.JSX.Element {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    tipo: "",
    mensagem: "",
  });

  const faq = useMemo(
    () => [
      {
        q: "O que é a equiparação de clínica a hospital?",
        a: "É a possibilidade de determinadas clínicas e centros de saúde, quando atendem critérios técnicos (estrutura assistencial, equipe multidisciplinar, cumprimento de normas sanitárias, entre outros), serem reconhecidos para fins tributários como prestadores de 'serviços hospitalares', com efeitos específicos no IRPJ e na CSLL. Trata-se de matéria técnico-jurídica que exige análise documental criteriosa.",
      },
      {
        q: "Quais critérios são frequentemente avaliados?",
        a: "Entre outros: natureza empresária; licenças e alvarás sanitários válidos; equipe multiprofissional; infraestrutura adequada a procedimentos e/ou internações; protocolos assistenciais; observância de normas técnicas da vigilância sanitária (como RDCs aplicáveis).",
      },
      {
        q: "A equiparação é automática?",
        a: "Não. Depende de diagnóstico técnico, organização documental e estratégia jurídico-tributária adequada, sempre sob abordagem ética e conforme a legislação vigente.",
      },
      {
        q: "Existe promessa de resultado?",
        a: "Não oferecemos qualquer garantia de êxito. Cada caso é singular e a atuação é informativa, responsável e alinhada às normas éticas da advocacia.",
      },
      {
        q: "Como iniciar?",
        a: "Preencha o formulário com consentimento LGPD. Nossa equipe avaliará as informações para verificar a pertinência de uma avaliação inicial e, se for o caso, retornará para agendamento conforme disponibilidade.",
      },
    ],
    []
  );

  function toggleFaq(idx: number) {
    setOpenFaq((cur) => (cur === idx ? null : idx));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors(null);
    if (!consent) {
      setErrors("Para enviar, é necessário consentir com o tratamento dos dados (LGPD).");
      return;
    }
    // Simulação de envio. Integre com backend/automação conforme necessidade.
    setSubmitted(true);
  }

  const whatsHref = "https://wa.me/5519974100605?text=Olá%20equipe%20Marinho%20Mendes,%20gostaria%20de%20uma%20avaliação%20inicial%20sobre%20equiparação%20de%20clínica%20e%20hospital.";

  // ---------- lightweight runtime self-checks (DEV only) ----------
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      console.assert(whatsHref.includes("wa.me"), "WhatsApp href deve conter wa.me");
      const el = document.getElementById("contato");
      console.assert(!!el, "Seção de contato deve existir");
    } catch (_) {
      // noop: apenas utilidade de desenvolvimento
    }
  }, []);

  return (
    <div className="min-h-screen scroll-smooth bg-white text-gray-800 antialiased" data-testid="landing-root">
      {/* Sticky topbar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur" data-testid="topbar">
        <div className={`${containerCx} flex h-16 items-center justify-between`}>
          <a href="#top" className="flex items-center gap-3" aria-label="Ir para o topo">
            <Logo src={logoImage} alt="Marinho Mendes Advogados" className="h-9 w-auto lg:h-12" />
            <span className="text-sm font-semibold tracking-wide text-gray-900 lg:text-base">
              Marinho Mendes Advogados
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            <SecondaryButton href="#contato" ariaLabel="Ir ao formulário">
              Avaliação inicial
            </SecondaryButton>
            <PrimaryButton href={whatsHref} ariaLabel="Abrir WhatsApp">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Falar no WhatsApp
            </PrimaryButton>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Abrir menu"
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white p-2 text-gray-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {/* Mobile panel */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className={`${containerCx} py-3`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Menu</span>
                <button
                  type="button"
                  aria-label="Fechar menu"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white p-2 text-gray-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <div className="mt-3 grid gap-2">
                <a href="#educativo-heading" className="rounded-xl px-3 py-2 text-sm text-gray-800 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Conteúdo</a>
                <a href="#como-ajudamos-heading" className="rounded-xl px-3 py-2 text-sm text-gray-800 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Como ajudamos</a>
                <a href="#faq-heading" className="rounded-xl px-3 py-2 text-sm text-gray-800 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>FAQ</a>
                <a href="#contato" className="rounded-xl px-3 py-2 text-sm text-gray-800 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Contato</a>
                <a href={whatsHref} className="rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm" onClick={() => setMobileOpen(false)}>Falar no WhatsApp</a>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden" data-testid="hero">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-sky-50 to-white" aria-hidden />
        <div className={`${containerCx} py-16 sm:py-20 lg:py-24`}>
          <div className="mx-auto max-w-4xl text-center">
            <motion.div {...fadeInUp}>
              <GradientBadge>Marinho Mendes Advogados</GradientBadge>
            </motion.div>
            <motion.h1
              className="mt-6 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
              {...fadeInUp}
            >
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-sky-500 bg-clip-text text-transparent">
                Equiparação de Clínica e Hospital
              </span>
            </motion.h1>
            <motion.p className="mt-6 text-lg leading-8 text-gray-700" {...fadeInUp}>
              Abordagem técnico-jurídica, ética e responsável para clínicas e centros de saúde que buscam o enquadramento fiscal correto.
            </motion.p>
            <motion.p className="mt-3 text-base leading-7 text-gray-600" {...fadeInUp}>
              Conteúdo informativo sobre critérios técnicos, conformidade regulatória e documentação essencial para decisões seguras.
            </motion.p>
            <motion.ul
              className="mx-auto mt-6 grid max-w-2xl gap-3 text-left sm:grid-cols-2"
              {...stagger}
            >
              {[
                { icon: ShieldCheck, text: "Conformidade com normas éticas (Provimento 205/2021)" },
                { icon: BookOpen, text: "Base legal descrita de forma objetiva (sem casos concretos)" },
                { icon: ClipboardList, text: "Diagnóstico documental e parecer técnico-jurídico" },
                { icon: Scale, text: "Linguagem formal e precisa, sem promessas de resultado" },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  {...fadeInUp}
                  className="flex items-start gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                >
                  <item.icon className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden />
                  <span className="text-sm text-gray-800">{item.text}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" {...fadeInUp}>
              <PrimaryButton href="#contato" ariaLabel="Ir ao formulário">
                Quero uma avaliação inicial <ArrowRight className="h-4 w-4" aria-hidden />
              </PrimaryButton>
              <SecondaryButton href={whatsHref} ariaLabel="Abrir WhatsApp">
                <MessageCircle className="h-4 w-4" aria-hidden /> Falar no WhatsApp
              </SecondaryButton>
            </motion.div>
            {/* Imagem distribuida 1 (abaixo do hero) */}
            <motion.div className="mt-10" {...fadeInUp}>
              <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
                  <img src={hospitalImage} alt="Imagem institucional (hero)" className="h-full w-full object-cover" loading="eager" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conteúdo educativo */}
      <section className="border-t border-gray-200 bg-white" aria-labelledby="educativo-heading" data-testid="educativo">
        <div className={`${containerCx} py-14 lg:py-16`}>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <motion.h2 id="educativo-heading" className="text-2xl font-bold text-gray-900" {...fadeInUp}>
                O que é a equiparação
              </motion.h2>
              <motion.p className="mt-3 text-gray-700" {...fadeInUp}>
                Em termos tributários, determinadas clínicas e entidades de saúde, quando atendem a
                requisitos técnicos, podem ser enquadradas como prestadoras de <em>serviços
                hospitalares</em>. Essa qualificação, quando juridicamente cabível, produz efeitos
                específicos na apuração do IRPJ e da CSLL. A análise é sempre casuística, documental e
                técnica.
              </motion.p>

              <motion.h3 className="mt-8 text-lg font-semibold text-gray-900" {...fadeInUp}>
                Critérios técnicos frequentemente observados
              </motion.h3>
              <motion.ul className="mt-3 space-y-2" {...stagger}>
                {[
                  "Sociedade empresária regularmente constituída;",
                  "Alvará/licença da Vigilância Sanitária e licença de funcionamento vigentes;",
                  "Equipe multidisciplinar e protocolos assistenciais;",
                  "Instalações, equipamentos e processos compatíveis com serviços de maior complexidade;",
                  "Observância de normas sanitárias aplicáveis (p.ex., RDCs da Anvisa);",
                  "Documentação técnica que descreva a natureza assistencial das atividades.",
                ].map((t, i) => (
                  <motion.li key={i} {...fadeInUp} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden />
                    <span className="text-sm text-gray-800">{t}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <div>
              <motion.h3 className="text-lg font-semibold text-gray-900" {...fadeInUp}>
                Base legal (descrição objetiva)
              </motion.h3>
              <motion.div className="mt-3 space-y-3 text-gray-700" {...stagger}>
                <motion.p {...fadeInUp}>
                  • <strong>IRPJ/CSLL:</strong> a legislação estabelece percentuais específicos de base de
                  cálculo para <em>serviços hospitalares</em> (art. 15, §1º, III, "a", da Lei 9.249/1995, e
                  normas correlatas). A interpretação do termo é de natureza objetiva, conforme
                  jurisprudência consolidada.
                </motion.p>
                <motion.p {...fadeInUp}>
                  • <strong>Ética e Publicidade:</strong> comunicação informativa, sem promessa de resultado e
                  sem mercantilismo, em conformidade com o Provimento 205/2021 da OAB.
                </motion.p>
                <motion.p {...fadeInUp}>
                  • <strong>Proteção de Dados:</strong> coleta e tratamento de dados pessoais observam a LGPD
                  (Lei 13.709/2018), com consentimento livre e informado.
                </motion.p>
                <motion.div {...fadeInUp} className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-700">
                  Este conteúdo é informativo e não substitui análise jurídica individualizada.
                  Não constitui publicidade comparativa, não exibe casos concretos, tampouco promete
                  resultados.
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Como ajudamos */}
      <section className="border-t border-gray-200 bg-gradient-to-b from-white to-sky-50" aria-labelledby="como-ajudamos-heading" data-testid="como-ajudamos">
        <div className={`${containerCx} py-14 lg:py-16`}>
          <motion.h2 id="como-ajudamos-heading" className="text-2xl font-bold text-gray-900" {...fadeInUp}>
            Como ajudamos (linguagem informativa e ética)
          </motion.h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ClipboardList,
                title: "Diagnóstico documental",
                desc: "Verificação objetiva de requisitos técnicos e regulatórios, com checklist e apontamentos de conformidade.",
              },
              {
                icon: FileText,
                title: "Parecer técnico-jurídico",
                desc: "Análise normativa e orientação sobre viabilidade do enquadramento como 'serviços hospitalares'.",
              },
              {
                icon: ShieldCheck,
                title: "Plano de adequação",
                desc: "Recomendações práticas para ajustes organizacionais e compliance, resguardando a segurança jurídica.",
              },
            ].map((c, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                {...fadeInUp}
              >
                <div className="flex items-center gap-3">
                  <c.icon className="h-6 w-6 text-emerald-600" aria-hidden />
                  <h3 className="text-base font-semibold text-gray-900">{c.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-700">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-200 bg-white" aria-labelledby="faq-heading" data-testid="faq">
        <div className={`${containerCx} py-14 lg:py-16`}>
          <motion.h2 id="faq-heading" className="text-2xl font-bold text-gray-900" {...fadeInUp}>
            Perguntas frequentes (FAQ)
          </motion.h2>
          <div className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
            {faq.map((item, idx) => (
              <div key={idx}>
                <button
                  className="flex w-full items-center justify-between gap-3 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  aria-expanded={openFaq === idx}
                  onClick={() => toggleFaq(idx)}
                >
                  <span className="text-sm font-medium text-gray-900">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${openFaq === idx ? "rotate-180" : "rotate-0"}`}
                    aria-hidden
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-sm text-gray-700">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre o Escritório */}
      <section className="border-t border-gray-200 bg-gradient-to-b from-white to-emerald-50" aria-labelledby="sobre-heading" data-testid="sobre">
        <div className={`${containerCx} py-14 lg:py-16`}>
          <motion.h2 id="sobre-heading" className="text-2xl font-bold text-gray-900" {...fadeInUp}>
            Sobre o Escritório
          </motion.h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <motion.div {...fadeInUp} className="space-y-3 text-gray-700">
              {/* Imagem do escritório (institucional) */}
              <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100">
                  <img src={officeImage} alt="Escritório Marinho Mendes (imagem institucional)" className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
              <p>
                Marinho Mendes Sociedade de Advogados é um escritório independente, com atuação
                diversificada e compromisso com excelência técnica e ética. O atendimento é realizado
                mediante agendamento, com foco em orientação responsável e sob estrita conformidade
                legal.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">Canais oficiais</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><Globe className="h-4 w-4" aria-hidden /> <a className="underline-offset-2 hover:underline" href="https://marinhomendes.adv.br">marinhomendes.adv.br</a></li>
                    <li className="flex items-center gap-2"><Globe className="h-4 w-4" aria-hidden /> <a className="underline-offset-2 hover:underline" href="https://marinhomendes.adv.br/blog">marinhomendes.adv.br/blog</a></li>
                    <li className="flex items-center gap-2"><Mail className="h-4 w-4" aria-hidden /> <a className="underline-offset-2 hover:underline" href="mailto:adm@marinhomendes.adv.br">adm@marinhomendes.adv.br</a></li>
                    <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" aria-hidden /> <a className="underline-offset-2 hover:underline" href={whatsHref}>+55 (19) 97410-0605</a></li>
                    <li className="flex items-center gap-2"><Phone className="h-4 w-4" aria-hidden /> <span>(19) 3845-4946 | (19) 3209-0417</span></li>
                  </ul>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <h3 className="mb-2 text-sm font-semibold text-gray-900">Endereços</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" aria-hidden />
                      <span>
                        <strong>Campinas:</strong> Av. José Rocha Bonfim, 214, Bloco J – Sala 228 – Ed. Milão, Praça Capital, Loteamento Center Santa Genebra, CEP 13080-650. Fone: (19) 3209-0417.
                      </span>
                    </li>
                    <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" aria-hidden />
                      <span>
                        <strong>Hortolândia:</strong> Rua Antônio Nelson Barbosa, 93 – Jardim do Bosque, CEP 13186-231. Fone/Fax: (19) 3845-4946.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h3 className="mb-2 text-sm font-semibold text-gray-900">Redes oficiais</h3>
                <ul className="flex flex-wrap items-center gap-4 text-sm">
                  <li className="flex items-center gap-1"><Facebook className="h-4 w-4" aria-hidden /> <a className="underline-offset-2 hover:underline" href="https://www.facebook.com/marinhomendesadv">/marinhomendesadv</a></li>
                  <li className="flex items-center gap-1"><Instagram className="h-4 w-4" aria-hidden /> <a className="underline-offset-2 hover:underline" href="https://www.instagram.com/marinhomendesadv">@marinhomendesadv</a></li>
                  <li className="flex items-center gap-1"><Linkedin className="h-4 w-4" aria-hidden /> <a className="underline-offset-2 hover:underline" href="https://www.linkedin.com/company/14030512/">company/14030512</a></li>
                </ul>
                <p className="mt-2 text-xs text-gray-600">Horário: Atendimento mediante agendamento.</p>
              </div>
            </motion.div>

            {/* Formulário */}
            <motion.div id="contato" {...fadeInUp} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" data-testid="formulario">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulário de avaliação inicial">
                  <h3 className="text-lg font-semibold text-gray-900">Solicitar avaliação inicial</h3>
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-900">Nome</label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      required
                      className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      placeholder="Seu nome completo"
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-900">E-mail</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-900">WhatsApp</label>
                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        inputMode="tel"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        placeholder="(+55) 19 9xxxx-xxxx"
                        value={form.whatsapp}
                        onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="tipo" className="block text-sm font-medium text-gray-900">Tipo de estabelecimento</label>
                    <select
                      id="tipo"
                      name="tipo"
                      className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      value={form.tipo}
                      onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                    >
                      <option value="">Selecione…</option>
                      <option>Clínica médica</option>
                      <option>Centro de especialidades</option>
                      <option>Laboratório/diagnóstico</option>
                      <option>Hospital-dia</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium text-gray-900">Mensagem</label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={4}
                      className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      placeholder="Compartilhe informações relevantes (opcional)."
                      value={form.mensagem}
                      onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                    />
                    <label htmlFor="consent" className="text-xs text-gray-700">
                      Autorizo o tratamento dos meus dados pessoais para finalidade de contato e
                      avaliação inicial, nos termos da LGPD (Lei 13.709/2018). Posso revogar este
                      consentimento a qualquer tempo.
                    </label>
                  </div>

                  <p className="text-xs text-gray-600">
                    Aviso: este formulário não estabelece relação advogado-cliente. O atendimento
                    é realizado mediante agendamento e confirmação de disponibilidade.
                  </p>

                  {errors && (
                    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800">
                      {errors}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <PrimaryButton type="submit" ariaLabel="Enviar formulário">
                      <span>Enviar</span>
                    </PrimaryButton>
                    <SecondaryButton href={whatsHref} ariaLabel="Abrir WhatsApp">
                      <MessageCircle className="h-4 w-4" aria-hidden /> Falar no WhatsApp
                    </SecondaryButton>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden />
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">Formulário enviado</h3>
                  <p className="mt-1 text-sm text-gray-700">
                    Recebemos suas informações com sucesso. Entraremos em contato conforme a disponibilidade
                    e a pertinência da demanda.
                  </p>
                  <div className="mt-4">
                    <SecondaryButton onClick={() => { setSubmitted(false); setForm({ nome: "", email: "", whatsapp: "", tipo: "", mensagem: "" }); setConsent(false); }} ariaLabel="Enviar novo formulário">
                      Enviar outro
                    </SecondaryButton>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="mt-16 border-t border-gray-200 bg-white" data-testid="footer">
        <div className={`${containerCx} py-8`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Logo src={logoImage} alt="Marinho Mendes Advogados" className="h-7 w-auto sm:h-8 lg:h-10" />
              <span className="text-sm font-semibold text-gray-900">Marinho Mendes Advogados</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1"><Facebook className="h-3.5 w-3.5" aria-hidden /> <a className="underline-offset-2 hover:underline" href="https://www.facebook.com/marinhomendesadv">/marinhomendesadv</a></span>
              <span className="inline-flex items-center gap-1"><Instagram className="h-3.5 w-3.5" aria-hidden /> <a className="underline-offset-2 hover:underline" href="https://www.instagram.com/marinhomendesadv">@marinhomendesadv</a></span>
              <span className="inline-flex items-center gap-1"><Linkedin className="h-3.5 w-3.5" aria-hidden /> <a className="underline-offset-2 hover:underline" href="https://www.linkedin.com/company/14030512/">LinkedIn</a></span>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-gray-600">
            Disclaimer ético: conteúdo meramente informativo, sem promessa de resultado, sem menção a casos
            concretos ou clientes e sem expressões mercantilistas, em conformidade com o Provimento
            205/2021 da OAB. O material não constitui aconselhamento jurídico definitivo.
          </p>
          <p className="mt-4 text-[11px] text-gray-500">© {new Date().getFullYear()} Marinho Mendes Sociedade de Advogados. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}



