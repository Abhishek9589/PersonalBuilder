import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { scrollToTop } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  MapPin,
  Users,
  Star,
  Filter,
  X,
  SlidersHorizontal,
  Heart,
  ArrowRight
} from 'lucide-react';

const venues = [
  {
    id: 1,
    name: "Grand Ballroom Elite",
    location: "Mumbai, Maharashtra",
    capacity: 650,
    price: 50000,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
    facilities: ["AC", "Parking", "Catering", "Sound System", "Stage", "Lighting"],
    type: "Banquet Hall",
    description: "Elegant banquet hall perfect for weddings and large celebrations with premium amenities."
  },
  {
    id: 2,
    name: "Royal Garden Resort",
    location: "Delhi, NCR",
    capacity: 300,
    price: 35000,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    facilities: ["Garden", "Pool", "Parking", "Decoration", "Catering"],
    type: "Resort",
    description: "Beautiful garden resort with outdoor spaces and luxury amenities for memorable events."
  },
  {
    id: 3,
    name: "Skyline Conference Hall",
    location: "Bangalore, Karnataka",
    capacity: 150,
    price: 25000,
    rating: 4.7,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    facilities: ["Projector", "AC", "Wifi", "Catering", "Parking"],
    type: "Conference Hall",
    description: "Modern conference hall with state-of-the-art facilities for corporate events."
  },
  {
    id: 4,
    name: "Heritage Palace Hotel",
    location: "Jaipur, Rajasthan",
    capacity: 500,
    price: 75000,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    facilities: ["Heritage", "Parking", "Catering", "AC", "Photography", "Decoration"],
    type: "Heritage Hotel",
    description: "Majestic heritage hotel with royal ambiance perfect for destination weddings."
  },
  {
    id: 5,
    name: "Coastal Beachside Resort",
    location: "Goa",
    capacity: 200,
    price: 45000,
    rating: 4.5,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    facilities: ["Beach", "Pool", "Catering", "Music", "Photography"],
    type: "Beach Resort",
    description: "Stunning beachside resort offering breathtaking ocean views for intimate celebrations."
  },
  {
    id: 6,
    name: "Urban Rooftop Venue",
    location: "Mumbai, Maharashtra",
    capacity: 120,
    price: 30000,
    rating: 4.4,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1531973968078-9bb02785f13d?w=400&h=300&fit=crop",
    facilities: ["Rooftop", "City View", "Bar", "Music", "Lighting"],
    type: "Rooftop",
    description: "Trendy rooftop venue with panoramic city views perfect for cocktail parties and events."
  }
];

const venueTypes = ["All Types", "Banquet Hall", "Resort", "Conference Hall", "Heritage Hotel", "Beach Resort", "Rooftop"];
const locations = ["All Locations", "Mumbai, Maharashtra", "Delhi, NCR", "Bangalore, Karnataka", "Jaipur, Rajasthan", "Goa"];

export default function Venues() {
  const [searchParams] = useSearchParams();
  const [filteredVenues, setFilteredVenues] = useState(venues);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [capacityRange, setCapacityRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize filters from URL params
  useEffect(() => {
    const location = searchParams.get('location');
    const venue = searchParams.get('venue');

    if (location) {
      setSelectedLocation(location);
    }
    if (venue) {
      setSearchQuery(venue);
    }
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let filtered = venues;

    if (selectedType !== "All Types") {
      filtered = filtered.filter(venue => venue.type === selectedType);
    }

    if (selectedLocation !== "All Locations") {
      filtered = filtered.filter(venue => venue.location === selectedLocation);
    }

    if (searchQuery) {
      filtered = filtered.filter(venue =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(venue =>
      venue.price >= priceRange[0] && venue.price <= priceRange[1] &&
      venue.capacity >= capacityRange[0] && venue.capacity <= capacityRange[1]
    );

    setFilteredVenues(filtered);
  }, [selectedType, selectedLocation, searchQuery, priceRange, capacityRange]);

  const clearFilters = () => {
    setSelectedType("All Types");
    setSelectedLocation("All Locations");
    setPriceRange([0, 100000]);
    setCapacityRange([0, 1000]);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-venue-dark mb-4">
            Find Your Perfect Venue
          </h1>
          <p className="text-gray-600 mb-6">
            Discover {filteredVenues.length} amazing venues for your special occasions
          </p>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-venue-dark flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h2>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Search */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-gray-700">Search</label>
                <Input
                  placeholder="Search venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Venue Type */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-gray-700">Venue Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {venueTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-gray-700">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-gray-700">
                  Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100000}
                  step={5000}
                  className="w-full"
                />
              </div>

              {/* Capacity Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Capacity: {capacityRange[0]} - {capacityRange[1]} guests
                </label>
                <Slider
                  value={capacityRange}
                  onValueChange={setCapacityRange}
                  max={1000}
                  step={50}
                  className="w-full"
                />
              </div>
            </Card>
          </div>

          {/* Venue Grid */}
          <div className="flex-1">
            {filteredVenues.length === 0 ? (
              <Card className="p-12 text-center">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No venues found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
                {filteredVenues.map((venue) => (
                  <Card key={venue.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={venue.image}
                        alt={venue.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Badge className="bg-white text-venue-indigo">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {venue.rating}
                        </Badge>
                        <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/90 hover:bg-white">
                          <Heart className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-venue-indigo text-white">
                          {venue.type}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-semibold text-venue-dark mb-2 group-hover:text-venue-indigo transition-colors">
                        {venue.name}
                      </h3>

                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{venue.location}</span>
                      </div>

                      <div className="flex items-center text-gray-600 mb-3">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">Up to {venue.capacity} guests</span>
                        <span className="text-sm text-gray-400 ml-2">• {venue.reviews} reviews</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {venue.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {venue.facilities.slice(0, 4).map((facility, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                        {venue.facilities.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{venue.facilities.length - 4} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-end justify-between mt-auto">
                        <div>
                          <span className="text-2xl font-bold text-venue-indigo">
                            ₹{venue.price.toLocaleString()}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">/day</span>
                        </div>
                        <Button
                          asChild
                          className="bg-venue-indigo hover:bg-venue-purple text-white"
                          onClick={scrollToTop}
                        >
                          <Link to={`/venue/${venue.id}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
