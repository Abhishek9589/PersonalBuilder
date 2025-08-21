

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scrollToTop } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  MapPin,
  Users,
  Star,
  Shield,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  Calendar,
  Award,
  Heart,
  Globe
} from 'lucide-react';

const popularVenues = [
  {
    id: 1,
    name: "Grand Ballroom Elite",
    location: "Mumbai, Maharashtra",
    capacity: "500-800 guests",
    price: "₹50,000",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
    facilities: ["AC", "Parking", "Catering", "Sound System"]
  },
  {
    id: 2,
    name: "Royal Garden Resort",
    location: "Delhi, NCR",
    capacity: "200-400 guests",
    price: "₹35,000",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    facilities: ["Garden", "Pool", "Parking", "Decoration"]
  },
  {
    id: 3,
    name: "Skyline Conference Hall",
    location: "Bangalore, Karnataka",
    capacity: "100-200 guests",
    price: "₹25,000",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    facilities: ["Projector", "AC", "Wifi", "Catering"]
  }
];

const howItWorks = [
  {
    step: 1,
    title: "Search & Browse",
    description: "Find venues that match your requirements using our smart filters",
    icon: Search
  },
  {
    step: 2,
    title: "Compare & Choose",
    description: "Compare prices, facilities, and reviews to make the best choice",
    icon: CheckCircle
  },
  {
    step: 3,
    title: "Book & Celebrate",
    description: "Secure your booking and celebrate your special moments worry-free",
    icon: Calendar
  }
];

const features = [
  {
    title: "Verified Listings",
    description: "All venues are thoroughly verified for authenticity and quality",
    icon: Shield
  },
  {
    title: "Transparent Pricing",
    description: "No hidden costs. See all charges upfront before booking",
    icon: DollarSign
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your queries",
    icon: Clock
  },
  {
    title: "Quality Assurance",
    description: "Premium venues curated by our expert team",
    icon: Award
  }
];

export default function Index() {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchVenue, setSearchVenue] = useState('');

  const handleSearch = () => {
    // Navigate to venues page with search params
    const params = new URLSearchParams();
    if (searchLocation) params.set('location', searchLocation);
    if (searchVenue) params.set('venue', searchVenue);
    window.location.href = `/venues?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-venue-indigo via-pink-500 to-venue-purple py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-poppins"
          >
            Find Your Perfect
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="block text-rose-300"
            >
              Event Venue
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Discover and book the ideal venue for your special occasions. From intimate gatherings to grand celebrations, find spaces that make memories.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-venue-indigo"
                />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Venue type, name..."
                  value={searchVenue}
                  onChange={(e) => setSearchVenue(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-venue-indigo"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="h-12 bg-venue-indigo hover:bg-venue-purple text-white font-semibold"
              >
                Search Venues
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-venue-dark mb-4">
              Why Choose VenueKart?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make venue booking simple, transparent, and reliable with our premium features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow duration-300 h-full">
                    <CardHeader>
                      <div className="w-16 h-16 bg-venue-lavender rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-venue-indigo" />
                      </div>
                      <CardTitle className="text-venue-dark">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Venues */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-venue-dark mb-4">
              Popular Venues
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most loved venues, perfect for any celebration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularVenues.map((venue) => (
              <Card key={venue.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-venue-indigo">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {venue.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-venue-dark mb-2">{venue.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{venue.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">{venue.capacity}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {venue.facilities.map((facility, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-venue-indigo">{venue.price}</span>
                    <Button asChild className="bg-venue-indigo hover:bg-venue-purple" onClick={scrollToTop}>
                      <Link to={`/venue/${venue.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-venue-indigo hover:bg-venue-purple" onClick={scrollToTop}>
              <Link to="/venues">
                View All Venues
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-venue-dark mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Book your perfect venue in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center relative">
                  <div className="relative w-20 h-20 bg-venue-indigo rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-10 w-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-venue-purple rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-venue-dark mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full">
                      <ArrowRight className="h-6 w-6 text-venue-purple mx-auto" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 relative bg-gradient-to-br from-venue-indigo via-pink-500 to-venue-purple overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with VenueKart
          </h2>
          <p className="text-venue-lavender mb-8 text-lg">
            Get the latest venue listings and exclusive deals delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="bg-white border-none h-12"
            />
            <Button className="bg-venue-purple hover:bg-venue-lavender hover:text-venue-indigo h-12 px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
