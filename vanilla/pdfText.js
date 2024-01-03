import pdfExtractor from 'pdfjs-dist/build/pdf'


export const extractPdf = async(pdfurl)=>{
    
        const pdf = await pdfjslib(pdfurl).promise
        const pageNumbers = pdf.numPages

        console.log(pageNumbers)
        const paragraphs = []

        let i=1
        while(i<=pageNumbers){
            const page = await pdf.getPage(i)
            const txt = await page.getTextContent()
            const fullText = txt.items.map(s=>s.str).join(' ')
            console.log(fullText,txt)
            const paragraph = fullText.split('\n')
            paragraphs.push(...paragraph)
        }

        return paragraphs
        
    
}



export const findText = (text,array)=>{ 
    const length = array.length
    array.forEach((paragraph,index) => {
        if(paragraph.includes(text)){
            if(index !== length - 1){
            return [paragraph,array[index + 1]].join(' ')
            }
            return paragraph
        }
        
    });

}