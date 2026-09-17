// Replace these mock functions with fetch/axios calls when the backend is ready.
// Keep the return shapes stable so the UI does not need to change.

import {
  inventory,
  orders,
  members,
  forecastCards,
  salesData,
} from '../data/mockData'

export const api = {
  async getInventory() {
    return Promise.resolve(inventory)
  },

  async getOrders() {
    return Promise.resolve(orders)
  },

  async getMembers() {
    return Promise.resolve(members)
  },

  async getForecast() {
    return Promise.resolve(forecastCards)
  },

  async getAnalytics() {
    return Promise.resolve(salesData)
  },

  async acceptOrder(orderId) {
    return Promise.resolve({
      success: true,
      orderId,
      status: 'Preparing',
    })
  },

  async createListing(payload) {
    return Promise.resolve({
      success: true,
      listing: payload,
    })
  },

  async optimizeRoute(payload) {
    return Promise.resolve({
      ...payload,
      route: [
        'FPO Centre',
        'Wholesaler B',
        'Restaurant A',
        'Retailer C',
      ],
      distanceKm: 42,
      estimatedMinutes: 78,
      distanceSavedKm: 8.4,
      timeSavedMinutes: 17,
    })
  },
}
