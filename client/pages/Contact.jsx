import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const contactInfo = [
  {
    title: "Email Us",
    description: "Send us an email anytime",
    value: "info@venuekart.in",
    icon: Mail
  },
  {
    title: "Call Us",
    description: "Mon-Fri from 8am to 5pm",
    value: "8806621666",
    icon: Phone
  },
  {
    title: "Visit Us",
    description: "Come say hello at our office",
    value: "Pune, Maharashtra, India",
    icon: MapPin
  },
  {
    title: "Working Hours",
    description: "Our team is available",
    value: "Mon-Fri: 9AM-7PM",
    icon: Clock
  }
];

export default function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Construct the email body
    const emailBody = `
Hi,

I am reaching out through the VenueKart contact form.

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Subject: ${subject}

Message:
${message}

Best regards,
${name}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:info@venuekart.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    setResult("Opening your email client with the message pre-filled. Just click send!");

    // Reset form after a brief delay
    setTimeout(() => {
      event.target.reset();
      setResult("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 relative bg-gradient-to-br from-venue-indigo via-pink-500 to-venue-purple overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-venue-lavender max-w-3xl mx-auto">
            Have questions about venues or need help with your booking? We're here to help you every step of the way.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-venue-dark mb-6">
              Contact Information
            </h2>
            <p className="text-gray-600 mb-8">
              Reach out to us through any of these channels. We're always ready to assist you.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-venue-lavender rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-venue-indigo" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-venue-dark mb-1">{info.title}</h3>
                      <p className="text-gray-600 text-sm mb-1">{info.description}</p>
                      <p className="text-venue-indigo font-medium">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FAQ Link */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-venue-dark mb-2">Frequently Asked Questions</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Find quick answers to common questions about our platform and services.
                </p>
                <Button variant="outline" className="w-full">
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-venue-dark">Send us a Message</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        placeholder="What is this about?"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  {result && (
                    <div className={`flex items-center space-x-2 p-4 rounded-lg ${
                      result.includes("Successfully")
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {result.includes("Successfully") ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                      <span>{result}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-venue-indigo hover:bg-venue-purple text-white h-12"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map or Additional Info Section */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-venue-dark mb-4">
                Need Immediate Assistance?
              </h3>
              <p className="text-gray-600 mb-6">
                For urgent inquiries or immediate support, call us directly or start a live chat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-venue-indigo hover:bg-venue-purple text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now: +91 8806621666
                </Button>
                <Button
                  variant="outline"
                  className="border-venue-indigo text-venue-indigo hover:bg-venue-indigo hover:text-white"
                  onClick={() => {
                    const messageSection = document.getElementById('message');
                    if (messageSection) {
                      messageSection.scrollIntoView({ behavior: 'smooth' });
                      messageSection.focus();
                    }
                  }}
                >
                  Send us a Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
