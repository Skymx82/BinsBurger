'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types/product"
import { Plus } from "lucide-react"

interface ProductCardProps {
  product: Product
  onCustomize: (product: Product, isMenu: boolean) => void
}

export default function ProductCard({ product, onCustomize }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/20 bg-card">
      <CardContent className="p-0 flex-1">
        {/* Image */}
        <div className="relative w-full h-48 bg-muted rounded-t-lg mb-4 overflow-hidden">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                {product.category === 'sandwich' && '🥙'}
                {product.category === 'tacos' && '🌮'}
                {product.category === 'baps' && '🍟'}
                {product.category === 'burger' && '🍔'}
              </span>
            </div>
          )}
          
          {/* Badge catégorie */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm font-medium">
              {product.category === 'sandwich' && '🥙 Sandwich'}
              {product.category === 'tacos' && '🌮 Tacos'}
              {product.category === 'baps' && '🍟 Bap\'s'}
              {product.category === 'burger' && '🍔 Burger'}
            </Badge>
          </div>
          
          {/* Badge populaire (exemple) */}
          {product.id.includes('kebab') && (
            <div className="absolute top-3 right-3">
              <Badge variant="destructive" className="animate-pulse">
                🔥 Populaire
              </Badge>
            </div>
          )}
        </div>

        <div className="px-4 pb-4">
          <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-primary">{product.price.toFixed(2)} €</span>
                {product.menuPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {(product.price + 1).toFixed(2)} €
                  </span>
                )}
              </div>
              {product.menuPrice && (
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-sm font-medium text-accent-foreground bg-accent px-2 py-1 rounded-full">
                    Menu: {product.menuPrice.toFixed(2)} €
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-3">
          <Button 
            onClick={() => onCustomize(product, false)}
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 font-medium"
            variant="outline"
            size="lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter • {product.price.toFixed(2)} €
          </Button>
          
          {product.menuPrice && (
            <Button 
              onClick={() => onCustomize(product, true)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              🍟 Menu complet • {product.menuPrice.toFixed(2)} €
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
