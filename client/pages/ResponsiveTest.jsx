import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";

// Test component for validating cross-browser compatibility and responsive fixes
export default function ResponsiveTest() {
  const [testMobileMenu, setTestMobileMenu] = useState(false);
  
  const testItems = [
    "Grid responsive breakpoints",
    "Backdrop-filter support", 
    "Mobile scroll lock",
    "Touch targets (44px minimum)",
    "Viewport height units",
    "Transform animations",
    "Flexbox layouts",
    "Safe grid fallbacks"
  ];

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
              Cross-Browser Compatibility Test
            </h1>
            
            {/* Test Grid Layouts */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Responsive Grid Test</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Two-column test - should stack on mobile */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Two-Column Layout (Mobile Stack)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-100 p-4 rounded-lg">Column 1</div>
                      <div className="bg-green-100 p-4 rounded-lg">Column 2</div>
                    </div>
                  </div>
                  
                  {/* Three-column test */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Three-Column Layout</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-red-100 p-4 rounded-lg">Item 1</div>
                      <div className="bg-yellow-100 p-4 rounded-lg">Item 2</div>
                      <div className="bg-purple-100 p-4 rounded-lg">Item 3</div>
                    </div>
                  </div>
                  
                  {/* Profile Manager style test */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Profile Manager Style (2 items)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-indigo-100 p-4 rounded-lg">Profile 1</div>
                      <div className="bg-pink-100 p-4 rounded-lg">Profile 2</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Backdrop Filter */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Backdrop Filter Test</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg overflow-hidden">
                  <div className="absolute inset-4 backdrop-blur-xl bg-white/80 rounded-lg flex items-center justify-center">
                    <span className="text-black font-semibold">Backdrop Blur Test</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Touch Targets */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Touch Target Test</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <Button className="touch-target">Touch Optimized Button</Button>
                    <Button variant="outline" className="touch-target">Outline Button</Button>
                    <Button variant="ghost" className="touch-target">Ghost Button</Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    All buttons should have minimum 44px touch targets for mobile accessibility.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Test Mobile Menu */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Mobile Menu Simulation</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setTestMobileMenu(!testMobileMenu)}
                  className="mb-4"
                >
                  Toggle Test Menu
                </Button>
                
                {testMobileMenu && (
                  <div className="relative border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200 p-4">
                      <div className="space-y-2">
                        {['Home', 'About', 'Contact', 'Templates'].map((item) => (
                          <div 
                            key={item}
                            className="block px-6 py-4 rounded-2xl font-medium transition-all duration-300 touch-target bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-gray-200"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Test Animations */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Animation Performance Test</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="card-hover bg-blue-100 p-6 rounded-lg text-center safe-transform">
                    <h4 className="font-semibold">Hover Animation</h4>
                    <p className="text-sm text-gray-600">Should lift slightly on hover</p>
                  </div>
                  <div className="card-grab bg-green-100 p-6 rounded-lg text-center safe-transform">
                    <h4 className="font-semibold">Grab Animation</h4>
                    <p className="text-sm text-gray-600">Should scale on hover/active</p>
                  </div>
                  <div className="smooth-transition bg-purple-100 p-6 rounded-lg text-center hover:bg-purple-200">
                    <h4 className="font-semibold">Smooth Transition</h4>
                    <p className="text-sm text-gray-600">Should change color smoothly</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Safe Area Insets */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Mobile Safe Area Insets Test</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-100 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">Without Safe Area (Should be cut off on phones)</h4>
                    <div className="bg-red-500 text-white p-4 rounded">
                      This content doesn't use safe area insets
                    </div>
                  </div>

                  <div className="p-4 bg-green-100 border border-green-200 rounded-lg mobile-safe-area-bottom">
                    <h4 className="font-semibold text-green-900 mb-2">With Safe Area (Should be visible)</h4>
                    <div className="bg-green-500 text-white p-4 rounded">
                      This content uses mobile-safe-area-bottom class
                    </div>
                  </div>

                  <div className="fixed bottom-0 left-4 right-4 z-30 bg-blue-500 text-white p-4 rounded-t-lg mobile-fixed-bottom mobile-safe-area-bottom">
                    <p className="text-center text-sm">Fixed bottom element with safe area support</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Checklist */}
            <Card className="mobile-safe-area-bottom-lg">
              <CardHeader>
                <CardTitle>Cross-Browser Compatibility Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...testItems, "Mobile safe area insets", "Dynamic viewport height", "Browser UI compensation"].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Testing Instructions:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Test on Chrome, Safari, Firefox, and Edge</li>
                    <li>• Check mobile devices (iOS Safari, Android Chrome)</li>
                    <li>• Verify tablet landscape and portrait modes</li>
                    <li>• Test touch interactions and scroll behavior</li>
                    <li>• Validate backdrop filters work or fallback gracefully</li>
                    <li>• Check that fixed bottom elements are not hidden by browser UI</li>
                    <li>• Verify safe area insets on devices with notches</li>
                    <li>• Test dynamic viewport height with browser chrome showing/hiding</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
