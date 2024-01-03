export const formatDateToString = (providedDate)=>{
    const date = new Date(providedDate)
const options = { day: 'numeric', month: 'long', year: 'numeric' };
return date?.toLocaleDateString('en-US', options);

}