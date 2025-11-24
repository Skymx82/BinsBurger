'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Order } from '@/types/order'
import { 
  Clock, 
  Truck, 
  CheckCircle, 
  AlertCircle, 
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  ChefHat
} from 'lucide-react'

const statusConfig = {
  pending: { 
    label: 'En attente', 
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock 
  },
  confirmed: { 
    label: 'Confirmée', 
    color: 'bg-blue-100 text-blue-800',
    icon: CheckCircle 
  },
  preparing: { 
    label: 'En préparation', 
    color: 'bg-orange-100 text-orange-800',
    icon: ChefHat 
  },
  ready: { 
    label: 'Prête', 
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle 
  },
  delivered: { 
    label: 'Livrée', 
    color: 'bg-gray-100 text-gray-800',
    icon: Truck 
  },
  cancelled: { 
    label: 'Annulée', 
    color: 'bg-red-100 text-red-800',
    icon: AlertCircle 
  }
}

interface OrdersTableProps {
  orders: Order[]
  onStatusChange: (orderId: string, status: Order['status']) => void
}

export default function OrdersTable({ orders, onStatusChange }: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    const statusFlow = {
      pending: 'confirmed',
      confirmed: 'preparing',
      preparing: 'ready',
      ready: 'delivered'
    } as const

    return statusFlow[currentStatus as keyof typeof statusFlow] || null
  }

  const getStatusBadge = (status: Order['status']) => {
    const config = statusConfig[status]
    const Icon = config.icon
    
    return (
      <Badge className={`${config.color} flex items-center space-x-1`}>
        <Icon className="h-3 w-3" />
        <span>{config.label}</span>
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Commande</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Heure</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="cursor-pointer hover:bg-gray-50">
              <TableCell className="font-medium">
                <div>
                  <div className="font-semibold">{order.id}</div>
                  <div className="text-sm text-gray-500">
                    {order.items.length} article{order.items.length > 1 ? 's' : ''}
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div>
                  <div className="font-medium">
                    {order.customerInfo.firstName} {order.customerInfo.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.customerInfo.phone}
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center space-x-1">
                  {order.deliveryMethod === 'click-collect' ? (
                    <>
                      <Clock className="h-4 w-4" />
                      <span>Click & Collect</span>
                    </>
                  ) : (
                    <>
                      <Truck className="h-4 w-4" />
                      <span>Livraison</span>
                    </>
                  )}
                </div>
                {order.pickupInfo && (
                  <div className="text-sm text-gray-500">
                    {order.pickupInfo.time}
                  </div>
                )}
              </TableCell>
              
              <TableCell>
                {getStatusBadge(order.status)}
              </TableCell>
              
              <TableCell className="font-semibold">
                {order.total.toFixed(2)} €
              </TableCell>
              
              <TableCell>
                <div className="text-sm">
                  {formatTime(order.createdAt)}
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    Détails
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {getNextStatus(order.status) && (
                        <DropdownMenuItem
                          onClick={() => onStatusChange(order.id, getNextStatus(order.status)!)}
                        >
                          Passer à "{statusConfig[getNextStatus(order.status)!].label}"
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => onStatusChange(order.id, 'cancelled')}
                        className="text-red-600"
                      >
                        Annuler
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de détails de commande */}
      {selectedOrder && (
        <AlertDialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <AlertDialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <AlertDialogHeader className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <AlertDialogTitle className="text-2xl font-bold">
                    Commande {selectedOrder.id}
                  </AlertDialogTitle>
                  <div className="flex items-center space-x-4 mt-2">
                    {getStatusBadge(selectedOrder.status)}
                    <span className="text-sm text-gray-500">
                      Passée le {selectedOrder.createdAt.toLocaleDateString('fr-FR')} à {formatTime(selectedOrder.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedOrder.total.toFixed(2)} €
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedOrder.paymentStatus === 'paid' ? '✅ Payé' : '❌ Non payé'}
                  </div>
                </div>
              </div>
            </AlertDialogHeader>

            <AlertDialogDescription asChild>
              <div className="py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Colonne gauche - Informations */}
                  <div className="space-y-6">
                    {/* Informations client */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Informations client
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nom :</span>
                          <span className="font-medium">{selectedOrder.customerInfo.firstName} {selectedOrder.customerInfo.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Téléphone :</span>
                          <span className="font-medium">{selectedOrder.customerInfo.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email :</span>
                          <span className="font-medium text-xs">{selectedOrder.customerInfo.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Livraison/Récupération */}
                    <div className={`rounded-lg p-4 ${selectedOrder.deliveryMethod === 'click-collect' ? 'bg-orange-50' : 'bg-green-50'}`}>
                      <h3 className={`font-semibold mb-3 flex items-center ${selectedOrder.deliveryMethod === 'click-collect' ? 'text-orange-900' : 'text-green-900'}`}>
                        {selectedOrder.deliveryMethod === 'click-collect' ? (
                          <>
                            <Clock className="h-4 w-4 mr-2" />
                            Click & Collect
                          </>
                        ) : (
                          <>
                            <Truck className="h-4 w-4 mr-2" />
                            Livraison à domicile
                          </>
                        )}
                      </h3>
                      
                      {selectedOrder.deliveryMethod === 'click-collect' ? (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date :</span>
                            <span className="font-medium">
                              {new Date(selectedOrder.pickupInfo!.date).toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long'
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Heure :</span>
                            <span className="font-medium text-lg">{selectedOrder.pickupInfo!.time}</span>
                          </div>
                          <div className="mt-3 p-2 bg-orange-100 rounded text-xs">
                            📍 27 Cours Alsace Lorraine, 24100 Bergerac
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Adresse :</span>
                            <span className="font-medium text-right">{selectedOrder.deliveryInfo!.address}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Ville :</span>
                            <span className="font-medium">{selectedOrder.deliveryInfo!.postalCode} {selectedOrder.deliveryInfo!.city}</span>
                          </div>
                          {selectedOrder.deliveryInfo!.instructions && (
                            <div className="mt-3 p-2 bg-green-100 rounded text-xs">
                              <strong>Instructions :</strong> {selectedOrder.deliveryInfo!.instructions}
                            </div>
                          )}
                          <div className="flex justify-between mt-2">
                            <span className="text-gray-600">Frais de livraison :</span>
                            <span className="font-medium">{selectedOrder.deliveryInfo!.deliveryFee.toFixed(2)} €</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Colonne droite - Articles */}
                  <div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <ChefHat className="h-4 w-4 mr-2" />
                        Articles commandés ({selectedOrder.items.length})
                      </h3>
                      
                      <div className="space-y-4">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="bg-white rounded-lg p-3 border">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <div className="font-medium text-lg">
                                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm mr-2">
                                    {item.quantity}x
                                  </span>
                                  {item.product.name}
                                </div>
                                {item.isMenu && (
                                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mt-1 inline-block">
                                    MENU (frites + boisson)
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-lg">
                                  {((item.isMenu ? item.product.menuPrice || item.product.price : item.product.price) * item.quantity).toFixed(2)} €
                                </div>
                                <div className="text-xs text-gray-500">
                                  {(item.isMenu ? item.product.menuPrice || item.product.price : item.product.price).toFixed(2)} € × {item.quantity}
                                </div>
                              </div>
                            </div>
                            
                            {item.customizations && (
                              <div className="mt-3 space-y-2">
                                {item.customizations.meats.length > 0 && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded font-medium">
                                      VIANDES
                                    </span>
                                    <span className="text-sm font-medium">
                                      {item.customizations.meats.join(', ')}
                                    </span>
                                  </div>
                                )}
                                {item.customizations.sauces.length > 0 && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-medium">
                                      SAUCES
                                    </span>
                                    <span className="text-sm">
                                      {item.customizations.sauces.join(', ')}
                                    </span>
                                  </div>
                                )}
                                {item.customizations.boisson && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                                      BOISSON
                                    </span>
                                    <span className="text-sm">
                                      {item.customizations.boisson}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Total */}
                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>TOTAL À PAYER</span>
                            <span className="text-2xl text-green-600">{selectedOrder.total.toFixed(2)} €</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>

            <AlertDialogFooter className="border-t pt-4">
              <div className="flex justify-between w-full">
                <div className="flex space-x-2">
                  {getNextStatus(selectedOrder.status) && (
                    <Button
                      onClick={() => {
                        onStatusChange(selectedOrder.id, getNextStatus(selectedOrder.status)!)
                        setSelectedOrder(null)
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Passer à "{statusConfig[getNextStatus(selectedOrder.status)!].label}"
                    </Button>
                  )}
                  {selectedOrder.status !== 'cancelled' && (
                    <Button
                      onClick={() => {
                        onStatusChange(selectedOrder.id, 'cancelled')
                        setSelectedOrder(null)
                      }}
                      variant="destructive"
                    >
                      Annuler la commande
                    </Button>
                  )}
                </div>
                <AlertDialogCancel>Fermer</AlertDialogCancel>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
