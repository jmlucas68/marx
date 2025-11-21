import { Influence, KeyConcept, Quote, ReferenceLink, VideoResource, Work, DetailedSummary } from './types';

export const BIOGRAPHY_SUMMARY = `
Karl Heinrich Marx (Tréveris, Reino de Prusia, 5 de mayo de 1818 - Londres, Reino Unido, 14 de marzo de 1883) fue un filósofo, economista, sociólogo, periodista, intelectual y militante comunista prusiano de origen judío. 

Junto a Friedrich Engels, es el padre del socialismo científico, del comunismo moderno, del marxismo y del materialismo histórico. Sus escritos más conocidos son el Manifiesto del Partido Comunista (en coautoría con Engels) y El Capital.
`;

export const CAPITAL_DETAILED_SUMMARY: DetailedSummary = {
  title: "El Capital: Crítica de la economía política",
  intro: "Publicado el primer tomo en 1867, 'El Capital' es la obra magna de Marx. No es solo un tratado de economía, sino una descripción sociológica y una crítica filosófica del sistema capitalista. Marx busca desvelar la 'ley económica del movimiento de la sociedad moderna'.",
  sections: [
    {
      heading: "La Mercancía y el Valor",
      text: "El análisis comienza con la mercancía, la unidad celular del capitalismo. Marx distingue entre 'Valor de Uso' (utilidad de un objeto) y 'Valor de Cambio' (proporción en que se cambia por otros). Lo que hace conmensurables a mercancías distintas es que todas contienen trabajo humano abstracto socialmente necesario."
    },
    {
      heading: "Plusvalía y Explotación",
      text: "El secreto del capitalismo reside en la compra-venta de la fuerza de trabajo. El obrero vende su capacidad de trabajar por un salario (valor de su fuerza de trabajo), pero durante la jornada laboral produce un valor superior a ese salario. Ese excedente no remunerado es la 'Plusvalía', fuente del beneficio del capitalista."
    },
    {
      heading: "Acumulación Originaria",
      text: "Marx desmonta el mito de que el capital proviene del ahorro virtuoso. Históricamente, el capital nace de la violencia, la expropiación de tierras comunales, el colonialismo y la esclavitud, procesos que separaron al trabajador de sus medios de producción."
    },
    {
      heading: "Contradicciones del Sistema",
      text: "El capitalismo tiende a crisis cíclicas de sobreproducción y a la caída tendencial de la tasa de ganancia. La competencia obliga a invertir más en maquinaria (capital constante) y menos en salarios (capital variable, única fuente de plusvalía), lo que a largo plazo socava la base del propio sistema."
    }
  ]
};

