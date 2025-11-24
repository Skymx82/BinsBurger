'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Product } from "@/types/product"
import { sauces, boissons, viandes } from "@/data/options"
import { Plus } from "lucide-react"

interface ProductCustomizationModalProps {
  product: Product | null
  isMenu: boolean
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product, isMenu: boolean, customizations: any) => void
}

export default function ProductCustomizationModal({
  product,
  isMenu,
  isOpen,
  onClose,
  onAddToCart
}: ProductCustomizationModalProps) {
  const [selectedSauces, setSelectedSauces] = useState<string[]>([])
  const [selectedBoisson, setSelectedBoisson] = useState<string>('')
  const [selectedMeats, setSelectedMeats] = useState<string[]>([])

  if (!product) return null

  const handleSauceChange = (sauceId: string, checked: boolean) => {
    if (checked) {
      setSelectedSauces([...selectedSauces, sauceId])
    } else {
      setSelectedSauces(selectedSauces.filter(id => id !== sauceId))
    }
  }

  const handleMeatChange = (meatId: string, position: number) => {
    const newMeats = [...selectedMeats]
    newMeats[position] = meatId
    setSelectedMeats(newMeats)
  }

  const handleAddToCart = () => {
    const customizations = {
      sauces: selectedSauces,
      boisson: isMenu ? selectedBoisson : null,
      meats: selectedMeats
    }
    
    onAddToCart(product, isMenu, customizations)
    
    // Reset form
    setSelectedSauces([])
    setSelectedBoisson('')
    setSelectedMeats([])
    onClose()
  }

  const isFormValid = () => {
    // Vérifier si les viandes sont sélectionnées pour les tacos
    if (product.category === 'tacos') {
      const requiredMeats = getMeatCount()
      return selectedMeats.filter(meat => meat).length === requiredMeats
    }
    
    // Vérifier si une boisson est sélectionnée pour les menus
    if (isMenu && !selectedBoisson) {
      return false
    }
    
    return true
  }

  const getMeatCount = () => {
    if (product.category === 'tacos') {
      if (product.name.includes('1 viande')) return 1
      if (product.name.includes('XL')) return 3
      return 2
    }
    return 0
  }

  const price = isMenu ? product.menuPrice || product.price : product.price

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Personnaliser votre {product.name} {isMenu ? '(Menu)' : ''}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Choix des viandes pour les tacos */}
          {product.category === 'tacos' && (
            <div>
              <Label className="text-base font-semibold">
                Choix des viandes ({getMeatCount()} viande{getMeatCount() > 1 ? 's' : ''})
              </Label>
              <div className="space-y-3 mt-2">
                {Array.from({ length: getMeatCount() }).map((_, index) => (
                  <div key={index}>
                    <Label className="text-sm text-gray-600">
                      {getMeatCount() === 1 ? 'Viande' : 
                       index === 0 ? '1ère viande' :
                       index === 1 ? '2ème viande' : '3ème viande'}
                    </Label>
                    <Select onValueChange={(value) => handleMeatChange(value, index)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une viande" />
                      </SelectTrigger>
                      <SelectContent>
                        {viandes.map((viande) => (
                          <SelectItem key={viande.id} value={viande.id}>
                            {viande.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Choix des sauces */}
          <div>
            <Label className="text-base font-semibold">Sauces (optionnel)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {sauces.map((sauce) => (
                <div key={sauce.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={sauce.id}
                    checked={selectedSauces.includes(sauce.id)}
                    onCheckedChange={(checked) => handleSauceChange(sauce.id, !!checked)}
                  />
                  <Label htmlFor={sauce.id} className="text-sm">
                    {sauce.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Choix de la boisson pour les menus */}
          {isMenu && (
            <div>
              <Label className="text-base font-semibold">Boisson *</Label>
              <Select onValueChange={setSelectedBoisson}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choisir une boisson" />
                </SelectTrigger>
                <SelectContent>
                  {boissons.map((boisson) => (
                    <SelectItem key={boisson.id} value={boisson.id}>
                      {boisson.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col space-y-2">
          <div className="text-center font-semibold text-lg">
            Total: {price.toFixed(2)} €
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button 
              onClick={handleAddToCart}
              disabled={!isFormValid()}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter au panier
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
