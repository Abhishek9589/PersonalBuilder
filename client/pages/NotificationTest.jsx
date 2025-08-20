import React from 'react';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import notifications from "@/lib/notifications";

export default function NotificationTestPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">🔔 Notification System Test</CardTitle>
              <p className="text-gray-600">
                Test all notification types and check close button positioning.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => notifications.success("Success!", "This is a success notification.")}
                  className="h-12"
                >
                  Success
                </Button>
                <Button 
                  onClick={() => notifications.error("Error!", "This is an error notification.")}
                  variant="destructive"
                  className="h-12"
                >
                  Error  
                </Button>
                <Button 
                  onClick={() => notifications.warning("Warning!", "This is a warning notification.")}
                  variant="outline"
                  className="h-12"
                >
                  Warning
                </Button>
                <Button 
                  onClick={() => notifications.info("Info!", "This is an info notification.")}
                  variant="secondary"
                  className="h-12"
                >
                  Info
                </Button>
                <Button 
                  onClick={() => notifications.profile.switched("John's Resume")}
                  className="h-12"
                >
                  Profile Switched
                </Button>
                <Button 
                  onClick={() => notifications.profile.created("New Profile")}
                  className="h-12"
                >
                  Profile Created
                </Button>
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Testing Instructions:</h3>
                <ol className="list-decimal list-inside text-yellow-700 space-y-1">
                  <li>Click any button to trigger a notification</li>
                  <li>Check that notifications appear in bottom-right corner</li>
                  <li>Verify close button is visible in top-right corner of each notification</li>
                  <li>Test that close button is clickable and dismisses notification</li>
                  <li>Verify notifications don't stack/overlap</li>
                </ol>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button 
                  onClick={() => notifications.dismissAll()}
                  variant="outline"
                >
                  Dismiss All
                </Button>
                <Button 
                  onClick={() => {
                    for(let i = 0; i < 3; i++) {
                      setTimeout(() => {
                        notifications.success(`Notification ${i + 1}`, `Testing multiple notifications - ${i + 1}`);
                      }, i * 200);
                    }
                  }}
                  variant="secondary"
                >
                  Test Multiple
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
