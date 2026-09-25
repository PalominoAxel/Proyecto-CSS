
const BRANDS = {

    // BLOQUE A: Marcas Importadas Exclusivas (tarjetas verticales)
    importadas: [
        {
            id: 'certified-angus-beef',
            logo: { src: 'img/angus-bg.png', alt: 'Logo Certified Angus Beef', width: 92, height: 92 },
            paragraphs: [
                '<strong>Somos el único distribuidor licenciado en Perú.</strong>',
                'Certified Angus Beef es superior a otras marcas Angus del mundo por su jugosidad, sabor y suavidad. Solo 3 de cada 10 reses Angus cumplen los 10 rigurosos estándares de calidad de la marca.'
            ],
            button: { label: 'CONOCE MÁS', href: '/certified/' },
            image: { src: 'img/marcas/angus.JPG', alt: 'Certified Angus Beef', width: 550, height: 350 }
        },
        {
            id: 'ciudad-del-lago',
            logo: { src: 'img/marcas/ciudad.jpg', alt: 'Logo Ciudad del Lago', width: 104, height: 94 },
            paragraphs: [
                '<strong>La mejor carne argentina por su inigualable sabor.</strong>',
                'Los rigurosos procesos de selección y alimentación resultan en cortes jugosos y de alto marmoleo.'
            ],
            button: null,
            image: { src: 'img/marcas/lago.JPG', alt: 'Ciudad del Lago', width: 550, height: 350 }
        }
    ],

    // BLOQUE B: Marcas Exclusivas, fila 1 (tarjetas verticales)
    exclusivasVerticales: [
        {
            id: 'barbaro',
            logo: { src: 'img/marcas/logo-barbaro.JPG', alt: 'Logo Bárbaro', width: 166, height: 57 },
            paragraphs: [
                '<strong>Bárbaro es una marca exclusiva de Inpelsa.</strong> Es una nueva marca peruana de carne de res para hamburguesas creada para hacer tus parrillas siempre ricas, fáciles y de calidad.'
            ],
            button: { label: 'CONOCE MÁS', href: '/barbaro/' },
            image: { src: 'img/marcas/barbaro.jpg', alt: 'Bárbaro', width: 550, height: 350 }
        },
        {
            id: 'el-ranchito',
            logo: { src: 'img/marcas/logo-ranchito.JPG', alt: 'Logo El Ranchito', width: 199, height: 40 },
            paragraphs: [
                '<strong>Sabor auténtico, precio justo.</strong> Una opción de hamburguesa práctica, económica y sabrosa, ideal para todos los días. Encuéntrala en sus 2 presentaciones: Clásica y Premium.'
            ],
            button: null,
            image: { src: 'img/marcas/ranchito.JPG', alt: 'El Ranchito', width: 550, height: 350 }
        }
    ],

    // BLOQUE C: Marcas Exclusivas, fila 2 (tarjetas horizontales)
    exclusivasHorizontales: [
        {
            id: 'frimsa',
            name: 'FRIMSA',
            type: 'text',
            image: { src: 'img/marcas/frimsa.JPG', alt: 'FRIMSA', width: 584, height: 396 },
            paragraphs: [
                '<strong>Empresa argentina de procesamiento de carne</strong> fundada hace más de 30 años, convirtiéndose en una planta líder en el procesamiento y exportación de carne.',
                'Tienen un fuerte compromiso con la calidad, la innovación y la modernización.'
            ]
        },
        {
            id: 'srf',
            name: 'SRF (Snake River Farms)',
            type: 'split',
            image: { src: 'img/marcas/srf.JPG', alt: 'SRF (Snake River Farms)', width: 584, height: 396 },
            rows: [
                {
                    circle: { src: 'img/marcas/waygu.png', alt: 'Wagyu Americano SRF', width: 87, height: 87 },
                    label: 'WAYGU AMERICANO:',
                    text: 'Raza wagyu americano con rasgos más resaltantes como su intenso sabor, textura suave y tierna que se obtiene gracias a su marmoleo extraordinario de grado GOLD BMS9+. Nuestro ganado wagyu de la marca SRF proviene de toro wagyu de sangre pura, garantizamos la excelencia de calidad más alta y exclusiva.'
                },
                {
                    circle: { src: 'img/marcas/korobuta.png', alt: 'Cerdo Kurobuta SRF', width: 87, height: 87 },
                    label: 'CERDO KUROBUTA:',
                    text: '¡El mejor cerdo del mundo! Se considera equivalente a la res Angus Americana. La raza Kurobuta es tradicional de Japón y se distingue por su contenido de grasa y excepcional ternura. Solamente al cerdo Berkshire de sangre pura 100% puede llamarse Kurobuta.'
                }
            ]
        },
        {
            id: 'coto',
            name: 'COTO',
            type: 'text',
            image: { src: 'img/marcas/coto.JPG', alt: 'COTO', width: 584, height: 396 },
            paragraphs: [
                'El compromiso de sabor y calidad de COTO en la exportación de res nacional convierte a la empresa en algo más que en un simple comercializador de carnes.',
                'Desde ya hace muchos años, <strong>COTO se encarga de llevar los mejores cortes de carne del mundo a diferentes puntos del planeta</strong>: Alemania, Holanda, Perú, Chile, Francia, Rusia, entre otros. Cuenta con un intensivo programa de control de calidad diario que le permite trabajar en función de los diferentes requerimientos de sus clientes internacionales.'
            ]
        },
        {
            id: 'dom-porquito',
            name: 'Dom Porquito',
            type: 'text',
            image: { src: 'img/marcas/domporquito.png', alt: 'Dom Porquito', width: 584, height: 396 },
            paragraphs: [
                '<strong>Dom Porquito es una de las mayores agroindustrias porcinas de la Amazonia.</strong> Cuenta con una plantilla de 387 empleados y procesa aprox. 20 toneladas diarias, abasteciendo Brasil y otros 9 países de África, Sudamérica, Centroamérica y Asia.',
                'La empresa empezó en el 2012 y es referente de éxito económico en la región de Alto Acre, Brasil. Además de ser matadero, Dom Porquito comercializa diferentes cortes de carne de cerdo y embutidos, vendiendo alrededor de 60 artículos bajo las marcas Mr. Pig, Sabbor y Refinatti.'
            ]
        }
    ]
};
