import { Container, Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

//components
import StyledJsxRegistry from './lib/registry'
import AuthProvider from './auth/AuthProvider'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html
      lang='en'
      className={inter.className}
    >
      <body>
        <StyledJsxRegistry>
          <AuthProvider>
            <Theme accentColor='iris'>
              <NavBar />
              <main className='p-5'>
                <Container >{children}</Container>
              </main>
              {/* <ThemePanel /> */}
            </Theme>
          </AuthProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  )
}
