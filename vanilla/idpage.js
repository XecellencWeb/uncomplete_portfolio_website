export default function scrollToId (hash){
    const section = document.querySelector(hash)
    section && section.scrollIntoView({behavior: 'smooth'})
    }

export const scrollToTop = (id)=>{
    const top = document.querySelector(id)
    top.scrollIntoView(
      {behavior: 'smooth'}
    )
  }

  export const observe = (element)=>{
      const observedElement = document.querySelector(element);
      
    function handleIntersection(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observedElement.style.transition = '10s opacity'
            observedElement.style.opacity = '1'
            // Perform actions when the observed element is in the viewport
          } else {
            observedElement.style.transition = '500ms opacity'
            observedElement.style.opacity = '.1'
            // Perform actions when the observed element is out of the viewport
          }
        });
      }
  
      // Create an Intersection Observer
      const observer = new IntersectionObserver(handleIntersection,{threshold:1});
  
      // Target the element you want to observe
  
      // Start observing the element
      observer.observe(observedElement);
}