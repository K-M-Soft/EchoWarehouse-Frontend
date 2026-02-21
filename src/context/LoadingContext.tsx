import { createContext, ReactNode, useState } from 'react'

export interface LoadingContextType {
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}
