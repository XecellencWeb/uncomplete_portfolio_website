import pdfjs from 'pdfjs-dist'


export const POST = async(req)=>{
    const {pdfurl} = await req.json()
    try {
        const paragraphs = []
        const pdf = await pdfjs.getDocument(pdfurl).promise
        console.log('done')
        const pageNo = pdf.numPages
        console.log(pageNo)
        let i=1
        while(i<=pageNo){
            const page = await pdf.getPage(i)
            const text = await page.getTextContent()
            const txt = text.items.map(s => s.str).join('')
            console.log(text,txt)
            const paragraph = txt.split('\n')

            paragraphs.push(...paragraph)
            
            i++
        }

        return new Response(JSON.stringify({textArray:paragraphs}), {status:200})
        
    } catch (err) {

        return new Response(JSON.stringify('An Error Occured'), {status:err.status || 500})
        
    }
}