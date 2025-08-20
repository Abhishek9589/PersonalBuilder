import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, AlertCircle } from "lucide-react";
import { createDefaultProfile, saveProfile, setCurrentProfileId } from "@/lib/profileStorage";
import notifications from "@/lib/notifications";

const ProfileCreationModal = ({ isOpen, onClose, onProfileCreated }) => {
  const [profileName, setProfileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateProfile = async () => {
    if (!profileName.trim()) {
      setError('Please enter a profile name');
      return;
    }

    if (profileName.trim().length < 2) {
      setError('Profile name must be at least 2 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const newProfile = createDefaultProfile(profileName.trim());
      const success = saveProfile(newProfile);
      
      if (success) {
        setCurrentProfileId(newProfile.id);
        notifications.profile.created(newProfile.name);
        onProfileCreated(newProfile);
        onClose();
        setProfileName('');
      } else {
        setError('Failed to create profile. Please try again.');
      }
    } catch (err) {
      console.error('Error creating profile:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setProfileName('');
    setError('');
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleCreateProfile();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Create New Profile
          </DialogTitle>
          <DialogDescription>
            Create a new profile to organize your resume data. You can switch between different profiles later.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="profileName">Profile Name</Label>
            <Input
              id="profileName"
              placeholder="Enter profile name (e.g., 'Software Engineer', 'Marketing')"
              value={profileName}
              onChange={(e) => {
                setProfileName(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="w-full"
              autoFocus
            />
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>💡 <strong>Tip:</strong> Use descriptive names like "Frontend Developer" or "Product Manager" to easily identify different career paths.</p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleCreateProfile}
            disabled={isLoading || !profileName.trim()}
            className="min-w-[100px]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Creating...
              </div>
            ) : (
              'Create Profile'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCreationModal;
