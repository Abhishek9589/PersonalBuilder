import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Lock, Eye, EyeOff, Building, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo login - any email/password will work
    const userData = {
      name: formData.email.split('@')[0] || 'User',
      email: formData.email,
      userType: 'customer'
    };
    login(userData);
    navigate('/');
  };

  const handleVenueOwnerLogin = () => {
    // Demo venue owner login
    const venueOwnerData = {
      name: 'Venue Owner',
      email: 'owner@venuekart.com',
      userType: 'venue-owner'
    };
    login(venueOwnerData);
    navigate('/');
  };

  const handleCustomerLogin = () => {
    // Demo customer login
    const customerData = {
      name: 'Demo Customer',
      email: 'customer@venuekart.com',
      userType: 'customer'
    };
    login(customerData);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-venue-dark mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your VenueKart account</p>
        </div>

        {/* Main Form Card */}
        <div>
          <Card className="shadow-lg border-0">
          <CardContent className="p-8">

            {/* Demo Login Options */}
            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-600 text-center font-medium">Quick Demo Login</p>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleVenueOwnerLogin}
                  variant="outline"
                  className="h-16 border-venue-indigo text-venue-indigo hover:bg-venue-indigo hover:text-white flex flex-col items-center space-y-1"
                >
                  <Building className="h-5 w-5" />
                  <span className="text-xs">Venue Owner</span>
                </Button>

                <Button
                  onClick={handleCustomerLogin}
                  variant="outline"
                  className="h-16 border-gray-300 hover:border-gray-400 flex flex-col items-center space-y-1"
                >
                  <User className="h-5 w-5" />
                  <span className="text-xs">Customer</span>
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
                </div>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="pl-10 h-12 border-gray-300 focus:border-venue-indigo focus:ring-venue-indigo"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-venue-indigo focus:ring-venue-indigo"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-venue-indigo focus:ring-venue-indigo border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="#" className="font-medium text-venue-indigo hover:text-venue-purple">
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-venue-indigo hover:bg-venue-purple text-white font-medium text-base"
              >
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
            </div>

            {/* Social Login Options */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-12 border-gray-300">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="font-medium text-venue-indigo hover:text-venue-purple">
                Sign up here
              </Link>
            </div>
          </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