export const KEY_CONCEPTS: KeyConcept[] = [
  {
    title: "Materialismo Histórico",
    shortDescription: "La estructura económica de la sociedad condiciona la superestructura jurídica, política e ideológica.",
    details: {
      title: "Materialismo Histórico",
      intro: "Es el marco conceptual marxista para comprender la historia humana. A diferencia del idealismo de Hegel, que veía la historia como el desarrollo del Espíritu, Marx sostiene que son las condiciones materiales y económicas las que determinan la conciencia social y el devenir histórico.",
      sections: [
        {
          heading: "Estructura y Superestructura",
          text: "La sociedad se compone de una 'Base' o Estructura Económica (fuerzas productivas y relaciones de producción) que determina, en última instancia, a la 'Superestructura' (leyes, política, religión, arte, filosofía). Si cambia la base económica, eventualmente cambiará toda la superestructura."
        },
        {
          heading: "Modos de Producción",
          text: "La historia avanza a través de diferentes modos de producción: Comunismo Primitivo, Esclavismo, Feudalismo, Capitalismo y, teóricamente, Comunismo. Cada etapa tiene sus propias contradicciones internas."
        },
        {
          heading: "Lucha de Clases",
          text: "'La historia de todas las sociedades hasta nuestros días es la historia de la lucha de clases'. El motor del cambio histórico es el conflicto entre la clase opresora (propietaria de los medios de producción) y la clase oprimida (fuerza de trabajo)."
        }
      ]
    }
  },
  {
    title: "Alienación (Enajenación)",
    shortDescription: "El trabajador se siente ajeno al producto de su trabajo y a su propia naturaleza humana.",
    details: {
      title: "Alienación (Entfremdung)",
      intro: "Concepto desarrollado principalmente en los 'Manuscritos económicos y filosóficos de 1844'. Describe la condición en la que el individuo se siente ajeno, extraño y separado de su entorno, de su trabajo y de sí mismo bajo el régimen capitalista.",
      sections: [
        {
          heading: "1. Alienación del producto",
          text: "El objeto que el trabajador produce no le pertenece; se enfrenta a él como un poder extraño e independiente. Cuanto más produce el trabajador, más poderoso se vuelve el mundo de los objetos que lo domina."
        },
        {
          heading: "2. Alienación del acto de producción",
          text: "El trabajo no es voluntario, sino forzado. No es la satisfacción de una necesidad, sino un medio para satisfacer necesidades fuera del trabajo. El trabajador solo se siente libre en sus funciones animales (comer, beber, procrear) y se siente animal en sus funciones humanas (trabajar)."
        },
        {
          heading: "3. Alienación del 'Ser Genérico'",
          text: "El trabajo creativo y consciente es lo que distingue al ser humano (su esencia o 'Gattungswesen'). Al reducir el trabajo a mera supervivencia física, el capitalismo despoja al hombre de su humanidad."
        },
        {
          heading: "4. Alienación del hombre respecto al hombre",
          text: "Las relaciones humanas se mercantilizan. Vemos a los demás no como congéneres, sino como competidores, medios para un fin o como la personificación del capital (el patrón)."
        }
      ]
    }
  },
  {
    title: "Plusvalía",
    shortDescription: "El valor no pagado del trabajo del obrero, fuente de la ganancia capitalista.",
    details: {
      title: "Teoría de la Plusvalía",
      intro: "Es el concepto central de la economía política marxista. Resuelve la contradicción de cómo se genera beneficio en un intercambio de equivalentes. El beneficio no surge de vender las cosas más caras ('comprar barato, vender caro'), sino de la producción misma.",
      sections: [
        {
          heading: "Fuerza de Trabajo vs. Trabajo",
          text: "El capitalista no compra el 'trabajo' del obrero, sino su 'fuerza de trabajo' (su capacidad de trabajar) por un tiempo determinado. El valor de esta fuerza de trabajo es el salario (costo de subsistencia del obrero)."
        },
        {
          heading: "La generación del excedente",
          text: "Si el obrero necesita trabajar 4 horas para cubrir su salario (trabajo necesario), pero la jornada laboral es de 8 horas, las 4 horas restantes son 'trabajo excedente'. El valor creado en esas horas extra es la Plusvalía, que se apropia el capitalista gratuitamente."
        },
        {
          heading: "Plusvalía Absoluta y Relativa",
          text: "Marx distingue dos formas de aumentar la plusvalía: la 'Absoluta' (alargar la jornada laboral) y la 'Relativa' (aumentar la productividad mediante tecnología para reducir el tiempo de trabajo necesario y aumentar la parte excedente)."
        }
      ]
    }
  },
  {
    title: "Comunismo",
    shortDescription: "Sociedad sin clases, sin propiedad privada y sin Estado.",
    details: {
      title: "El Comunismo",
      intro: "Para Marx, el comunismo no es un estado ideal que se debe implantar, sino el movimiento real que anula y supera el estado de cosas actual. Es la superación positiva de la propiedad privada y la recuperación del hombre por sí mismo.",
      sections: [
        {
          heading: "Dictadura del Proletariado",
          text: "Etapa de transición necesaria tras la revolución. El proletariado toma el control del Estado para despojar a la burguesía de los medios de producción y centralizarlos. No es un fin en sí mismo, sino un medio."
        },
        {
          heading: "Abolición del Estado",
          text: "En la sociedad comunista plena, al no existir clases sociales, el Estado (instrumento de opresión de una clase sobre otra) se vuelve innecesario y se 'extingue'. Se pasa del gobierno de las personas a la administración de las cosas."
        },
        {
          heading: "Fase Superior",
          text: "Marx describe el horizonte final en la 'Crítica del Programa de Gotha': una sociedad de abundancia donde el lema será: '¡De cada cual según sus capacidades, a cada cual según sus necesidades!'."
        }
      ]
    }
  }
];

export const QUOTES: Quote[] = [
  {
    text: "Los filósofos no han hecho más que interpretar de diversos modos el mundo, pero de lo que se trata es de transformarlo.",
    source: "Tesis sobre Feuerbach (1845)"
  },
  {
    text: "La historia de toda sociedad hasta nuestros días es la historia de la lucha de clases.",
    source: "Manifiesto Comunista (1848)"
  },
  {
    text: "La religión es el suspiro de la criatura oprimida, el corazón de un mundo descorazonado, así como es el espíritu de una situación carente de espíritu. Es el opio del pueblo.",
    source: "Crítica de la Filosofía del Derecho de Hegel (1843)"
  },
  {
    text: "El capital es trabajo muerto que, como un vampiro, solo vive chupando trabajo vivo, y vive más cuanto más trabajo chupa.",
    source: "El Capital, Vol I (1867)"
  }
];

