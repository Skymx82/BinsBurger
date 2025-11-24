'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import OrdersTable from '@/components/admin/OrdersTable'
import AdminAuth from '@/components/admin/AdminAuth'
import { mockOrders, updateOrderStatus } from '@/data/mockOrders'
import { Order } from '@/types/order'
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Users,
  Euro,
  ChefHat,
  Truck,
  LogOut
} from 'lucide-react'

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('adminAuthenticated')
      const authTime = localStorage.getItem('adminAuthTime')
      
      if (isAuth === 'true' && authTime) {
        // Vérifier si la session n'a pas expiré (24h)
        const authTimestamp = parseInt(authTime)
        const now = Date.now()
        const sessionDuration = 24 * 60 * 60 * 1000 // 24 heures
        
        if (now - authTimestamp < sessionDuration) {
          setIsAuthenticated(true)
        } else {
          // Session expirée
          localStorage.removeItem('adminAuthenticated')
          localStorage.removeItem('adminAuthTime')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Mettre à jour l'heure toutes les minutes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status)
    setOrders([...mockOrders]) // Forcer le re-render
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    localStorage.removeItem('adminAuthTime')
    setIsAuthenticated(false)
  }

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
  }

  // Affichage pendant le chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Chargement...</div>
      </div>
    )
  }

  // Affichage de l'authentification si pas connecté
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />
  }

  // Statistiques
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    preparingOrders: orders.filter(o => o.status === 'preparing').length,
    readyOrders: orders.filter(o => o.status === 'ready').length,
    todayRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0
  }

  // Filtrer les commandes par statut
  const pendingOrders = orders.filter(o => o.status === 'pending')
  const activeOrders = orders.filter(o => ['confirmed', 'preparing', 'ready'].includes(o.status))
  const completedOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status))

  return (
    <div className="min-h-screen bg-background">
      {/* Header Admin */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin - Le Bin's Burger</h1>
              <p className="text-sm text-muted-foreground">
                {currentTime.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                🟢 Restaurant ouvert
              </Badge>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Voir le site
              </Button>
              <Button variant="ghost" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes aujourd'hui</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                +2 depuis hier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">
                À confirmer
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En préparation</CardTitle>
              <ChefHat className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.preparingOrders}</div>
              <p className="text-xs text-muted-foreground">
                En cuisine
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
              <Euro className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.todayRevenue.toFixed(2)} €</div>
              <p className="text-xs text-muted-foreground">
                Panier moyen: {stats.avgOrderValue.toFixed(2)} €
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alertes urgentes */}
        {stats.readyOrders > 0 && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">
                  {stats.readyOrders} commande{stats.readyOrders > 1 ? 's' : ''} prête{stats.readyOrders > 1 ? 's' : ''} pour récupération/livraison !
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Onglets des commandes */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending" className="relative">
              En attente
              {stats.pendingOrders > 0 && (
                <Badge className="ml-2 bg-yellow-600 text-white text-xs">
                  {stats.pendingOrders}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="active" className="relative">
              Actives
              {activeOrders.length > 0 && (
                <Badge className="ml-2 bg-blue-600 text-white text-xs">
                  {activeOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">
              Terminées
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Commandes en attente de confirmation</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingOrders.length > 0 ? (
                  <OrdersTable 
                    orders={pendingOrders} 
                    onStatusChange={handleStatusChange}
                  />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Aucune commande en attente
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Commandes actives</CardTitle>
              </CardHeader>
              <CardContent>
                {activeOrders.length > 0 ? (
                  <OrdersTable 
                    orders={activeOrders} 
                    onStatusChange={handleStatusChange}
                  />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Aucune commande active
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Commandes terminées</CardTitle>
              </CardHeader>
              <CardContent>
                {completedOrders.length > 0 ? (
                  <OrdersTable 
                    orders={completedOrders} 
                    onStatusChange={handleStatusChange}
                  />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Aucune commande terminée
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
