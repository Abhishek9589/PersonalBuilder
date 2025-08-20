import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, User, Send, Star, CheckCircle2, Loader2 } from "lucide-react";

export default function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");
    
    const formData = new FormData(event.target);
    formData.append("access_key", "96fc6fd6-2b09-414f-8e39-5c8eb5fd8fc5");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Thank you! Your review has been submitted successfully. We appreciate your feedback!");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-indigo-50/20 to-purple-50/30"></div>
          <div 
            className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%236366f1\" fill-opacity=\"0.03\"%3E%3Cpath d=\"m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"}
          ></div>

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-6 py-3">
                  <Star className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800 font-medium">Share Your Experience</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black tracking-tight">
                  Contact 
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Us</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  We'd love to hear your thoughts about our Resume Builder! Share your review, feedback, or suggestions to help us improve.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Card className="relative overflow-hidden border border-gray-200 shadow-2xl bg-white/80 backdrop-blur-sm">
                  {/* Card Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>

                  <CardHeader className="relative space-y-4 pb-8">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-3xl font-bold text-black">
                        Send Your Review
                      </CardTitle>
                    </div>
                    <p className="text-gray-600 text-center text-lg">
                      Help us improve by sharing your experience with our resume builder
                    </p>
                  </CardHeader>

                  <CardContent className="relative space-y-6">
                    <form onSubmit={onSubmit} className="space-y-6">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-lg font-medium text-black flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Your Name</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Enter your full name"
                          className="h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white/90"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-lg font-medium text-black flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email Address</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="Enter your email address"
                          className="h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white/90"
                        />
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-lg font-medium text-black flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4" />
                          <span>Your Review & Feedback</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          placeholder="Share your experience with our resume builder. What did you like? What could we improve? Any suggestions?"
                          className="text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none bg-white/90"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <EnhancedButton
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Sending...</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <Send className="w-5 h-5" />
                              <span>Send Review</span>
                            </div>
                          )}
                        </EnhancedButton>
                      </div>
                    </form>

                    {/* Result Message */}
                    {result && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg border flex items-center space-x-3 ${
                          result.includes("successfully") 
                            ? "bg-green-50 border-green-200 text-green-800" 
                            : result.includes("Sending")
                            ? "bg-blue-50 border-blue-200 text-blue-800"
                            : "bg-red-50 border-red-200 text-red-800"
                        }`}
                      >
                        {result.includes("successfully") && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                        {result.includes("Sending") && (
                          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                        )}
                        <span className="font-medium">{result}</span>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-12 text-center"
              >
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold text-black mb-4">Why Your Feedback Matters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <Star className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-black">Improve Quality</h4>
                      <p className="text-gray-600 text-sm">Your reviews help us enhance the resume builder experience</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                        <MessageSquare className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-black">Add Features</h4>
                      <p className="text-gray-600 text-sm">Suggest new features that would benefit all users</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-black">Help Others</h4>
                      <p className="text-gray-600 text-sm">Your feedback helps other users create better resumes</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
