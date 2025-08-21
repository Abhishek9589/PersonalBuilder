import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import AddVenueForm from '@/components/AddVenueForm';
import EditVenueForm from '@/components/EditVenueForm';
import {
  Building,
  Home,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Users,
  MapPin,
  DollarSign
} from 'lucide-react';

// Sample data for demonstration
const sampleVenues = [
  {
    id: 1,
    name: "Grand Ballroom Elite",
    location: "Mumbai, Maharashtra",
    capacity: 650,
    price: 50000,
    status: "active",
    bookings: 23,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Royal Garden Resort",
    location: "Delhi, NCR",
    capacity: 300,
    price: 35000,
    status: "active",
    bookings: 18,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop"
  }
];

const sampleBookings = [
  {
    id: 1,
    venueId: 1,
    venueName: "Grand Ballroom Elite",
    customerName: "Rajesh Kumar",
    customerEmail: "rajesh.kumar@email.com",
    eventDate: "2025-02-15",
    eventType: "Wedding",
    guests: 500,
    amount: 50000,
    status: "confirmed",
    bookingDate: "2025-01-15"
  },
  {
    id: 2,
    venueId: 2,
    venueName: "Royal Garden Resort",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@email.com",
    eventDate: "2025-03-20",
    eventType: "Birthday Party",
    guests: 150,
    amount: 35000,
    status: "pending",
    bookingDate: "2025-01-20"
  }
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddVenueForm, setShowAddVenueForm] = useState(false);
  const [showEditVenueForm, setShowEditVenueForm] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);
  const [venues, setVenues] = useState(sampleVenues);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isVenueOwner } = useAuth();

  useEffect(() => {
    // Check if user is authenticated as venue owner
    if (!user || !isVenueOwner()) {
      navigate('/signin');
    }
  }, [user, isVenueOwner, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'venues', label: 'Venue Management', icon: Building },
    { id: 'bookings', label: 'Booking Overview', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Account Settings', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-venue-dark">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your venues.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Venues</p>
                <p className="text-3xl font-bold text-venue-dark">{sampleVenues.length}</p>
              </div>
              <Building className="h-8 w-8 text-venue-indigo" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-3xl font-bold text-venue-dark">{sampleBookings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-venue-indigo" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-3xl font-bold text-venue-dark">₹{(sampleBookings.reduce((sum, booking) => sum + booking.amount, 0)).toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-venue-indigo" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Venues</p>
                <p className="text-3xl font-bold text-venue-dark">{sampleVenues.filter(v => v.status === 'active').length}</p>
              </div>
              <Users className="h-8 w-8 text-venue-indigo" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest venue bookings from customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleBookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold text-venue-dark">{booking.customerName}</h4>
                  <p className="text-sm text-gray-600">{booking.venueName} • {booking.eventDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-venue-dark">₹{booking.amount.toLocaleString()}</p>
                  <p className={`text-sm ${booking.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVenues = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-venue-dark">Venue Management</h1>
          <p className="text-gray-600">Manage your venue listings and details</p>
        </div>
        <Button
          className="bg-venue-indigo hover:bg-venue-purple text-white"
          onClick={() => setShowAddVenueForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Venue
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {venues.map((venue) => (
          <Card key={venue.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-venue-dark mb-2">{venue.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {venue.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {venue.capacity} guests
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ₹{venue.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${venue.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {venue.status.charAt(0).toUpperCase() + venue.status.slice(1)}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditForm(venue)}
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-venue-dark">Booking Overview</h1>
        <p className="text-gray-600">Track and manage venue bookings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>Complete list of venue bookings with customer details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Venue</th>
                  <th className="text-left p-4">Event Date</th>
                  <th className="text-left p-4">Guests</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleBookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{booking.customerName}</p>
                        <p className="text-sm text-gray-600">{booking.customerEmail}</p>
                      </div>
                    </td>
                    <td className="p-4">{booking.venueName}</td>
                    <td className="p-4">{booking.eventDate}</td>
                    <td className="p-4">{booking.guests}</td>
                    <td className="p-4">₹{booking.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Contact</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-venue-dark">Analytics</h1>
        <p className="text-gray-600">View performance metrics and insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Venue Performance</CardTitle>
            <CardDescription>Views and bookings by venue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleVenues.map((venue) => (
                <div key={venue.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{venue.name}</p>
                    <p className="text-sm text-gray-600">{venue.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">⭐ {venue.rating}</p>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>Monthly revenue breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>January 2025</span>
                <span className="font-semibold">₹85,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span>December 2024</span>
                <span className="font-semibold">₹92,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span>November 2024</span>
                <span className="font-semibold">₹78,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-venue-dark">Account Settings</h1>
        <p className="text-gray-600">Manage your account preferences and information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your basic account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Business Name</label>
              <input className="w-full p-2 border rounded-lg mt-1" defaultValue="VenueKart" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Location</label>
              <input className="w-full p-2 border rounded-lg mt-1" defaultValue="Pune, Maharashtra" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input className="w-full p-2 border rounded-lg mt-1" defaultValue="info@venuekart.in" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input className="w-full p-2 border rounded-lg mt-1" defaultValue="8806621666" />
            </div>
            <Button className="bg-venue-indigo hover:bg-venue-purple text-white">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const handleAddVenue = (venueData) => {
    const newVenue = {
      id: venues.length + 1,
      name: venueData.venueName,
      location: venueData.location,
      capacity: venueData.footfall,
      price: venueData.price,
      status: "active",
      bookings: 0,
      rating: 0,
      image: venueData.images[0] || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop"
    };
    setVenues([...venues, newVenue]);
  };

  const handleEditVenue = (updatedVenueData) => {
    setVenues(venues.map(venue =>
      venue.id === updatedVenueData.id
        ? {
            ...venue,
            name: updatedVenueData.venueName,
            location: updatedVenueData.location,
            capacity: updatedVenueData.footfall,
            price: updatedVenueData.price,
            image: updatedVenueData.images[0] || venue.image
          }
        : venue
    ));
  };

  const openEditForm = (venue) => {
    setEditingVenue(venue);
    setShowEditVenueForm(true);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'venues':
        return renderVenues();
      case 'bookings':
        return renderBookings();
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-venue-dark">Admin Portal</h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.location.href = '/'}
              title="Close Admin Portal"
            >
              <X className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <nav className="mt-6 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeSection === item.id
                    ? 'bg-venue-indigo text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome back, Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <AddVenueForm
        isOpen={showAddVenueForm}
        onClose={() => setShowAddVenueForm(false)}
        onSubmit={handleAddVenue}
      />

      <EditVenueForm
        isOpen={showEditVenueForm}
        onClose={() => {
          setShowEditVenueForm(false);
          setEditingVenue(null);
        }}
        onSubmit={handleEditVenue}
        venue={editingVenue}
      />
    </div>
  );
}
