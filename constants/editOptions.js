export const styles = [
    'font_inclusive',
    'font_kanit',
    'font_libre',
    'font_mooli',
    'font_abril',
    'font_alfa',
    'font_croissant',
    'font_poller',
    'font_ultra',
    'font_felipa',
    'font-bold',
    'italic',
    'underline',
    'line-through',
    'overline',
    'no-underline',
    'text-base',
    'border-2 border-dotted',
    'border-2 border-solid',
    'border-2 border-double',
    'border-2 border-dashed',
    'border_primary',
    'border_secondary',
    'border_accent',
    'border_white',
    'border_black',
]

export const imageStyles = [
    'filter grayscale',
    'filter blur',
    'filter sepia',
    'filter brightness-125',
    'filter contrast-125',
    'filter hue-rotate-90',
    'filter saturate-150',
    'object-contain',
    'object-cover',
    'object-fill',
    'object-none',
    'object-scale-down',
    
]

export const listStyles =[
    'list-disc',
    'list-decimal'
]



//Editor options

//names




export const HEADING = 'heading'
export const PARAGRAPH = 'paragraph'
export const HYPERLINK = 'hyperlink'
export const IMAGE = 'image'
export const ORDEREDLIST = 'orderList'
export const UNORDEREDLIST = 'unorderedList'
export const CONTAINER = 'container'
export const CODESNIPPET = 'codesnippet'

//array
const addMenu = ['Add To', "bi bi-journal-plus"]

export const elementsForAdd = [
    [HEADING,"bi bi-type-h1"],
    [PARAGRAPH,"bi bi-paragraph"],
    [HYPERLINK,'bi bi-link'],
    [IMAGE,'bi bi-image'],
    [ORDEREDLIST,"bi bi-list-ol",[ORDEREDLIST,...addMenu]],
    [UNORDEREDLIST,"bi bi-list-task",[UNORDEREDLIST,...addMenu]],
    [CONTAINER,"bi bi-archive-fill",[CONTAINER,...addMenu]]
    [CODESNIPPET,"bi bi-code-slash"]
]




export const Options = [


//paragraph Options
           {name:'fontSize',
            for:[HEADING,PARAGRAPH,ORDEREDLIST,UNORDEREDLIST,CONTAINER],
            styles:[{
                name:'xx-large',
                className:'text-[7rem]'
            },
            {
                name:'x-large',
                className:'text-[5rem]'
            },
            {
                name:'large',
                className:'text-[4rem]'
            },
            {
                name:'medium',
                className:'text-[3rem]'
            },
            {
                name:'small',
                className:'text-[2rem]'
            },
            {
                name:'x-small',
                className:'text-[1.2rem]'
            },
            {
                name:'small',
                className:'text-base'
            },
        ]},
            {name:'fontFamily',
            for:[HEADING,PARAGRAPH,ORDEREDLIST,UNORDEREDLIST,CONTAINER],
            styles:[{
                name:'Inclusive Sans',
                className:'font_inclusive'
            },
            {
                name:'Kanit',
                className:'font_kanit'
            },
            {
                name:'Libre Baskerville',
                className:'font_libre'
            },
            {
                name:'Mooli',
                className:'font_mooli'
            },
            {
                name:'Abril Fatface',
                className:'font_abril'
            },
            {
                name:'Alfa Slab One',
                className:'font_alfa'
            },
            {
                name:'Croissant One',
                className:'font_croissant'
            },
            {
                name:'Poller One',
                className:'font_poller'
            },
            {
                name:'Ultra',
                className:'font_ultra'
            },
            {
                name:'Felipa',
                className:'font_felipa'
            },
        ]},
        {
            name:'fontStyle',
            for:[HEADING,PARAGRAPH],
            styles:[
            {
                name:'bold',
                className:'font-bold'
            },
            {
                name:'italic',
                className:'italic'
            },
            {
                name:'underline',
                className:'underline'
            },
            {
                name:'strike',
                className:'line-through'
            },
            {
                name:'overline',
                className:'overline'
            },
            {
                name:'none',
                className:'no-underline'
            },
        ]},


        {
            name:'color',
            for:[HEADING,PARAGRAPH,ORDEREDLIST,UNORDEREDLIST,CONTAINER],
            
            styles:[  
            {
                name:'primary',
                className: 'text_primary'
            },
            {
                name:'secondary',
                className: 'text_secondary'
            },
            {
                name:'accent',
                className: 'text_accent'
            },
            {
                name:'white',
                className: 'text_white'
            },
            {
                name:'black',
                className: 'text_black'
            },
        ]},

        {
            name:'backgroundColor',
            for:[HEADING,PARAGRAPH,UNORDEREDLIST,ORDEREDLIST,CONTAINER],
            styles:[
            {
                name:'primary',
                className: 'bg_primary'
            },
            {
                name:'secondary',
                className: 'bg_secondary'
            },
            {
                name:'accent',
                className: 'bg_accent'
            },
            {
                name:'white',
                className: 'bg_white'
            },
            {
                name:'black',
                className: 'bg_black'
            },
        ],
        },
    

    //Image Options




    {           
                name:'effect',
                for:[IMAGE],
                styles:[
                {
                    name: 'grayscale', 
                    className: 'filter grayscale', 
                },
                {
                    name: 'blur', 
                    className: 'filter blur', 
                },
                { 
                    name: 'sepia', 
                    className: 'filter sepia',
                 },
                {
                     name: 'brightness', 
                     className: 'filter brightness-125', 
                    },
                {
                    name: 'contrast', 
                    className: 'filter contrast-125',
                 },
                { 
                    name: 'hueRotate', 
                    className: 'filter hue-rotate-90', 
                },
                { 
                    name: 'saturate', 
                    className: 'filter saturate-150',
                },
            ]},
            {
                name:'imageFit',
                for:[IMAGE],
                styles:[
                { 
                    name: 'contain', 
                    className: 'object-contain', 
                  },
                  { 
                    name: 'cover', 
                    className: 'object-cover', 
                  },
                  { 
                    name: 'fill', 
                    className: 'object-fill', 
                  },
                  { 
                    name: 'none', 
                    className: 'object-none', 
                  },
                  { 
                    name: 'scale-down', 
                    className: 'object-scale-down', 
                  },
            ]
        },
]






