export const INITIAL_VENUES = [
  {
    id: "chef-parrillero",
    name: "Chef Parrillero - Pasión por la Carne",
    subtitle: "Sedes Cerro Colorado & Av. Dolores",
    district: "Cerro Colorado / JLByR",
    address: "Calle San José 103 (Cerrito Los Álvarez) / Av. Dolores B-2",
    zone: "Av. Dolores / Cerro Colorado",
    priceRange: "S/ 55.00 - S/ 120.00",
    pricePerPerson: "S/ 55 - 120",
    capacity: "Aforo corporativo adaptable (Salón privado)",
    capacityNum: 150,
    style: "Cena Parrillera Corporativa & Cortes Selectos",
    badge: "Especialidad en Carnes",
    badgeColor: "bg-[#01ACAD]",
    image: "./parrillero/imagen (16).jpg",
    gallery: [
      "./parrillero/imagen (16).jpg",
      "./parrillero/imagen (17).jpg",
      "./parrillero/imagen (18).jpg",
      "./parrillero/imagen (19).jpg",
      "./parrillero/imagen (20).jpg"
    ],
    menu: {
      appetizer: "Buffet libre de guarniciones y ensaladas frescas servidas en barra.",
      main: "5 Opciones exclusivas de parrilla: desde cortes individuales hasta parrilladas para compartir con guarniciones y bebidas.",
      dessert: "Porción de Torta Navideña artesanal incluida en opciones 3, 4 y 5.",
      beverages: "Iced tea, chicha morada o maracuyá en todas las opciones."
    },
    menuOptions: [
      {
        title: "Opción 1",
        price: "S/ 55.00",
        tag: null,
        dishes: [
          { label: "Plato de Fondo", items: ["Chuleta de Cerdo", "Chuleta de Res", "Filete de Pollo"] },
          { label: "Guarnición", items: ["Papas grilladas", "Papas fritas", "Camotes artesanales"] },
          { label: "Bebida", items: ["Iced tea", "Chicha morada", "Maracuyá"] }
        ],
        extra: null
      },
      {
        title: "Opción 2",
        price: "S/ 65.00",
        tag: null,
        dishes: [
          { label: "Plato de Fondo", items: ["Pasta Alfredo con bondiola", "Medallones de solomillo relleno con puré de camote", "Bondiola con puré de papa"] },
          { label: "Bebida", items: ["Iced tea", "Chicha morada", "Maracuyá"] }
        ],
        extra: null
      },
      {
        title: "Opción 3",
        price: "S/ 70.00",
        tag: null,
        dishes: [
          { label: "Plato de Fondo", items: ["Picaña 300gr.", "Bife angosto 300gr.", "Costillar de cerdo con salsa BBQ", "Filete de pollo grillado al limón"] },
          { label: "Guarnición", items: ["Papas fritas", "Papas fritas importadas", "Camote artesanal", "Papas grilladas"] },
          { label: "Bebida", items: ["Iced tea", "Chicha morada", "Maracuyá"] }
        ],
        extra: "+ Porción de Torta Navideña"
      },
      {
        title: "Opción 4",
        price: "S/ 120.00",
        tag: null,
        dishes: [
          { label: "Plato de Fondo", items: ["Picaña argentina", "Bife angosto argentino", "Baby Ribs con salsa BBQ", "Entraña fina argentina"] },
          { label: "Guarnición", items: ["Papas fritas", "Papas fritas importadas", "Camote artesanal", "Papas grilladas", "Camote en rejilla"] },
          { label: "Bebida", items: ["Iced tea", "Chicha morada", "Maracuyá"] }
        ],
        extra: "+ Porción de Torta Navideña"
      },
      {
        title: "Opción 5",
        price: "S/ 230.00",
        tag: "Para 4 personas",
        dishes: [
          { label: "Cortes", items: ["Bife ancho (300 gr.)", "Bife angosto (300 gr.)", "Matambrito y Pollo grillado al limón"] },
          { label: "Guarnición", items: ["Papas fritas", "Papas fritas importadas", "Papas grilladas", "Camote artesanal"] },
          { label: "Bebida", items: ["Iced tea", "Chicha morada", "Maracuyá"] }
        ],
        extra: "+ Porción de Torta Navideña"
      }
    ],
    features: [
      "2 Sedes a elección: Cerro Colorado (San José 103) y Av. Dolores (JLByR)",
      "Cortes certificados de bife ancho, bife angosto y picaña",
      "Guarniciones y ensaladas ilimitadas en modalidad buffet",
      "Precios expresados en soles e incluyen I.G.V.",
      "Ambiente parrillero exclusivo para grupos de empresa"
    ],
    pros: [
      "Excelente relación calidad-precio en carnes a la parrilla",
      "Flexibilidad de elegir sede Cerro Colorado o José Luis Bustamante y Rivero",
      "Copa de vino de cortesía y torta navideña incluida"
    ],
    mapUrl: "https://www.google.com/maps/place/Chef+Parrillero+Grill/@-16.4133189,-71.5307325,17z/data=!3m1!4b1!4m6!3m5!1s0x91424afce0df93eb:0x28a06e43f4fa64f5!8m2!3d-16.4133189!4d-71.5281576!16s%2Fg%2F11ysklwyn?entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D",
    documentFile: "./propuestas/CENA NAVIDEÑA - CHEF PARRILLERO_261102_085759.pdf",
    documentName: "Cotización Oficial Chef Parrillero (PDF)",
    initialVotes: 146
  },
  {
    id: "don-facu",
    name: "Don Facu",
    subtitle: "Parrilla Tradicional & Cortes Ahumados",
    district: "Cayma",
    address: "Calle Tronchadero 307, Cayma",
    zone: "Cayma",
    priceRange: "S/ 50.00 - S/ 90.00",
    pricePerPerson: "S/ 50 - 90",
    capacity: "Salón para eventos corporativos",
    capacityNum: 100,
    style: "Parrilla Tradicional & Cortes Ahumados",
    badge: "Opción Más Económica",
    badgeColor: "bg-[#002559]",
    image: "./donfacu/imagen (1).jpg",
    gallery: [
      "./donfacu/imagen (1).jpg",
      "./donfacu/imagen (2).jpg",
      "./donfacu/imagen (3).jpg",
      "./donfacu/imagen (4).jpg",
      "./donfacu/imagen (5).jpg"
    ],
    menu: {
      appetizer: "Brindis con Copa de Sangría (o Copa de Vino en Paquete 4) + Empanada argentina en Paquete 4.",
      main: "4 Paquetes navideños: Chuletas/Pollo, Panceta y Bondiola ahumada, Bife ancho/angosto o Medallón de bondiola con Lomo fino 150 gr.",
      dessert: "Tres leches navideño en todos los paquetes.",
      beverages: "Bebida de estación, agua mineral o gaseosa según el paquete seleccionado."
    },
    menuOptions: [
      {
        title: "Paquete Navideño 1",
        price: "S/ 50.00",
        tag: null,
        dishes: [
          { label: "Brindis", items: ["Copa de sangría"] },
          { label: "Bebida", items: ["Bebida de estación"] },
          { label: "Plato de Fondo", items: ["Chuleta de cerdo, Chuleta de res o Filete de pollo + Papa frita o grillada + Ensalada de la casa"] },
          { label: "Postre", items: ["Tres leches navideño"] }
        ],
        extra: null
      },
      {
        title: "Paquete Navideño 2",
        price: "S/ 55.00",
        tag: null,
        dishes: [
          { label: "Brindis", items: ["Copa de sangría"] },
          { label: "Bebida", items: ["Bebida de estación o Agua"] },
          { label: "Plato de Fondo", items: ["Panceta ahumada o Bondiola ahumada + Puré de camote, Arroz árabe y Ensalada de fideos"] },
          { label: "Postre", items: ["Tres leches navideño"] }
        ],
        extra: "Nota: Panceta o bondiola ahumada mínimo 10 und para pedirlas (no se aceptan cantidades menores). Pueden pedir la clásica guarnición de papa frita y ensalada de la casa."
      },
      {
        title: "Paquete Navideño 3",
        price: "S/ 65.00",
        tag: null,
        dishes: [
          { label: "Brindis", items: ["Copa de sangría"] },
          { label: "Bebida", items: ["Bebida de estación, Agua o Gaseosa"] },
          { label: "Plato de Fondo", items: ["Bife ancho o Bife angosto + Puré de camote, Arroz árabe y Ensalada de fideos"] },
          { label: "Postre", items: ["Tres leches navideño"] }
        ],
        extra: "Nota: Pueden pedir la clásica guarnición de papa frita o grillada y ensalada de la casa."
      },
      {
        title: "Paquete Navideño 4",
        price: "S/ 90.00",
        tag: null,
        dishes: [
          { label: "Brindis", items: ["Copa de sangría o Copa de vino"] },
          { label: "Bebida", items: ["Agua o Gaseosa personal"] },
          { label: "Entrada", items: ["Empanada argentina"] },
          { label: "Plato de Fondo", items: ["Medallón de bondiola + Lomo fino 150 gr + Puré de camote, Arroz árabe y Ensalada de fideos"] },
          { label: "Postre", items: ["Tres leches navideño"] }
        ],
        extra: "Nota: Pueden pedir la clásica guarnición de papa frita o grillada y ensalada de la casa."
      }
    ],
    features: [
      "4 Paquetes navideños desde S/ 50.00 hasta S/ 90.00 por persona",
      "Brindis con Copa de Sangría o Vino incluido en todos los paquetes",
      "Especialidad en panceta ahumada, bondiola, bife y lomo fino",
      "Postre de Tres Leches Navideño incluido en cada opción",
      "Flexibilidad de elegir guarniciones navideñas o papas clásicas"
    ],
    pros: [
      "El costo inicial más accesible desde S/ 50.00",
      "Incluye brindis, bebidas, plato principal y postre tres leches",
      "Opciones premium de lomo fino y empanada argentina en Paquete 4"
    ],
    mapUrl: "https://www.google.com/maps/place/Don+Facu+-+Peruvian+Steakhouse/@-16.3887627,-71.548565,17z/data=!3m1!4b1!4m6!3m5!1s0x91424b0069abf097:0xd9e0c1551e7847db!8m2!3d-16.3887627!4d-71.5459901!16s%2Fg%2F11vplbh0yh?entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D",
    documentFile: "./propuestas/DonFacu.jpg",
    documentName: "Cotización Oficial Don Facu (Imagen)",
    initialVotes: 118
  },
  {
    id: "kingquero",
    name: "Kingquero - Servicio Gastronómico",
    subtitle: "Propuesta Gourmet de 3 y 4 Tiempos",
    district: "Sachaca",
    address: "Calle Tahuaycani 400, Sachaca",
    zone: "Sachaca",
    priceRange: "S/ 70.00 - S/ 80.00",
    pricePerPerson: "S/ 70 - 80",
    capacity: "Atención completa con menaje y meseros",
    capacityNum: 120,
    style: "Gastronomía Fusión & Caja China",
    badge: "Excelente Presentación",
    badgeColor: "bg-emerald-600",
    image: "./quin/imagen (26).jpg",
    gallery: [
      "./quin/imagen (26).jpg",
      "./quin/imagen (22).jpg",
      "./quin/imagen (23).jpg",
      "./quin/imagen (24).jpg",
      "./quin/imagen (25).jpg",
      "./quin/Multimedia (1).jpg"
    ],
    menu: {
      appetizer: "Aperitivos a elegir: Sexy Colada, Paloma Pisquera, Sour de Maracuyá o Mojito de Coco.",
      main: "Fondo a elegir: Costillas glaseadas, Chanchito a la caja china con pastel de papa y zarza criolla, Bife angosto en dos salsas (champiñones y pimienta) o Parrilla mixta.",
      dessert: "Entradas en menú de 4 tiempos (Brusquetas mixtas, Causita de pollo, Ceviche en copa o Boliyucas Edam) + postre opcional.",
      beverages: "Copa de vino, espumante o cerveza de 330 ml + gaseosa personal o jarra recargable para la mesa."
    },
    menuOptions: [
      {
        title: "Opción 1 – Menú de 3 Tiempos",
        price: "S/ 70.00",
        tag: null,
        dishes: [
          {
            label: "Aperitivo",
            items: ["Sexy Colada", "Paloma Pisquera", "Sour de Maracuyá o Clásico", "Mojito de Coco o Clásico"]
          },
          {
            label: "Plato de Fondo",
            items: [
              "Enrollado de pollo con puré ahumado",
              "Bife a la parrilla en salsa de pimienta",
              "Chanchito a la caja china con pastel de papa",
              "Parrilla mixta (pollo, cerdo y chorizo)"
            ]
          },
          {
            label: "Bebidas",
            items: ["Copa de vino, espumante o cerveza", "Gaseosa personal o jarra recargable"]
          }
        ],
        extra: "Postre opcional (+S/ 10.00): Torta de zanahoria, Crocante de manzana, Delicia de chocolate o Cheesecake"
      },
      {
        title: "Opción 2 – Menú de 4 Tiempos",
        price: "S/ 80.00",
        tag: null,
        dishes: [
          {
            label: "Aperitivo",
            items: ["Sexy Colada", "Paloma Pisquera", "Sour de Maracuyá", "Mojito de Coco"]
          },
          {
            label: "Entrada",
            items: ["Brusquetas mixtas", "Causita de pollo", "Ceviche en copa", "Boliyucas de queso Edam", "Tamalito de pollo"]
          },
          {
            label: "Plato de Fondo",
            items: [
              "Costillas de cerdo glaseadas",
              "Chanchito a la caja china con pastel de papa",
              "Bife angosto en dos salsas (champiñones/pimienta)",
              "Parrilla mixta (pollo, cerdo y chorizo)"
            ]
          },
          {
            label: "Bebidas",
            items: ["Copa de vino, espumante o cerveza", "Jarra de gaseosa y agua para la mesa"]
          }
        ],
        extra: "Postre opcional (+S/ 10.00): Torta de zanahoria, Crocante de manzana, Delicia de chocolate o Cheesecake"
      }
    ],
    features: [
      "Servicio completo: meseros, bartender, equipo de cocina y supervisión",
      "Menaje completo: servilletas de tela, vajilla fina y cristalería de copa",
      "Opciones de Chanchito a la caja china y costillas glaseadas",
      "Aperitivos tropicales y cócteles contemporáneos",
      "Posibilidad de coordinar orquesta e iluminación complementaria"
    ],
    pros: [
      "Menú de 3 o 4 tiempos con montaje de alta categoría",
      "Incluye personal de servicio y bartender profesional",
      "Cócteles variados y chanchito crocante a la caja china"
    ],
    mapUrl: "https://www.google.com/maps/place/KingQuero+Restaurante+Lounge+Bar/@-16.403975,-71.5507532,16z/data=!4m6!3m5!1s0x91424bd3b6e35c37:0x953bf2989c8ea231!8m2!3d-16.4058891!4d-71.5563959!16s%2Fg%2F11h3qqfw2m?entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D",
    documentFile: "./propuestas/KINGQUERO_Menú especial de 3 y 4 tiempos_261102_085820.pdf",
    documentName: "Menú Especial 3 y 4 Tiempos Kingquero (PDF)",
    initialVotes: 134
  },
  {
    id: "el-montonero",
    name: "El Montonero / Bon Gourmet",
    subtitle: "Salón Exclusivo Arequipa para 80 Pax",
    district: "Cercado",
    address: "Alameda Pardo 123, Cercado",
    zone: "Cercado",
    priceRange: "S/ 95.00 por persona",
    pricePerPerson: "S/ 95",
    capacity: "Salón exclusivo reservado hasta las 23:00 hrs",
    capacityNum: 80,
    style: "Cena de Gala con Salón Privado y Seguridad",
    badge: "Salón Exclusivo Incluido",
    badgeColor: "bg-purple-700",
    image: "./montonero/imagen (11).jpg",
    gallery: [
      "./montonero/imagen (11).jpg",
      "./montonero/imagen (12).jpg",
      "./montonero/imagen (13).jpg",
      "./montonero/imagen (14).jpg",
      "./montonero/imagen (15).jpg"
    ],
    menu: {
      appetizer: "2 Bocaditos finos a elegir: Canapés con trucha ahumada, enrolladitos con tocino y queso, brochetitas mixtas al grill, daditos BBQ o mini rocotitos rellenos.",
      main: "Fondo a elegir: Pollo a la fiorentina, Pavita en salsa de maracuyá, Pavo en salsa de naranja, Medallones de cerdo en salsa de sauco, o Costillas de cerdo glaseadas al grill.",
      dessert: "Postre a elegir: Mousse de chocolate, Keke navideño, Tronco de chocolate o Mousse de frutos rojos.",
      beverages: "Gaseosa personal + 2 Guarniciones a elegir: Arroz árabe, arroz con aceitunas, puré de camote/manzana/membrillo o ensalada Waldorf/rusa."
    },
    menuOptions: [
      {
        title: "Cena Completa Navideña",
        price: "S/ 95.00",
        tag: "Por persona",
        dishes: [
          {
            label: "Bocaditos (se elige 2)",
            items: [
              "Tostaditas mousse frutos secos",
              "Canapés con trucha ahumada",
              "Enrolladitos de pollo con tocino",
              "Brochetitas mixtas al grill",
              "Daditos de cerdo a la BBQ",
              "Tamalitos de pollo y cerdo",
              "Tequeños de lomo o ají de gallina",
              "Carteritas de mariscos",
              "Mini Rocotitos rellenos"
            ]
          },
          {
            label: "Plato de Fondo (se elige 1)",
            items: [
              "Pollo a la fiorentina",
              "Pavita en salsa de maracuyá",
              "Pavo en salsa de naranja",
              "Medallones de cerdo en sauco",
              "Medallones de pavo en almendras",
              "Enrollado de cerdo con guindones",
              "Enrollado de pollo con espinaca",
              "Costillas de cerdo glaseadas"
            ]
          },
          {
            label: "Guarniciones (se elige 2)",
            items: [
              "Arroz árabe",
              "Arroz con aceitunas",
              "Puré de camote / manzana / membrillo",
              "Papitas nativas salteadas",
              "Ensalada de pallares",
              "Ensalada rusa o Waldorf"
            ]
          },
          {
            label: "Postre (se elige 1) & Bebida",
            items: [
              "Gaseosa personal",
              "Mousse de chocolate",
              "Keke navideño",
              "Tronco de chocolate",
              "Mousse de frutos rojos"
            ]
          }
        ],
        extra: null
      }
    ],
    features: [
      "Salón Exclusivo Arequipa hasta las 23:00 hrs",
      "Supervisor de evento y personal de servicio uniformado",
      "Menajería y cristalería completa, mantelería crema y dorado",
      "Mesas, sillas y seguridad interna incluida",
      "Vigilancia de vehículos y mantenimiento continuo de SSHH",
      "Precio incluye IGV"
    ],
    pros: [
      "Incluye el salón privado sin costo de alquiler adicional",
      "Menú navideño clásico con pavo, cerdo, arroz árabe y ensalada Waldorf",
      "Seguridad, parqueo vigilado y mantelería crema-dorada"
    ],
    mapUrl: "https://www.google.com/maps/place/El+Montonero+-+Restaurant+Tur%C3%ADstico/@-16.398646,-71.5451852,17z/data=!3m1!4b1!4m6!3m5!1s0x91424a5bf8ef0b33:0xc97a2236acf51f62!8m2!3d-16.398646!4d-71.5426103!16s%2Fg%2F1hc4qnqc0?entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D",
    documentFile: "./propuestas/Montonero_01394-CENA NAVIDEÑA - DANIEL CABRERA_261102_085917.pdf",
    documentName: "Cotización Salón Arequipa Bon Gourmet (PDF)",
    initialVotes: 162
  },
  {
    id: "sol-de-mayo",
    name: "Tradicional Sol de Mayo",
    subtitle: "Salón de Recepciones en Yanahuara",
    district: "Yanahuara",
    address: "Jerusalén 207, Yanahuara",
    zone: "Yanahuara",
    priceRange: "S/ 115.00 - S/ 195.00",
    pricePerPerson: "S/ 115 - 195",
    capacity: "Salón de recepciones de 6:30 pm a 1:00 am (70+ personas)",
    capacityNum: 90,
    style: "Tradición Arequipeña de Alto Nivel",
    badge: "Emblema de Yanahuara",
    badgeColor: "bg-rose-700",
    image: "./sol/imagen (6).jpg",
    gallery: [
      "./sol/imagen (6).jpg",
      "./sol/imagen (7).jpg",
      "./sol/imagen (8).jpg",
      "./sol/imagen (9).jpg",
      "./sol/imagen (10).jpg"
    ],
    menu: {
      appetizer: "Ruedas de aperitivos (Pisco sour, piña colada, mojitos) y bocaditos: langostinos al cristal, minirocotitos rellenos, causitas con pulpo al olivo y tamalitos en platina.",
      main: "Plato de fondo a elegir: Lechón al horno tradicional con ensalada de frutas y papas doradas, Asado de ternera en salsa de guindones con souflé de papas, o Chuleta glaseada con papas al horno con queso.",
      dessert: "Bavarois de maracuyá o Tocino del cielo tradicional.",
      beverages: "Ruedas de cócteles clásicos y tropicales, gaseosas y agua en jarras. Opción de barra libre instalada."
    },
    menuOptions: [
      {
        title: "1ra Alternativa",
        price: "S/ 135.00",
        tag: "Por persona",
        dishes: [
          {
            label: "Aperitivos & Bebidas",
            items: [
              "1 Rueda de pisco sour y piña colada",
              "1 Rueda de gaseosa y agua en jarras"
            ]
          },
          {
            label: "Piqueos (3 ruedas)",
            items: [
              "Tequeños con pulpo al olivo o carne",
              "Tamalitos en platina o rollitos de pollo",
              "Minirocotitos rellenos o langostinos al cristal"
            ]
          },
          {
            label: "Plato de Fondo (se elige 1)",
            items: [
              "Lechón al horno con ensalada de frutas",
              "Asado de ternera con souflé de papas",
              "Filete de pollo en salsa champiñones",
              "Cordon bleu con papitas al horno"
            ]
          },
          {
            label: "Postre",
            items: ["Bavarois de maracuyá o Tocino del cielo"]
          }
        ],
        extra: "Descorche: Vino/Champagne S/ 20.00 | Whisky S/ 40.00 (incluye agua y hielo)"
      },
      {
        title: "2da Alternativa (Gala Premium)",
        price: "S/ 195.00",
        tag: "Por persona",
        dishes: [
          {
            label: "Aperitivos & Bebidas (3 ruedas)",
            items: [
              "Pisco sour o maracuyá sour",
              "Piña colada o cocktail algarrobina",
              "Daiquiri de durazno o mojitos",
              "Gaseosa y agua en jarras"
            ]
          },
          {
            label: "Bocaditos (5 ruedas)",
            items: [
              "Langostinos al cristal",
              "Minirocotitos rellenos",
              "Causitas de pulpo o timbal con trucha",
              "Brochetitas mixtas o rollitos de pollo",
              "Tamalitos en platina o tequeños de lomo"
            ]
          },
          {
            label: "Plato de Fondo (se elige 1)",
            items: [
              "Lechón al horno con ensalada de frutas",
              "Chuleta glaceada con papitas al horno",
              "Asado de ternera con souflé de papas",
              "Filete de pollo en champiñones",
              "Cordon bleu con arroz y papas fritas"
            ]
          },
          {
            label: "Postre",
            items: ["Bavarois de maracuyá o Tocino del cielo"]
          }
        ],
        extra: "Descorche: Vino/Champagne S/ 20.00 | Whisky S/ 40.00 (incluye agua y hielo)"
      },
      {
        title: "3ra Alternativa",
        price: "S/ 130.00",
        tag: "Por persona",
        dishes: [
          {
            label: "Aperitivos & Bebidas",
            items: [
              "Pisco sour con daiquiri, mojito o piña colada",
              "Gaseosa y agua en jarras"
            ]
          },
          {
            label: "Entradas",
            items: ["Brocheta de pollo"]
          },
          {
            label: "Plato de Fondo (se elige 1)",
            items: [
              "Lechón al horno con ensalada de frutas",
              "Cordon bleu en salsa champiñones",
              "Pollo a la suiza con arroz moldeado",
              "Asado de ternera con souflé de papas"
            ]
          },
          {
            label: "Postre",
            items: ["Bavarois de maracuyá o Tocino del cielo"]
          }
        ],
        extra: "Descorche: Vino/Champagne S/ 20.00 | Whisky S/ 40.00 (incluye agua y hielo)"
      },
      {
        title: "4ta Alternativa",
        price: "S/ 115.00",
        tag: "Por persona",
        dishes: [
          {
            label: "Aperitivos & Bebidas",
            items: [
              "1 Rueda de pisco sour y piña colada",
              "Gaseosa y agua en jarras"
            ]
          },
          {
            label: "Piqueos (2 ruedas)",
            items: ["Tequeños con queso"]
          },
          {
            label: "Plato de Fondo (se elige 1)",
            items: [
              "Lechón al horno con ensalada de frutas",
              "Asado de ternera con souflé de papas",
              "Filete de pollo en salsa champiñones",
              "Cordon bleu con papitas al horno"
            ]
          },
          {
            label: "Postre",
            items: ["Heladito con galleta"]
          }
        ],
        extra: "Descorche: Vino/Champagne S/ 20.00 | Whisky S/ 40.00 (incluye agua y hielo)"
      }
    ],
    features: [
      "Horario extendido desde las 6:30 pm hasta la 1:00 am",
      "Ubicación patrimonial en el corazón de Yanahuara",
      "Arreglo de salón coordinado: mesas redondas, centritos florales y mantelería perla",
      "Auténtico lechón arequipeño y asado de ternera en salsa de guindones",
      "Posibilidad de orquesta o grupo en vivo en salón"
    ],
    pros: [
      "El prestigio y sabor histórico de la mejor cocina arequipeña",
      "Horario hasta la 1:00 am para bailar y disfrutar en grande",
      "Salón en Yanahuara con ambiente sobrio y elegante"
    ],
    mapUrl: "https://www.google.com/maps/place/Sol+de+Mayo/@-16.3898716,-71.5470314,17z/data=!3m1!4b1!4m6!3m5!1s0x91424a43bc2bd15d:0x53d2df4c7fce18e6!8m2!3d-16.3898716!4d-71.5444565!16s%2Fg%2F11hd0rtld0?entry=ttu&g_ep=EgoyMDI2MTEwMi4wIKXMDSoASAFQAw%3D%3D",
    documentFile: "./propuestas/Sol de mayo_CENA - BRYAN - CENA  2026_261102_085734.pdf",
    documentName: "Cotización Oficial Sol de Mayo (PDF)",
    initialVotes: 155
  }
];

export const CAJA_AGENCIES = [
  "Sede Central - La Merced",
  "Agencia Cayma - Av. Ejército",
  "Agencia Yanahuara - Bolognesi",
  "Agencia Cerro Colorado - Metro",
  "Agencia Paucarpata - Kennedy",
  "Agencia JLByR - Dolores",
  "Agencia Bustamante - Lambramani",
  "Agencia Miraflores - San Martín",
  "Agencia Socabaya - San Martín de Socabaya",
  "Agencia Sachaca - Huaranguillo",
  "Agencia Tiabaya",
  "Agencia Hunter",
  "Gerencia de Tecnología e Información (TI)",
  "Gerencia de Operaciones y Créditos",
  "Gerencia de Finanzas y Riesgos",
  "Gerencia de Talento Humano"
];
