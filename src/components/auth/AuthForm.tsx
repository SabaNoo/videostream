import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to /feed for login
    navigate('/feed');
  };

  const handleGuestAccess = () => {
    // Redirect to /feed for guest access
    navigate('/feed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
          <CardDescription>
            Welcome to Video-Stream
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Email" type="email" required />
            <Input placeholder="Password" type="password" required />
            {!isLogin && (
              <Input placeholder="Confirm Password" type="password" required />
            )}
            <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-700">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:underline"
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </button>
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={handleGuestAccess}
            >
              Guest Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};