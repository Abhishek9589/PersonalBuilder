import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { scrollToTop } from '@/lib/navigation';
import {
  Users,
  Shield,
  Award,
  Heart,
  MapPin,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';

const stats = [
  { label: "Happy Customers", value: "10,000+", icon: Users },
  { label: "Verified Venues", value: "5,000+", icon: Shield },
  { label: "Cities Covered", value: "100+", icon: MapPin },
  { label: "Years Experience", value: "5+", icon: Award },
];

const values = [
  {
    title: "Trusted Platform",
    description: "All our venues are verified and quality-checked to ensure the best experience for your events.",
    icon: Shield
  },
  {
    title: "Transparent Pricing",
    description: "No hidden charges. What you see is what you pay. Complete transparency in all our dealings.",
    icon: Star
  },
  {
    title: "24/7 Support",
    description: "Our dedicated support team is available round the clock to assist you with any queries.",
    icon: Clock
  },
  {
    title: "Quality Assurance",
    description: "We maintain high standards and continuously monitor venue quality to exceed expectations.",
    icon: CheckCircle
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 relative bg-gradient-to-br from-venue-indigo via-pink-500 to-venue-purple overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About VenueKart
          </h1>
          <p className="text-xl text-venue-lavender max-w-3xl mx-auto">
            We're passionate about making event planning effortless by connecting you with the perfect venues for your special occasions.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-venue-dark mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At VenueKart, we believe that every celebration deserves the perfect setting. Our mission is to simplify the venue booking process by providing a comprehensive platform where event organizers can discover, compare, and book exceptional venues with confidence.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Whether you're planning an intimate gathering or a grand celebration, we're here to help you find spaces that create lasting memories.
              </p>
              <Button asChild className="bg-venue-indigo hover:bg-venue-purple text-white" onClick={scrollToTop}>
                <Link to="/venues">Start Your Search</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop"
                alt="Event celebration"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-venue-dark mb-4">
              VenueKart by the Numbers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform has helped thousands of customers find their perfect venues
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-venue-lavender rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-venue-indigo" />
                  </div>
                  <div className="text-3xl font-bold text-venue-dark mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-venue-dark mb-4">
              Why Choose VenueKart?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best venue booking experience through our core values
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-venue-lavender rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-venue-indigo" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-venue-dark mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative bg-gradient-to-br from-venue-indigo via-pink-500 to-venue-purple overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Venue?
          </h2>
          <p className="text-venue-lavender mb-8 text-lg">
            Join thousands of satisfied customers who have found their ideal event spaces through VenueKart
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-venue-indigo hover:bg-venue-lavender" onClick={scrollToTop}>
              <Link to="/venues">Browse Venues</Link>
            </Button>
            <Button asChild className="bg-white text-venue-indigo hover:bg-venue-lavender" onClick={scrollToTop}>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
