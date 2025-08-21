import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { scrollToTop } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Users,
  Star,
  Phone,
  Mail,
  ArrowLeft,
  Heart,
  Share2
} from 'lucide-react';

// Mock venue data
const venues = [
  {
    id: 1,
    name: "Grand Ballroom Elite",
    location: "Mumbai, Maharashtra",
    capacity: 650,
    price: 50000,
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop"
    ],
    facilities: ["AC", "Parking", "Catering", "Sound System", "Stage", "Lighting"],
    type: "Banquet Hall",
    description: "Elegant banquet hall perfect for weddings and large celebrations with premium amenities.",
    phone: "8806621666",
    email: "info@venuekart.in"
  }
];

export default function VenueDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const venue = venues.find(v => v.id === parseInt(id || ''));

  if (!venue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Venue Not Found</h2>
          <p className="text-gray-500 mb-6">The venue you're looking for doesn't exist.</p>
          <Button asChild onClick={scrollToTop}>
            <Link to="/venues">Browse All Venues</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-venue-indigo hover:text-venue-purple" onClick={scrollToTop}>
            <Link to="/venues">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Venues
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="aspect-video w-full">
                  <img
                    src={venue.images[selectedImage] || venue.images[0]}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-venue-indigo text-white">
                    {venue.type}
                  </Badge>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {venue.images && venue.images.length > 1 && (
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {venue.images.slice(0, 4).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index ? 'border-venue-indigo' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${venue.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Venue Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-venue-dark mb-2">{venue.name}</h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-600">Up to {venue.capacity} guests</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{venue.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({venue.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-venue-indigo">₹{venue.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">per day</div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-xl font-semibold mb-3">About This Venue</h3>
                  <p className="text-gray-600 leading-relaxed">{venue.description}</p>
                </div>

                <div className="border-t pt-6 mt-6">
                  <h3 className="text-xl font-semibold mb-3">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {venue.facilities.map((facility, index) => (
                      <Badge key={index} variant="secondary">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quick Booking Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Book This Venue</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Price</span>
                      <span>₹{venue.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service Fee</span>
                      <span>₹{(venue.price * 0.1).toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹{(venue.price * 1.1).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-venue-indigo hover:bg-venue-purple text-white">
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    Request Quote
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