export const INFLUENCES: Influence[] = [
  {
    name: "G.W.F. Hegel",
    description: "Del idealismo alemán tomó la dialéctica, aunque invirtiéndola ('ponerla sobre sus pies') para crear el materialismo dialéctico.",
    type: "received"
  },
  {
    name: "Ludwig Feuerbach",
    description: "De él adoptó el materialismo y la crítica a la religión, superando su materialismo contemplativo por uno práctico-revolucionario.",
    type: "received"
  },
  {
    name: "Economía Política Inglesa",
    description: "Adam Smith y David Ricardo. De ellos estudió la teoría del valor-trabajo, radicalizándola para explicar la explotación.",
    type: "received"
  },
  {
    name: "Vladimir Lenin",
    description: "Llevó las ideas de Marx a la práctica política con la Revolución Rusa, desarrollando el Marxismo-Leninismo.",
    type: "exerted"
  },
  {
    name: "Escuela de Frankfurt",
    description: "Adorno, Horkheimer, Marcuse. Aplicaron el marxismo a la crítica cultural y la sociedad de consumo.",
    type: "exerted"
  }
];

export const WORKS: Work[] = [
  {
    title: "Manifiesto del Partido Comunista",
    year: "1848",
    description: "El texto político más influyente de la historia moderna. Establece las bases del programa comunista.",
    link: "https://www.marxists.org/espanol/m-e/1840s/48-manif.htm",
    isFree: true
  },
  {
    title: "El Capital (Das Kapital)",
    year: "1867",
    description: "Análisis crítico de la economía política. Estudia el modo de producción capitalista, la mercancía y el valor.",
    link: "https://www.marxists.org/espanol/m-e/1860s/eccx86s.htm",
    isFree: true,
    hasSummary: true,
    summaryData: CAPITAL_DETAILED_SUMMARY
  },
  {
    title: "La Ideología Alemana",
    year: "1846",
    description: "Obra póstuma donde formula por primera vez las tesis principales del materialismo histórico.",
    link: "https://www.marxists.org/espanol/m-e/1846/ideoalemana/index.htm",
    isFree: true
  },
  {
    title: "Manuscritos económicos y filosóficos",
    year: "1844",
    description: "Textos tempranos fundamentales para entender el concepto de alienación.",
    link: "https://www.marxists.org/espanol/m-e/1840s/manuscritos/index.htm",
    isFree: true
  },
  {
    title: "Miseria de la Filosofía",
    year: "1847",
    description: "Respuesta a 'Filosofía de la miseria' de Proudhon, criticando el socialismo utópico pequeñoburgués.",
    link: "https://www.marxists.org/espanol/m-e/1847/miseria/index.htm",
    isFree: true
  }
];

export const VIDEOS: VideoResource[] = [
  {
    title: "Marx en 10 minutos (Filosofía)",
    channel: "Unboxing Philosophy",
    url: "https://www.youtube.com/embed/rYirs1pDV20",
    thumbnail: "https://picsum.photos/seed/marxvideo1/400/225"
  },
  {
    title: "Karl Marx - Grandes Pensadores",
    channel: "Educatina",
    url: "https://www.youtube.com/embed/41Y02E_41kM",
    thumbnail: "https://picsum.photos/seed/marxvideo3/400/225"
  }
];

export const REFERENCES: ReferenceLink[] = [
  {
    name: "Marxists Internet Archive (MIA)",
    url: "https://www.marxists.org/espanol/m-e/index.htm",
    description: "La mayor biblioteca digital gratuita de autores marxistas en el mundo."
  },
  {
    name: "Webdianoia",
    url: "https://www.webdianoia.com/contemporanea/marx/marx_bio.htm",
    description: "Recursos didácticos de filosofía para estudiantes de bachillerato."
  },
  {
    name: "Encyclopaedia Herder",
    url: "https://encyclopaedia.herdereditorial.com/wiki/Autor:Marx,_Karl",
    description: "Enciclopedia de teología y filosofía."
  },
  {
    name: "Wikipedia",
    url: "https://es.wikipedia.org/wiki/Karl_Marx",
    description: "Entrada general y biográfica detallada."
  }
];