//element option names array

export const SPACINGINSIDE = 'innerSpacing'
export const SPACINGOUTSIDE =  'outerSpacing'
export const TOP = 'top-side'
export const BOTTOM = 'bottom-side'
export const LEFT = 'left-side'
export const RIGHT = 'right-side'
export const ALLSIDE = 'all-sides'
export const LEFTANDRIGHT = 'left and right side'
export const TOPANDBOTTOM = 'top and bottom side'
export const ROUNDING = 'borderRadius'
export const ROUNDEDTOPRIGHTBOTTOMLEFT = 'top-right and bottom-left'
export const ROUNDEDTOPLEFTBOTTOMRIGHT = 'top-left and bottom-right'
export const BORDERSIZE = 'borderSize'
export const BORDERSTYLE = 'borderStyle'
export const BORDERCOLOR = 'borderColor'




//element options array



//color names

export const PRIMARY = ['primary color','border_primary']
export const SECONDARY = ['secondary color','border_secondary']
export const ACCENT = ['accent color','border_accent']
export const WHITE = ['white color','border_white']
export const BLACK = ['black color','border_black']


//tailwind css border styles

export const SOLID = ['solid', 'border-solid']
export const DOTTED = ['dotted', 'border-dotted']
export const DASHED = ['dashed', 'border-dashed']
export const DOUBLE = ['double', 'border-double']





//edit options

export const editingOptions = [
   [
    SPACINGINSIDE,
    [ALLSIDE,TOP,LEFT,RIGHT,BOTTOM,LEFTANDRIGHT,TOPANDBOTTOM]
   ],



   [
    SPACINGOUTSIDE,
    [ALLSIDE,TOP,LEFT,RIGHT,BOTTOM,LEFTANDRIGHT,TOPANDBOTTOM]
   ],

   [
    ROUNDING,
    [ALLSIDE,TOP,LEFT,RIGHT,BOTTOM,ROUNDEDTOPRIGHTBOTTOMLEFT,ROUNDEDTOPLEFTBOTTOMRIGHT]
   ],

   [
    BORDERSIZE,
    [ALLSIDE,TOP,LEFT,RIGHT,BOTTOM,LEFTANDRIGHT,TOPANDBOTTOM]
   ],

   [
    BORDERCOLOR,
    [PRIMARY,SECONDARY,ACCENT,WHITE,BLACK]
   ],

   [
    BORDERSTYLE,
    [SOLID,DOTTED,DASHED,DOUBLE]
   ],
]


export const units = [
    'rem',
    'px',
    'em',
    '%'
]


//more complex editing




//Schemas

const EssentialProperties = {
    isEditable:true,
    className:{},
    content: ''
}

export const EditSchemas = {
    [HEADING]:{
        name:HEADING,
    ...EssentialProperties,
        
    },
    [PARAGRAPH]:{
        name:PARAGRAPH,
    ...EssentialProperties,
        
    },
    [HYPERLINK]:{
        name:HYPERLINK,
    ...EssentialProperties,
        href:''
    },
    [IMAGE]:{
        name:IMAGE,
    ...EssentialProperties,
        source:'',
        width:480,
        height:480,
        caption:''
    },
    [ORDEREDLIST]:{
        name:ORDEREDLIST,
    ...EssentialProperties,
    className:{
        ['listStyle']:'list-decimal',
        ['fontFamily']:'',
        ['fontSize']:'',
        ['fontStyle']:'',
    },
        content:[
            {
                ...EssentialProperties,
                content:'',
                className:{
                    ['fontFamily']:this[ORDEREDLIST].className['fontFamily'],
                    ['fontSize']:this[ORDEREDLIST].className['fontSize'],
                    ['fontStyle']:this[ORDEREDLIST].className['fontStyle'],
                }
            }
        ]
    },

    [UNORDEREDLIST]:{
        name:UNORDEREDLIST,
    ...EssentialProperties,
    className:{
        ['listStyle']:'list-disc',
        ['fontFamily']:'',
        ['fontSize']:'',
        ['fontStyle']:'',
    },
        content:[
            {
                ...EssentialProperties,
                content:'',
                className:{
                    ['fontFamily']:this[UNORDEREDLIST].className['fontFamily'],
                    ['fontSize']:this[UNORDEREDLIST].className['fontSize'],
                    ['fontStyle']:this[UNORDEREDLIST].className['fontStyle'],
                }
            }
        ]
    },

    [CONTAINER]:{
        name:CONTAINER,
    ...EssentialProperties,
        content:[] 
    },

    [CODESNIPPET]:{
        name:CODESNIPPET,
    ...EssentialProperties
    }
}



//Image Options

//names

export const SOURCE = 'source'
export const WIDTH = 'width'
export const HEIGHT = 'height'
export const CAPTION = 'caption'

//array

export const ImageOptions =[
    SOURCE,
    WIDTH,
    HEIGHT,
    CAPTION
]




