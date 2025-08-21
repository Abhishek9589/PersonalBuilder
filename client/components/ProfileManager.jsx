import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  User, 
  Plus, 
  Settings, 
  Trash2, 
  Calendar,
  Users,
  CheckCircle,
  MoreVertical,
  Edit3,
  Copy,
  AlertCircle
} from "lucide-react";
import ProfileCreationModal from "./ProfileCreationModal";
import {
  getAllProfiles,
  getCurrentProfileId,
  setCurrentProfileId,
  getProfile,
  deleteProfile,
  saveProfile,
  generateProfileId
} from "@/lib/profileStorage";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const ProfileManager = ({ onProfileSelected, currentProfileData }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileId, setCurrentProfile] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState(null);
  const [editName, setEditName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    try {
      const allProfiles = getAllProfiles() || [];
      const currentId = getCurrentProfileId();

      setProfiles(allProfiles);
      setCurrentProfile(currentId);

      // If no current profile but profiles exist, select the first one
      if (!currentId && allProfiles && allProfiles.length > 0) {
        handleProfileSelect(allProfiles[0].id);
      }
    } catch (error) {
      console.error('Error in loadProfiles:', error);
      setProfiles([]);
      setCurrentProfile(null);
    }
  };

  const handleProfileSelect = (profileId) => {
    setIsLoading(true);
    try {
      const profile = getProfile(profileId);
      if (profile) {
        setCurrentProfileId(profileId);
        setCurrentProfile(profileId);
        onProfileSelected(profile);
        toast.success(`Switched to "${profile.name}" profile`);
      }
    } catch (error) {
      console.error('Error selecting profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProfile = () => {
    setShowCreateModal(true);
  };

  const handleProfileCreated = (newProfile) => {
    loadProfiles();
    onProfileSelected(newProfile);
  };

  const handleDeleteProfile = (profileId, profileName) => {
    setProfileToDelete({ id: profileId, name: profileName });
    setDeleteDialogOpen(true);
  };

  const handleEditProfile = (profile) => {
    setProfileToEdit(profile);
    setEditName(profile.name);
    setEditDialogOpen(true);
  };

  const handleCloneProfile = (profile) => {
    try {
      const clonedProfile = {
        ...profile,
        id: generateProfileId(),
        name: `${profile.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const success = saveProfile(clonedProfile);
      if (success) {
        toast.success(`Profile "${clonedProfile.name}" created successfully!`);
        loadProfiles();
      } else {
        toast.error('Failed to clone profile');
      }
    } catch (error) {
      console.error('Error cloning profile:', error);
      toast.error('Failed to clone profile');
    }
  };

  const confirmDeleteProfile = () => {
    if (profileToDelete) {
      const success = deleteProfile(profileToDelete.id);
      if (success) {
        toast.success(`Profile "${profileToDelete.name}" deleted`);
        loadProfiles();
        
        // If we deleted the current profile, switch to another one or clear selection
        if (currentProfileId === profileToDelete.id) {
          const remainingProfiles = getAllProfiles() || [];
          if (remainingProfiles && remainingProfiles.length > 0) {
            handleProfileSelect(remainingProfiles[0].id);
          } else {
            setCurrentProfile(null);
            onProfileSelected(null);
          }
        }
      } else {
        toast.error('Failed to delete profile');
      }
    }
    setDeleteDialogOpen(false);
    setProfileToDelete(null);
  };

  const confirmEditProfile = () => {
    if (profileToEdit && editName.trim()) {
      const updatedProfile = {
        ...profileToEdit,
        name: editName.trim(),
        updatedAt: new Date().toISOString()
      };
      
      const success = saveProfile(updatedProfile);
      if (success) {
        toast.success(`Profile renamed to "${updatedProfile.name}"`);
        loadProfiles();
        
        // If we edited the current profile, update the current profile data
        if (currentProfileId === profileToEdit.id) {
          onProfileSelected(updatedProfile);
        }
      } else {
        toast.error('Failed to update profile');
      }
    }
    setEditDialogOpen(false);
    setProfileToEdit(null);
    setEditName('');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return '';
    }
  };

  const hasResumeData = (profile) => {
    if (!profile?.data) return false;

    try {
      const { personalInfo, skills, experiences, projects, education } = profile.data;

      // Check personal info
      const hasPersonalInfo = personalInfo?.firstName || personalInfo?.lastName || personalInfo?.name;

      // Check skills safely
      let hasSkills = false;
      if (skills && typeof skills === 'object' && skills !== null) {
        try {
          const skillValues = Object.values(skills);
          hasSkills = skillValues.some(arr => Array.isArray(arr) && arr && arr.length > 0);
        } catch (e) {
          console.warn('Error checking skills:', e);
          hasSkills = false;
        }
      }

      // Check arrays safely
      const hasExperiences = Array.isArray(experiences) && experiences.length > 0;
      const hasProjects = Array.isArray(projects) && projects.length > 0;
      const hasEducation = Array.isArray(education) && education.length > 0;

      return hasPersonalInfo || hasSkills || hasExperiences || hasProjects || hasEducation;
    } catch (error) {
      console.warn('Error in hasResumeData:', error);
      return false;
    }
  };

  // Calculate responsive grid classes based on profile count
  const getGridClasses = () => {
    const count = (profiles || []).length;
    if (count === 1) return 'flex justify-center';
    if (count === 2) return 'grid grid-cols-2 gap-4';
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
  };

  if ((!profiles || profiles.length === 0) && !showCreateModal) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto text-center py-8"
      >
        <Card>
          <CardHeader>
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Welcome to Resume Builder</CardTitle>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6">
                Create your first profile to start building your resume. You can create multiple profiles for different career paths.
              </p>
              <Button onClick={handleCreateProfile} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Profile
              </Button>
            </CardContent>
          </CardHeader>
        </Card>

        <ProfileCreationModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onProfileCreated={handleProfileCreated}
        />
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Resume Profiles
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCreateProfile}
              className="flex items-center gap-2 border-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              Add Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className={getGridClasses()}>
            <AnimatePresence>
              {(profiles || []).map((profile) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className={`group relative border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    currentProfileId === profile.id
                      ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20'
                      : 'border-border hover:border-primary/50 hover:shadow-md hover:bg-muted/30'
                  }`}
                  onClick={() => handleProfileSelect(profile.id)}
                >
                  {/* Profile Card Content */}
                  <div className="space-y-3">
                    {/* Profile Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className={`p-2 rounded-full ${
                          currentProfileId === profile.id 
                            ? 'bg-primary text-white' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-medium text-sm truncate ${
                            currentProfileId === profile.id ? 'text-primary' : 'text-foreground'
                          }`}>
                            {profile.name}
                          </h3>
                          {hasResumeData(profile) && (
                            <div className="flex items-center gap-1 mt-1">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span className="text-xs text-green-600">Has data</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Profile Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 opacity-60 hover:opacity-100 group-hover:opacity-100 transition-opacity hover:bg-muted"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProfile(profile);
                            }}
                            className="flex items-center gap-2"
                          >
                            <Edit3 className="h-4 w-4" />
                            Edit Name
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCloneProfile(profile);
                            }}
                            className="flex items-center gap-2"
                          >
                            <Copy className="h-4 w-4" />
                            Clone Profile
                          </DropdownMenuItem>
                          {(profiles || []).length > 1 && (
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProfile(profile.id, profile.name);
                              }}
                              className="flex items-center gap-2 text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete Profile
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Profile Metadata */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Created: {formatDate(profile.createdAt)}</span>
                      </div>
                      {profile.updatedAt && profile.updatedAt !== profile.createdAt && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Settings className="h-3 w-3" />
                          <span>Updated: {formatDate(profile.updatedAt)}</span>
                        </div>
                      )}
                    </div>

                    {/* Active Indicator */}
                    {currentProfileId === profile.id && (
                      <div className="flex items-center gap-2 text-xs text-primary font-medium">
                        <CheckCircle className="h-3 w-3" />
                        <span>Active Profile</span>
                      </div>
                    )}
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Profile Creation Modal */}
      <ProfileCreationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onProfileCreated={handleProfileCreated}
      />

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Edit Profile Name
            </DialogTitle>
            <DialogDescription>
              Change the name of your profile. This will help you identify different career paths.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="profileName" className="text-sm font-medium">
                Profile Name
              </label>
              <Input
                id="profileName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter profile name"
                className="w-full"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    confirmEditProfile();
                  }
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={confirmEditProfile}
              disabled={!editName.trim() || editName.trim() === profileToEdit?.name}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Delete Profile
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the profile "{profileToDelete?.name}"? 
              This action cannot be undone and will permanently remove all resume data associated with this profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteProfile}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Profile
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileManager;
