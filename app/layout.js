

import '@tailwind/index.css'
import '@css/index.css'
import '@css/prism.css'
import '@vanilla/style/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Providers from '@components/Providers'
import Navbar from '@components/Navbar'
import LogIn from '@components/LogIn'
import SignUp from '@components/SignUp'
import { SiteContentProvider } from '@context/siteContent'
import { SiteDataProvider } from '@context/siteData'


export const metadata = {
  title: 'Josian Newman',
  description: 'Dive deeper into fullstack development and empowerment',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body className='relative'>
          <Providers>
        <Navbar/>
        <LogIn/>
        <SignUp/>
        <main>
          <SiteContentProvider>
            <SiteDataProvider>
              {children}
            </SiteDataProvider>
          </SiteContentProvider>
        </main> 
          </Providers>
          </body>
    </html>
  )
}
