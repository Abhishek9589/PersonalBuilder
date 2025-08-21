import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, User } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="font-roboto text-4xl md:text-5xl font-bold text-black mb-4">
              Get in Touch
            </h1>
            <p className="font-roboto text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Have questions about our resume builder? Need help getting started? 
              We'd love to hear from you and help you create the perfect resume.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-roboto text-2xl font-bold text-black mb-6">
                  Why Contact Us?
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: <User className="w-6 h-6" />,
                      title: "Resume Assistance",
                      description: "Get help with creating professional, ATS-friendly resumes"
                    },
                    {
                      icon: <MessageSquare className="w-6 h-6" />,
                      title: "Technical Support", 
                      description: "Having issues with the builder? We're here to help"
                    },
                    {
                      icon: <Mail className="w-6 h-6" />,
                      title: "Feature Requests",
                      description: "Suggest new features or improvements for our platform"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex-shrink-0 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-roboto font-semibold text-lg text-black mb-2">
                          {item.title}
                        </h3>
                        <p className="font-roboto text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border border-blue-100"
              >
                <h3 className="font-roboto font-bold text-xl text-black mb-4">
                  Quick Response Promise
                </h3>
                <p className="font-roboto text-gray-700 leading-relaxed">
                  We typically respond to all inquiries within 24 hours. 
                  For urgent technical issues, we aim to respond even faster.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>
                <CardHeader className="relative pb-8">
                  <CardTitle className="font-roboto text-2xl font-bold text-black flex items-center gap-3">
                    <Send className="w-6 h-6 text-blue-600" />
                    Send us a Message
                  </CardTitle>
                  <p className="font-roboto text-gray-600 mt-2">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                
                <CardContent className="relative space-y-6">
                  <form onSubmit={onSubmit} className="space-y-6">
                    {/* Name Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="name" className="font-roboto font-medium text-black">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="font-roboto h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                      />
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="email" className="font-roboto font-medium text-black">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        required
                        className="font-roboto h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                      />
                    </motion.div>

                    {/* Message Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="message" className="font-roboto font-medium text-black">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        required
                        rows={6}
                        className="font-roboto border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl resize-none transition-all duration-200"
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 font-roboto font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>

                  {/* Result Message */}
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center space-x-3 p-4 rounded-xl ${
                        result.includes("successfully")
                          ? "bg-green-50 border border-green-200 text-green-800"
                          : result.includes("Sending")
                          ? "bg-blue-50 border border-blue-200 text-blue-800"
                          : "bg-red-50 border border-red-200 text-red-800"
                      }`}
                    >
                      {result.includes("successfully") ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : result.includes("Sending") ? (
                        <div className="w-5 h-5 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className="font-roboto font-medium">{result}</span>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
