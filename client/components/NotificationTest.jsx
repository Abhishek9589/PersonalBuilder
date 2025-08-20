import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import notifications from "@/lib/notifications";

const NotificationTest = () => {
  const testNotifications = [
    {
      label: "Success",
      onClick: () => notifications.success("Operation completed!", "Your action was successful."),
      variant: "default"
    },
    {
      label: "Error", 
      onClick: () => notifications.error("Something went wrong", "Please try again later."),
      variant: "destructive"
    },
    {
      label: "Warning",
      onClick: () => notifications.warning("Be careful", "This action cannot be undone."),
      variant: "outline"
    },
    {
      label: "Info",
      onClick: () => notifications.info("Helpful tip", "You can use keyboard shortcuts to work faster."),
      variant: "secondary"
    },
    {
      label: "Loading",
      onClick: () => {
        const loadingToast = notifications.loading("Processing...", "Please wait while we complete your request.");
        setTimeout(() => {
          notifications.dismiss(loadingToast);
          notifications.success("Done!", "Processing completed successfully.");
        }, 3000);
      },
      variant: "outline"
    },
    {
      label: "Profile Created",
      onClick: () => notifications.profile.created("John's Resume"),
      variant: "default"
    },
    {
      label: "Profile Loaded",
      onClick: () => notifications.profile.loaded("Jane's Resume"),
      variant: "default"
    },
    {
      label: "Profile Switched (Test Close Button)",
      onClick: () => notifications.profile.switched("John's Professional Resume"),
      variant: "default"
    },
    {
      label: "Section Moved",
      onClick: () => notifications.section.moved(),
      variant: "default"
    },
    {
      label: "Section Created",
      onClick: () => notifications.section.created("Custom Skills"),
      variant: "default"
    },
    {
      label: "Reset Data",
      onClick: () => notifications.app.reset(),
      variant: "default"
    },
    {
      label: "Keyboard Shortcut",
      onClick: () => notifications.shortcuts.preview(),
      variant: "secondary"
    },
    {
      label: "Custom with Action",
      onClick: () => notifications.custom("File saved", {
        description: "Your resume has been saved successfully.",
        type: "success",
        action: {
          label: "View",
          onClick: () => notifications.info("Action clicked!", "You clicked the view button.")
        }
      }),
      variant: "outline"
    },
    {
      label: "Name Required (Alert→Notification)",
      onClick: () => notifications.error('Name required', 'Please fill in your name before downloading.'),
      variant: "destructive"
    },
    {
      label: "Required Fields (Alert→Notification)",
      onClick: () => notifications.error('Required fields missing', 'Please complete the required fields in Personal Info section before proceeding.'),
      variant: "destructive"
    },
    {
      label: "Section Name Required",
      onClick: () => notifications.error('Section name required', 'Please enter a section name before creating.'),
      variant: "destructive"
    }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto m-4">
      <CardHeader>
        <CardTitle>🔔 Notification System Test</CardTitle>
        <p className="text-sm text-gray-600">
          Click any button below to test the unified notification system.
          All notifications will appear in the bottom-right corner with proper spacing and a prominent close button.
          Browser alerts have been converted to notifications!
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {testNotifications.map((test, index) => (
            <Button
              key={index}
              onClick={test.onClick}
              variant={test.variant}
              size="sm"
              className="text-xs h-10"
            >
              {test.label}
            </Button>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex gap-2">
            <Button
              onClick={() => notifications.dismissAll()}
              variant="outline"
              size="sm"
            >
              Dismiss All
            </Button>
            <Button
              onClick={() => {
                notifications.success("Multiple notifications test");
                setTimeout(() => notifications.error("Error notification"), 500);
                setTimeout(() => notifications.info("Info notification"), 1000);
                setTimeout(() => notifications.warning("Warning notification"), 1500);
              }}
              variant="secondary"
              size="sm"
            >
              Test Multiple
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationTest;
