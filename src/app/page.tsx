'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ProductCustomizationModal from '@/components/ProductCustomizationModal'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { products, categories } from '@/data/products'
import { Product, CartItem } from '@/types/product'

export default function Home() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [modalProduct, setModalProduct] = useState<Product | null>(null)
  const [modalIsMenu, setModalIsMenu] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openCustomizationModal = (product: Product, isMenu: boolean) => {
    setModalProduct(product)
    setModalIsMenu(isMenu)
    setIsModalOpen(true)
  }

  const addToCart = (product: Product, isMenu: boolean, customizations?: any) => {
    const existingItem = cart.find(
      item => item.product.id === product.id && 
              item.isMenu === isMenu &&
              JSON.stringify(item.customizations) === JSON.stringify(customizations)
    )

    let newCart
    if (existingItem) {
      newCart = cart.map(item =>
        item.product.id === product.id && 
        item.isMenu === isMenu &&
        JSON.stringify(item.customizations) === JSON.stringify(customizations)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      newCart = [...cart, { product, quantity: 1, isMenu, customizations }]
    }
    
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} />
      
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              🔥 Ouvert maintenant • Livraison rapide
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Le Bin's
              <span className="text-primary block">Burger</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Découvrez nos <span className="text-primary font-semibold">burgers artisanaux</span>, 
              <span className="text-primary font-semibold"> kebabs savoureux</span> et 
              <span className="text-primary font-semibold"> tacos généreux</span> préparés avec amour à Bergerac
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center space-x-2 bg-card border border-border rounded-lg px-4 py-3 shadow-sm">
                <span className="text-2xl">⚡</span>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Click & Collect</div>
                  <div className="text-sm text-muted-foreground">Prêt en 15min</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-card border border-border rounded-lg px-4 py-3 shadow-sm">
                <span className="text-2xl">🚚</span>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Livraison</div>
                  <div className="text-sm text-muted-foreground">Bergerac & environs</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-card border border-border rounded-lg px-4 py-3 shadow-sm">
                <span className="text-2xl">💳</span>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Paiement</div>
                  <div className="text-sm text-muted-foreground">100% sécurisé</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>📍 27 Cours Alsace Lorraine, Bergerac</span>
            </div>
          </div>
        </div>

        {/* Section Pourquoi nous choisir */}
        <div className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  🏆 Pourquoi Le Bin's ?
                </div>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  L'expérience qui fait la différence
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-xl">🥩</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Ingrédients premium</h3>
                      <p className="text-muted-foreground">Viandes fraîches, légumes du jour, pain artisanal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Service express</h3>
                      <p className="text-muted-foreground">15 minutes chrono, même aux heures de pointe</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-xl">❤️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Fait avec passion</h3>
                      <p className="text-muted-foreground">Équipe locale, recettes maison depuis 2020</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" 
                    alt="Burger artisanal" 
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" 
                    alt="Équipe cuisine" 
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow mt-8"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop" 
                    alt="Tacos frais" 
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow -mt-8"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop" 
                    alt="Restaurant" 
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  />
                </div>
                
                {/* Badge flottant */}
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold shadow-lg">
                  ⭐ 4.8/5
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Section Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              🍽️ Notre Carte
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nos Spécialités
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chaque produit est préparé à la commande avec des ingrédients frais et de qualité
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12" data-category-filter>
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="rounded-full px-6 py-3 font-medium transition-all hover:scale-105 text-foreground dark:text-white"
              size="lg"
            >
              🍽️ Tous les produits
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full px-6 py-3 font-medium transition-all hover:scale-105 text-foreground dark:text-white"
                size="lg"
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onCustomize={openCustomizationModal}
            />
          ))}
        </div>
        </div>

        {/* Section Comment ça marche */}
        <div className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                🚀 Simple & Rapide
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Comment ça marche ?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <span className="text-4xl">📱</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Choisissez</h3>
                <p className="text-muted-foreground">Parcourez notre menu et personnalisez vos plats</p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <span className="text-4xl">💳</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Payez</h3>
                <p className="text-muted-foreground">Paiement sécurisé en ligne, simple et rapide</p>
              </div>
              
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <span className="text-4xl">🍔</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Dégustez</h3>
                <p className="text-muted-foreground">Récupérez ou recevez votre commande chaude</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Témoignages */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                💬 Ils nous font confiance
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Nos clients adorent !
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" 
                    alt="Client" 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-bold text-foreground">Thomas M.</div>
                    <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Meilleur tacos de Bergerac ! Livraison ultra rapide et toujours chaud 🔥"
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face" 
                    alt="Cliente" 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-bold text-foreground">Sarah L.</div>
                    <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Équipe super sympa, burgers délicieux. Mon resto préféré ! 😍"
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" 
                    alt="Client" 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-bold text-foreground">Marc D.</div>
                    <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Click & collect parfait pour ma pause déj. Jamais déçu ! 👌"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section CTA finale */}
        <div className="py-20 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Prêt à vous régaler ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Commandez maintenant et découvrez pourquoi on est les préférés de Bergerac !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                onClick={() => {
                  document.querySelector('[data-category-filter]')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                🍔 Voir le menu
              </Button>
              
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm">Ouvert maintenant</span>
                </div>
                <span className="text-sm">•</span>
                <span className="text-sm">Livraison en 30min</span>
              </div>
            </div>
          </div>
        </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="fixed bottom-6 right-6 bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-2xl p-6 max-w-sm z-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground flex items-center">
                  🛒 Panier
                </h3>
                <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-bold">
                  {cartItemsCount}
                </div>
              </div>
              
              <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-start bg-muted/50 rounded-lg p-3">
                    <div className="flex-1">
                      <div className="font-medium text-foreground text-sm">
                        {item.quantity}x {item.product.name}
                      </div>
                      {item.isMenu && (
                        <div className="text-xs text-primary font-medium">Menu</div>
                      )}
                    </div>
                    <div className="font-bold text-foreground">
                      {((item.isMenu ? item.product.menuPrice : item.product.price) || 0 * item.quantity).toFixed(2)} €
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border pt-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-xl font-bold text-primary">
                    {cart.reduce((total, item) => 
                      total + (item.isMenu ? item.product.menuPrice || 0 : item.product.price) * item.quantity, 0
                    ).toFixed(2)} €
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={() => router.push('/checkout')}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
                size="lg"
              >
                🚀 Commander maintenant
              </Button>
            </div>
          )}
      </main>

      <ProductCustomizationModal
        product={modalProduct}
        isMenu={modalIsMenu}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
      />

      <Footer />
    </div>
  )
}
