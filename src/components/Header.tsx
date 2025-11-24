'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, MapPin, Clock } from "lucide-react"
import ThemeToggle from "./ThemeToggle"

interface HeaderProps {
  cartItemsCount?: number
}

export default function Header({ cartItemsCount = 0 }: HeaderProps) {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-xl">🍔</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Le Bin's</h1>
                <p className="text-sm text-primary font-medium -mt-1">Burger</p>
              </div>
            </div>
          </div>

          {/* Infos restaurant */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-2 bg-card border border-border rounded-lg px-3 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">Ouvert maintenant</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Bergerac • Livraison rapide</span>
            </div>
          </div>

          {/* Panier et Thème */}
          <div className="flex items-center space-x-3">
            <div className="bg-card border border-border rounded-lg p-2">
              <ThemeToggle />
            </div>
            
            <Button 
              variant="default" 
              className="relative bg-card text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-border hover:border-primary group"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {cartItemsCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-primary text-primary-foreground animate-bounce"
                >
                  {cartItemsCount}
                </Badge>
              )}
              <span className="ml-2 hidden sm:inline font-medium">
                {cartItemsCount > 0 ? `Panier (${cartItemsCount})` : 'Panier'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
