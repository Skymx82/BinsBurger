import { Phone, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>05 53 XX XX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>27 Cours Alsace Lorraine<br />24100 Bergerac</span>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Horaires</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Lun - Dim</span>
                <span>11h30 - 14h30</span>
              </div>
              <div className="flex justify-between">
                <span></span>
                <span>18h00 - 22h30</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>✓ Click & Collect</div>
              <div>✓ Livraison</div>
              <div>✓ Paiement en ligne</div>
              <div>✓ Climatisation</div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Le Bin's Burger - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  )
}
