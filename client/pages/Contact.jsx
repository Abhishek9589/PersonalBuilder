import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, User, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");
    
    const formDataToSend = new FormData(event.target);
    formDataToSend.append("access_key", "96fc6fd6-2b09-414f-8e39-5c8eb5fd8fc5");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="font-roboto text-3xl md:text-5xl font-bold text-black mb-4">
              Get in Touch
            </h1>
            <p className="font-roboto text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions about PersonalBuilder? Need help creating your perfect resume? 
              We're here to help you succeed in your career journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info & Features */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Methods */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="font-roboto text-xl font-bold text-black flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-roboto font-medium text-black">Email Support</p>
                      <p className="font-roboto text-sm text-gray-600">support@personalbuilder.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-roboto font-medium text-black">Response Time</p>
                      <p className="font-roboto text-sm text-gray-600">Within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-roboto font-medium text-black">Global Support</p>
                      <p className="font-roboto text-sm text-gray-600">Available worldwide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Contact Us */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="font-roboto text-xl font-bold text-black">
                    How We Can Help
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      icon: <User className="w-5 h-5" />,
                      title: "Resume Guidance",
                      description: "Expert tips for ATS-friendly resumes"
                    },
                    {
                      icon: <MessageSquare className="w-5 h-5" />,
                      title: "Technical Support", 
                      description: "Quick help with platform issues"
                    },
                    {
                      icon: <Send className="w-5 h-5" />,
                      title: "Feature Requests",
                      description: "Suggest improvements and new features"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-roboto font-semibold text-black mb-1">
                          {item.title}
                        </h3>
                        <p className="font-roboto text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/3 to-indigo-500/3"></div>
                <CardHeader className="relative pb-6">
                  <CardTitle className="font-roboto text-2xl md:text-3xl font-bold text-black flex items-center gap-3">
                    <Send className="w-7 h-7 text-blue-600" />
                    Send us a Message
                  </CardTitle>
                  <p className="font-roboto text-gray-600 mt-3 text-lg">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                
                <CardContent className="relative space-y-6">
                  <form onSubmit={onSubmit} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-roboto font-medium text-black text-base">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          className="font-roboto h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200 text-base"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-roboto font-medium text-black text-base">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          required
                          className="font-roboto h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200 text-base"
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-roboto font-medium text-black text-base">
                        Your Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you with PersonalBuilder..."
                        required
                        rows={6}
                        className="font-roboto border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl resize-none transition-all duration-200 text-base"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 font-roboto font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-3">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Sending Message...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-3">
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>

                  {/* Result Message */}
                  {result && (
                    <div
                      className={`flex items-center space-x-3 p-4 rounded-xl border-2 ${
                        result.includes("successfully")
                          ? "bg-green-50 border-green-200 text-green-800"
                          : result.includes("Sending")
                          ? "bg-blue-50 border-blue-200 text-blue-800"
                          : "bg-red-50 border-red-200 text-red-800"
                      }`}
                    >
                      {result.includes("successfully") ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : result.includes("Sending") ? (
                        <div className="w-6 h-6 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin flex-shrink-0"></div>
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )}
                      <span className="font-roboto font-medium text-base">{result}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 md:mt-20">
            <div className="text-center mb-12">
              <h2 className="font-roboto text-2xl md:text-3xl font-bold text-black mb-4">
                Frequently Asked Questions
              </h2>
              <p className="font-roboto text-gray-600 text-lg">
                Quick answers to common questions about PersonalBuilder
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "Is PersonalBuilder really free?",
                  answer: "Yes! PersonalBuilder is completely free to use. Create unlimited resumes without any hidden fees or subscriptions."
                },
                {
                  question: "Are my resumes ATS-friendly?",
                  answer: "Absolutely! Our templates are specifically designed to pass Applicant Tracking Systems used by most companies."
                },
                {
                  question: "Can I download my resume as PDF?",
                  answer: "Yes, you can download your resume as a high-quality PDF that maintains perfect formatting across all devices."
                },
                {
                  question: "Do I need to create an account?",
                  answer: "No account required! You can create and download your resume immediately without any registration."
                }
              ].map((faq, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-roboto font-semibold text-black mb-3 text-lg">
                      {faq.question}
                    </h3>
                    <p className="font-roboto text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
